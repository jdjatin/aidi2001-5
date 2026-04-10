#!/bin/bash
# Quick setup script for local Streamlit testing

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "🚀 Setting up Resume Variant Lab - Streamlit Edition..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Add your API keys here
GEMINI_API_KEY=your_api_key_here
# GOOGLE_API_KEY=alternative_api_key_here
EOF
    echo "✅ Created .env file (update with your API keys)"
fi

# Run the app
echo "✨ Starting Streamlit app..."
echo "📱 App will open at: http://localhost:8501"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

streamlit run streamlit_app.py
