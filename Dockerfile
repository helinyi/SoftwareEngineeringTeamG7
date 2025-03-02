# Use the official lightweight Node.js image
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Create a package.json directly in the Dockerfile
RUN echo '{"name":"hello-world","version":"1.0.0","main":"server.js","scripts":{"start":"node server.js"},"dependencies":{"express":"^4.18.2"}}' > package.json

# Install production dependencies
RUN npm install --only=production

# Create server.js file with a simple Hello World Express app
RUN echo 'const express = require("express"); \n\
const app = express(); \n\
const port = process.env.PORT || 8080; \n\
\n\
app.get("/", (req, res) => { \n\
  res.send("Hello World from Google Cloud Run!"); \n\
}); \n\
\n\
app.listen(port, () => { \n\
  console.log(`Server listening on port ${port}`); \n\
  console.log("Ready to serve requests"); \n\
});' > server.js

# Service must listen to $PORT environment variable.
# This value is provided by Google Cloud Run.
ENV PORT 8080

# Run the web service on container startup
CMD [ "node", "server.js" ]
