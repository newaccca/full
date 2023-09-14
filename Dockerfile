#front
FROM node:16-alpine AS build
WORKDIR /app
COPY ./front .
RUN npm install
RUN npm run build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/test/ /usr/share/nginx/html
EXPOSE 80


##################################

#back
# Use the official image as a parent image.
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set the working directory.
WORKDIR /app

# Copy the output directory from your build stage into our new container.
COPY ./back .

# Configure the listening port to 80
ENV ASPNETCORE_URLS=http://+:80

# Expose port 80
EXPOSE 80

# Start the app.
ENTRYPOINT ["dotnet", "WebApplication3.dll"]
