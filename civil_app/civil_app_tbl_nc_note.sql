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
-- Table structure for table `tbl_nc_note`
--

DROP TABLE IF EXISTS `tbl_nc_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_nc_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nc_id` int NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_nc_note_nc` (`nc_id`),
  KEY `idx_nc_note_user` (`user_id`),
  KEY `idx_nc_note_created_by` (`created_by`),
  CONSTRAINT `tbl_nc_note_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_note_nc_id_fkey` FOREIGN KEY (`nc_id`) REFERENCES `tbl_nc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_nc_note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nc_note`
--

LOCK TABLES `tbl_nc_note` WRITE;
/*!40000 ALTER TABLE `tbl_nc_note` DISABLE KEYS */;
INSERT INTO `tbl_nc_note` VALUES (49,11,'not ok',1,16,NULL,'2025-11-19 04:11:09.369','2025-11-19 04:11:09.369'),(51,11,'not ok',1,4,NULL,'2025-11-19 04:11:09.370','2025-11-19 04:11:09.370'),(53,11,'ok',1,4,NULL,'2025-11-19 04:11:09.371','2025-11-19 04:11:09.371'),(54,11,'ok',1,8,NULL,'2025-11-19 04:11:09.371','2025-11-19 04:11:09.371'),(55,11,'clis3',1,4,NULL,'2025-11-19 04:11:09.372','2025-11-19 04:11:09.372'),(57,14,'tedt',1,1,NULL,'2025-11-19 04:11:09.374','2025-11-19 04:11:09.374'),(58,16,'test assignment',1,1,NULL,'2025-11-19 04:11:09.374','2025-11-19 04:11:09.374'),(59,11,'okkklllt3qqdh',1,12,NULL,'2025-11-19 04:11:09.375','2025-11-19 04:11:09.375'),(60,11,'ok',1,4,NULL,'2025-11-19 04:11:09.375','2025-11-19 04:11:09.375'),(61,17,'test',1,4,NULL,'2025-11-19 04:11:09.376','2025-11-19 04:11:09.376'),(62,18,'test',1,4,NULL,'2025-11-19 04:11:09.376','2025-11-19 04:11:09.376'),(72,41,'root cause analyse 4:49 nc at  6:22 PM',1,4,NULL,'2025-11-19 04:11:09.381','2025-11-19 04:11:09.381'),(81,41,'test',1,4,NULL,'2025-11-19 04:11:09.385','2025-11-19 04:11:09.385'),(82,41,'testing close duplicate',1,12,NULL,'2025-11-19 04:11:09.386','2025-11-19 04:11:09.386'),(88,11,'7:21',1,8,NULL,'2025-11-19 04:11:09.389','2025-11-19 04:11:09.389'),(138,72,'test audit checker4 to maker4',1,4,NULL,'2025-11-19 04:11:09.409','2025-11-19 04:11:09.409'),(139,73,'test as udit',1,4,NULL,'2025-11-19 04:11:09.410','2025-11-19 04:11:09.410'),(161,84,'test maker',1,4,NULL,'2025-11-19 04:11:09.420','2025-11-19 04:11:09.420');
/*!40000 ALTER TABLE `tbl_nc_note` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:56
