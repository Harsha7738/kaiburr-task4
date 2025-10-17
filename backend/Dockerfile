# Use OpenJDK 17 slim base image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built jar into the container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your backend runs on
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
