# Deploy Resume Variant Lab to Streamlit Cloud

## Quick Start: Get a Live URL in 3 Steps

### Step 1: Push to GitHub
1. Make sure you have Git installed
2. Initialize a git repository (if not already done):
   ```bash
   cd /home/jd/Downloads/aidi2001-assignment5
   git init
   git add .
   git commit -m "Initial commit: Resume Variant Lab Streamlit version"
   ```
3. Push to GitHub:
   - Create a new repository on [github.com/new](https://github.com/new)
   - Name it `resume-variant-lab-streamlit`
   - Run these commands:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/resume-variant-lab-streamlit.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Streamlit Cloud
1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Click **"New app"**
3. Connect your GitHub account (if not already connected)
4. Fill in:
   - **Repository**: `YOUR_USERNAME/resume-variant-lab-streamlit`
   - **Branch**: `main`
   - **Main file path**: `streamlit_app.py`
5. Click **"Deploy"**

### Step 3: Configure Environment Variables
1. After deployment, go to your app's menu (⋯ in top right)
2. Click **"Settings"** → **"Secrets"**
3. Add your environment variables:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   
   Get your API key from: https://aistudio.google.com

## Your Live URL
Once deployed, your app will be available at:
```
https://share.streamlit.io/YOUR_USERNAME/resume-variant-lab-streamlit
```

## Features Available
- ✅ **Resume Library**: View, manage, and organize uploaded resumes
- ✅ **Resume Upload**: Upload PDF or paste text resumes
- ✅ **Resume Tailoring**: Use AI to tailor resumes to job descriptions
- ✅ **Cloud Storage**: Session-based storage (persists during your session)

## Important Notes
- **Session State**: Resumes are stored in session memory and will be cleared when you refresh or restart the app
- **For Persistent Storage**: To keep resumes permanently, configure PostgreSQL backend (see below)
- **File Limits**: Streamlit Cloud allows up to 1GB of storage and 50GB download per month

## Optional: Add PostgreSQL Backend
To persist resumes beyond your session, add a PostgreSQL database:

1. Get a PostgreSQL URL from [Supabase](https://supabase.io) or [Railway.app](https://railway.app)
2. In Streamlit Cloud dashboard, go to Settings → Secrets
3. Add:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```
4. Uncomment/add database persistence code to `streamlit_app.py`

## Troubleshooting

**App won't deploy:**
- Check that `streamlit_app.py` and `requirements.txt` are in repo root
- Verify GitHub repository is public
- Check for Python syntax errors

**Secrets not working:**
- Wait 10-15 seconds after adding secrets
- Refresh the app page
- Make sure there are no spaces in secret values

**API key errors:**
- Get a fresh API key from https://aistudio.google.com
- Verify the key is correctly added in Secrets
- Check that you have API quota remaining

**Slow performance:**
- First load is slow due to package installation (~15-30 seconds)
- Subsequent loads are faster (~5-10 seconds)
- This is normal on the free tier

## Support
- Streamlit Docs: https://docs.streamlit.io
- Google Genai Docs: https://ai.google.dev
- GitHub Community: https://github.com/streamlit/streamlit/discussions
