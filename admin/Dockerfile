# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application files
COPY . .

# Expose the port (3030 for Admin)
EXPOSE 3030

# Start the admin frontend application
CMD ["npm", "run", "dev"]
