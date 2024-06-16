# Clínica SePrice


---

| NOMBRE Y APELLIDO |
| --- |
| Guido Vizzotti |
| Matías Garnica |
| Mauricio Galera |
| Cinthia Romina Vota |
| Cynthia Estefanía Choque Galindo |

---

## Documentación del Proyecto "Clínica SePrice"

### Tecnologías Utilizadas

- **Backend**: NestJS, TypeORM
- **Frontend**: Angular
- **Base de Datos**: MySQL

### Versiones

- **Node.js**: 20.x
- **NPM**: 10.x
- **NestJS**: 10.x
- **Angular**: 17.x
- **MySQL**: 8.x

## Instalación y Actualización de Dependencias

### Actualización de Node.js y NPM

1. **Node.js**:
    - Descargar e instalar la última versión de Node.js desde [nodejs.org](https://nodejs.org/). Tambien puede seleccionarse manejadores de versiones de Node.js Versions:
        - nvm : https://github.com/nvm-sh/nvm
        - n: https://github.com/tj/n
    - Verificar la instalación:
        
        ```bash
        node -v
        ```
        
    - Debe mostrar una versión 20.x.
    
2. **NPM**:
    - Actualizar NPM a la última versión:
        
        ```bash
        npm install -g npm
        ```
        
    - Verificar la instalación:
        
        ```bash
        npm -v
        ```
        
    - Debe mostrar una versión 10.x.
    

### Backend (NestJS)

1. **Actualizar dependencias**:
    
    ```bash
    cd back
    npm install
    ```
    
2. **Actualizar NestJS CLI**:
    
    ```bash
    npm install -g @nestjs/cli@latest
    ```
    
3. **Verificar la versión de NestJS**:
    
    ```bash
    nest --version
    ```
    
    - Debe mostrar una versión 10.x.
    

### Frontend (Angular)

1. **Actualizar dependencias**:
    
    ```bash
    cd front
    npm install
    ```
    
2. **Actualizar Angular CLI**:
    
    ```bash
    npm install -g @angular/cli@latest
    ```
    
3. **Verificar la versión de Angular**:
    
    ```bash
    ng version
    ```
    
    - Debe mostrar una versión 17.x.
    

### Base de Datos (MySQL)

- Asegúrate de tener MySQL 8.x instalado. Puedes descargarlo desde [dev.mysql.com](https://dev.mysql.com/downloads/installer/).

---

## Comandos para Levantar y Correr el Proyecto

### Backend (NestJS)

1. **Crear base de datos vacia:** Crear en su entorno integrado de base de datos (en nuestro caso MySQL Workbench) una base de datos vacia con el nombre **‘clinicaseprice’**.
2. **Instalar dependencias**:
    
    ```bash
    cd back
    npm install
    ```
    
3. **Configurar variables de entorno**: En back, dentro de la carpeta ‘**bdd’** encontramos el archivo **typeorm.config.ts** . NestJs se encargará de crear las tablas y sus relaciones en la base de datos vacia.
    
    ```tsx
        //Ingresar aqui sus datos:
        type: 'mysql',
        host: 'localhost',
        port: 3306,//Puerto de Base de datos
        username: 'root',//Usuario de MySQL
        password: '',//Password de MySQL
        database: 'clinicaseprice',
        entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
        synchronize: true,
    
    ```
    
4. **Iniciar el servidor**:
    
    ```bash
    npm run start:dev
    ```
    
5. **Carga de datos preexistentes:** Una vez iniciado el servidor del back que creará las tablas, para poder hacer la carga de datos de profesionales, usuarios y pacientes que corresponderan posteriormente a la gestion de turnos, listas e insumos se le solicita correr la siguiente query (tambien adjunta en carpeta Drive: [🔗 QUERYS DATOS PREDEFINIDOS](https://drive.google.com/file/d/1c_rmmvQI7ED8zN4NnJqDT1DKYwiKjdVT/view?usp=drive_link)

    
    ```tsx
    -- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
    --
    -- Host: localhost    Database: clinicaseprice
    -- ------------------------------------------------------
    -- Server version	8.0.37-0ubuntu0.22.04.3
    
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!50503 SET NAMES utf8 */;
    /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
    /*!40103 SET TIME_ZONE='+00:00' */;
    /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
    /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
    /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
    /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
    
    --
    -- Dumping data for table `historias_clinicas`
    --
    
    LOCK TABLES `historias_clinicas` WRITE;
    /*!40000 ALTER TABLE `historias_clinicas` DISABLE KEYS */;
    INSERT INTO `historias_clinicas` VALUES (1,'Tipo de sangre: A-   Alergias conocidas: Penicilina.\nPresenta fiebre.-','2024-06-15 16:07:49','2024-06-15 18:13:28',20345966,'dr5'),(2,'Dermatitis.','2024-06-15 16:07:56','2024-06-15 16:07:56',21345966,'dr3'),(3,'Hipotiroidismo','2024-06-15 16:08:02','2024-06-15 18:21:42',22345966,'dr5'),(4,'Estudios sangre y orina valores dentro de los parametros normales.','2024-06-15 16:08:07','2024-06-15 16:08:07',23345966,'dr4'),(5,'Presenta fiebre.','2024-06-15 16:08:13','2024-06-15 17:35:36',24345966,'dr3'),(6,'Escoliosis','2024-06-15 16:08:18','2024-06-15 16:08:18',25345966,'dr4');
    /*!40000 ALTER TABLE `historias_clinicas` ENABLE KEYS */;
    UNLOCK TABLES;
    
    --
    -- Dumping data for table `insumos`
    --
    
    LOCK TABLES `insumos` WRITE;
    /*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
    INSERT INTO `insumos` VALUES (1,'Ibuprofeno 500',20,'2024-01-01 00:00:00','admin'),(2,'Tafirol 1gr',10,'2024-01-01 00:00:00','admin'),(3,'Jarabe Tos 180ml',0,'2024-01-01 00:00:00','admin'),(4,'Gasa Caja x 10',2,'2024-01-01 00:00:00','admin');
    /*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
    UNLOCK TABLES;
    
    --
    -- Dumping data for table `pacientes`
    --
    
    LOCK TABLES `pacientes` WRITE;
    /*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
    INSERT INTO `pacientes` VALUES (20345966,'123456789'),(21345966,'123456789'),(22345966,'123456789'),(23345966,'123456789'),(24345966,'123456789'),(25345966,'123456789');
    /*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
    UNLOCK TABLES;
    
    --
    -- Dumping data for table `personas`
    --
    
    LOCK TABLES `personas` WRITE;
    /*!40000 ALTER TABLE `personas` DISABLE KEYS */;
    INSERT INTO `personas` VALUES (10000000,'Martin','Goméz','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','martin.g@example.com'),(11000000,'Laura','Blanco','1990-01-01 00:00:00','FEMENINO','Calle 123','123456789','laura.b@example.com'),(12000000,'Pedro','Fernandez','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','pedro.f@example.com'),(13000000,'Lucio','Velez','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','lucio.v@example.com'),(14000000,'Elena','Galera','1990-01-01 00:00:00','FEMENINO','Calle 123','123456789','elena.g@example.com'),(15000000,'Julian','Garnica','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','julian.g@example.com'),(16000000,'Benicio','Hernandez','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','benicio.h@example.com'),(17000000,'Pilar','Aragos','1990-01-01 00:00:00','FEMENINO','Calle 123','123456789','pilar.a@example.com'),(20345966,'Felix','Correa','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','felix.c@example.com'),(21345966,'Margarita','Galera','1990-01-01 00:00:00','FEMENINO','Calle 123','123456789','margarita.g@example.com'),(22345966,'Dante','Ponce','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','dante.p@example.com'),(23345966,'Luz','Pereyra','1990-01-01 00:00:00','FEMENINO','Calle 123','123456789','luz.p@example.com'),(24345966,'Patricio','Negro','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','patricio.n@example.com'),(25345966,'Genaro','Matinez','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','genaro.m@example.com'),(90000000,'Martin','Goméz','1990-01-01 00:00:00','MASCULINO','Calle 123','123456789','martin.g@example.com');
    /*!40000 ALTER TABLE `personas` ENABLE KEYS */;
    UNLOCK TABLES;
    
    --
    -- Dumping data for table `profesionales`
    --
    
    LOCK TABLES `profesionales` WRITE;
    /*!40000 ALTER TABLE `profesionales` DISABLE KEYS */;
    INSERT INTO `profesionales` VALUES (11000000,'LABORATORIO'),(12000000,'LABORATORIO'),(13000000,'ODONTOLOGIA'),(14000000,'MEDICINA_GENERAL'),(15000000,'SALUD_MENTAL'),(16000000,'FISIO_KINESIOLOGIA'),(17000000,'PEDIATRIA');
    /*!40000 ALTER TABLE `profesionales` ENABLE KEYS */;
    UNLOCK TABLES;
    
    --
    -- Dumping data for table `usuarios`
    --
    
    LOCK TABLES `usuarios` WRITE;
    /*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
    INSERT INTO `usuarios` VALUES ('admin','1234','ADMINISTRATIVO','ACTIVO','ESTUDIOS_CONSULTORIOS',10000000),('admin10','1234','ADMINISTRATIVO','INACTIVO','ESTUDIOS_CONSULTORIOS',90000000),('dr1','1234','PROFESIONAL','ACTIVO','ESTUDIOS_CLINICOS',11000000),('dr2','1234','PROFESIONAL','ACTIVO','ESTUDIOS_CLINICOS',12000000),('dr3','1234','PROFESIONAL','ACTIVO','CONSULTORIOS_EXTERNOS',13000000),('dr4','1234','PROFESIONAL','ACTIVO','CONSULTORIOS_EXTERNOS',14000000),('dr5','1234','PROFESIONAL','ACTIVO','CONSULTORIOS_EXTERNOS',15000000),('dr6','1234','PROFESIONAL','ACTIVO','CONSULTORIOS_EXTERNOS',16000000),('dr7','1234','PROFESIONAL','ACTIVO','CONSULTORIOS_EXTERNOS',17000000);
    /*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
    UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    
    /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
    /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
    /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
    
    -- Dump completed on 2024-06-16 17:11:36
    ```
    

### Frontend (Angular)

1. **Instalar dependencias**:
    
    ```bash
    cd front
    npm install
    ```
    
2. **Iniciar la aplicación**:
    
    ```bash
    ng serve
    ```
    

## Organización de la Arquitectura del Proyecto

### Backend (NestJS)

- **src**: Carpeta principal con el código fuente.
    - **enums:** Contiene enumeradores que sirven la para correcta comunicación de datos y su almacenamiento.
    - **modules**: Contiene los módulos de la aplicación (ejem., `historia_clinica`, `insumo`).
        - **dto:** Clases planas que nos permite transmitir información de múltiples archivos.
        - **entities:** Define un tipo de recurso que se relacionará con la base de datos.
        - **controllers**: Maneja las rutas y las peticiones HTTP.
        - **mapper:** Se encargarde hacer la conversión de dto a entidad y viceversa.
        - **module**: Agrupa todos los controladores y proveedores.
        - **services**: Contiene la lógica de negocio.
    - **app:** Archivos que sirven a la aplicación general (ejem., `app.module.ts`, `app.service.ts`).
    

### Frontend (Angular)

- **src**: Carpeta principal con el código fuente.
    - **app**: Contiene los módulos y componentes de Angular.
        - **core:**  Contiene todo lo relacionado a datos transversales.
            - **dto:** Clases planas que nos permite transmitir información de múltiples archivos.
            - **enums:** Contiene enumeradores que sirven la para correcta comunicación de datos y su almacenamiento.
        - **features:** Contiene lógica de `‘consultorios-externos’` y `‘estudios-clinicos’`.
        - **shared:** Contiene los modulos compartidos de la app.
            - **components**: Contiene los componentes de la aplicación. Estos se trabajaron desde la perspectiva de las diferentes pantallas o piezas y su relacion.
            - **services**: Contiene los servicios de la aplicación.
        - **models**: Define los modelos de datos.
        - **guards**: Define los guardias de ruta.
    - **app:** Archivos que sirven a la aplicación general (ejem., `app.component.ts`, `app.component.html`).
    - **assets**: Contiene los recursos estáticos (ejem., imágenes).
    

### Datos adicionales:

Para la correcta implementación de funcionalidades y uso de datos se instalaron librerías y módulos tales como `AngularMaterial`, `forms`, `ngx-toastr`, `moment`, `typeorm`, etc.

---

## Links Utiles:

[🔗 GitHub](https://github.com/VCinthia/Clinica-SePrice)

[🔗 Trello](https://trello.com/b/d7Kqf90G/desarrollo-de-sistemas-de-informacion-orientados-a-la-gestion-y-apoyo-a-las-decisiones)

[🔗 FIGMA](https://www.figma.com/file/ObYtC4gQ48lwI07WBloDk9/Cl%C3%ADnica-SePrice?type=design&node-id=0-1&mode=design&t=ithlXqX2cCpShbuN-0)

[🔗 MINUTAS](https://docs.google.com/spreadsheets/d/1Ik-jy_ezWi-4Tm5dpNGYPkW_UJR_7zQ0rfdQmcb6g3k/edit?gid=0#gid=0)

[🔗 DER DRAW.IO](https://drive.google.com/file/d/1Drv7LNp2tVnob3SqmlNvx2iMns2t0nfu/view)


---

[NestJS - A progressive Node.js framework](https://nestjs.com/)

[Conceptos clave de Nestjs (Framework para Node.js)](https://medium.com/@diego.coder/conceptos-clave-de-nestjs-framework-para-node-js-c169803d1bc7)

[Documentación TypeORM](https://typeorm.io/)

[Angular](https://angular.dev/)

---
