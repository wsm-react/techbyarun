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
-- Table structure for table `tbl_nc`
--

DROP TABLE IF EXISTS `tbl_nc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_nc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `observation` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_plan` longtext COLLATE utf8mb4_unicode_ci,
  `root_cause` longtext COLLATE utf8mb4_unicode_ci,
  `correction_detail` longtext COLLATE utf8mb4_unicode_ci,
  `images` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `severity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('open','assigned','in-progress','resolved','verified','closed','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'open',
  `project_id` int NOT NULL,
  `project_area_id` int NOT NULL,
  `project_building_tower_id` int NOT NULL,
  `project_floor_level_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `activity_category_id` int NOT NULL,
  `activity_category_check_point_id` int NOT NULL,
  `category_id` int NOT NULL,
  `audit_id` int NOT NULL,
  `audit_checkpoint_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `maker_id` int DEFAULT NULL,
  `checker_id` int DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `current_assignee_id` int DEFAULT NULL,
  `is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `is_duplicate` tinyint(1) NOT NULL DEFAULT '0',
  `is_reopen_approver` tinyint(1) NOT NULL DEFAULT '0',
  `is_reopen_checker` tinyint(1) NOT NULL DEFAULT '0',
  `reopen_approver_date` datetime(3) DEFAULT NULL,
  `reopen_checker_date` datetime(3) DEFAULT NULL,
  `due_date_time` datetime(3) DEFAULT NULL,
  `tat_allocated_hours` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_nc_project` (`project_id`),
  KEY `idx_nc_activity` (`activity_id`),
  KEY `idx_nc_activity_category` (`activity_category_id`),
  KEY `idx_nc_category` (`category_id`),
  KEY `idx_nc_user` (`user_id`),
  KEY `idx_nc_current_assignee` (`current_assignee_id`),
  KEY `idx_nc_status` (`status`),
  KEY `idx_nc_created_at` (`created_at`),
  KEY `idx_nc_deleted` (`is_deleted`),
  KEY `idx_nc_due_date` (`due_date_time`),
  KEY `idx_nc_project_status_due` (`project_id`,`status`,`due_date_time`),
  KEY `idx_nc_assignee_status_updated` (`current_assignee_id`,`status`,`updated_at`),
  KEY `idx_nc_project_activity_status` (`project_id`,`activity_id`,`status`),
  KEY `idx_nc_activity_category_check_point_id_fkey` (`activity_category_check_point_id`),
  KEY `idx_nc_approver_id_fkey` (`approver_id`),
  KEY `idx_nc_assigned_to_fkey` (`assigned_to`),
  KEY `idx_nc_checker_id_fkey` (`checker_id`),
  KEY `idx_nc_created_by_fkey` (`created_by`),
  KEY `idx_nc_maker_id_fkey` (`maker_id`),
  KEY `idx_nc_updated_by_fkey` (`updated_by`),
  CONSTRAINT `tbl_nc_activity_category_check_point_id_fkey` FOREIGN KEY (`activity_category_check_point_id`) REFERENCES `tbl_activity_category_check_point` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_activity_category_id_fkey` FOREIGN KEY (`activity_category_id`) REFERENCES `tbl_activity_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `tbl_activity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_approver_id_fkey` FOREIGN KEY (`approver_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tbl_category_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_checker_id_fkey` FOREIGN KEY (`checker_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_current_assignee_id_fkey` FOREIGN KEY (`current_assignee_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_maker_id_fkey` FOREIGN KEY (`maker_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nc`
--

LOCK TABLES `tbl_nc` WRITE;
/*!40000 ALTER TABLE `tbl_nc` DISABLE KEYS */;
INSERT INTO `tbl_nc` VALUES (11,'xhxj','7:19','7:19','7:19','','Minor','resolved',1,1,1,1,302,250,1685,1,1,1685,1,8,4,NULL,4,NULL,0,0,0,0,NULL,NULL,NULL,NULL,'2025-11-02 13:51:45.029',4,4,0,NULL,'2025-11-19 04:11:08.928','2025-11-19 04:11:08.928'),(14,'test','','','','','Minor','open',1,13,1,1,37,171,1172,1,1,1172,1,5,1,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,1,1,0,NULL,'2025-11-19 04:11:08.931','2025-11-19 04:11:08.931'),(15,'test','','','','','Minor','open',1,13,1,1,37,171,1172,1,1,1172,1,5,1,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,1,1,0,NULL,'2025-11-19 04:11:08.933','2025-11-19 04:11:08.933'),(16,'red','','','','','Minor','open',1,15,1,3,52,245,1657,1,1,1657,1,7,1,NULL,7,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,1,1,0,NULL,'2025-11-19 04:11:08.934','2025-11-19 04:11:08.934'),(17,'red','','','','','Minor','open',1,15,1,3,52,245,1657,1,1,1657,1,5,1,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,1,1,0,NULL,'2025-11-19 04:11:08.936','2025-11-19 04:11:08.936'),(18,'red','','','','','Minor','open',1,15,1,3,52,245,1657,1,1,1657,1,5,1,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,1,1,0,NULL,'2025-11-19 04:11:08.937','2025-11-19 04:11:08.937'),(19,'test in ng','','','','','Minor','open',1,13,1,1,3,9,53,1,1,53,1,8,4,NULL,8,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,4,4,0,NULL,'2025-11-19 04:11:08.939','2025-11-19 04:11:08.939'),(20,'test','','','','','Minor','open',1,1,1,1,1,1,1,1,1,1,1,5,4,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,4,4,0,NULL,'2025-11-19 04:11:08.940','2025-11-19 04:11:08.940'),(41,'root cause analyse 6:21 nc at  6:21\n PM','root cause analyse 4:49 nc at  6:26 PM ','root cause analyse 4:49 nc at  6:26 PM ','root cause analyse 4:49 nc at  6:26 PM ','','Minor','closed',1,1,1,1,302,250,1685,1,3,1685,1,8,4,12,12,NULL,0,0,0,0,NULL,NULL,NULL,NULL,'2025-11-01 13:07:41.135',4,4,0,NULL,'2025-11-19 04:11:08.953','2025-11-19 04:11:08.953'),(72,'tedt','','','','','Minor','open',1,3,1,3,3,9,58,1,1,58,1,8,4,NULL,8,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,4,4,0,NULL,'2025-11-19 04:11:08.971','2025-11-19 04:11:08.971'),(73,'tedt','','','','','Minor','open',1,3,1,3,3,11,66,1,1,66,1,7,4,NULL,7,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,4,4,0,NULL,'2025-11-19 04:11:08.973','2025-11-19 04:11:08.973'),(84,'test observations','','','','','Minor','open',1,13,1,1,31,144,968,1,1,968,1,5,4,NULL,5,NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL,4,4,0,NULL,'2025-11-19 04:11:08.979','2025-11-19 04:11:08.979');
/*!40000 ALTER TABLE `tbl_nc` ENABLE KEYS */;
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
