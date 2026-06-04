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
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_updated_at` datetime(3) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','suspended','locked','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_blocked` tinyint(1) NOT NULL DEFAULT '0',
  `role_id` int DEFAULT NULL,
  `role` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token_expiry` datetime(3) DEFAULT NULL,
  `tat_timer_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` datetime(3) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_users_username_key` (`username`),
  UNIQUE KEY `tbl_users_email_key` (`email`),
  KEY `idx_user_email` (`email`),
  KEY `idx_user_blocked` (`is_blocked`),
  KEY `idx_user_role` (`role_id`),
  CONSTRAINT `tbl_users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `tbl_user_role_master` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'checker-1','checker1@gmail.com','123456',NULL,'checker-1','','active',0,1,'checker',NULL,NULL,NULL,NULL,1,'2025-11-20 10:56:48.006',NULL,'2025-11-19 04:11:07.401','2025-11-20 10:56:48.006'),(2,'checker-2','checker2@gmail.com','123456',NULL,'checker-2','','active',0,1,'checker',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.406','2025-11-19 04:11:07.406'),(3,'checker-3','checker3@gmail.com','123456',NULL,'checker-3','','active',0,1,'checker',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.408','2025-11-19 04:11:07.408'),(4,'checker-4','checker4@gmail.com','123456',NULL,'checker-4','','active',0,1,'checker',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.410','2025-11-19 04:11:07.410'),(5,'maker-1','maker1@gmail.com','123456',NULL,'maker-1','','active',0,2,'maker',NULL,NULL,NULL,NULL,1,'2025-11-20 10:51:18.230',NULL,'2025-11-19 04:11:07.418','2025-11-20 10:51:18.230'),(6,'maker-2','maker2@gmail.com','123456',NULL,'maker-2','','active',0,2,'maker',NULL,NULL,NULL,NULL,1,'2025-11-20 10:51:10.565',NULL,'2025-11-19 04:11:07.425','2025-11-20 10:51:10.566'),(7,'maker-3','maker3@gmail.com','123456',NULL,'maker-3','','active',0,2,'maker',NULL,NULL,NULL,NULL,1,'2025-11-20 10:51:10.583',NULL,'2025-11-19 04:11:07.429','2025-11-20 10:51:10.583'),(8,'maker-4','maker4@gmail.com','123456',NULL,'maker-4','','active',0,2,'maker',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.438','2025-11-19 04:11:07.438'),(9,'approver-1','approver1@gmail.com','123456',NULL,'approver-1','','active',0,3,'approver',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImVtYWlsIjoiYXBwcm92ZXIxQGdtYWlsLmNvbSIsImlhdCI6MTc2MzYzNTg3OCwiZXhwIjoxNzYzNjM5NDc4fQ.IP_1XwK69gBP12kbv4sJ7eZ6F3VJ0ju8cNxwR1qxEP0','2025-11-20 11:51:18.291',1,'2025-11-20 10:51:18.191',NULL,'2025-11-19 04:11:07.440','2025-11-20 10:51:18.291'),(10,'approver-2','approver2@gmail.com','123456',NULL,'approver-2','','active',0,3,'approver',NULL,NULL,NULL,NULL,1,'2025-11-20 08:25:07.191',NULL,'2025-11-19 04:11:07.442','2025-11-20 08:25:07.192'),(11,'approver-3','approver3@gmail.com','123456',NULL,'approver-3','','active',0,3,'approver',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.445','2025-11-19 04:11:07.445'),(12,'approver-4','approver4@gmail.com','123456',NULL,'approver-4','','active',0,3,'approver',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.447','2025-11-19 04:11:07.447'),(13,'management-1','management1@gmail.com','123456',NULL,'approver-1','','active',0,4,'management',NULL,NULL,NULL,NULL,1,'2025-11-20 10:51:18.203',NULL,'2025-11-19 04:11:07.450','2025-11-20 10:51:18.204'),(14,'management-2','management2@gmail.com','123456',NULL,'management-2','','active',0,4,'management',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.451','2025-11-19 04:11:07.451'),(15,'management-3','management3@gmail.com','123456',NULL,'management-3','','active',0,4,'management',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.453','2025-11-19 04:11:07.453'),(16,'management-4','management4@gmail.com','123456',NULL,'management-4','','active',0,4,'management',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:11:07.454','2025-11-19 04:11:07.454'),(17,'newuser1763527869790','newuser1763527869790@example.com','$2a$10$Yd6nyhHGphGIvTuNIBZFPOqOaXt/jGdRTOYIL1rEQCAQkGGB8VKHm',NULL,'New Test User','','active',0,1,'CHECKER',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:51:09.885','2025-11-19 04:51:09.885'),(18,'newuser1763528322708','newuser1763528322708@example.com','$2a$10$u8fZOUskDwhb/BgL7ukzl.T9DiPSNcJNV5CTexp/xuT2CiIsLax4K',NULL,'New Test User','','active',0,1,'CHECKER',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-19 04:58:42.810','2025-11-19 04:58:42.810'),(19,'newuser1763631297916','newuser1763631297916@example.com','$2a$10$v5OgVrIHNct3lKthUZ3bEuejuSr3ayXveHLJGn28.e1eaCgAMDSp.',NULL,'New Test User','','active',0,1,'CHECKER',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-20 09:34:58.013','2025-11-20 09:34:58.013'),(20,'newuser1763631948538','newuser1763631948538@example.com','$2a$10$SjX65gb4fZmD/X82FmYZ5eM1D3tQBwz1CsbIDl.6s1tsKWR1pjmli',NULL,'New Test User','','active',0,1,'CHECKER',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-20 09:45:48.638','2025-11-20 09:45:48.638'),(21,'newuser1763635878032','newuser1763635878032@example.com','$2a$10$A06pE/2bgJZEVRdphsaSxORhhpeLW8rj9nWMBewaJ.sBuf3dreywi',NULL,'New Test User','','active',0,1,'CHECKER',NULL,NULL,NULL,NULL,1,NULL,NULL,'2025-11-20 10:51:18.128','2025-11-20 10:51:18.128');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
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
