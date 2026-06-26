# Universal Agent OS — Example Dockerfile
#
# This is a reference Dockerfile for projects bootstrapped with Agent OS.
# Adapt the base image and dependencies for your specific stack.

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (if needed)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential \
#     && rm -rf /var/lib/apt/lists/*

# Copy dependency manifest first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the default port (adjust for your application)
EXPOSE 8000

# Default command (adjust for your application)
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
