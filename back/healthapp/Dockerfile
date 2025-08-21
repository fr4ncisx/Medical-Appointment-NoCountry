# ---------- STAGE 1: Build (compilación del JAR)
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /build

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests clean package


# ---------- STAGE 2: Runtime (producción)
FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S spring && adduser -S -G spring spring

WORKDIR /app

COPY --from=build --chown=spring:spring /build/target/*.jar app.jar

USER spring
=======
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

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s \
  CMD wget -qO- http://127.0.0.1:8080/actuator/health | grep '"status":"UP"' || exit 1

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-XX:+ExitOnOutOfMemoryError", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]