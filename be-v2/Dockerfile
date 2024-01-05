# Stage 1: Build the application
FROM maven:3.6.3-jdk-11-slim AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml pom.xml
COPY src ./src

# Build the application
RUN mvn clean package

# Stage 2: Create the final Docker image
FROM adoptopenjdk/openjdk11:alpine-jre

WORKDIR /opt/app

# Copy the JAR from the build stage
COPY --from=build /app/target/lanapharmacy-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
