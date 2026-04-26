"""Database helpers for the Streamlit deployment."""

import os
from dotenv import load_dotenv
import streamlit as st

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


@st.cache_resource
def get_db_connection():
    """Connect to PostgreSQL with pg8000 when DATABASE_URL is available."""
    if not DATABASE_URL:
        return None

    try:
        import pg8000.native

        url = DATABASE_URL.replace("postgresql://", "").replace("postgres://", "")
        if "@" not in url:
            return None

        auth, host_db = url.split("@", 1)
        user, password = auth.split(":", 1)
        host_port, db_params = host_db.split("/", 1)

        if ":" in host_port:
            host, port_text = host_port.split(":", 1)
            port = int(port_text)
        else:
            host = host_port
            port = 5432

        database = db_params.split("?", 1)[0]

        return pg8000.native.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database=database,
            ssl_context=True,
        )
    except ImportError:
        st.warning("pg8000 is not installed. Falling back to local session storage.")
        return None
    except Exception as error:
        st.warning(f"Could not connect to the database: {error}. Falling back to local storage.")
        return None


def load_resumes_from_db():
    """Load resumes using the current Prisma-managed schema."""
    conn = get_db_connection()
    if not conn:
        return {}

    try:
        rows = conn.run(
            """
            SELECT
              id,
              title,
              slug,
              "sourceType",
              "originalFilename",
              "parseStatus",
              COALESCE("extractedText", "sourceText", ''),
              "parseError",
              "createdAt"
            FROM "Resume"
            ORDER BY "createdAt" DESC
            """
        )
    except Exception as error:
        st.error(f"Error loading resumes from the database: {error}")
        return {}

    result = {}
    for row in rows:
        created_at = row[8].strftime("%Y-%m-%d %H:%M:%S") if row[8] else ""
        result[str(row[0])] = {
            "id": str(row[0]),
            "title": row[1],
            "slug": row[2],
            "source_type": row[3],
            "original_filename": row[4],
            "status": str(row[5]),
            "content": row[6] or "",
            "parse_error": row[7],
            "created_at": created_at,
        }
    return result


def save_resume_to_db(title, content, source_type="TEXT", original_filename=None):
    """Persist a resume record in the current Prisma-managed schema."""
    conn = get_db_connection()
    if not conn:
        return None

    try:
        rows = conn.run(
            """
            INSERT INTO "Resume"
              (title, slug, "sourceType", "originalFilename", "parseStatus",
               "sourceText", "extractedText", "createdAt", "updatedAt")
            VALUES
              (%s, %s, %s, %s, CAST(%s AS "ResumeParseStatus"),
               %s, %s, NOW(), NOW())
            RETURNING id
            """,
            [
                title,
                title.lower().replace(" ", "-").replace("_", "-"),
                source_type,
                original_filename,
                "PARSED",
                content,
                content,
            ],
        )
        return str(rows[0][0]) if rows else None
    except Exception as error:
        st.error(f"Error saving resume to the database: {error}")
        return None


def delete_resume_from_db(resume_id):
    """Delete a resume by id."""
    conn = get_db_connection()
    if not conn:
        return False

    try:
        conn.run('DELETE FROM "Resume" WHERE id = %s', [resume_id])
        return True
    except Exception as error:
        st.error(f"Error deleting resume from the database: {error}")
        return False
