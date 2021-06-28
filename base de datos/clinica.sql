-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: clinica
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `idcitas` int NOT NULL AUTO_INCREMENT,
  `paciente_Rut` varchar(45) NOT NULL,
  `id_medico` int DEFAULT NULL,
  `motivo` varchar(45) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` varchar(45) NOT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `hora` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcitas`),
  KEY `rut_idx` (`paciente_Rut`),
  KEY `id_medico_idx` (`id_medico`),
  CONSTRAINT `id_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`idmedicos`),
  CONSTRAINT `rut` FOREIGN KEY (`paciente_Rut`) REFERENCES `tb_usuarios` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (37,'20133394-6',3,'Dolor de espalda','Tengo una puntada en el costado izquierdo, cerca del hombro.','cerrado','2021-06-03','11:30'),(38,'20133394-6',14,'Dolor en el pecho','tengo una puntada en el pecho, cerca del corazón.','abierto','-','-'),(39,'20133394-6',9,'Chequeo dentista','Necesito una hora con un dentista para realizar mi chequeo semestral.','asignada','2021-07-22','08:30'),(41,'19403620-5',4,'Revisión de exámenes médicos','Necesito mostrar los resultados de los exámenes de sangre que se me solicitaron.','asignada','2021-08-01','10:45'),(42,'19403620-5',14,'estrés por estudios','deseo verme con un profesional por estrés constante','abierto','-','-'),(43,'19403620-5',9,'Lorem ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut','cancelado','2021-06-22','07:28'),(44,'19403620-5',14,'Ipsum Lorem','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut','abierto','-','-'),(45,'11224206-6',3,'Dolor de columna','dolor agudo en la espalda y columna desde hace un par de semanas.','asignada','2021-07-22','14:00'),(46,'11224206-6',4,'Control mensual','control mensual con el doctor César Bustos','asignada','2021-07-05','16:20'),(47,'16724969-8',10,'Me lloran los ojos','Estoy mucho tiempo en el computador, por lo que quiero realizarme un chequeo.','asignada','2021-07-07','10:30'),(48,'17324633-K',8,'Quiero realizar dieta','Me gustaría una hora con el nutricionista, para ver que me recomienda hacer para bajar de peso.','cerrado','2021-06-23','09:45'),(49,'17120968-4',12,'Cita con psicólogo','Creo que tengo depresión, por lo que quiero tratarme con un psicólogo. ','asignada','2021-07-19','11:30'),(50,'10466898-1',6,'Resfrío ','Hace 1 semana que tengo un dolor en la garganta, y muchos mocos, además de un malestar general.','cancelado','2021-07-15','12:50');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `idmedicos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `rut` varchar(45) NOT NULL,
  `especialidad` varchar(45) NOT NULL,
  PRIMARY KEY (`idmedicos`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (1,'Eduardo','Bórquez Núñez','1111111-1','Cardiología'),(2,'Marianne','Kolbach','2222222-2','Dermatología'),(3,'María Alejandra','Araya Silva','3333333-3','Kinesiología'),(4,'César','Bustos Gullén','4444444-4','Medicina Interna'),(5,'Francisco','Espinoza Villegas','5555555-5','Medicina Interna'),(6,'María Soledad','Oltra Reyes','6666666-6','Medicina Interna'),(7,'Juan Pablo','Cleary Wellmann','7777777-7','Neurología'),(8,'Marcela','Ortiz Olea','8888888-8','Nutricionista'),(9,'Cristián','Bravo Palma','9999999-9','Odontología'),(10,'Ricardo','Colvin Trucco','10000000-K','Oftalmología'),(11,'Karen','Apablaza','11111111-1','Pediatría'),(12,'Pía','Cumsille Rivera','12222222-2','Psicología'),(13,'Alex','Carocca Miranda','13333333-3','Psiquiatría'),(14,'-','','-','-');
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuarios` (
  `rut` varchar(10) NOT NULL,
  `nombres` varchar(40) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `region` varchar(45) NOT NULL,
  `comuna` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `contra` varchar(45) NOT NULL,
  `pregunta` varchar(45) NOT NULL,
  `respuesta` varchar(45) NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES ('00000000-0','admin','admin','admin','admin','admin','admin','7488e331b8b64e5794da3fa4eb10ad5d','1','967361a84f861760e77f3f9575cd7501'),('10466898-1','Felipe Ignacio','Concha Almeida','Calle Luis Miguel #564','Aysén del Gral. Carlos Ibáñez del Campo','Chile Chico','FelipeConcha_A@gmail.com','a05f43ec0207a949ceaa054023713ed6','¿Comida favorita?','3df719344e59fd8bd2389ef510442f0d'),('11224206-6','Juan Carlos','Perez Jerez','La cruz #43','Valparaíso','Quillota','Jperez@gmail.com','f5737d25829e95b9c234b7fa06af8736','¿Como se llamó tu primera mascota?','2ffe4e77325d9a7152f7086ea7aa5114'),('12345678-9','Miguel Alejandro','Escriba Parada','Avda Brasil #123','Valparaíso','Viña del Mar','miguel.e@gmail.com','940bae10ca539c9d097187f5d5cc554f','¿Como se llamó tu primera mascota?','9eb0c9605dc81a68731f61b3e0838937'),('16724969-8','Vladimir Domingo','Venegas Smitty','Calle Antofagasta #1821','Región Metropolitana','Maipú','vladimingo.v@gmail.com','f2479740488c7ae4962697af8a12ca4e','¿Nombre de tu mejor amigo?','fde2fdb1dbf604aede0ffee76d26e4ce'),('17120968-4','Jaime Andrez','Lizana Marista','Calle andina #195','Región Metropolitana','Las Condes','JaimitoLizana@gmail.com','0ca135359d2c08e90d2ff45a7e68921a','¿Nombre de tu primer novio/a?','5ae21533f62bc2015c2092cff7304b92'),('17324633-K','Bernardita ','Henríquez Acevedo','Av. Venezuela #1024','Magallanes y de la Antártica Chilena','Porvenir','bernarditaH.A@gmail.com','9afd6189e7324ea990e3aae01cfa7934','¿Como se llamó tu primera mascota?','a07f7872a5577fe1981bd30d1c60d653'),('19403620-5','Bastián Ramiro','Jeria Vergara','Balmaceda #57','Valparaíso','San Antonio','bastijeria@hotmail.com','57b1e933707f3db49752fef2febf8932','¿Como se llamó tu primera mascota?','1b966ed796264f7a44b5d1d61d37966e'),('19876455-6','Nicole Andrea','Rivas Quiroz','Av. mejillones #188','Del Biobío','Hualpén','NicoleAR@gmail.com','96cee49cfcb7ce7242660592c21e42f4','¿Película favorita?','4b60aaf3227b41090abb25977f585648'),('20102153-6','Franchesca Valentina','Morroni Castro','Calle cristo rey #666','Antofagasta','Sierra gorda','FranMorroni@gmail.com','5d48dc9e5cbccd186f83fc4c2492ec24','¿Comida favorita?','33aff573dfac0c70beb64e560a3f9860'),('20133394-6','Jorge Nicolás','Guzmán Cura','Calle Bejares #1888','Valparaíso','Los Andes','jorgen.guzmanc@gmail.com','5a0f035db329cea241ae3509ad2b824f','¿Como se llamó tu primera mascota?','654db8a14a5f633b9ba85ec92dc51f7c');
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-28 17:11:26
