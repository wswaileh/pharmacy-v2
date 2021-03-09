FROM openjdk:11.0.7-jre-slim

# ./mvnw package && java -jar target/lanapharmacy-0.0.1-SNAPSHOT.jar

# run under a user. This makes the whole thing more secure
RUN groupadd normalgroup
RUN useradd -G normalgroup normaluser
USER normaluser:normalgroup

RUN mvnw package

# run app
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


