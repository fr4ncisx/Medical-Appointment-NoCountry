FROM maven:3.9.9-amazoncorretto-21-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar healthapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "healthapp.jar"]