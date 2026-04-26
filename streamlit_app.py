import os
from datetime import datetime
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv

from streamlit_db import delete_resume_from_db, load_resumes_from_db, save_resume_to_db

env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)


@st.cache_resource
def get_api_key():
    """Read the Gemini key from Streamlit secrets first, then env vars."""
    try:
        if "GEMINI_API_KEY" in st.secrets and st.secrets["GEMINI_API_KEY"]:
            return st.secrets["GEMINI_API_KEY"]
    except Exception:
        pass

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if api_key:
        return api_key.strip('"').strip("'")
    return None


st.set_page_config(
    page_title="Resume Variant Lab",
    page_icon="📄",
    layout="wide",
    initial_sidebar_state="expanded",
)

if "resumes" not in st.session_state:
    st.session_state.resumes = {}
if "selected_resume" not in st.session_state:
    st.session_state.selected_resume = None

st.markdown(
    """
    <style>
    .hero {
        padding: 2rem;
        background: linear-gradient(135deg, #1f4d7a 0%, #3d7d6b 100%);
        border-radius: 12px;
        color: white;
        margin-bottom: 2rem;
    }
    .hero h1 {
        font-size: 2.5rem;
        margin: 0.5rem 0;
    }
    .eyebrow {
        text-transform: uppercase;
        font-size: 0.85rem;
        opacity: 0.9;
        letter-spacing: 0.08em;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="hero">
        <span class="eyebrow">Streamlit Deployment</span>
        <h1>Resume Variant Lab</h1>
        <p>This Streamlit app is restored for the original hosted URL and can live alongside the current Vercel deployment.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

tab1, tab2, tab3 = st.tabs(["Resume Library", "Upload Resume", "Tailor Resume"])

with tab1:
    st.header("Resume Library")

    db_resumes = load_resumes_from_db()
    all_resumes = {**db_resumes, **st.session_state.resumes}

    if not all_resumes:
        st.info("No resumes uploaded yet. Use the Upload Resume tab to get started.")
    else:
        st.subheader(f"Total Resumes: {len(all_resumes)}")

        for resume_id, resume_data in all_resumes.items():
            with st.container():
                col1, col2, col3 = st.columns([3, 1, 1])
                with col1:
                    st.write(f"**{resume_data['title']}**")
                    st.caption(
                        f"Status: {resume_data['status']} | Uploaded: {resume_data['created_at']}"
                    )
                with col2:
                    if st.button("View", key=f"view_{resume_id}"):
                        st.session_state.selected_resume = resume_id
                with col3:
                    if st.button("Delete", key=f"delete_{resume_id}"):
                        if resume_id in db_resumes:
                            delete_resume_from_db(resume_id)
                        else:
                            del st.session_state.resumes[resume_id]
                        st.rerun()

                if st.session_state.selected_resume == resume_id:
                    with st.expander("Resume Content", expanded=True):
                        st.text_area(
                            "Resume Text",
                            value=resume_data["content"],
                            height=300,
                            disabled=True,
                            key=f"resume_text_{resume_id}",
                        )

with tab2:
    st.header("Upload Resume")

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Option 1: Upload PDF")
        uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

        if uploaded_file is not None:
            resume_title = st.text_input(
                "Resume Title",
                value=uploaded_file.name.replace(".pdf", ""),
                key="pdf_title",
            )

            if st.button("Upload PDF", key="upload_pdf_btn"):
                try:
                    import PyPDF2

                    pdf_reader = PyPDF2.PdfReader(uploaded_file)
                    text = "".join(page.extract_text() or "" for page in pdf_reader.pages)

                    resume_id = save_resume_to_db(
                        title=resume_title or "Untitled Resume",
                        content=text,
                        source_type="PDF",
                        original_filename=uploaded_file.name,
                    )

                    if resume_id:
                        st.success(f"Resume '{resume_title}' uploaded successfully.")
                    else:
                        st.session_state.resumes[f"resume_{datetime.now().timestamp()}"] = {
                            "title": resume_title or "Untitled Resume",
                            "content": text,
                            "status": "PARSED",
                            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            "source_type": "PDF",
                        }
                        st.success(f"Resume '{resume_title}' uploaded successfully to local storage.")
                    st.rerun()
                except Exception as error:
                    st.error(f"Error processing PDF: {error}")

    with col2:
        st.subheader("Option 2: Paste Text")
        resume_title_text = st.text_input("Resume Title", key="text_title")
        resume_text = st.text_area(
            "Paste your resume text here",
            height=300,
            placeholder="Paste your resume content...",
        )

        if st.button("Upload Text Resume", key="upload_text_btn"):
            if not resume_text.strip():
                st.warning("Please enter some resume content.")
            else:
                resume_id = save_resume_to_db(
                    title=resume_title_text or "Text Resume",
                    content=resume_text,
                    source_type="TEXT",
                )

                if resume_id:
                    st.success(f"Resume '{resume_title_text or 'Text Resume'}' added successfully.")
                else:
                    st.session_state.resumes[f"resume_{datetime.now().timestamp()}"] = {
                        "title": resume_title_text or "Text Resume",
                        "content": resume_text,
                        "status": "PARSED",
                        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "source_type": "TEXT",
                    }
                    st.success("Resume added successfully to local storage.")
                st.rerun()

with tab3:
    st.header("Tailor Resume")
    st.info("Tailor your resume to a job description using Gemini.")

    db_resumes = load_resumes_from_db()
    all_resumes = {**db_resumes, **st.session_state.resumes}

    if not all_resumes:
        st.warning("Upload a resume first in the Upload Resume tab.")
    else:
        resume_options = {resume_id: data["title"] for resume_id, data in all_resumes.items()}
        selected_resume_id = st.selectbox(
            "Select resume to tailor",
            options=list(resume_options.keys()),
            format_func=lambda resume_id: resume_options[resume_id],
        )

        selected_resume = all_resumes[selected_resume_id]
        with st.expander("Selected Resume", expanded=True):
            st.text_area(
                "Resume Content",
                value=selected_resume["content"],
                height=250,
                disabled=True,
                key=f"selected_resume_{selected_resume_id}",
            )

        api_key = get_api_key()
        if not api_key:
            st.error(
                "Gemini API key not configured. Add `GEMINI_API_KEY` in Streamlit Secrets or env vars."
            )
        else:
            job_description = st.text_area(
                "Job Description",
                height=250,
                placeholder="Paste the job description here...",
            )

            if st.button("Generate Tailored Resume", use_container_width=True):
                if not job_description.strip():
                    st.error("Please enter a job description.")
                else:
                    try:
                        import google.generativeai as genai

                        st.info("Tailoring resume using AI...")
                        genai.configure(api_key=api_key)
                        model = genai.GenerativeModel("gemini-1.5-flash")

                        prompt = f"""You are an expert resume writer. Tailor the following base resume to match the job description provided.

BASE RESUME:
{selected_resume["content"]}

JOB DESCRIPTION:
{job_description}

Please provide a tailored version of the resume that:
1. Highlights relevant skills and experience.
2. Uses keywords from the job description.
3. Maintains professional formatting.
4. Keeps the same overall structure.

Tailored Resume:"""

                        response = model.generate_content(prompt)
                        tailored_text = response.text

                        st.success("Resume tailored successfully.")
                        st.text_area(
                            "Tailored Resume",
                            value=tailored_text,
                            height=350,
                            disabled=True,
                        )

                        if st.button("Save Tailored Resume", key="save_tailored_resume"):
                            resume_id = save_resume_to_db(
                                title=f"{selected_resume['title']} - Tailored",
                                content=tailored_text,
                                source_type="TEXT",
                            )
                            if resume_id:
                                st.success("Tailored resume saved to the library.")
                            else:
                                st.session_state.resumes[
                                    f"resume_tailored_{datetime.now().timestamp()}"
                                ] = {
                                    "title": f"{selected_resume['title']} - Tailored",
                                    "content": tailored_text,
                                    "status": "PARSED",
                                    "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                                    "source_type": "TEXT",
                                }
                                st.success("Tailored resume saved to local storage.")
                            st.rerun()
                    except Exception as error:
                        st.error(f"Error generating tailored resume: {error}")

st.divider()
st.caption("Resume Variant Lab | Streamlit deployment restored alongside the Next.js/Vercel app.")
