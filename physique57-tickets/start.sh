#!/bin/bash

echo "🚀 Starting Physique 57 Ticket Management System"
echo "================================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your Supabase credentials."
    echo ""
    echo "Required:"
    echo "  - REACT_APP_SUPABASE_URL"
    echo "  - REACT_APP_SUPABASE_ANON_KEY"
    echo ""
    read -p "Press Enter after you've updated .env file..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

echo "🔥 Starting development server..."
echo "📱 App will open at http://localhost:3000"
echo ""
echo "Login credentials:"
echo "  Email: admin@physique57.com"
echo "  Password: admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

npm start
