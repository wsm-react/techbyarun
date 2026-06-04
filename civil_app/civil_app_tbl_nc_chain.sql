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
-- Table structure for table `tbl_nc_chain`
--

DROP TABLE IF EXISTS `tbl_nc_chain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_nc_chain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nc_id` int NOT NULL,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  `assigned_to` int DEFAULT NULL,
  `nc_status` enum('open','assigned','in-progress','resolved','verified','closed','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'open',
  `created_by_id` int DEFAULT NULL,
  `updated_by_id` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_nc_chain_nc` (`nc_id`),
  KEY `idx_nc_chain_project` (`project_id`),
  KEY `idx_nc_chain_user` (`user_id`),
  KEY `idx_nc_chain_assigned_to` (`assigned_to`),
  KEY `idx_nc_chain_status` (`nc_status`),
  KEY `idx_nc_chain_created_by_id_fkey` (`created_by_id`),
  KEY `idx_nc_chain_updated_by_id_fkey` (`updated_by_id`),
  CONSTRAINT `tbl_nc_chain_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_chain_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_chain_nc_id_fkey` FOREIGN KEY (`nc_id`) REFERENCES `tbl_nc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_chain_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_chain_updated_by_id_fkey` FOREIGN KEY (`updated_by_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_chain_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=645 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nc_chain`
--

LOCK TABLES `tbl_nc_chain` WRITE;
/*!40000 ALTER TABLE `tbl_nc_chain` DISABLE KEYS */;
INSERT INTO `tbl_nc_chain` VALUES (74,11,1,1,16,'open',16,16,NULL,'2025-11-19 04:11:09.042','2025-11-19 04:11:09.042'),(75,11,1,1,12,'open',16,16,NULL,'2025-11-19 04:11:09.043','2025-11-19 04:11:09.043'),(77,11,1,1,4,'open',16,12,NULL,'2025-11-19 04:11:09.044','2025-11-19 04:11:09.044'),(79,11,1,1,12,'open',16,4,NULL,'2025-11-19 04:11:09.045','2025-11-19 04:11:09.045'),(81,11,1,1,4,'open',16,12,NULL,'2025-11-19 04:11:09.046','2025-11-19 04:11:09.046'),(82,11,1,1,8,'open',16,4,NULL,'2025-11-19 04:11:09.047','2025-11-19 04:11:09.047'),(83,11,1,1,NULL,'open',16,8,NULL,'2025-11-19 04:11:09.048','2025-11-19 04:11:09.048'),(84,11,1,1,4,'resolved',16,8,NULL,'2025-11-19 04:11:09.048','2025-11-19 04:11:09.048'),(85,11,1,1,12,'closed',16,4,NULL,'2025-11-19 04:11:09.049','2025-11-19 04:11:09.049'),(90,14,1,1,1,'open',1,1,NULL,'2025-11-19 04:11:09.052','2025-11-19 04:11:09.052'),(91,14,1,1,7,'open',1,1,NULL,'2025-11-19 04:11:09.052','2025-11-19 04:11:09.052'),(92,15,1,1,1,'open',1,1,NULL,'2025-11-19 04:11:09.053','2025-11-19 04:11:09.053'),(93,15,1,1,5,'open',1,1,NULL,'2025-11-19 04:11:09.053','2025-11-19 04:11:09.053'),(94,16,1,1,1,'open',1,1,NULL,'2025-11-19 04:11:09.054','2025-11-19 04:11:09.054'),(95,16,1,1,5,'open',1,1,NULL,'2025-11-19 04:11:09.055','2025-11-19 04:11:09.055'),(96,11,1,1,4,'open',16,12,NULL,'2025-11-19 04:11:09.055','2025-11-19 04:11:09.055'),(97,11,1,1,8,'open',16,4,NULL,'2025-11-19 04:11:09.056','2025-11-19 04:11:09.056'),(98,17,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.057','2025-11-19 04:11:09.057'),(99,17,1,1,8,'open',4,4,NULL,'2025-11-19 04:11:09.057','2025-11-19 04:11:09.057'),(100,18,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.058','2025-11-19 04:11:09.058'),(101,18,1,1,5,'open',4,4,NULL,'2025-11-19 04:11:09.058','2025-11-19 04:11:09.058'),(131,41,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.075','2025-11-19 04:11:09.075'),(132,41,1,1,8,'open',4,4,NULL,'2025-11-19 04:11:09.075','2025-11-19 04:11:09.075'),(145,41,1,1,12,'closed',12,4,NULL,'2025-11-19 04:11:09.082','2025-11-19 04:11:09.082'),(146,41,1,1,12,'closed',12,12,NULL,'2025-11-19 04:11:09.083','2025-11-19 04:11:09.083'),(157,11,1,1,NULL,'open',4,8,NULL,'2025-11-19 04:11:09.088','2025-11-19 04:11:09.088'),(158,11,1,1,4,'resolved',4,8,NULL,'2025-11-19 04:11:09.089','2025-11-19 04:11:09.089'),(253,72,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.145','2025-11-19 04:11:09.145'),(254,72,1,1,8,'open',4,4,NULL,'2025-11-19 04:11:09.145','2025-11-19 04:11:09.145'),(255,73,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.146','2025-11-19 04:11:09.146'),(256,73,1,1,7,'open',4,4,NULL,'2025-11-19 04:11:09.147','2025-11-19 04:11:09.147'),(292,84,1,1,4,'open',4,4,NULL,'2025-11-19 04:11:09.170','2025-11-19 04:11:09.170'),(293,84,1,1,5,'open',4,4,NULL,'2025-11-19 04:11:09.171','2025-11-19 04:11:09.171');
/*!40000 ALTER TABLE `tbl_nc_chain` ENABLE KEYS */;
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
