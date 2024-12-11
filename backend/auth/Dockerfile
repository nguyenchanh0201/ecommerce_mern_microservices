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
EXPOSE 3000

# Start the auth service
CMD ["npm", "start"]
