## Repositorio Docker Hub
Aca se van a ver las estadisticas de actualizaciones de la imagen de Docker del proyecto **MedicalAppointment**

## Version Actual

Actualmente esta es la última version de la imágen de Docker

[![Docker Image Version](https://img.shields.io/docker/v/dockerfrancisx/healthapp?label=Health-App&tag=latest&style=for-the-badge)](https://hub.docker.com/r/dockerfrancisx/healthapp)

Estado del servidor con la versión utilizada

[![Deploy](https://img.shields.io/badge/SWAGGER%20Deploy-ONLINE%20V1.26--SNAPSHOT-green?style=for-the-badge)](https://healthapplication.koyeb.app/swagger-ui.html)

## Información de Actualizaciones

- **SNAPSHOT** – `n/a` `PREVIEW RELEASE`
  - Las versiones SNAPSHOT pueden contener fallas.
  - No se recomienda usar en producción estas versiones.
  - Estas versiones son `Preview` son solo de prueba para desarrolladores.
  - Si la última version aparece como `VX.XX-SNAPSHOT` quiere decir que está lista para ser usada pero teniendo en cuenta que puede tener algunos errores, solo apta para entornos de desarrollo.

  <br>

- **V1.26** – `2025-05-XX` `FINAL`
    - Añadida integración con **Caffeine** para manejo de caché.
    - Optimizadas las operaciones con el manejo de caché: `@Cacheable`, `@CachePut`, `@CacheEvict`.
    - Se integró **Security Ownership** para mantener la seguridad de los endpoints por roles, esto quiere decir que un usuario paciente no puede acceder a los datos de otros pacientes, sino que debe mantener el mismo id para mantener la integridad de datos.
    - Se arregló un error que no permitía que los usuarios con rol ADMIN pudieran tener acceso a obtener y editar los datos de todos los usuarios.
    - Se optimizó el código con llamadas innecesarias a la verificación del JWT para obtener el email y rol del usuario logueado.
    - Se actualizó el JSON de respuesta en Appointments
    - Se actualizó al buscar los Appointments como paciente, ahora los devuelve ordenados por Fecha y Hora Ascendente y los filtra solo mostrando los confirmados
    - Se implementó la carga de imagenes de Cloudinary en la ruta `{/api/v1/cloudinary}`
    - Se implementó la lógica de negocio de Diagnostico por imagenes para cargar las imagenes de diagnostico de los pacientes.
    - Se refactorizó algunas secciones del proyecto para ahorrar recursos.

<br>

- **V1.25** – `2025-03-31` `STABLE`
  - Se arregló un NullPointerException al acceder a los Medical Records según el rol.

<br>

- **V1.0.0** – `2025-02-25` `BETA`
  - Primera versión beta pública.

#### `@Deprecated`
Versiones que ya no tienen soporte y forman parte de las versiones **BETA**

- **V1.0.0** ~ **V1.24**

## Configuraciones
Para utilizar la última versión de la imagen del proyecto es requerido el **docker-compose.yml**

#### Requisitos de Software
  
##### Sistema operativo compatible:

  <u>**Linux:**</u> Distribuciones como Ubuntu, Debian, Fedora, etc.

  <u>**macOS:**</u> Versiones de macOS 10.14 o superiores.

  <u>**Windows:**</u> Windows 10 (versión 1903 o superior) con **WSL2** (Windows Subsystem for Linux 2).

  <u>**Docker Desktop**</u> (para macOS y Windows)

  <u>**WSL2 (solo en Windows)**:</u> Necesario para que Docker Desktop funcione correctamente en Windows 10/11. Configurar WSL2.

#### Requisitos de Hardware

  **Procesador:**
  CPU de 64 bits (requerido para Docker Desktop)
  Arquitectura x86_64 (la mayoría de las CPUs modernas).

  **Memoria RAM:**
  4 GB de RAM como mínimo.
  8 GB o más es altamente recomendado si estás trabajando con aplicaciones o servicios más pesados  o múltiples contenedores simultáneamente.

  **Espacio en disco:**
  Espacio libre en disco: Asegúrate de tener suficiente espacio para almacenar imágenes de Docker,  volúmenes y contenedores. Esto puede variar según la cantidad de aplicaciones que estés  ejecutando.
  50 GB o más de espacio libre recomendado para evitar problemas al manejar contenedores grandes o  varias imágenes.

#### Requisitos de Red
**Conexión a Internet:** Necesitarás acceso a Internet para descargar imágenes y actualizaciones de Docker. También se recomienda para interactuar con repositorios en la nube (por ejemplo, Docker Hub).

### Docker-compose
Aquí debajo podrán ver el docker-compose.yml que es requerido para crear los contenedores del proyecto **(Java y MySQL)**


🚨 **Importante**: Todos los campos que contengan **##** son obligatorios.

###### Docker-compose.yml
```yml
services:
  healthapp:
    container_name: springboot
    image: dockerfrancisx/healthapp:v1.25 ## USAR LA VERSION MAS RECIENTE, SOLO SE CAMBIA EL VX.XX
    ports: 
      - "8080:8080"
    environment:
      DB_URL: jdbc:mysql://mysql:3306/healthapp?serverTimezone=UTC
      MYSQL_USER: root
      MYSQL_PASSWORD: ## COPIAR LO MISMO QUE PUSISTE EN LA VARIABLE DE ENTORNO DE MYSQL 'MYSQL_ROOT_PASSWORD'
      HIBERNATE_DDL: update
      LOG_SQL: false
      FORMAT_SQL: false
      SECRET_KEY: ## LA CLAVE SECRETA PARA LA GENERACION DE JWT
      TOKEN_EXPIRATION_TIME: ## TIEMPO DE EXPIRACION DEL JWT EXPRESADO EN MINUTOS
      JWT_ISSUER: HealthAppIssuer
      CLOUDINARY_URL: not_needed
      DEPLOY_FRONTEND_IP: ## FRONTEND IP (SI ESTA CORRIENDO LOCAL USAR EL MISMO QUE DEPLOY_LOCALHOST_FRONTEND)
      DEPLOY_BACKEND_IP: http://localhost:8080
      DEPLOY_LOCALHOST_FRONTEND: http://localhost:5173
      BACKEND_LOCALHOST: http://localhost:8080
      ADMIN_EMAIL: ## EL EMAIL DEL ADMIN PARA CONTROLAR LA APLICACIÓN
      ADMIN_PASSWORD: ## LA CONTRASEÑA DEL ADMIN
      SMTP_EMAIL: ## UN CORREO QUE SOPORTE SMTP PARA EL ENVIO DE RECORDATORIOS O AVISOS
      SMTP_PASSWORD: ## LA CONTRASEÑA SMTP DEL CORREO (NO SE USA LA CONTRASEÑA DEL CORREO)
      ACTIVATE_SENDING_EMAIL: ## INGRESAR TRUE SI QUEREMOS ACTIVAR AVISOS O RECORDATORIOS DE ENVIO DE CORREOS SINO FALSE SI LO DESACTIVAMOS
    restart: always
    depends_on:
      mysql:
        condition: service_healthy

  mysql:
    container_name: mysql-db
    image: mysql:9.0
    ports: 
      - "3306:3306" ## SI YA TENEMOS MYSQL EN NUESTRA COMPUTADORA CAMBIAR 3306:3306 POR 3308:3308
    environment:
      MYSQL_DATABASE: healthapp
      MYSQL_ROOT_PASSWORD: ## LA CONTRASEÑA DEL USUARIO ROOT DE MYSQL
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 5
```

⚠️ **Advertencia**: Todo lo que está escrito después de los **##** son comentarios no se escribe después de esos dos caracteres o se borran y se escribe el valor o se escribe antes de **##**.

#### Como rellenar los campos requeridos:

❌ **Modo Erroneo**: Así no va a funcionar y les va a tirar error
```yml
  TOKEN_EXPIRATION_TIME: ## 60
```

✅ **Modo Correcto**: Así es como va a funcionar bien
```yml
  TOKEN_EXPIRATION_TIME: 60 ## TIEMPO DE EXPIRACION DEL JWT EXPRESADO EN MINUTOS
```

#### Instrucciones

1. Copiar todo el contenido del archivo [docker-compose](#docker-compose) y guardarlo en alguna carpeta con el nombre `docker-compose.yml`.

2. Seguir la secuencia de comandos para descargar la imagen de docker e inicializar los contenedores

3. Abrir la consola en la carpeta donde se encuentra el archivo docker-compose.yml
  - **El siguiente comando, este comando va a descargar la imagen de docker e iniciar los contenedores**
    ```bash
    docker-compose -f "docker-compose.yml" up
    ```

  - **Usa este comando para detener todos los contenedores, eliminarlos y remover todos los   volúmenes**  
    ```bash
    docker-compose -f "docker-compose.yml" down -v
    ```

- **Si deseas que los volúmenes persistan, quita el `-v` después de `down`**  
  ```bash
  docker-compose -f "docker-compose.yml" down
  ```

### Versiones Omitidas
Las versiones anteriores fueron omitidas porque estan actualmente en desuso, siempre se recomienda utilizar la última versión
