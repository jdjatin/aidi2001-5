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
    """Get PostgreSQL connection using pg8000."""
    if not DATABASE_URL:
        return None
    
    try:
        import pg8000.native
        
        # Parse PostgreSQL URL
        # Format: postgresql://user:password@host:port/database?sslmode=require
        url = DATABASE_URL.replace("postgresql://", "").replace("postgres://", "")
        
        # Extract components
        if "@" in url:
            auth, host_db = url.split("@")
            user, password = auth.split(":")
        else:
            return None
            
        if ":" in host_db:
            host_port, db_params = host_db.split("/")
            if ":" in host_port:
                host, port = host_port.split(":")
                port = int(port)
            else:
                host = host_port
                port = 5432
        else:
            return None
        
        database = db_params.split("?")[0]
        
        # Connect
        conn = pg8000.native.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database=database,
            ssl_context=True
        )
        return conn
    except ImportError:
        st.warning("⚠️ pg8000 not installed. Using local session storage.")
        return None
    except Exception as e:
        st.warning(f"⚠️ Could not connect to database: {str(e)}. Using local session storage.")
        return None


def load_resumes_from_db():
    """Load resumes from PostgreSQL database."""
    conn = get_db_connection()
    if not conn:
        return {}
    
    try:
        # pg8000 returns results as lists
        result_list = conn.run("""
            SELECT id, title, slug, source_type, original_filename, 
                   parse_status, extracted_text, parse_error, created_at
            FROM "Resume"
            ORDER BY created_at DESC
        """)
        
        result = {}
        for resume in result_list:
            result[str(resume[0])] = {
                "id": str(resume[0]),
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
        import uuid
        # Create slug from title
        slug = title.lower().replace(" ", "-").replace("_", "-")
        resume_id = str(uuid.uuid4())
        
        conn.run("""
            INSERT INTO "Resume" 
            (id, title, slug, source_type, original_filename, 
             parse_status, extracted_text, "sourceText", created_at, "updatedAt")
            VALUES 
            (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
        """, [
            resume_id,
            title, 
            slug, 
            source_type,
            original_filename,
            "PARSED",
            content,
            content
        ])
        
        return resume_id
    except Exception as e:
        st.error(f"Error saving resume to database: {str(e)}")
        return None


def delete_resume_from_db(resume_id):
    """Delete a resume from PostgreSQL database."""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        conn.run("""
            DELETE FROM "Resume"
            WHERE id = %s
        """, [resume_id])
        
        return True
    except Exception as e:
        st.error(f"Error deleting resume from database: {str(e)}")
        return False
