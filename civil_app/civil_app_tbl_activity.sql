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
-- Table structure for table `tbl_activity`
--

DROP TABLE IF EXISTS `tbl_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_activity_slug_key` (`slug`),
  KEY `idx_activity_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_activity`
--

LOCK TABLES `tbl_activity` WRITE;
/*!40000 ALTER TABLE `tbl_activity` DISABLE KEYS */;
INSERT INTO `tbl_activity` VALUES (1,1,'Anti Termite Treatment','anti-termite-treatment','2025-11-19 04:11:07.478','2025-11-19 04:11:07.478','2025-10-05 04:18:14.000'),(2,1,'Excavation','excavation','2025-11-19 04:11:07.479','2025-11-19 04:11:07.479','2025-10-05 04:18:14.000'),(3,2,'Backfilling','backfilling','2025-11-19 04:11:07.480','2025-11-19 04:11:07.480','2025-10-05 04:18:14.000'),(4,2,'Reinforcement','reinforcement','2025-11-19 04:11:07.481','2025-11-19 04:11:07.481','2025-10-05 04:18:14.000'),(5,2,'Formwork','formwork','2025-11-19 04:11:07.481','2025-11-19 04:11:07.481','2025-10-05 04:18:14.000'),(6,2,'Concrete Pre & During Pour','concrete-pre-during-pour','2025-11-19 04:11:07.482','2025-11-19 04:11:07.482','2025-10-05 04:18:14.000'),(7,2,'Concrete Post Pour','concrete-post-pour','2025-11-19 04:11:07.483','2025-11-19 04:11:07.483','2025-10-05 04:18:14.000'),(8,2,'VDF','vdf','2025-11-19 04:11:07.483','2025-11-19 04:11:07.483','2025-10-05 04:18:14.000'),(9,2,'PCC','pcc','2025-11-19 04:11:07.484','2025-11-19 04:11:07.484','2025-10-05 04:18:14.000'),(10,2,'PT slab','pt-slab','2025-11-19 04:11:07.485','2025-11-19 04:11:07.485','2025-10-05 04:18:14.000'),(11,3,'Masonry (Blockwork)','masonry-blockwork','2025-11-19 04:11:07.485','2025-11-19 04:11:07.485','2025-10-05 04:18:14.000'),(12,3,'Cement Plaster','cement-plaster','2025-11-19 04:11:07.486','2025-11-19 04:11:07.486','2025-10-05 04:18:14.000'),(13,3,'Waterproofing','waterproofing','2025-11-19 04:11:07.486','2025-11-19 04:11:07.486','2025-10-05 04:18:14.000'),(14,4,'Internal Gypsum Plaster','internal-gypsum-plaster','2025-11-19 04:11:07.487','2025-11-19 04:11:07.487','2025-10-05 04:18:14.000'),(15,4,'Tile Flooring','tile-flooring','2025-11-19 04:11:07.488','2025-11-19 04:11:07.488','2025-10-05 04:18:14.000'),(16,4,'Marble Works','marble-works','2025-11-19 04:11:07.488','2025-11-19 04:11:07.488','2025-10-05 04:18:14.000'),(17,4,'Tile Dado','tile-dado','2025-11-19 04:11:07.489','2025-11-19 04:11:07.489','2025-10-05 04:18:14.000'),(18,4,'Wooden Flooring','wooden-flooring','2025-11-19 04:11:07.490','2025-11-19 04:11:07.490','2025-10-05 04:18:14.000'),(19,4,'Internal Painting','internal-painting','2025-11-19 04:11:07.491','2025-11-19 04:11:07.491','2025-10-05 04:18:14.000'),(20,4,'False Ceiling','false-ceiling','2025-11-19 04:11:07.492','2025-11-19 04:11:07.492','2025-10-05 04:18:14.000'),(21,4,'Modular Kitchen','modular-kitchen','2025-11-19 04:11:07.493','2025-11-19 04:11:07.493','2025-10-05 04:18:14.000'),(22,4,'Doors Installation','doors-installation','2025-11-19 04:11:07.493','2025-11-19 04:11:07.493','2025-10-05 04:18:14.000'),(23,4,'Kitchen Platform','kitchen-platform','2025-11-19 04:11:07.494','2025-11-19 04:11:07.494','2025-10-05 04:18:14.000'),(24,4,'Fabrication','fabrication','2025-11-19 04:11:07.495','2025-11-19 04:11:07.495','2025-10-05 04:18:14.000'),(25,4,'Vinyl Flooring','vinyl-flooring','2025-11-19 04:11:07.495','2025-11-19 04:11:07.495','2025-10-05 04:18:14.000'),(26,4,'Aluminum/ PVC Fins','aluminum-pvc-fins','2025-11-19 04:11:07.497','2025-11-19 04:11:07.497','2025-10-05 04:18:14.000'),(27,4,'PU Flooring','pu-flooring','2025-11-19 04:11:07.498','2025-11-19 04:11:07.498','2025-10-05 04:18:14.000'),(28,5,'Façade/ Windows','fa-ade-windows','2025-11-19 04:11:07.498','2025-11-19 04:11:07.498','2025-10-05 04:18:14.000'),(29,5,'External Painting','external-painting','2025-11-19 04:11:07.499','2025-11-19 04:11:07.499','2025-10-05 04:18:14.000'),(30,5,'Railing Works','railing-works','2025-11-19 04:11:07.499','2025-11-19 04:11:07.499','2025-10-05 04:18:14.000'),(31,6,'Paver Block Installation','paver-block-installation','2025-11-19 04:11:07.500','2025-11-19 04:11:07.500','2025-10-05 04:18:14.000'),(32,6,'Road Works','road-works','2025-11-19 04:11:07.501','2025-11-19 04:11:07.501','2025-10-05 04:18:14.000'),(33,6,'Landscape Works','landscape-works','2025-11-19 04:11:07.501','2025-11-19 04:11:07.501','2025-10-05 04:18:14.000'),(34,7,'Leakages','leakages','2025-11-19 04:11:07.502','2025-11-19 04:11:07.502','2025-10-05 04:18:14.000'),(35,8,'Electrical','electrical','2025-11-19 04:11:07.503','2025-11-19 04:11:07.503','2025-10-05 04:18:14.000'),(36,8,'Electrical- Light Fixtures','electrical-light-fixtures','2025-11-19 04:11:07.503','2025-11-19 04:11:07.503','2025-10-05 04:18:14.000'),(37,8,'Electrical- FAPA','electrical-fapa','2025-11-19 04:11:07.504','2025-11-19 04:11:07.504','2025-10-05 04:18:14.000'),(38,8,'Electrical- VDP Installation','electrical-vdp-installation','2025-11-19 04:11:07.504','2025-11-19 04:11:07.504','2025-10-05 04:18:14.000'),(39,8,'HVAC- Ducting & Fan Installation','hvac-ducting-fan-installation','2025-11-19 04:11:07.505','2025-11-19 04:11:07.505','2025-10-05 04:18:14.000'),(40,8,'HVAC- IDU/ ODU AC Installation','hvac-idu-odu-ac-installation','2025-11-19 04:11:07.506','2025-11-19 04:11:07.506','2025-10-05 04:18:14.000'),(41,8,'Plumbing- Supply Lines','plumbing-supply-lines','2025-11-19 04:11:07.506','2025-11-19 04:11:07.506','2025-10-05 04:18:14.000'),(42,8,'Plumbing- Drainage Lines','plumbing-drainage-lines','2025-11-19 04:11:07.507','2025-11-19 04:11:07.507','2025-10-05 04:18:14.000'),(43,8,'Plumbing- CP Sanitary Fittings','plumbing-cp-sanitary-fittings','2025-11-19 04:11:07.508','2025-11-19 04:11:07.508','2025-10-05 04:18:14.000'),(44,8,'Plumbing-Water Closet installation','plumbing-water-closet-installation','2025-11-19 04:11:07.508','2025-11-19 04:11:07.508','2025-10-05 04:18:14.000'),(45,8,'Firefighting','firefighting','2025-11-19 04:11:07.509','2025-11-19 04:11:07.509','2025-10-05 04:18:14.000'),(46,8,'Plumbing- Pump Installation','plumbing-pump-installation','2025-11-19 04:11:07.510','2025-11-19 04:11:07.510','2025-10-05 04:18:14.000'),(47,8,'Gas Pipe Works','gas-pipe-works','2025-11-19 04:11:07.510','2025-11-19 04:11:07.510','2025-10-05 04:18:14.000'),(48,8,'Elevator/Lifts','elevator-lifts','2025-11-19 04:11:07.511','2025-11-19 04:11:07.511','2025-10-05 04:18:14.000'),(49,8,'Lighting Protection System','lighting-protection-system','2025-11-19 04:11:07.512','2025-11-19 04:11:07.512','2025-10-05 04:18:14.000'),(50,8,'Diesel Generator','diesel-generator','2025-11-19 04:11:07.512','2025-11-19 04:11:07.512','2025-10-05 04:18:14.000'),(51,8,'STP/WTP','stp-wtp','2025-11-19 04:11:07.513','2025-11-19 04:11:07.513','2025-10-05 04:18:14.000'),(52,8,'Solar Panel','solar-panel','2025-11-19 04:11:07.514','2025-11-19 04:11:07.514','2025-10-05 04:18:14.000'),(53,1,'Supervision','supervision','2025-11-19 04:11:07.514','2025-11-19 04:11:07.514','2025-10-05 04:18:14.000'),(54,1,'Documentation','documentation','2025-11-19 04:11:07.515','2025-11-19 04:11:07.515','2025-10-05 04:18:14.000'),(55,1,'Material','material','2025-11-19 04:11:07.516','2025-11-19 04:11:07.516','2025-10-05 04:18:14.000'),(56,1,'Design','design','2025-11-19 04:11:07.516','2025-11-19 04:11:07.516','2025-10-05 04:18:14.000'),(62,3,'Workmanship','workmanship','2025-11-19 04:11:07.520','2025-11-19 04:11:07.520','2025-10-05 04:18:14.000'),(63,3,'Sequence','sequence','2025-11-19 04:11:07.521','2025-11-19 04:11:07.521','2025-10-05 04:18:14.000'),(302,9,'Design Test','design-test','2025-11-19 04:11:07.667','2025-11-19 04:11:07.667','2025-10-05 04:18:14.000');
/*!40000 ALTER TABLE `tbl_activity` ENABLE KEYS */;
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
