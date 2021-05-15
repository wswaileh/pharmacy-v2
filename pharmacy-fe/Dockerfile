# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/pharmacy-fe /usr/share/nginx/html

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# #### Stage 1: Build the angular application
# FROM node:14-alpine as build

# # Configure the main working directory inside the docker image.
# # This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# # commands.
# WORKDIR /app

# # Copy the package.json as well as the package-lock.json and install
# # the dependencies. This is a separate step so the dependencies
# # will be cached unless changes to one of those two files
# # are made.
# COPY package*.json ./
# RUN npm install

# # Copy the main application
# COPY . ./

# # Arguments
# ARG configuration=production

# # Build the application
# RUN npm run build -- --outputPath=./dist/out --configuration $configuration

# #### Stage 2, use the compiled app, ready for production with Nginx
# FROM nginx

# # Copy the angular build from Stage 1
# COPY --from=build /app/dist/out/ /usr/share/nginx/html

# # Copy our custom nginx config
# # COPY /nginx-custom.conf /etc/nginx/nginx.conf


# # Expose port 80 to the Docker host, so we can access it
# # from the outside.
# EXPOSE 80

# ENTRYPOINT ["nginx","-g","daemon off;"]
