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
-- Table structure for table `tbl_user_devices`
--

DROP TABLE IF EXISTS `tbl_user_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user_devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `device_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_model` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os_version` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_version` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fcm_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `onesignal_player_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login_at` datetime(3) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_user_devices_device_id_key` (`device_id`),
  KEY `idx_user_devices_device_id` (`device_id`),
  KEY `idx_user_devices_ip` (`ip_address`),
  KEY `idx_user_devices_user_id` (`user_id`),
  KEY `idx_user_devices_active` (`is_active`),
  KEY `idx_user_devices_last_login` (`last_login_at`),
  CONSTRAINT `tbl_user_devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user_devices`
--

LOCK TABLES `tbl_user_devices` WRITE;
/*!40000 ALTER TABLE `tbl_user_devices` DISABLE KEYS */;
INSERT INTO `tbl_user_devices` VALUES (1,1,'device-1763527873881','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763527873881',NULL,NULL,0,'2025-11-19 04:51:13.887',NULL,'2025-11-19 04:51:13.888','2025-11-19 04:58:31.613'),(2,1,'device-update-1763527873900','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-19 04:51:13.917',NULL,'2025-11-19 04:51:13.908','2025-11-20 10:56:47.336'),(3,1,'device-get-1763527873940','Get Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:51:13.945',NULL,'2025-11-19 04:51:13.945','2025-11-19 04:51:13.945'),(4,1,'device-update-1763527873962','Update Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:51:13.967',NULL,'2025-11-19 04:51:13.967','2025-11-19 04:51:13.967'),(5,1,'device-delete-1763527873973','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:51:13.977',NULL,'2025-11-19 04:51:13.977','2025-11-19 04:51:13.977'),(6,1,'device-logout-1763527874005','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-19 04:51:14.010',NULL,'2025-11-19 04:51:14.010','2025-11-20 10:56:47.339'),(7,1,'device-1763528316515','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763528316515',NULL,NULL,0,'2025-11-19 04:58:36.524',NULL,'2025-11-19 04:58:36.525','2025-11-20 09:35:01.587'),(8,1,'device-update-1763528316536','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-19 04:58:36.551',NULL,'2025-11-19 04:58:36.543','2025-11-20 10:56:47.336'),(9,1,'device-get-1763528316576','Get Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:58:36.581',NULL,'2025-11-19 04:58:36.582','2025-11-19 04:58:36.582'),(10,1,'device-update-1763528316600','Update Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:58:36.604',NULL,'2025-11-19 04:58:36.604','2025-11-19 04:58:36.604'),(11,1,'device-delete-1763528316610','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-19 04:58:36.615',NULL,'2025-11-19 04:58:36.616','2025-11-19 04:58:36.616'),(12,1,'device-logout-1763528316638','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-19 04:58:36.642',NULL,'2025-11-19 04:58:36.643','2025-11-20 10:56:47.339'),(13,1,'device-1763631302284','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763631302284',NULL,NULL,0,'2025-11-20 09:35:02.290',NULL,'2025-11-20 09:35:02.291','2025-11-20 09:45:45.108'),(14,1,'device-update-1763631302300','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-20 09:35:02.315',NULL,'2025-11-20 09:35:02.307','2025-11-20 10:56:47.336'),(15,1,'device-get-1763631302355','Get Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:35:02.363',NULL,'2025-11-20 09:35:02.364','2025-11-20 09:35:02.364'),(16,1,'device-update-1763631302376','Update Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:35:02.380',NULL,'2025-11-20 09:35:02.380','2025-11-20 09:35:02.380'),(17,1,'device-delete-1763631302386','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:35:02.390',NULL,'2025-11-20 09:35:02.390','2025-11-20 09:35:02.390'),(18,1,'device-logout-1763631302415','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-20 09:35:02.419',NULL,'2025-11-20 09:35:02.420','2025-11-20 10:56:47.339'),(19,1,'device-1763631942690','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763631942690',NULL,NULL,0,'2025-11-20 09:45:42.696',NULL,'2025-11-20 09:45:42.696','2025-11-20 09:45:45.113'),(20,1,'device-update-1763631942703','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-20 09:45:42.727',NULL,'2025-11-20 09:45:42.715','2025-11-20 10:56:47.336'),(21,1,'device-get-1763631942753','Get Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:45:42.757',NULL,'2025-11-20 09:45:42.758','2025-11-20 09:45:42.758'),(22,1,'device-update-1763631942771','Update Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:45:42.774',NULL,'2025-11-20 09:45:42.775','2025-11-20 09:45:42.775'),(23,1,'device-delete-1763631942783','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 09:45:42.789',NULL,'2025-11-20 09:45:42.789','2025-11-20 09:45:42.789'),(24,1,'device-logout-1763631942810','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-20 09:45:42.816',NULL,'2025-11-20 09:45:42.816','2025-11-20 10:56:47.339'),(25,1,'device-1763635873646','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763635873646',NULL,NULL,0,'2025-11-20 10:51:13.652',NULL,'2025-11-20 10:51:13.652','2025-11-20 10:51:15.322'),(26,1,'device-update-1763635873655','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-20 10:51:13.673',NULL,'2025-11-20 10:51:13.661','2025-11-20 10:56:47.336'),(27,1,'device-delete-1763635873802','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 10:51:13.807',NULL,'2025-11-20 10:51:13.807','2025-11-20 10:51:13.807'),(28,1,'device-logout-1763635873851','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-20 10:51:13.866',NULL,'2025-11-20 10:51:13.867','2025-11-20 10:56:47.339'),(29,1,'device-1763636205013','Test Device','mobile',NULL,'16.0','1.0.0','::ffff:127.0.0.1','fcm-token-1763636205013',NULL,NULL,0,'2025-11-20 10:56:45.019',NULL,'2025-11-20 10:56:45.020','2025-11-20 10:56:47.335'),(30,1,'device-update-1763636205026','Updated Again',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','new-fcm-token',NULL,NULL,0,'2025-11-20 10:56:45.040',NULL,'2025-11-20 10:56:45.034','2025-11-20 10:56:47.336'),(31,1,'device-delete-1763636205097','Delete Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1',NULL,NULL,NULL,1,'2025-11-20 10:56:45.103',NULL,'2025-11-20 10:56:45.103','2025-11-20 10:56:45.103'),(32,1,'device-logout-1763636205127','Logout Test Device',NULL,NULL,NULL,NULL,'::ffff:127.0.0.1','fcm-to-clear',NULL,NULL,0,'2025-11-20 10:56:45.131',NULL,'2025-11-20 10:56:45.131','2025-11-20 10:56:47.339');
/*!40000 ALTER TABLE `tbl_user_devices` ENABLE KEYS */;
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
