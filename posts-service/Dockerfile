# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3003

# Run the application cd src && node app.js
CMD ["node", "src/app.js"]