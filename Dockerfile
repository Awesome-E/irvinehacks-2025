# Use Node.js v22 as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Because of broken dependency
RUN npm config set strict-ssl false
# Install dependencies
RUN npm install
RUN npm config set strict-ssl true

# Copy the entire project to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port from the environment variable
EXPOSE ${PORT:-3000}

# Start the app
CMD ["npm", "start"]
