import streamlit as st
import os
import json
from datetime import datetime
from pathlib import Path
import tempfile

# Import dependencies from existing codebase
import sys
sys.path.insert(0, str(Path(__file__).parent))

# Configure page
st.set_page_config(
    page_title="Resume Variant Lab",
    page_icon="📄",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
if "resumes" not in st.session_state:
    st.session_state.resumes = {}
if "selected_resume" not in st.session_state:
    st.session_state.selected_resume = None

# Styling
st.markdown("""
    <style>
    .hero {
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        color: white;
        margin-bottom: 2rem;
    }
    .hero h1 {
        font-size: 2.5rem;
        margin: 0.5rem 0;
    }
    .eyebrow {
        text-transform: uppercase;
        font-size: 0.9rem;
        opacity: 0.9;
        letter-spacing: 1px;
    }
    .resume-card {
        padding: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin: 0.5rem 0;
        hover_effect: true;
    }
    </style>
""", unsafe_allow_html=True)

# Hero section
st.markdown("""
    <div class="hero">
        <span class="eyebrow">Issue #2 tracer bullet</span>
        <h1>Resume Variant Lab</h1>
        <p>One base resume in, many ATS-friendly variants out. This Streamlit version brings the resume variant lab to the web with a live URL.</p>
    </div>
""", unsafe_allow_html=True)

# Main tabs
tab1, tab2, tab3 = st.tabs(["📚 Resume Library", "⬆️ Upload Resume", "✨ Tailor Resume"])

with tab1:
    st.header("Resume Library")
    
    if not st.session_state.resumes:
        st.info("📭 No resumes uploaded yet. Use the 'Upload Resume' tab to get started.")
    else:
        col1, col2 = st.columns([3, 1])
        with col1:
            st.subheader(f"Total Resumes: {len(st.session_state.resumes)}")
        
        for resume_id, resume_data in st.session_state.resumes.items():
            with st.container():
                col1, col2, col3 = st.columns([3, 1, 1])
                
                with col1:
                    st.write(f"**{resume_data['title']}**")
                    st.caption(f"Status: {resume_data['status']} | Uploaded: {resume_data['created_at']}")
                
                with col2:
                    if st.button("View", key=f"view_{resume_id}"):
                        st.session_state.selected_resume = resume_id
                
                with col3:
                    if st.button("Delete", key=f"del_{resume_id}"):
                        del st.session_state.resumes[resume_id]
                        st.rerun()
                
                if st.session_state.selected_resume == resume_id:
                    with st.expander("📋 Resume Content", expanded=True):
                        st.text_area(
                            "Resume Text",
                            value=resume_data['content'],
                            height=300,
                            disabled=True,
                            key=f"content_{resume_id}"
                        )

with tab2:
    st.header("Upload Resume")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.subheader("Option 1: Upload PDF")
        uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
        
        if uploaded_file is not None:
            resume_title = st.text_input(
                "Resume Title",
                value=uploaded_file.name.replace(".pdf", ""),
                key="pdf_title"
            )
            
            if st.button("Upload PDF", key="upload_pdf_btn"):
                try:
                    # For simplicity, extract text from PDF
                    import PyPDF2
                    pdf_reader = PyPDF2.PdfReader(uploaded_file)
                    text = ""
                    for page in pdf_reader.pages:
                        text += page.extract_text()
                    
                    resume_id = f"resume_{len(st.session_state.resumes)}_{datetime.now().timestamp()}"
                    st.session_state.resumes[resume_id] = {
                        "title": resume_title or "Untitled Resume",
                        "content": text,
                        "status": "PARSED",
                        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "source_type": "PDF"
                    }
                    st.success(f"✅ Resume '{resume_title}' uploaded successfully!")
                    st.rerun()
                except Exception as e:
                    st.error(f"❌ Error processing PDF: {str(e)}")
    
    with col2:
        st.subheader("Option 2: Paste text")
        resume_title_text = st.text_input("Resume Title", key="text_title")
        resume_text = st.text_area(
            "Paste your resume text here",
            height=300,
            placeholder="Paste your resume content..."
        )
        
        if st.button("Upload Text Resume", key="upload_text_btn"):
            if resume_text.strip():
                resume_id = f"resume_{len(st.session_state.resumes)}_{datetime.now().timestamp()}"
                st.session_state.resumes[resume_id] = {
                    "title": resume_title_text or "Text Resume",
                    "content": resume_text,
                    "status": "PARSED",
                    "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "source_type": "TEXT"
                }
                st.success(f"✅ Resume '{resume_title_text}' added successfully!")
                st.rerun()
            else:
                st.warning("⚠️ Please enter some resume content")

with tab3:
    st.header("Tailor Resume")
    st.info("🤖 Tailor your resume to specific job descriptions using AI")
    
    if not st.session_state.resumes:
        st.warning("Please upload a resume first in the 'Upload Resume' tab")
    else:
        # Select resume to tailor
        resume_options = {rid: data["title"] for rid, data in st.session_state.resumes.items()}
        selected_resume_id = st.selectbox(
            "Select resume to tailor",
            options=list(resume_options.keys()),
            format_func=lambda x: resume_options[x]
        )
        
        # Get API key from environment or sidebar
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        
        with st.expander("🔑 API Configuration", expanded=not api_key):
            api_key_input = st.text_input(
                "Enter your Google Gemini API Key",
                value=api_key or "",
                type="password",
                help="Get it from https://aistudio.google.com"
            )
            if api_key_input:
                api_key = api_key_input
        
        if not api_key:
            st.error("❌ Google Gemini API key required. Please configure it above.")
        else:
            col1, col2 = st.columns([1, 1])
            
            with col1:
                job_description = st.text_area(
                    "Job Description",
                    height=300,
                    placeholder="Paste the job description here..."
                )
            
            with col2:
                st.write("**Tailored Resume Preview**")
                tailored_preview = st.empty()
                tailoring_status = st.empty()
            
            if st.button("✨ Generate Tailored Resume", key="tailor_btn"):
                if not job_description.strip():
                    st.error("❌ Please enter a job description")
                else:
                    try:
                        tailoring_status.info("🔄 Tailoring resume using AI...")
                        
                        import google.generativeai as genai
                        genai.configure(api_key=api_key)
                        
                        model = genai.GenerativeModel("gemini-1.5-flash")
                        
                        base_resume = st.session_state.resumes[selected_resume_id]["content"]
                        
                        prompt = f"""You are an expert resume writer. Tailor the following base resume to match the job description provided.

BASE RESUME:
{base_resume}

JOB DESCRIPTION:
{job_description}

Please provide a tailored version of the resume that:
1. Highlights relevant skills and experience
2. Uses keywords from the job description
3. Maintains professional formatting
4. Keeps the same overall structure

Tailored Resume:"""
                        
                        response = model.generate_content(prompt)
                        tailored_text = response.text
                        
                        tailoring_status.success("✅ Resume tailored successfully!")
                        tailored_preview.text_area(
                            "Tailored Resume",
                            value=tailored_text,
                            height=300,
                            disabled=True,
                            key="tailored_preview"
                        )
                        
                        # Option to save tailored resume
                        if st.button("💾 Save Tailored Resume", key="save_tailored"):
                            resume_id = f"resume_tailored_{datetime.now().timestamp()}"
                            st.session_state.resumes[resume_id] = {
                                "title": f"{st.session_state.resumes[selected_resume_id]['title']} - Tailored",
                                "content": tailored_text,
                                "status": "PARSED",
                                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                                "source_type": "TEXT"
                            }
                            st.success("✅ Tailored resume saved to library!")
                            st.rerun()
                    
                    except Exception as e:
                        tailoring_status.error(f"❌ Error: {str(e)}")

# Footer
st.divider()
st.markdown("""
    <div style="text-align: center; color: #888; font-size: 0.9rem; padding: 2rem 0;">
        <p>Resume Variant Lab - Streamlit Edition | Built with ❤️</p>
    </div>
""", unsafe_allow_html=True)
