#!/bin/bash

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Copy the generate-project-structure.js script to the scripts directory
echo "Creating project structure..."
node scripts/generate-project-structure.js

# Install dependencies
cd ecommerce-api
npm install

echo "Project structure created successfully!"
echo "cd into 'ecommerce-api' directory and run 'npm start' to start the server"