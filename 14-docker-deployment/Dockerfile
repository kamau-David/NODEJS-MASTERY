# Use a specific, slim version - not "latest" (unpredictable) and not full
# Debian/Ubuntu base (unnecessarily large image size)
FROM node:20-alpine

WORKDIR /app

# Copy package files FIRST, before the rest of the code. Docker caches layers,
# so if only your code changes (not dependencies), this layer is reused and
# `npm install` doesn't re-run - much faster rebuilds.
COPY package*.json ./
RUN npm install --production

# Now copy the rest of the app
COPY . .

# Document which port the container listens on (informational, doesn't
# actually publish it - that's done with `docker run -p`)
EXPOSE 3000

# Run as a non-root user for security - the node image ships a 'node' user
USER node

# Use the array form (exec form), not "npm start" as a string - this ensures
# SIGTERM reaches your Node process directly for graceful shutdown to work
CMD ["node", "server.js"]
