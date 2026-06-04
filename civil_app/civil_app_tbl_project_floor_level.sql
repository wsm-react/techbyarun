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
-- Table structure for table `tbl_project_floor_level`
--

DROP TABLE IF EXISTS `tbl_project_floor_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_project_floor_level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `project_building_tower_id` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_project_floor_level_slug_key` (`slug`),
  KEY `idx_floor_level_tower` (`project_building_tower_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_project_floor_level`
--

LOCK TABLES `tbl_project_floor_level` WRITE;
/*!40000 ALTER TABLE `tbl_project_floor_level` DISABLE KEYS */;
INSERT INTO `tbl_project_floor_level` VALUES (1,'Floor 5','1-floor-5','2025-10-05 04:18:14.000',1,'2025-11-19 04:11:07.843','2025-11-19 04:11:07.843'),(2,'Floor 10','2-floor-10','2025-10-05 04:18:14.000',2,'2025-11-19 04:11:07.844','2025-11-19 04:11:07.844'),(3,'Floor 15','1-floor-15','2025-10-05 04:18:14.000',1,'2025-11-19 04:11:07.844','2025-11-19 04:11:07.844'),(4,'Floor 1','2-floor-1','2025-10-05 04:18:14.000',2,'2025-11-19 04:11:07.845','2025-11-19 04:11:07.845'),(5,'Floor 09','3-floor-09','2025-10-05 04:18:14.000',3,'2025-11-19 04:11:07.845','2025-11-19 04:11:07.845'),(6,'Floor 11','3-floor-11','2025-10-05 04:18:14.000',3,'2025-11-19 04:11:07.846','2025-11-19 04:11:07.846'),(7,'Floor-19','4-floor-19','2025-10-05 04:18:14.000',4,'2025-11-19 04:11:07.847','2025-11-19 04:11:07.847'),(8,'Floor-20','4-floor-20','2025-10-05 04:18:14.000',4,'2025-11-19 04:11:07.847','2025-11-19 04:11:07.847'),(9,'Floor-15','5-floor-15','2025-10-05 04:18:14.000',5,'2025-11-19 04:11:07.848','2025-11-19 04:11:07.848'),(10,'Floor-16','5-floor-16','2025-10-05 04:18:14.000',5,'2025-11-19 04:11:07.848','2025-11-19 04:11:07.848'),(11,'Floor-17','6-floor-17','2025-10-05 04:18:14.000',6,'2025-11-19 04:11:07.849','2025-11-19 04:11:07.849'),(12,'Floor-18','6-floor-18','2025-10-05 04:18:14.000',6,'2025-11-19 04:11:07.850','2025-11-19 04:11:07.850');
/*!40000 ALTER TABLE `tbl_project_floor_level` ENABLE KEYS */;
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
