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
-- Table structure for table `tbl_audit_cycle`
--

DROP TABLE IF EXISTS `tbl_audit_cycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_audit_cycle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cycle_id` int NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `area_of_improvement` longtext COLLATE utf8mb4_unicode_ci,
  `final_observation` longtext COLLATE utf8mb4_unicode_ci,
  `project_id` int NOT NULL,
  `location4` int NOT NULL,
  `project_area_id` int DEFAULT NULL,
  `project_building_tower_id` int NOT NULL,
  `project_floor_level_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `status` enum('active','complete') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_audit_cycle_project` (`project_id`),
  KEY `idx_audit_cycle_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_audit_cycle`
--

LOCK TABLES `tbl_audit_cycle` WRITE;
/*!40000 ALTER TABLE `tbl_audit_cycle` DISABLE KEYS */;
INSERT INTO `tbl_audit_cycle` VALUES (17,1,'Description','test','test',1,0,NULL,1,NULL,4,14,14,'complete','2025-11-04 06:25:25.000','2025-11-19 04:11:08.900','2025-11-19 04:11:08.900'),(18,1,'','root cause analyse 4:49 nc at  5:31 PM','root cause analyse 4:49 nc at  5:31 PM',1,0,NULL,1,NULL,4,4,NULL,'complete','2025-11-01 06:35:54.000','2025-11-19 04:11:08.902','2025-11-19 04:11:08.902'),(19,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,1,NULL,4,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.903','2025-11-19 04:11:08.903'),(20,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,2,NULL,9,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.904','2025-11-19 04:11:08.904'),(21,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,2,NULL,9,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.905','2025-11-19 04:11:08.905'),(22,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,2,NULL,12,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.906','2025-11-19 04:11:08.906'),(23,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,3,NULL,12,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.907','2025-11-19 04:11:08.907'),(24,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,3,NULL,9,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.908','2025-11-19 04:11:08.908'),(25,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,4,NULL,9,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.909','2025-11-19 04:11:08.909'),(26,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,5,NULL,9,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.910','2025-11-19 04:11:08.910'),(27,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,5,NULL,12,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.911','2025-11-19 04:11:08.911'),(28,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,5,NULL,1,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.911','2025-11-19 04:11:08.911'),(29,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,4,NULL,1,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.912','2025-11-19 04:11:08.912'),(30,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',1,0,NULL,1,NULL,1,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.913','2025-11-19 04:11:08.913'),(31,1,'','root cause analyse 4:49 nc at  6:22 PM','root cause analyse 4:49 nc at  6:22 PM',2,0,NULL,1,NULL,1,4,NULL,'complete','2025-11-01 07:23:42.000','2025-11-19 04:11:08.914','2025-11-19 04:11:08.914');
/*!40000 ALTER TABLE `tbl_audit_cycle` ENABLE KEYS */;
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
