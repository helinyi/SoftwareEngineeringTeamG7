#!/bin/bash
set -e

# Build the React frontend for production
echo "Building React frontend..."
cd react-frontend

# Use CI=true to prevent interactive prompts in case of warnings
CI=true npm install --prefer-offline --no-audit
CI=true npm run build

# Create the directories
echo "Creating necessary directories..."
mkdir -p ../deals/templates/react
mkdir -p ../static/react/js
mkdir -p ../static/react/css

# Generate Django template from React's index.html
echo "Creating Django template with proper static paths..."
if [ -f "build/index.html" ]; then
  # Create a Django template with {% load static %} and correct paths
  cat > ../deals/templates/react/index.html << 'EOF'
<!doctype html>{% load static %}
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="DealScout API Backend"/>
    <title>DealScout API Backend</title>
EOF

  # Extract the JS and CSS filenames from the build directory using macOS-compatible commands
  # Get asset manifest which contains the filenames we need
  if [ -f "build/asset-manifest.json" ]; then
    # Try to get the file names from asset-manifest.json
    JS_FILE=$(grep -o '"main.js": "[^"]*"' build/asset-manifest.json | cut -d'"' -f4 | awk -F/ '{print $NF}')
    CSS_FILE=$(grep -o '"main.css": "[^"]*"' build/asset-manifest.json | cut -d'"' -f4 | awk -F/ '{print $NF}')
  else
    # Fallback to listing directory if asset-manifest.json doesn't exist
    JS_FILE=$(ls build/static/js/main.*.js 2>/dev/null | awk -F/ '{print $NF}')
    CSS_FILE=$(ls build/static/css/main.*.css 2>/dev/null | awk -F/ '{print $NF}')
  fi

  # Add script and CSS links with proper Django static tags
  echo "    <script defer=\"defer\" src=\"{% static 'react/js/$JS_FILE' %}\"></script>" >> ../deals/templates/react/index.html
  echo "    <link href=\"{% static 'react/css/$CSS_FILE' %}\" rel=\"stylesheet\">" >> ../deals/templates/react/index.html

  # Complete the template
  cat >> ../deals/templates/react/index.html << 'EOF'
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
EOF

  # Print the final template for debugging
  echo "Django template created successfully with the following content:"
  cat ../deals/templates/react/index.html
else
  echo "Error: build/index.html not found. Build failed!"
  exit 1
fi

# Copy static files
echo "Moving static files to Django static directory..."
if [ -d "build/static" ]; then
  # Copy JS files
  if [ -d "build/static/js" ]; then
    cp -r build/static/js/* ../static/react/js/
  fi
  
  # Copy CSS files
  if [ -d "build/static/css" ]; then
    cp -r build/static/css/* ../static/react/css/
  fi
  
  # Copy any media files if they exist
  if [ -d "build/static/media" ]; then
    mkdir -p ../static/react/media
    cp -r build/static/media/* ../static/react/media/
  fi
  
  echo "Static files copied successfully"
else
  echo "Error: build/static directory not found. Build failed!"
  exit 1
fi

echo "Frontend build completed successfully!"