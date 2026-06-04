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
-- Table structure for table `tbl_wir_config`
--

DROP TABLE IF EXISTS `tbl_wir_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_wir_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dependency_check_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `work_sequence_dependency` tinyint(1) NOT NULL DEFAULT '1',
  `allow_gallery_upload` tinyint(1) NOT NULL DEFAULT '0',
  `reminder_hours` int DEFAULT '24',
  `auto_reject_days` int DEFAULT '3',
  `last_sync_at` datetime(3) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wir_config`
--

LOCK TABLES `tbl_wir_config` WRITE;
/*!40000 ALTER TABLE `tbl_wir_config` DISABLE KEYS */;
INSERT INTO `tbl_wir_config` VALUES (2,1,1,0,24,3,NULL,1,'2025-11-19 04:51:14.341','2025-11-19 04:51:14.341'),(4,1,1,0,24,3,NULL,1,'2025-11-19 04:58:39.890','2025-11-19 04:58:39.905'),(5,1,1,0,24,3,NULL,1,'2025-11-19 04:58:39.896','2025-11-19 04:58:39.896'),(7,1,1,0,24,3,NULL,1,'2025-11-20 09:35:05.343','2025-11-20 09:35:05.359'),(8,1,1,0,24,3,NULL,1,'2025-11-20 09:35:05.350','2025-11-20 09:35:05.350'),(10,1,1,0,24,3,NULL,1,'2025-11-20 09:45:39.606','2025-11-20 09:45:39.632'),(11,1,1,0,24,3,NULL,1,'2025-11-20 09:45:39.615','2025-11-20 09:45:39.615'),(13,1,1,0,24,3,NULL,1,'2025-11-20 10:51:15.705','2025-11-20 10:51:15.720'),(14,1,1,0,24,3,NULL,1,'2025-11-20 10:51:15.711','2025-11-20 10:51:15.711');
/*!40000 ALTER TABLE `tbl_wir_config` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:57
