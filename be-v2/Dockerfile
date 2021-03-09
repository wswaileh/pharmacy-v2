# select image
FROM maven:3.5-jdk-8

# copy the project files
COPY ./pom.xml ./pom.xml

# build all dependencies for offline use
RUN mvn dependency:go-offline -B

# copy your other files
COPY . .

# build for release
RUN mvn package

# our final base image
FROM openjdk:11.0.7-jre-slim

# set deployment directory
WORKDIR /my-project

# copy over the built artifact from the maven image
COPY --from=maven target/my-project-*.jar ./

# set the startup command to run your binary
CMD ["java", "-jar", "./target/my-project.jar"]


