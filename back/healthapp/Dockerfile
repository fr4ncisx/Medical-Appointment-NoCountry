FROM amazoncorretto:21-alpine-jdk

WORKDIR /app

COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn

RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests && cp target/*.jar healthapp.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "healthapp.jar"]