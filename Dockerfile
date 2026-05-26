# Use an official lightweight Node runtime as a parent image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the backend package files from your functions folder
COPY functions/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of your backend source code
COPY functions/ .

# Expose the port your Express app listens on
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]