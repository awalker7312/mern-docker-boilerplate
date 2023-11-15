# Use official node image as the base image
FROM node:20-slim

# Set /app directory as default working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all files from current directory to /app on the image
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD [ "npm", "start" ]
