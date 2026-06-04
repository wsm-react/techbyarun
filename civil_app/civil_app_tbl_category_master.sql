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
-- Table structure for table `tbl_category_master`
--

DROP TABLE IF EXISTS `tbl_category_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_category_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_category_master_name_key` (`name`),
  UNIQUE KEY `tbl_category_master_slug_key` (`slug`),
  KEY `idx_category_parent` (`parent_id`),
  KEY `idx_category_slug` (`slug`),
  CONSTRAINT `tbl_category_master_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `tbl_category_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category_master`
--

LOCK TABLES `tbl_category_master` WRITE;
/*!40000 ALTER TABLE `tbl_category_master` DISABLE KEYS */;
INSERT INTO `tbl_category_master` VALUES (1,'NC','nc','NC',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.456','2025-11-19 04:11:07.456'),(2,'RCC','rcc','RCC',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.458','2025-11-19 04:11:07.458'),(3,'Shell Works','shell-works','Shell Works',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.460','2025-11-19 04:11:07.460'),(4,'Finishing','finishing','Finishing',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.461','2025-11-19 04:11:07.461'),(5,'Façade','fa-ade','Façade',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.463','2025-11-19 04:11:07.463'),(6,'External Development','external-development','External Development',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.465','2025-11-19 04:11:07.465'),(7,'Leakages','leakages','Leakages',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.466','2025-11-19 04:11:07.466'),(8,'MEP','mep','MEP',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.467','2025-11-19 04:11:07.467'),(9,'New Trade','new-trade','New Trade',NULL,'2025-10-05 04:18:14.000','2025-11-19 04:11:07.469','2025-11-19 04:11:07.469'),(10,'Updated Category Name','updated-category-name','Updated description',NULL,'2025-11-19 04:51:16.974','2025-11-19 04:51:16.954','2025-11-19 04:51:16.975'),(12,'Test Category 1763528323668','test-category-1763528323668','Test Description',NULL,'2025-11-19 04:58:43.675','2025-11-19 04:58:43.675','2025-11-19 04:58:43.675'),(14,'Test Category 1763631303137','test-category-1763631303137','Test Description',NULL,'2025-11-20 09:35:03.152','2025-11-20 09:35:03.152','2025-11-20 09:35:03.152'),(16,'Test Category 1763631940385','test-category-1763631940385','Test Description',NULL,'2025-11-20 09:45:40.400','2025-11-20 09:45:40.401','2025-11-20 09:45:40.401'),(18,'Test Category 1763635872161','test-category-1763635872161','Test Description',NULL,'2025-11-20 10:51:12.187','2025-11-20 10:51:12.188','2025-11-20 10:51:12.188');
/*!40000 ALTER TABLE `tbl_category_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21  9:39:53
