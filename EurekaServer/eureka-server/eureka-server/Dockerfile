# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build

# Cache dependencies separately from source for faster rebuilds
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Run as a non-root user
RUN groupadd -r spring && useradd -r -g spring spring

COPY --from=build /build/target/eureka-server.jar app.jar
RUN chown spring:spring app.jar
USER spring

EXPOSE 8761

# Reasonable container-aware JVM defaults; override JAVA_OPTS at runtime if needed
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
ENV SPRING_PROFILES_ACTIVE=prod

HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
    CMD wget -qO- http://127.0.0.1:8761/actuator/health/readiness | grep -q '"status":"UP"' || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
