# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Copy the SSL certificates into the container
# COPY cert.pem /app/cert.pem
# COPY key.pem /app/key.pem

# Upgrade pip to the latest version
RUN python -m pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable for Flask
ENV FLASK_APP=app.py

# Run the Flask app with SSL
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--cert=cert.pem", "--key=key.pem"]
