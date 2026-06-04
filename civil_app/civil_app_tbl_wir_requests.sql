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
-- Table structure for table `tbl_wir_requests`
--

DROP TABLE IF EXISTS `tbl_wir_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_wir_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `project_building_tower_id` int NOT NULL,
  `project_floor_level_id` int NOT NULL,
  `project_area_id` int NOT NULL,
  `method_statement_id` int DEFAULT NULL,
  `stageId` enum('pre','during','post') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pre',
  `current_status` enum('draft','open','checked','closed','re-open','auto-rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `approver_action` enum('skip','attend') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maker_id` int DEFAULT NULL,
  `checker_id` int DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `current_assignee_id` int DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `due_date` datetime(3) DEFAULT NULL,
  `due_date_time` datetime(3) DEFAULT NULL,
  `tat_allocated_hours` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime(3) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_wir_method_statement` (`method_statement_id`),
  KEY `idx_wir_approver` (`approver_id`),
  KEY `idx_wir_checker` (`checker_id`),
  KEY `idx_wir_maker` (`maker_id`),
  KEY `idx_wir_status` (`current_status`),
  KEY `idx_wir_due_date` (`due_date_time`),
  KEY `idx_wir_stage` (`stageId`),
  KEY `idx_wir_project` (`project_id`),
  KEY `idx_wir_activity` (`activity_id`),
  KEY `idx_wir_assignee` (`current_assignee_id`),
  KEY `idx_wir_deleted` (`is_deleted`),
  KEY `idx_wir_project_status_stage_due` (`project_id`,`current_status`,`stageId`,`due_date_time`),
  KEY `idx_wir_assignee_status_updated` (`current_assignee_id`,`current_status`,`updated_at`),
  CONSTRAINT `tbl_wir_requests_approver_id_fkey` FOREIGN KEY (`approver_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_wir_requests_checker_id_fkey` FOREIGN KEY (`checker_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_wir_requests_maker_id_fkey` FOREIGN KEY (`maker_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_wir_requests_method_statement_id_fkey` FOREIGN KEY (`method_statement_id`) REFERENCES `tbl_method_statements` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wir_requests`
--

LOCK TABLES `tbl_wir_requests` WRITE;
/*!40000 ALTER TABLE `tbl_wir_requests` DISABLE KEYS */;
INSERT INTO `tbl_wir_requests` VALUES (1,1,1,1,1,1,1,'pre','draft',NULL,6,NULL,NULL,NULL,NULL,'2026-11-10 18:30:00.000',NULL,NULL,6,0,NULL,NULL,'2025-11-19 04:11:08.921','2025-11-19 04:11:08.921');
/*!40000 ALTER TABLE `tbl_wir_requests` ENABLE KEYS */;
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
