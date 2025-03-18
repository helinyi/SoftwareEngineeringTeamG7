# Stage 1: Node.js build stage for React frontend
FROM node:18-slim AS frontend-builder

WORKDIR /app

# Copy only the files needed for npm install to leverage Docker layer caching
COPY react-frontend/package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the React frontend source code
COPY react-frontend/ ./

# Build the React app
RUN npm run build

# Stage 2: Python build stage for Django
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  DJANGO_SETTINGS_MODULE=dealscout.settings \
  DJANGO_DEBUG=False

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy Django project files
COPY . .

# Create directories for the Django React template and static files
RUN mkdir -p /app/deals/templates/react \
  /app/static/react/js \
  /app/static/react/css \
  /app/static/react/media

# Copy the built React files from the frontend-builder stage
COPY --from=frontend-builder /app/build/static/js/ /app/static/react/js/
COPY --from=frontend-builder /app/build/static/css/ /app/static/react/css/

# Copy media files if they exist
RUN mkdir -p /app/static/react/media

# Create the Django template with proper static tags
RUN echo '<!doctype html>{% load static %}' > /app/deals/templates/react/index.html && \
  echo '<html lang="en">' >> /app/deals/templates/react/index.html && \
  echo '<head>' >> /app/deals/templates/react/index.html && \
  echo '    <meta charset="utf-8"/>' >> /app/deals/templates/react/index.html && \
  echo '    <meta name="viewport" content="width=device-width,initial-scale=1"/>' >> /app/deals/templates/react/index.html && \
  echo '    <meta name="theme-color" content="#000000"/>' >> /app/deals/templates/react/index.html && \
  echo '    <meta name="description" content="DealScout API Backend"/>' >> /app/deals/templates/react/index.html && \
  echo '    <title>DealScout API Backend</title>' >> /app/deals/templates/react/index.html

# Copy the asset-manifest to help identify the file names
COPY --from=frontend-builder /app/build/asset-manifest.json /tmp/asset-manifest.json

# Find and add JS and CSS files to the template using asset-manifest.json
RUN JS_FILENAME=$(grep -o '"main.js": "[^"]*"' /tmp/asset-manifest.json | cut -d'"' -f4 | sed 's|.*/||' | head -n 1) && \
  CSS_FILENAME=$(grep -o '"main.css": "[^"]*"' /tmp/asset-manifest.json | cut -d'"' -f4 | sed 's|.*/||' | head -n 1) && \
  echo "    <script defer=\"defer\" src=\"{% static 'react/js/$JS_FILENAME' %}\"></script>" >> /app/deals/templates/react/index.html && \
  echo "    <link href=\"{% static 'react/css/$CSS_FILENAME' %}\" rel=\"stylesheet\">" >> /app/deals/templates/react/index.html && \
  echo "Template created with files: JS=$JS_FILENAME, CSS=$CSS_FILENAME"

# Complete the template
RUN echo '</head>' >> /app/deals/templates/react/index.html && \
  echo '<body>' >> /app/deals/templates/react/index.html && \
  echo '<noscript>You need to enable JavaScript to run this app.</noscript>' >> /app/deals/templates/react/index.html && \
  echo '<div id="root"></div>' >> /app/deals/templates/react/index.html && \
  echo '</body>' >> /app/deals/templates/react/index.html && \
  echo '</html>' >> /app/deals/templates/react/index.html

# Collect static files
RUN python manage.py collectstatic --noinput

# Create directories for media files
RUN mkdir -p /app/mediafiles

# Expose port
EXPOSE 8000

# Create and switch to non-root user for security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Run gunicorn with DEBUG=False to enable the React SPA
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "dealscout.wsgi:application", "--workers", "3"]
