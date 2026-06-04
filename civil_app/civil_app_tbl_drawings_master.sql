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
-- Table structure for table `tbl_drawings_master`
--

DROP TABLE IF EXISTS `tbl_drawings_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_drawings_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `drawing_number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revision_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_area_id` int DEFAULT NULL,
  `project_building_tower_id` int DEFAULT NULL,
  `project_floor_level_id` int DEFAULT NULL,
  `is_latest` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `uploaded_by` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_drawings_master_slug_key` (`slug`),
  KEY `idx_drawing_activity` (`activity_id`),
  KEY `idx_drawing_project` (`project_id`),
  KEY `idx_drawing_uploaded_by` (`uploaded_by`),
  KEY `idx_drawing_status` (`status`),
  KEY `idx_drawing_latest` (`is_latest`),
  CONSTRAINT `tbl_drawings_master_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `tbl_activity` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tbl_drawings_master_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tbl_drawings_master_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_drawings_master`
--

LOCK TABLES `tbl_drawings_master` WRITE;
/*!40000 ALTER TABLE `tbl_drawings_master` DISABLE KEYS */;
INSERT INTO `tbl_drawings_master` VALUES (1,1,1,'DM1971','master bedroom','master-bedroom',NULL,NULL,1,1,1,1,'active',NULL,NULL,'2025-11-19 04:11:07.838','2025-11-19 04:11:07.838'),(2,1,1,'DM1972','master bathroom','master-bathroom',NULL,NULL,1,1,1,1,'active',6,NULL,'2025-11-19 04:11:07.840','2025-11-19 04:11:07.840');
/*!40000 ALTER TABLE `tbl_drawings_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:55
