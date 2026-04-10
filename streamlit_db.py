"""Python database module for Resume Variant Lab Streamlit app."""
import os
from datetime import datetime
from dotenv import load_dotenv
import streamlit as st

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

@st.cache_resource
def get_db_connection():
    """Get PostgreSQL connection using psycopg2."""
    if not DATABASE_URL:
        st.warning("⚠️ DATABASE_URL not configured. Using local session storage.")
        return None
    
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except ImportError:
        st.warning("⚠️ psycopg2 not installed. Using local session storage.")
        return None
    except Exception as e:
        st.warning(f"⚠️ Could not connect to database: {str(e)}. Using local session storage.")
        return None


def load_resumes_from_db():
    """Load resumes from PostgreSQL database."""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, title, slug, source_type, original_filename, 
                       parse_status, extracted_text, parse_error, created_at
                FROM "Resume"
                ORDER BY created_at DESC
            """)
            resumes = cur.fetchall()
            
            result = {}
            for resume in resumes:
                result[resume[0]] = {
                    "id": resume[0],
                    "title": resume[1],
                    "slug": resume[2],
                    "source_type": resume[3],
                    "original_filename": resume[4],
                    "status": resume[5],
                    "content": resume[6] or "",
                    "parse_error": resume[7],
                    "created_at": resume[8].strftime("%Y-%m-%d %H:%M:%S") if resume[8] else ""
                }
            return result
    except Exception as e:
        st.error(f"Error loading resumes from database: {str(e)}")
        return {}


def save_resume_to_db(title, content, source_type="TEXT", original_filename=None):
    """Save a new resume to PostgreSQL database."""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        # Create slug from title
        slug = title.lower().replace(" ", "-").replace("_", "-")
        
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "Resume" 
                (id, title, slug, source_type, original_filename, 
                 parse_status, extracted_text, "sourceText", created_at, "updatedAt")
                VALUES 
                (gen_random_uuid(), %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                RETURNING id
            """, (
                title, 
                slug, 
                source_type,
                original_filename,
                "PARSED",
                content,
                content
            ))
            
            resume_id = cur.fetchone()[0]
            conn.commit()
            return str(resume_id)
    except Exception as e:
        st.error(f"Error saving resume to database: {str(e)}")
        return None


def delete_resume_from_db(resume_id):
    """Delete a resume from PostgreSQL database."""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM "Resume"
                WHERE id = %s
            """, (resume_id,))
            
            conn.commit()
            return cur.rowcount > 0
    except Exception as e:
        st.error(f"Error deleting resume from database: {str(e)}")
        return False
