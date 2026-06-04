-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (x86_64)
--
-- Host: localhost    Database: civil_app
-- ------------------------------------------------------
-- Server version	8.4.6

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
-- Table structure for table `tbl_contractor_agencies`
--

DROP TABLE IF EXISTS `tbl_contractor_agencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contractor_agencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `updated_by` int DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_contractor_agencies_email_key` (`email`),
  UNIQUE KEY `tbl_contractor_agencies_slug_key` (`slug`),
  KEY `idx_contractor_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contractor_agencies`
--

LOCK TABLES `tbl_contractor_agencies` WRITE;
/*!40000 ALTER TABLE `tbl_contractor_agencies` DISABLE KEYS */;
INSERT INTO `tbl_contractor_agencies` VALUES (1,'Updated Contractor Name',NULL,NULL,'updated-contractor-name',1,NULL,'2025-11-19 04:11:07.470','2025-11-20 10:45:56.766'),(2,'UrbanCraft Construction','contact@urbancraft.in','+91-9123456789','urbancraft-construction',1,102,'2025-11-19 04:11:07.471','2025-11-19 04:11:07.471'),(3,'MetroInfra Developers','support@metroinfra.com','+91-9988776655','metroinfra-developers',1,103,'2025-11-19 04:11:07.472','2025-11-19 04:11:07.472'),(4,'GreenField Contractors','hello@greenfield.com','+91-9090909090','greenfield-contractors',0,104,'2025-11-19 04:11:07.472','2025-11-19 04:11:07.472'),(5,'BlueRock Engineers','info@bluerock.in','+91-8877665544','bluerock-engineers',1,105,'2025-11-19 04:11:07.473','2025-11-19 04:11:07.473'),(6,'Test Contractor',NULL,NULL,'test-contractor',1,NULL,'2025-11-19 04:11:07.474','2025-11-19 04:11:07.474'),(7,'Updated Contractor Name','contractor1763527875503@example.com','9876543210','updated-contractor-name-2',1,NULL,'2025-11-19 04:51:15.506','2025-11-19 04:51:15.561'),(8,'Incomplete Contractor',NULL,NULL,'incomplete-contractor',1,NULL,'2025-11-19 04:51:15.515','2025-11-19 04:51:15.515'),(10,'Updated Contractor Name','contractor1763528317868@example.com','9876543210','updated-contractor-name-3',1,NULL,'2025-11-19 04:58:37.871','2025-11-19 04:58:37.917'),(11,'Incomplete Contractor',NULL,NULL,'incomplete-contractor-2',1,NULL,'2025-11-19 04:58:37.876','2025-11-19 04:58:37.876'),(13,'Updated Contractor Name','contractor1763635880375@example.com','9876543210',NULL,1,NULL,'2025-11-20 10:51:20.393','2025-11-20 10:51:20.534'),(14,'Incomplete Contractor',NULL,NULL,NULL,1,NULL,'2025-11-20 10:51:20.407','2025-11-20 10:51:20.407'),(16,'Updated Contractor Name','contractor1763636205751@example.com','9876543210',NULL,1,NULL,'2025-11-20 10:56:45.773','2025-11-20 10:56:45.932'),(17,'Incomplete Contractor',NULL,NULL,NULL,1,NULL,'2025-11-20 10:56:45.793','2025-11-20 10:56:45.793');
/*!40000 ALTER TABLE `tbl_contractor_agencies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:54
