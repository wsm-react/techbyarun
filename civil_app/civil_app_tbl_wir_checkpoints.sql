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
-- Table structure for table `tbl_wir_checkpoints`
--

DROP TABLE IF EXISTS `tbl_wir_checkpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_wir_checkpoints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wir_id` int NOT NULL,
  `activity_category_id` int NOT NULL,
  `activity_checkpoint_id` int NOT NULL,
  `stage` enum('maker','checker','approver') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result` enum('pass','fail','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_wir_checkpoints_slug_key` (`slug`),
  KEY `idx_wir_checkpoint_activity_cat` (`activity_category_id`),
  KEY `idx_wir_checkpoint_activity_chk` (`activity_checkpoint_id`),
  KEY `idx_wir_checkpoint_wir` (`wir_id`),
  KEY `idx_wir_checkpoint_result` (`result`),
  KEY `idx_wir_checkpoint_stage` (`stage`),
  CONSTRAINT `tbl_wir_checkpoints_activity_category_id_fkey` FOREIGN KEY (`activity_category_id`) REFERENCES `tbl_activity_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_wir_checkpoints_activity_checkpoint_id_fkey` FOREIGN KEY (`activity_checkpoint_id`) REFERENCES `tbl_activity_category_check_point` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_wir_checkpoints_wir_id_fkey` FOREIGN KEY (`wir_id`) REFERENCES `tbl_wir_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wir_checkpoints`
--

LOCK TABLES `tbl_wir_checkpoints` WRITE;
/*!40000 ALTER TABLE `tbl_wir_checkpoints` DISABLE KEYS */;
INSERT INTO `tbl_wir_checkpoints` VALUES (1,1,1,1,'maker','Improper Chemical mixing','item-1763464432851-7esus','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.490','2025-11-19 04:11:09.490'),(2,1,1,2,'maker','Chemical not sprayed uniformly at specified distance and depth','item-1763464432851-mjnzc','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.491','2025-11-19 04:11:09.491'),(3,1,1,3,'maker','Chemical dosage is not as per technical data sheet','item-1763464432851-tw05o','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.492','2025-11-19 04:11:09.492'),(4,1,1,4,'maker','Treated area is kept exposed after application for long time','item-1763464432851-14h92','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.493','2025-11-19 04:11:09.493'),(5,1,1,5,'maker','Work started without approved work method statement','item-1763464432851-6g4kw','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.494','2025-11-19 04:11:09.494'),(6,1,1,6,'maker','Use of non standard tools','item-1763464432851-3ms0s','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.494','2025-11-19 04:11:09.494'),(7,1,1,7,'maker','Protection not done for finished activities','item-1763464432851-pcene','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.495','2025-11-19 04:11:09.495'),(8,1,1,8,'maker','Damages of finishing work during installation of MEP activities','item-1763464432851-p3rn3','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.496','2025-11-19 04:11:09.496'),(9,1,1,9,'maker','Design/ drawing detail not followed at site','item-1763464432851-da0kz','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.496','2025-11-19 04:11:09.496'),(10,1,2,10,'maker','Shop drawings are not approved by Consultant or internal design team','item-1763464432851-sfydz','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.497','2025-11-19 04:11:09.497'),(11,1,2,11,'maker','GFC / Latest drawing not followed at site','item-1763464432851-ny52g','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.498','2025-11-19 04:11:09.498'),(12,1,2,12,'maker','Superseded drawing records are not collected & maintained properly','item-1763464432851-l6254','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.498','2025-11-19 04:11:09.498'),(13,1,2,13,'maker','Work method statement is not adopted','item-1763464432851-qr2rn','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.499','2025-11-19 04:11:09.499'),(14,1,2,14,'maker','Inspection Test Plan is not adopted','item-1763464432851-vghjd','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.500','2025-11-19 04:11:09.500'),(15,1,2,15,'maker','Work Inspection Request not signed/ incorrect details','item-1763464432851-7vrxh','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.500','2025-11-19 04:11:09.500'),(16,1,2,16,'maker','Material Inspection Report not signed or relevant test reports/ documents are inadequate/ incorrect','item-1763464432851-wutqs','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.501','2025-11-19 04:11:09.501'),(17,1,3,17,'maker','Use of unapproved/ rejected material','item-1763464432851-flj3y','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.502','2025-11-19 04:11:09.502'),(18,1,3,18,'maker','Material inspection & testing not done as per approved ITP','item-1763464432851-1m4to','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.502','2025-11-19 04:11:09.502'),(19,1,3,19,'maker','Stacking / Storage not done as per manufacturer\'s standards or as per Method statement','item-1763464432851-pm7ts','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.503','2025-11-19 04:11:09.503'),(20,1,3,20,'maker','Material Size, Gauge/Thickness, Accessories are not as per agreed specification','item-1763464432851-3jtod','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.504','2025-11-19 04:11:09.504'),(21,1,3,21,'maker','Expired Material being used','item-1763464432851-q5yq4','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.504','2025-11-19 04:11:09.504'),(22,1,3,22,'maker','Damaged material being used','item-1763464432851-fuwe2','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.505','2025-11-19 04:11:09.505'),(23,1,3,23,'maker','Adequate attic stock is not maintained','item-1763464432851-xgnvx','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.506','2025-11-19 04:11:09.506'),(24,1,3,24,'maker','Test Lab/ other measurement equipment\'s calibration not done as per plan','item-1763464432851-edhpt','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.507','2025-11-19 04:11:09.507'),(25,1,4,25,'maker','Design / drawing details are inadequate','item-1763464432851-met2q','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.507','2025-11-19 04:11:09.507'),(26,1,4,26,'maker','Design/ consultant approval is not taken on the deviations','item-1763464432851-dtwwq','pending',NULL,6,NULL,NULL,'2025-11-19 04:11:09.508','2025-11-19 04:11:09.508');
/*!40000 ALTER TABLE `tbl_wir_checkpoints` ENABLE KEYS */;
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
