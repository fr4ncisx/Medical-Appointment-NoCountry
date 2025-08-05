## BUILDER ##
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /workspace

# Copiar archivos esenciales primero (aprovechar caché)
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

# Copiar el código fuente y compilar
COPY src src
RUN ./mvnw -B clean package -DskipTests -Dspring-boot.build-image.layers=true

## RUNTIME ##
FROM gcr.io/distroless/java21-debian12:nonroot AS runtime

WORKDIR /app

COPY --from=builder /workspace/target/*.jar app.jar

USER nonroot:nonroot
EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75", "-XX:+UseG1GC", "-jar", "/app/app.jar"]
