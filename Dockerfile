# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY src/ ./

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
