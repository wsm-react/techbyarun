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
-- Table structure for table `tbl_push_notifications`
--

DROP TABLE IF EXISTS `tbl_push_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_push_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json DEFAULT NULL,
  `notification_type` enum('assignment','tat-nearing','tat-overdue','approval-required','status-update','system','general') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('low','normal','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `delivery_status` enum('pending','sent','delivered','failed','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `ref_module` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_id` int DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `is_sent` tinyint(1) NOT NULL DEFAULT '0',
  `sent_at` datetime(3) DEFAULT NULL,
  `read_at` datetime(3) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_push_notification_user` (`user_id`),
  KEY `idx_push_notification_read` (`is_read`),
  KEY `idx_push_notification_type` (`notification_type`),
  KEY `idx_push_notification_sent` (`is_sent`),
  KEY `idx_push_notification_sent_at` (`sent_at`),
  KEY `idx_push_notification_ref` (`ref_module`,`ref_id`),
  CONSTRAINT `tbl_push_notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_push_notifications`
--

LOCK TABLES `tbl_push_notifications` WRITE;
/*!40000 ALTER TABLE `tbl_push_notifications` DISABLE KEYS */;
INSERT INTO `tbl_push_notifications` VALUES (2,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-19 04:58:31.708',NULL,'2025-11-19 04:58:31.614','2025-11-19 04:58:31.709'),(3,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-19 04:58:31.708',NULL,'2025-11-19 04:58:31.615','2025-11-19 04:58:31.709'),(4,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:35:01.660',NULL,'2025-11-20 09:35:01.582','2025-11-20 09:35:01.661'),(5,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:35:01.660',NULL,'2025-11-20 09:35:01.589','2025-11-20 09:35:01.661'),(6,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:35:01.660',NULL,'2025-11-20 09:35:01.595','2025-11-20 09:35:01.661'),(7,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.107','2025-11-20 09:45:45.185'),(8,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.109','2025-11-20 09:45:45.185'),(9,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.111','2025-11-20 09:45:45.185'),(10,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.112','2025-11-20 09:45:45.185'),(11,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.113','2025-11-20 09:45:45.185'),(12,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 09:45:45.184',NULL,'2025-11-20 09:45:45.114','2025-11-20 09:45:45.185'),(13,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:51:15.384',NULL,'2025-11-20 10:51:15.319','2025-11-20 10:51:15.385'),(14,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:51:15.384',NULL,'2025-11-20 10:51:15.323','2025-11-20 10:51:15.385'),(15,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:51:15.384',NULL,'2025-11-20 10:51:15.326','2025-11-20 10:51:15.385'),(16,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:56:47.411',NULL,'2025-11-20 10:56:47.334','2025-11-20 10:56:47.411'),(17,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:56:47.411',NULL,'2025-11-20 10:56:47.336','2025-11-20 10:56:47.411'),(18,1,'Test Notification','This is a test notification','{\"id\": 1, \"type\": \"test\"}','general','normal','pending',NULL,NULL,1,0,NULL,'2025-11-20 10:56:47.411',NULL,'2025-11-20 10:56:47.338','2025-11-20 10:56:47.411');
/*!40000 ALTER TABLE `tbl_push_notifications` ENABLE KEYS */;
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
