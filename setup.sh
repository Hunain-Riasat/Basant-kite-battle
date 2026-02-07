#!/bin/bash

echo "🪁 Basant Kite Battle - Setup Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 To start the game:"
    echo "   npm run dev"
    echo ""
    echo "🏗️  To build for production:"
    echo "   npm run build"
    echo ""
    echo "📖 Read README.md for more information"
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
