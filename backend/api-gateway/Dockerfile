# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application files
COPY . .

# Expose the port
EXPOSE 3003

# Set environment variable for CORS
ENV CORS_ALLOWED_ORIGINS=http://localhost:3030,http://localhost:5173

# Start the API gateway
CMD ["npm", "start"]
