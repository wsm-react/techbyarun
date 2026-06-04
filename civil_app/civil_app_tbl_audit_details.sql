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
-- Table structure for table `tbl_audit_details`
--

DROP TABLE IF EXISTS `tbl_audit_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_audit_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `audit_id` int NOT NULL,
  `observation` longtext COLLATE utf8mb4_unicode_ci,
  `area_of_improvement` longtext COLLATE utf8mb4_unicode_ci,
  `Image` longtext COLLATE utf8mb4_unicode_ci,
  `score` int DEFAULT NULL,
  `result` enum('pass','nc','na') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('complete','draft') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activity_id` int NOT NULL,
  `activity_category_id` int NOT NULL,
  `activity_category_check_point_id` int NOT NULL,
  `category_id` int NOT NULL,
  `nc_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_audit_details_audit` (`audit_id`),
  KEY `idx_audit_details_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_audit_details`
--

LOCK TABLES `tbl_audit_details` WRITE;
/*!40000 ALTER TABLE `tbl_audit_details` DISABLE KEYS */;
INSERT INTO `tbl_audit_details` VALUES (6,1,'','',NULL,10,'pass',NULL,302,250,1685,9,0,1,4,4,'2025-11-01 08:35:13.000','2025-11-19 04:11:08.915','2025-11-19 04:11:08.915'),(7,1,'mm','mm',NULL,10,'pass',NULL,302,250,1686,9,0,1,4,4,'2025-11-01 08:35:13.000','2025-11-19 04:11:08.917','2025-11-19 04:11:08.917'),(8,1,'tedt alok audit nc 1 nov','yezgh',NULL,10,'na',NULL,302,250,1687,9,0,1,4,4,'2025-11-01 09:39:29.000','2025-11-19 04:11:08.918','2025-11-19 04:11:08.918'),(9,1,'','',NULL,10,'na',NULL,302,251,1688,9,0,1,4,4,'2025-11-01 08:35:13.000','2025-11-19 04:11:08.919','2025-11-19 04:11:08.919'),(10,1,'','',NULL,10,'na',NULL,302,251,1689,9,0,1,4,4,'2025-11-01 08:35:13.000','2025-11-19 04:11:08.919','2025-11-19 04:11:08.919');
/*!40000 ALTER TABLE `tbl_audit_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:53
