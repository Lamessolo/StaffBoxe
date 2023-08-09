FROM eclipse-temurin:17

LABEL mentainer="messjule@msn.com"

WORKDIR /app

COPY target/api-staff-0.0.1-SNAPSHOT.jar /app/api-staff.jar

ENTRYPOINT ["java", "-jar", "api-staff.jar"]