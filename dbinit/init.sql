-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cafe
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.23.04.1

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20230924153205-change-arrival-time-type.js'),('20230929101239-create-user.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Đồ uống sinh tố','2023-09-26 15:33:23','2023-09-26 15:33:23'),(3,'Trà sữa','2023-09-26 15:33:30','2023-09-26 15:33:30'),(4,'Đồ ăn mặn','2023-09-26 15:33:38','2023-09-26 15:33:38'),(5,'Đồ hải sản','2023-09-26 15:33:46','2023-09-26 15:33:46'),(6,'Đồ hải ăn liênf','2023-09-29 06:38:17','2023-09-29 06:38:17');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_inventory`
--

DROP TABLE IF EXISTS `check_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `check_inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time_check` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_inventory`
--

LOCK TABLES `check_inventory` WRITE;
/*!40000 ALTER TABLE `check_inventory` DISABLE KEYS */;
INSERT INTO `check_inventory` VALUES (1,'2023-09-28 10:45:33','2023-09-29 01:46:35','2023-09-29 01:46:35'),(2,'2023-09-28 11:45:33','2023-09-29 01:47:03','2023-09-29 01:47:03'),(3,'2023-09-28 13:45:33','2023-09-29 01:47:08','2023-09-29 01:47:08'),(4,'2023-09-28 00:45:33','2023-09-29 01:47:14','2023-09-29 01:47:14'),(5,'2023-09-28 00:45:33','2023-09-29 01:51:42','2023-09-29 01:51:42'),(6,'2023-09-28 16:45:33','2023-09-29 02:12:45','2023-09-29 02:12:45'),(7,'2023-09-28 16:45:33','2023-09-29 02:15:45','2023-09-29 02:15:45'),(8,'2023-09-28 16:45:33','2023-09-29 02:16:38','2023-09-29 02:16:38'),(9,'2023-09-28 16:45:33','2023-09-29 02:17:39','2023-09-29 02:17:39'),(10,'2023-05-10 16:45:33','2023-09-29 07:53:32','2023-10-06 01:39:21'),(11,'2023-09-28 16:45:33','2023-09-29 08:56:44','2023-09-29 08:56:44'),(12,'2023-09-28 16:45:33','2023-09-29 08:57:24','2023-09-29 08:57:24'),(13,'2023-09-28 16:45:33','2023-09-29 09:00:44','2023-09-29 09:00:44'),(14,'2023-09-28 16:45:33','2023-09-29 09:02:51','2023-09-29 09:02:51'),(15,'2023-09-28 16:45:33','2023-09-29 09:08:34','2023-09-29 09:08:34'),(16,'2023-09-28 16:45:33','2023-09-29 09:12:41','2023-09-29 09:12:41'),(17,'2023-09-28 16:45:33','2023-09-29 09:15:02','2023-09-29 09:15:02'),(18,'2023-05-10 16:45:33','2023-10-05 06:04:11','2023-10-05 06:04:11'),(19,'2023-05-10 16:45:33','2023-10-05 06:05:32','2023-10-05 06:05:32'),(20,'2023-05-10 16:45:33','2023-10-05 06:07:19','2023-10-05 06:07:19'),(21,'2023-05-10 16:45:33','2023-10-05 06:07:55','2023-10-05 06:07:55'),(22,'2023-05-10 16:45:33','2023-10-05 06:08:34','2023-10-05 06:08:34'),(23,'2023-05-10 16:45:33','2023-10-05 06:09:22','2023-10-05 06:09:22'),(24,'2023-05-10 16:45:33','2023-10-05 06:11:42','2023-10-05 06:11:42'),(25,'2023-05-10 16:45:33','2023-10-05 06:12:17','2023-10-05 06:12:17'),(26,'2023-05-10 16:45:33','2023-10-05 06:12:39','2023-10-05 06:12:39'),(27,'2023-05-10 16:45:33','2023-10-05 06:12:44','2023-10-05 06:12:44'),(28,'2023-05-10 16:45:33','2023-10-05 06:15:11','2023-10-05 06:15:11'),(29,'2023-05-10 16:45:33','2023-10-05 06:20:23','2023-10-05 06:20:23'),(30,'2023-05-10 16:45:33','2023-10-05 06:23:40','2023-10-05 06:23:40'),(31,'2023-05-10 16:45:33','2023-10-05 06:24:38','2023-10-05 06:24:38'),(32,'2023-05-10 16:45:33','2023-10-05 06:24:48','2023-10-05 06:24:48'),(33,'2023-05-10 16:45:33','2023-10-05 06:25:16','2023-10-05 06:25:16'),(34,'2023-05-10 16:45:33','2023-10-05 06:25:43','2023-10-05 06:25:43'),(35,'2023-05-10 16:45:33','2023-10-05 06:25:54','2023-10-05 06:25:54'),(36,'2023-05-10 16:45:33','2023-10-05 06:26:37','2023-10-05 06:26:37'),(37,'2023-05-10 16:45:33','2023-10-05 06:27:51','2023-10-05 06:27:51'),(38,'2023-05-10 16:45:33','2023-10-05 06:28:17','2023-10-05 06:28:17'),(39,'2023-05-10 16:45:33','2023-10-05 06:28:32','2023-10-05 06:28:32'),(40,'2023-05-10 16:45:33','2023-10-05 06:29:11','2023-10-05 06:29:11'),(41,'2023-05-10 16:45:33','2023-10-05 06:29:58','2023-10-05 06:29:58'),(42,'2023-05-10 16:45:33','2023-10-05 06:30:13','2023-10-05 06:30:13'),(43,'2023-05-10 16:45:33','2023-10-05 06:30:42','2023-10-05 06:30:42'),(44,'2023-05-10 16:45:33','2023-10-05 06:31:52','2023-10-05 06:31:52'),(45,'2023-05-10 16:45:33','2023-10-05 06:32:12','2023-10-05 06:32:12'),(46,'2023-05-10 16:45:33','2023-10-05 06:33:17','2023-10-05 06:33:17'),(47,'2023-05-10 16:45:33','2023-10-05 06:33:32','2023-10-05 06:33:32'),(49,'2023-05-10 16:45:33','2023-10-05 06:35:17','2023-10-05 06:35:17'),(50,'2023-05-10 16:45:33','2023-10-05 06:39:00','2023-10-05 06:39:00');
/*!40000 ALTER TABLE `check_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
INSERT INTO `combo` VALUES (2,'Com bo siêu hot',3493840,'2023-09-26 08:33:19','2023-09-26 08:33:19'),(3,'Com bo mì, gà,bò ',3493840,'2023-09-26 08:33:33','2023-09-26 08:33:33'),(4,'Com bo cháo, lợn,bò ',3493840,'2023-09-26 08:33:40','2023-09-26 08:33:40'),(5,'Com bo tiết canh, lòng lợn ',3493840,'2023-09-26 08:33:59','2023-09-26 08:33:59'),(7,'Com bo tiết canh, lòng lợn ',200000,'2023-09-28 00:56:52','2023-09-28 00:58:23'),(8,'Com bo tiết canh, lòng lợn ',3493840,'2023-10-05 02:27:11','2023-10-05 02:27:11'),(9,'Com bo tiết canh, lòng lợn ',3493840,'2023-10-05 02:28:18','2023-10-05 02:28:18');
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` tinyint DEFAULT '1',
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `point` bigint DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Trung Nguyen',1,'trungnguyen@gmail.com','0971259398',20,'2023-09-25 00:36:36','2023-09-25 00:37:47'),(3,'Duy Anh',1,'duyanh@gmail.com','0971259398',0,'2023-09-25 00:37:01','2023-09-25 00:37:01');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_check_inventory`
--

DROP TABLE IF EXISTS `detail_check_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_check_inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_material` bigint NOT NULL,
  `id_detail_check` bigint NOT NULL,
  `total_count` float DEFAULT '0',
  `actual_count` float DEFAULT '0',
  `shortage_count` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_material` (`id_material`),
  KEY `id_detail_check` (`id_detail_check`),
  CONSTRAINT `detail_check_inventory_ibfk_1` FOREIGN KEY (`id_material`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_check_inventory_ibfk_2` FOREIGN KEY (`id_detail_check`) REFERENCES `check_inventory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_check_inventory`
--

LOCK TABLES `detail_check_inventory` WRITE;
/*!40000 ALTER TABLE `detail_check_inventory` DISABLE KEYS */;
INSERT INTO `detail_check_inventory` VALUES (9,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(10,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(11,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(12,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(17,2,50,20,5,15,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(18,3,50,34,5,29,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(19,6,50,25.5,5,20.5,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(20,7,50,34,5,29,'2023-10-05 06:39:00','2023-10-05 06:39:00');
/*!40000 ALTER TABLE `detail_check_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_combo`
--

DROP TABLE IF EXISTS `detail_combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_combo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_combo` bigint NOT NULL,
  `check_bonus` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_combo` (`id_combo`),
  CONSTRAINT `detail_combo_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detail_combo_ibfk_2` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_combo`
--

LOCK TABLES `detail_combo` WRITE;
/*!40000 ALTER TABLE `detail_combo` DISABLE KEYS */;
INSERT INTO `detail_combo` VALUES (9,2,7,1,'2023-09-28 00:58:23','2023-09-28 00:58:23'),(13,2,9,0,'2023-10-05 02:28:18','2023-10-05 02:28:18'),(14,5,9,1,'2023-10-05 02:28:18','2023-10-05 02:28:18');
/*!40000 ALTER TABLE `detail_combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_shipment`
--

DROP TABLE IF EXISTS `detail_shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_shipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_shipment` bigint NOT NULL,
  `id_material` bigint NOT NULL,
  `amount` float DEFAULT '0',
  `price` float DEFAULT '0',
  `expiration_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_shipment` (`id_shipment`),
  KEY `id_material` (`id_material`),
  CONSTRAINT `detail_shipment_ibfk_1` FOREIGN KEY (`id_shipment`) REFERENCES `shipment` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `detail_shipment_ibfk_2` FOREIGN KEY (`id_material`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_shipment`
--

LOCK TABLES `detail_shipment` WRITE;
/*!40000 ALTER TABLE `detail_shipment` DISABLE KEYS */;
INSERT INTO `detail_shipment` VALUES (1,1,3,20,3000,'2023-09-28 16:17:31','2023-09-29 01:19:29','2023-09-29 01:19:29'),(3,1,6,21,243240,'2023-09-28 16:17:31','2023-09-29 01:19:29','2023-09-29 01:19:29'),(4,1,8,30,300980,'2023-09-28 16:17:31','2023-09-29 01:19:29','2023-09-29 01:19:29'),(6,1,6,21,3535350000,'2023-09-28 16:17:31','2023-10-08 15:20:37','2023-10-08 15:20:37'),(7,1,6,21,3535350000,'2023-09-28 16:17:31','2023-10-08 15:21:38','2023-10-08 15:21:38'),(9,1,6,10,24322,'2023-09-28 16:17:31','2023-10-08 15:23:40','2023-10-08 17:44:31'),(10,2,3,20,3000,'2023-09-28 16:17:31','2023-10-08 15:56:49','2023-10-08 15:56:49'),(11,2,4,15,300230,'2023-09-28 16:17:31','2023-10-08 15:56:49','2023-10-08 15:56:49'),(12,3,7,50,243240,'2023-09-28 16:17:31','2023-10-08 17:35:59','2023-10-08 17:39:31'),(13,3,8,30,300980,'2023-09-28 16:17:31','2023-10-08 17:35:59','2023-10-08 17:39:31'),(14,4,4,10,200000,'2025-01-22 17:00:00','2023-10-09 17:03:46','2023-10-09 17:03:46'),(15,4,2,10,100000,'2025-06-13 17:00:00','2023-10-09 17:03:46','2023-10-09 17:03:46'),(16,4,3,10,120000,'2024-07-24 17:00:00','2023-10-09 17:03:46','2023-10-09 17:03:46'),(17,5,4,10,200000,'2025-01-22 17:00:00','2023-10-10 00:21:06','2023-10-10 00:21:06'),(18,5,2,10,100000,'2025-06-13 17:00:00','2023-10-10 00:21:06','2023-10-10 00:21:06'),(19,5,3,10,120000,'2024-07-24 17:00:00','2023-10-10 00:21:06','2023-10-10 00:21:06');
/*!40000 ALTER TABLE `detail_shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT '1',
  `phone_number` varchar(255) DEFAULT NULL,
  `id_position` varchar(10) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `id_position` (`id_position`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`id_position`) REFERENCES `position` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'hntreant23','$2b$10$FWRxaWC5oT.GTyqx06UiFOCczgyv/ne/VuL6PJ1srV5O4VaDAEKhG','hntreant23@gmail.com',NULL,'Hưng Nhân , Hưng Hà, Thái Bình',1,'0971259398','A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhudHJlYW50MjNAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJBIiwidXNlcm5hbWUiOiJobnRyZWFudDIzIiwiaWF0IjoxNzA3MDYwNzIzLCJleHAiOjE3MzI5ODA3MjN9.XiZ1_zt2GbSw5OUwxU0xFq1Qa95My6EC9U4AvWzSSX0','2023-09-25 00:20:27','2024-02-04 15:32:03',''),(2,'hntreant24','$2b$10$UK2AKrg4MfctXf6pDn3tc.tdRc9dVihxZOqBlYAgh6.Pkj7Hd0kdS','hntreant24@gmail.com',NULL,'Hưng Nhân , Hưng Hà, Thái Bình',1,'0971259398','U','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhudHJlYW50MjRAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJVIiwidXNlcm5hbWUiOiJobnRyZWFudDI0IiwiaWF0IjoxNjk2NTU2MDQ3LCJleHAiOjE3MjI0NzYwNDd9.4FE2lg5gJdScbgThwROZedtZCqpSLGfegOBG_3eNt8I','2023-09-25 00:20:40','2023-10-06 01:34:07',''),(3,'hntreant25','$2b$10$hun4/TI637/CRAAJbfTZYO9dcpegl71nFvzejN0TvRRYrvdyC8.D2','hntreant25@gmail.com',NULL,NULL,1,NULL,'M',NULL,'2023-09-25 00:20:47','2023-09-25 00:20:47',''),(4,'hntreant26','$2b$10$UVStXn8uqnuhdDvrAPX8DOPebDtEKTe5ZErpm9vI5lwgkjI8in0IK','hntreant26@gmail.com',NULL,NULL,1,NULL,'M',NULL,'2023-09-29 10:13:45','2023-09-29 10:13:45','Hoang Nam');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_workshift`
--

DROP TABLE IF EXISTS `employee_workshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_workshift` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_workshift` bigint DEFAULT NULL,
  `id_employee` bigint DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_workshift` (`id_workshift`),
  KEY `id_employee` (`id_employee`),
  CONSTRAINT `employee_workshift_ibfk_1` FOREIGN KEY (`id_workshift`) REFERENCES `workshift` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_workshift_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_workshift`
--

LOCK TABLES `employee_workshift` WRITE;
/*!40000 ALTER TABLE `employee_workshift` DISABLE KEYS */;
INSERT INTO `employee_workshift` VALUES (1,3,2,'2023-09-25 00:22:02','2023-09-25 00:22:02'),(2,1,2,'2023-09-25 00:22:02','2023-09-25 00:22:02');
/*!40000 ALTER TABLE `employee_workshift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_employee` bigint DEFAULT NULL,
  `id_customer` bigint DEFAULT NULL,
  `id_promotion` bigint DEFAULT NULL,
  `price` float DEFAULT '0',
  `time_pay` datetime DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_employee` (`id_employee`),
  KEY `id_customer` (`id_customer`),
  KEY `id_promotion` (`id_promotion`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (3,1,3,1,180000,NULL,1,'2023-09-25 12:28:05','2023-10-02 16:45:30'),(4,1,3,1,0,NULL,1,'2023-09-25 13:07:17','2023-10-02 16:45:38'),(5,1,3,1,383823,NULL,0,'2023-10-02 12:29:47','2023-10-03 04:23:11'),(6,1,3,1,0,NULL,0,'2023-10-02 13:53:40','2023-10-02 13:53:40'),(7,1,3,1,0,NULL,0,'2023-10-02 13:55:07','2023-10-02 13:55:07'),(8,1,3,1,0,NULL,0,'2023-10-02 13:55:38','2023-10-02 13:55:38'),(9,1,3,1,0,NULL,0,'2023-10-02 13:56:06','2023-10-02 13:56:06'),(10,1,3,1,120000,NULL,0,'2023-10-02 13:59:09','2023-10-02 13:59:09'),(14,1,3,1,110221,NULL,0,'2023-10-03 08:36:01','2023-10-03 08:36:02'),(16,1,NULL,NULL,0,NULL,0,'2023-10-04 03:48:39','2023-10-04 03:48:39'),(17,1,NULL,NULL,0,NULL,0,'2023-10-04 03:54:59','2023-10-04 03:54:59'),(18,1,NULL,NULL,0,NULL,0,'2023-10-04 03:56:01','2023-10-04 03:56:01'),(19,1,NULL,NULL,0,NULL,0,'2023-10-04 03:56:26','2023-10-04 03:56:26'),(20,1,NULL,NULL,0,NULL,0,'2023-10-04 03:57:04','2023-10-04 03:57:04'),(21,1,NULL,NULL,0,NULL,0,'2023-10-04 03:57:35','2023-10-04 03:57:35'),(22,1,NULL,NULL,20000,NULL,0,'2023-10-04 03:58:05','2023-10-04 03:58:05'),(23,1,NULL,NULL,0,NULL,0,'2023-10-04 04:03:08','2023-10-04 04:03:08'),(24,1,NULL,NULL,0,NULL,0,'2023-10-04 04:04:01','2023-10-04 04:04:01'),(25,1,NULL,NULL,0,NULL,0,'2023-10-04 04:04:25','2023-10-04 04:04:25'),(26,1,NULL,NULL,0,NULL,0,'2023-10-04 04:04:45','2023-10-04 04:04:45'),(27,1,NULL,NULL,10000,NULL,0,'2023-10-04 04:05:07','2023-10-04 04:05:07'),(28,1,3,1,110221,NULL,0,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(29,1,NULL,NULL,10000,NULL,0,'2023-10-04 04:08:10','2023-10-04 04:08:10'),(30,1,NULL,NULL,20000,NULL,0,'2023-10-04 04:14:21','2023-10-04 04:14:21'),(31,1,NULL,NULL,20000,NULL,0,'2023-10-04 04:19:59','2023-10-04 04:19:59'),(32,1,3,1,80221,NULL,0,'2023-10-04 07:43:42','2023-10-04 07:48:57'),(33,1,NULL,NULL,20000,NULL,1,'2023-10-04 07:47:05','2023-10-05 03:07:53'),(34,1,NULL,NULL,20000,NULL,0,'2023-10-04 07:48:57','2023-10-04 07:48:57'),(35,1,3,1,60000,'2023-10-05 01:53:00',1,'2023-10-04 07:53:18','2023-10-05 01:53:00'),(36,1,NULL,NULL,20000,NULL,0,'2023-10-04 07:53:43','2023-10-04 07:53:43'),(37,1,NULL,NULL,20000,NULL,0,'2023-10-04 08:07:49','2023-10-04 08:07:49'),(38,1,3,1,86787,NULL,0,'2023-10-05 02:29:04','2023-10-05 02:29:04'),(39,1,3,1,0,NULL,0,'2023-10-06 01:45:50','2023-10-06 01:45:50'),(40,1,3,1,0,NULL,0,'2023-10-06 01:46:13','2023-10-06 01:46:13'),(41,1,3,1,0,NULL,0,'2023-11-12 06:00:46','2023-11-12 06:00:46'),(42,1,3,1,0,NULL,0,'2023-11-12 06:02:49','2023-11-12 06:02:49'),(43,1,3,1,0,NULL,0,'2023-11-12 06:03:18','2023-11-12 06:03:18'),(44,1,3,1,0,NULL,0,'2023-11-12 06:04:52','2023-11-12 06:04:52'),(45,1,3,1,0,NULL,0,'2023-11-12 06:07:14','2023-11-12 06:07:14'),(46,1,3,1,0,NULL,0,'2023-11-12 06:07:52','2023-11-12 06:07:52'),(47,1,3,1,86787,NULL,0,'2023-11-12 06:09:22','2023-11-12 06:09:22');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_detail`
--

DROP TABLE IF EXISTS `invoice_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_invoice` bigint NOT NULL,
  `id_product` bigint DEFAULT NULL,
  `id_combo` bigint DEFAULT NULL,
  `isCombo` tinyint(1) DEFAULT '0',
  `price` float DEFAULT '0',
  `amount` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_invoice` (`id_invoice`),
  KEY `id_product` (`id_product`),
  KEY `id_combo` (`id_combo`),
  CONSTRAINT `invoice_detail_ibfk_1` FOREIGN KEY (`id_invoice`) REFERENCES `invoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoice_detail_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_detail_ibfk_3` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_detail`
--

LOCK TABLES `invoice_detail` WRITE;
/*!40000 ALTER TABLE `invoice_detail` DISABLE KEYS */;
INSERT INTO `invoice_detail` VALUES (14,10,9,NULL,0,40000,3,'2023-10-02 13:59:09','2023-10-02 13:59:09'),(35,5,NULL,2,1,160000,11,'2023-10-03 04:23:11','2023-10-03 04:23:11'),(36,5,8,NULL,0,120000,8,'2023-10-03 04:23:11','2023-10-03 04:23:11'),(37,5,NULL,5,1,80000,8,'2023-10-03 04:23:11','2023-10-03 04:23:11'),(38,5,NULL,7,1,23823,2,'2023-10-03 04:23:11','2023-10-03 04:23:11'),(48,23,NULL,2,0,10000,1,'2023-10-04 04:03:08','2023-10-04 04:03:08'),(49,24,NULL,2,0,10000,1,'2023-10-04 04:04:02','2023-10-04 04:04:02'),(50,25,NULL,2,0,10000,1,'2023-10-04 04:04:25','2023-10-04 04:04:25'),(51,26,NULL,2,0,10000,1,'2023-10-04 04:04:45','2023-10-04 04:04:45'),(52,27,NULL,2,0,10000,1,'2023-10-04 04:05:07','2023-10-04 04:05:07'),(56,28,NULL,2,0,43243,3,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(57,28,8,NULL,0,43544,2,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(58,28,NULL,5,1,23434,2,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(59,29,NULL,2,0,10000,1,'2023-10-04 04:08:10','2023-10-04 04:08:10'),(60,30,NULL,2,0,10000,1,'2023-10-04 04:14:21','2023-10-04 04:14:21'),(61,30,8,NULL,0,10000,1,'2023-10-04 04:14:21','2023-10-04 04:14:21'),(65,31,NULL,2,0,10000,1,'2023-10-04 04:19:59','2023-10-04 04:19:59'),(66,31,8,NULL,0,10000,1,'2023-10-04 04:19:59','2023-10-04 04:19:59'),(67,32,NULL,2,1,23243,1,'2023-10-04 07:43:42','2023-10-04 07:48:57'),(70,33,NULL,2,0,10000,1,'2023-10-04 07:47:05','2023-10-04 07:47:05'),(71,33,8,NULL,0,10000,1,'2023-10-04 07:47:05','2023-10-04 07:47:05'),(72,34,NULL,2,0,10000,1,'2023-10-04 07:48:57','2023-10-04 07:48:57'),(73,34,8,NULL,0,10000,1,'2023-10-04 07:48:57','2023-10-04 07:48:57'),(74,35,NULL,2,1,23243,1,'2023-10-04 07:53:18','2023-10-04 08:07:49'),(77,36,NULL,2,0,10000,1,'2023-10-04 07:53:43','2023-10-04 07:53:43'),(78,36,8,NULL,0,10000,1,'2023-10-04 07:53:43','2023-10-04 07:53:43'),(79,37,NULL,2,0,10000,1,'2023-10-04 08:07:49','2023-10-04 08:07:49'),(80,37,8,NULL,0,10000,1,'2023-10-04 08:07:49','2023-10-04 08:07:49'),(81,38,NULL,9,1,43243,3,'2023-10-05 02:29:04','2023-10-05 02:29:04'),(82,38,2,NULL,0,43544,2,'2023-10-05 02:29:04','2023-10-05 02:29:04'),(83,47,NULL,9,1,43243,3,'2023-11-12 06:09:22','2023-11-12 06:09:22'),(84,47,2,NULL,0,43544,2,'2023-11-12 06:09:22','2023-11-12 06:09:22');
/*!40000 ALTER TABLE `invoice_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT '0',
  `unit` varchar(20) DEFAULT NULL,
  `expriation_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (2,'đường',NULL,40,'kg','2023-09-25 00:00:00','2023-09-28 02:24:51','2023-10-10 00:21:06'),(3,'muối',NULL,74,'kg','2023-09-25 00:00:00','2023-09-28 02:25:05','2023-10-10 00:21:06'),(4,'gạo',NULL,65,'kg','2023-09-25 00:00:00','2023-09-28 02:25:12','2023-10-10 00:21:06'),(5,'ổi',NULL,30,'kg','2023-09-25 00:00:00','2023-09-28 02:25:19','2023-09-28 02:25:19'),(6,'chim',NULL,98.5,'kg','2023-09-25 00:00:00','2023-09-28 02:25:27','2023-10-08 17:44:31'),(7,'trân châu',NULL,84,'kg','2023-09-25 00:00:00','2023-09-28 02:25:35','2023-10-08 17:39:31'),(8,'Tinh bột',NULL,40,'kg',NULL,'2023-09-28 15:53:19','2023-10-08 17:39:31'),(9,'Tinh bột',NULL,30,'kg',NULL,'2023-09-29 06:50:42','2023-09-29 06:50:42'),(10,'Gaoj nep',NULL,30,'kg',NULL,'2023-09-29 07:05:41','2023-09-29 07:05:41'),(11,'test',NULL,10,'kg',NULL,'2023-10-02 13:50:34','2023-10-02 13:50:34');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES ('A','Admin','2023-09-25 00:20:21','2023-09-25 00:20:21'),('M','Manager','2023-09-25 00:20:12','2023-09-25 00:20:12'),('U','User','2023-09-25 00:20:04','2023-09-25 00:20:04');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `id_category` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'cafe trứng',NULL,NULL,33842,'cốc',2,'2023-09-26 16:40:25','2023-10-02 15:27:32'),(3,'cafe dao fjehfef',NULL,NULL,20000,'cốc',2,'2023-09-26 16:40:34','2023-09-26 16:40:34'),(5,'Trà sữa matcha',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/c9ca9148a60a4f54161b-1695748417776.jpg',33842,'cốc',2,'2023-09-26 17:02:01','2023-09-28 04:13:54'),(7,'Trà sữa matcha thái',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/istockphoto-1132210164-612x612-1695860464442.jpg',393434,'cốc',2,'2023-09-28 00:21:04','2023-09-28 00:21:06'),(8,'Trà sữa matcha thái traf dao am',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/hinh-anh-Harry-potter-va-quan-doan-Dumbledore-1695873859277.jpg',33842,'cốc',2,'2023-09-28 04:04:19','2023-09-28 04:14:54'),(9,'test product',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/harry-potter-va-hon-da-phu-thuy_966-1696254714265.jpg',483734,'cốc',2,'2023-10-02 13:51:54','2023-10-02 13:51:56');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_product` bigint DEFAULT NULL,
  `condition` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'Khuyến mãi mua 1 tặng 1',2,NULL,NULL,'2023-09-25 00:35:53','2023-09-25 00:35:53'),(2,'Khuyến mãi mua 2 tặng 1',3,NULL,NULL,'2023-09-25 00:36:00','2023-09-25 00:36:00'),(3,'HUFheunnnnn Hoag Nam',2,20000,NULL,'2023-10-04 11:56:52','2023-10-04 11:56:52'),(4,'Nguyen NAm pro',2,30000,NULL,'2023-10-04 11:57:06','2023-10-04 11:57:06');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_supplier` bigint DEFAULT NULL,
  `id_employee` bigint DEFAULT NULL,
  `price` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_supplier` (`id_supplier`),
  KEY `id_employee` (`id_employee`),
  CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (1,1,2,847450,'2023-09-29 01:19:29','2023-09-29 01:19:29'),(2,1,2,303230,'2023-10-08 15:56:49','2023-10-08 15:56:49'),(3,1,2,544220,'2023-10-08 17:35:59','2023-10-08 17:39:31'),(4,7,1,420000,'2023-10-09 17:03:45','2023-10-09 17:03:46'),(5,7,1,420000,'2023-10-10 00:21:06','2023-10-10 00:21:06');
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Hoang Nam','Hung Nhan Huwng ha','0937434434','quangminh@gmail.com','2023-09-28 15:34:45','2023-09-28 15:37:25'),(3,'Trung Nguyen','Hung Nhan Huwng ha','093434434','hntreant@24gmail.com','2023-09-28 15:35:17','2023-09-28 15:35:17'),(4,'Ba Nam','Binh Phuoc','0387534','banam23@gmail.com','2023-09-28 15:35:45','2023-09-28 15:35:45'),(5,'Chu Manh Hung','Lang Son','09845355','manhhung@gmail.com','2023-09-28 15:36:18','2023-09-28 15:36:18'),(6,'Duong Quang Minh','Ho Chi Minh','03493434','qungminh@gmail.com','2023-09-28 15:36:44','2023-09-28 15:36:44'),(7,'Nguyễn Khôi Nguyên','Đông Hưng, Thái Bình','0354877458','nknguyen@gmail.com','2023-10-09 17:03:45','2023-10-09 17:03:45');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_food`
--

DROP TABLE IF EXISTS `table_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_food` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `status` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_food`
--

LOCK TABLES `table_food` WRITE;
/*!40000 ALTER TABLE `table_food` DISABLE KEYS */;
INSERT INTO `table_food` VALUES (1,'Bàn 1',0,'2023-10-03 08:16:05','2023-10-05 01:53:00'),(2,'Bàn 2',0,'2023-10-03 08:16:09','2023-10-05 01:53:00'),(3,'Bàn 3',0,'2023-10-03 08:16:12','2023-10-03 08:16:12'),(4,'Bàn 4',1,'2023-10-03 08:16:26','2023-10-03 08:16:51'),(5,'Bàn 5',1,'2023-10-03 08:17:00','2023-10-03 08:17:00'),(6,'Bàn 6',1,'2023-10-03 08:17:05','2023-10-03 08:17:05'),(7,'Bàn 7',1,'2023-10-03 08:17:10','2023-10-03 08:17:10'),(8,'Bàn 8',1,'2023-10-03 08:17:17','2023-10-03 08:17:17');
/*!40000 ALTER TABLE `table_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_food_invoice`
--

DROP TABLE IF EXISTS `table_food_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_food_invoice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_table` bigint NOT NULL,
  `id_invoice` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_table` (`id_table`),
  KEY `id_invoice` (`id_invoice`),
  CONSTRAINT `table_food_invoice_ibfk_1` FOREIGN KEY (`id_table`) REFERENCES `table_food` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `table_food_invoice_ibfk_2` FOREIGN KEY (`id_invoice`) REFERENCES `invoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_food_invoice`
--

LOCK TABLES `table_food_invoice` WRITE;
/*!40000 ALTER TABLE `table_food_invoice` DISABLE KEYS */;
INSERT INTO `table_food_invoice` VALUES (1,1,14,'2023-10-03 08:36:02','2023-10-03 08:36:02'),(2,2,14,'2023-10-03 08:36:02','2023-10-03 08:36:02'),(3,3,14,'2023-10-03 08:36:02','2023-10-03 08:36:02'),(10,7,4,'2023-10-03 08:52:02','2023-10-03 08:52:02'),(11,5,4,'2023-10-03 08:52:02','2023-10-03 08:52:02'),(12,6,4,'2023-10-03 08:52:02','2023-10-03 08:52:02'),(16,1,28,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(17,2,28,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(18,3,28,'2023-10-04 04:07:26','2023-10-04 04:07:26'),(19,1,32,'2023-10-04 07:43:42','2023-10-04 07:43:42'),(20,2,32,'2023-10-04 07:43:42','2023-10-04 07:43:42'),(21,1,35,'2023-10-04 07:53:18','2023-10-04 07:53:18'),(22,2,35,'2023-10-04 07:53:18','2023-10-04 07:53:18'),(23,1,38,'2023-10-05 02:29:04','2023-10-05 02:29:04'),(24,2,38,'2023-10-05 02:29:04','2023-10-05 02:29:04'),(25,1,47,'2023-11-12 06:09:22','2023-11-12 06:09:22'),(26,2,47,'2023-11-12 06:09:22','2023-11-12 06:09:22');
/*!40000 ALTER TABLE `table_food_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_material`
--

DROP TABLE IF EXISTS `use_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_material` bigint NOT NULL,
  `amount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_material` (`id_material`),
  CONSTRAINT `use_material_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `use_material_ibfk_2` FOREIGN KEY (`id_material`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_material`
--

LOCK TABLES `use_material` WRITE;
/*!40000 ALTER TABLE `use_material` DISABLE KEYS */;
INSERT INTO `use_material` VALUES (4,5,6,0.5,'2023-09-28 04:13:54','2023-09-28 04:13:54'),(5,5,7,0.3,'2023-09-28 04:13:54','2023-09-28 04:13:54'),(8,8,6,0.5,'2023-09-28 04:14:54','2023-09-28 04:14:54'),(9,8,3,0.3,'2023-09-28 04:14:54','2023-09-28 04:14:54'),(10,9,11,10,'2023-10-02 13:51:54','2023-10-02 13:51:54'),(11,2,6,0.5,'2023-10-02 15:27:32','2023-10-02 15:27:32'),(12,2,3,0.3,'2023-10-02 15:27:32','2023-10-02 15:27:32');
/*!40000 ALTER TABLE `use_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshift`
--

DROP TABLE IF EXISTS `workshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshift` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `arrival_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshift`
--

LOCK TABLES `workshift` WRITE;
/*!40000 ALTER TABLE `workshift` DISABLE KEYS */;
INSERT INTO `workshift` VALUES (1,'06:09:00','12:09:31','2023-09-25 00:21:31','2023-09-25 00:21:31'),(2,'12:09:00','17:09:31','2023-09-25 00:21:37','2023-09-25 00:21:37'),(3,'17:09:00','22:09:31','2023-09-25 00:21:43','2023-09-25 00:21:43');
/*!40000 ALTER TABLE `workshift` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-04 22:38:48
