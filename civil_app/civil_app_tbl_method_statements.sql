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
-- Table structure for table `tbl_method_statements`
--

DROP TABLE IF EXISTS `tbl_method_statements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_method_statements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `contractor_id` int NOT NULL,
  `maker_id` int DEFAULT NULL,
  `checker_id` int DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `current_assignee_id` int DEFAULT NULL,
  `remarks` longtext COLLATE utf8mb4_unicode_ci,
  `due_date_time` datetime(3) DEFAULT NULL,
  `tat_allocated_hours` int DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime(3) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `current_status` enum('draft','open','checked','approved','rejected','re-open') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`id`),
  KEY `idx_ms_contractor` (`contractor_id`),
  KEY `idx_ms_project` (`project_id`),
  KEY `idx_ms_approver` (`approver_id`),
  KEY `idx_ms_checker` (`checker_id`),
  KEY `idx_ms_maker` (`maker_id`),
  KEY `idx_ms_status` (`current_status`),
  KEY `idx_ms_activity` (`activity_id`),
  KEY `idx_ms_assignee` (`current_assignee_id`),
  KEY `idx_ms_deleted` (`is_deleted`),
  KEY `idx_ms_due_date` (`due_date_time`),
  KEY `idx_ms_project_status_due` (`project_id`,`current_status`,`due_date_time`),
  KEY `idx_ms_assignee_status_updated` (`current_assignee_id`,`current_status`,`updated_at`),
  CONSTRAINT `fk_contractor_agency` FOREIGN KEY (`contractor_id`) REFERENCES `tbl_contractor_agencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_contractor_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ms_approver` FOREIGN KEY (`approver_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ms_checker` FOREIGN KEY (`checker_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ms_maker` FOREIGN KEY (`maker_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_method_statements`
--

LOCK TABLES `tbl_method_statements` WRITE;
/*!40000 ALTER TABLE `tbl_method_statements` DISABLE KEYS */;
INSERT INTO `tbl_method_statements` VALUES (1,1,1,1,6,NULL,NULL,NULL,'Testing 1',NULL,NULL,0,NULL,NULL,'2025-11-19 04:11:07.841','2025-11-19 04:11:07.841','draft');
/*!40000 ALTER TABLE `tbl_method_statements` ENABLE KEYS */;
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
