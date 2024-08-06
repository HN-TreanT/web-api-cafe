-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cafe
-- ------------------------------------------------------
-- Server version	8.0.33

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Com bo siêu hot nhất','2023-09-26 15:33:23','2023-11-15 16:47:34'),(3,'Trà sữa','2023-09-26 15:33:30','2023-09-26 15:33:30'),(4,'Đồ ăn mặn','2023-09-26 15:33:38','2023-09-26 15:33:38'),(6,'Đồ ăn liền','2023-09-29 06:38:17','2023-11-15 09:24:35'),(11,'Cafe','2023-12-12 10:14:10','2023-12-12 10:14:10'),(13,'Bánh','2023-12-13 12:14:13','2023-12-13 12:14:13'),(17,'Sinh tố','2023-12-17 12:13:41','2023-12-17 12:13:41'),(18,'Đồ chiên','2023-12-17 12:23:44','2023-12-17 12:23:44'),(19,'Kem','2023-12-17 16:32:47','2023-12-17 16:32:47'),(21,'Nước ngọt','2023-12-17 17:25:54','2023-12-17 17:25:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
INSERT INTO `combo` VALUES (15,'Combo siêu hot nhất',50000,'2023-11-24 06:03:35','2023-12-18 00:39:29'),(21,'Combo trà sữa',30000,'2023-12-15 16:08:36','2023-12-18 00:39:46'),(81,'Combo ngọt ngào',79000,'2023-12-17 18:01:31','2023-12-17 18:01:31'),(86,'combo siêu hót ',102000,'2023-12-18 01:04:33','2023-12-18 01:04:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Trung Nguyên',0,'trungnguyen@gmail.com','0971259398',20,'2023-09-25 00:36:36','2023-11-22 04:13:40'),(23,'Nguyễn Hoàng Nam',0,'hoangNam@gmail.com','0971259398',0,'2023-11-20 16:16:08','2023-12-18 00:47:54'),(24,'Nguyễn Thị Hải Vân',1,'haivan33@gmail.com','0971259399',0,'2023-11-20 16:16:10','2023-12-18 00:48:15'),(25,'Nguyên Khôi Nguyên',0,'momNhom@gmail.com','0971259324',2000,'2023-11-20 16:16:13','2023-12-18 01:05:21'),(26,'Trân Nhật Hiếu',0,'nhatHieu@gmail.com','0971259423',0,'2023-11-20 16:16:16','2023-12-18 00:49:05'),(27,'Chu Mạnh Hùng',0,'chuHung@gmail.com','0971259391',0,'2023-11-20 16:16:18','2023-12-18 00:49:40'),(28,'Đỗ Phan Nhật Anh',0,'nhatAnh@gmail.com','0971259345',0,'2023-11-20 16:16:20','2023-12-18 00:50:26'),(29,'Bùi Ngọc An',0,'buiAn@gmail.com','0971259345',0,'2023-11-20 16:16:23','2023-12-18 00:51:17'),(31,'Phan Thị Hồng Thắm',0,'hongTham@gmail.com','0971251232',0,'2023-11-20 16:16:26','2023-12-18 00:53:28'),(46,'Hà Thị Ngọc Phương',0,'nPhuon@gmail.com','0324939424',0,'2023-11-20 16:17:07','2023-12-18 00:53:59'),(47,'Lý Bích Ngọc',0,'lyNgoc@gmail.com','0971259394',0,'2023-11-20 16:17:08','2023-12-18 00:54:27'),(48,'Mai Thị Hạnh Trang',0,'maiTrang@gmail.com','0971259123',0,'2023-11-20 16:17:10','2023-12-18 00:56:34'),(49,'Nguyễn Thị Hà Phương',1,'haPhuon@gmail.com','0123456789',0,'2023-11-20 16:17:12','2023-12-18 00:58:42'),(50,'Trần Thị Ngọc Khánh',1,'ngocKhanh@gmail.com','123465789',0,'2023-11-20 16:17:14','2023-12-18 00:59:24'),(51,'Nguyễn Lê Trung Hiếu',0,'trungHieu@gmail.com','0984233423',0,'2023-11-20 16:17:17','2023-12-18 01:00:13'),(52,'Đàm Thị Thu Mai',1,'damMai@gmail.com','0982312135',0,'2023-11-20 16:17:19','2023-12-18 01:01:00'),(53,'Nguyễn Đặng Diệp Anh',0,'diepNguyen@gmail.com','0971259323',0,'2023-11-20 16:17:21','2023-12-18 01:01:45'),(54,'Lê Thị Nhi',1,'nhiLe@gmail.com','0987654321',0,'2023-11-20 16:17:23','2023-12-18 01:02:10'),(55,'Hà Thuỳ Linh',1,'linhThuy@gmail.com','0231456789',0,'2023-11-20 16:17:25','2023-12-18 01:02:38'),(56,'Nguyễn Thị Thu Huyền',1,'thuHuyen@gmail.com','0971259398',0,'2023-11-20 16:17:27','2023-12-18 01:03:06'),(64,'Nam',0,'hntreant@gmail.com','083473434',0,'2023-12-18 03:08:49','2023-12-18 03:08:49'),(65,'Hoangf Nam',1,'hntreant234343@gamil.com','0384343434',0,'2023-12-18 03:41:42','2023-12-18 03:41:42'),(66,'Bá Nam',0,'banam@gmail.com','093947343',0,'2023-12-18 03:44:05','2023-12-18 03:44:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_check_inventory`
--

LOCK TABLES `detail_check_inventory` WRITE;
/*!40000 ALTER TABLE `detail_check_inventory` DISABLE KEYS */;
INSERT INTO `detail_check_inventory` VALUES (9,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(10,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(11,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(12,2,47,20,5,15,'2023-10-05 06:33:32','2023-10-05 06:33:32'),(17,2,50,20,5,15,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(18,3,50,34,5,29,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(20,7,50,34,5,29,'2023-10-05 06:39:00','2023-10-05 06:39:00'),(25,2,47,0,0,0,'2023-11-22 23:51:22','2023-11-22 23:51:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_combo`
--

LOCK TABLES `detail_combo` WRITE;
/*!40000 ALTER TABLE `detail_combo` DISABLE KEYS */;
INSERT INTO `detail_combo` VALUES (40,50,81,0,'2023-12-17 18:01:31','2023-12-17 18:01:31'),(41,61,81,0,'2023-12-17 18:01:31','2023-12-17 18:01:31'),(46,50,15,0,'2023-12-18 00:39:29','2023-12-18 00:39:29'),(47,57,15,0,'2023-12-18 00:39:29','2023-12-18 00:39:29'),(48,53,21,0,'2023-12-18 00:39:46','2023-12-18 00:39:46'),(49,51,21,0,'2023-12-18 00:39:46','2023-12-18 00:39:46'),(50,51,86,0,'2023-12-18 01:04:33','2023-12-18 01:04:33'),(51,52,86,0,'2023-12-18 01:04:33','2023-12-18 01:04:33'),(52,53,86,0,'2023-12-18 01:04:33','2023-12-18 01:04:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_shipment`
--

LOCK TABLES `detail_shipment` WRITE;
/*!40000 ALTER TABLE `detail_shipment` DISABLE KEYS */;
INSERT INTO `detail_shipment` VALUES (18,5,2,10,100000,'2025-06-25 10:00:00','2023-10-10 00:21:06','2023-12-18 02:07:10'),(19,5,3,10,120000,'2024-07-24 17:00:00','2023-10-10 00:21:06','2023-10-10 00:21:06'),(30,11,12,15,300230,'2023-09-28 16:17:31','2023-11-23 08:24:06','2023-11-23 08:24:06'),(31,13,12,15,300230,'2023-09-28 16:17:31','2023-11-23 08:24:34','2023-11-23 08:24:34'),(51,38,12,30,40000,'2023-12-26 14:10:10','2023-12-16 14:10:38','2023-12-16 14:10:38'),(55,44,2,30,40000,'2023-12-04 02:39:35','2023-12-17 02:39:36','2023-12-17 02:39:36'),(56,45,12,30,40000,'2023-12-26 03:39:19','2023-12-17 03:39:22','2023-12-17 03:39:22'),(60,56,16,12,35000,'2023-12-13 01:39:18','2023-12-18 01:41:03','2023-12-18 01:41:03'),(61,5,5,9,40009,'2024-01-03 01:52:31','2023-12-18 01:52:39','2023-12-18 01:52:53'),(62,56,3,9,30000,'2023-12-27 02:08:25','2023-12-18 02:08:26','2023-12-18 02:08:26'),(63,56,2,9,12333,'2023-12-31 02:09:45','2023-12-18 02:09:55','2023-12-18 02:09:55'),(64,57,3,200,30000,'2023-12-13 03:53:55','2023-12-18 03:53:57','2023-12-18 03:53:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'hntreant23','$2b$10$FWRxaWC5oT.GTyqx06UiFOCczgyv/ne/VuL6PJ1srV5O4VaDAEKhG','hntreant23@gmail.com','2023-11-15 01:34:39','Hưng Nhân , Hưng Hà, Thái Bình',0,'0971259398','M','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhudHJlYW50MjNAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJNIiwidXNlcm5hbWUiOiJobnRyZWFudDIzIiwiaWF0IjoxNzAzNzQ3MzcyLCJleHAiOjE3Mjk2NjczNzJ9.vQKL_q_kpumm_JvlftubETJ98xmbn5B4HmyLyMZlYic','2023-09-25 00:20:27','2023-12-28 07:09:32','hiếu vô tâm '),(2,'user','$2b$10$UK2AKrg4MfctXf6pDn3tc.tdRc9dVihxZOqBlYAgh6.Pkj7Hd0kdS','hntreant24@gmail.com','2023-11-15 15:34:39','Hưng Nhân , Hưng Hà, Thái Bình',1,'0971259398','U','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhudHJlYW50MjRAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJVIiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzAyODYxNzY5LCJleHAiOjE3Mjg3ODE3Njl9.dKB8qSQSik38qZoPYoaBxg_jaIYFBKmfWKS--1wuFws','2023-09-25 00:20:40','2023-12-18 01:09:29','hoàng văn kiệt '),(4,'phache','$2b$10$UVStXn8uqnuhdDvrAPX8DOPebDtEKTe5ZErpm9vI5lwgkjI8in0IK','hntreant26@gmail.com','2023-12-26 17:45:46','Gia Lai ',1,'0976789656','M','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhudHJlYW50MjZAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJNIiwidXNlcm5hbWUiOiJwaGFjaGUiLCJpYXQiOjE3MDI4NjE3OTUsImV4cCI6MTcyODc4MTc5NX0.3s5kRYZvbINSRv94ZiqvaamBzCdbFqDWQp26jlW3PtI','2023-09-29 10:13:45','2023-12-18 01:09:55','Hoang Nam'),(8,'haivan','1','hoangnam@gmail.com','2023-12-26 20:45:58','Đức Cơ - Gia Lai',1,'564563646','A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvYW5nbmFtQGdtYWlsLmNvbSIsImlkX3Bvc2l0aW9uIjoiQSIsInVzZXJuYW1lIjoiaGFpdmFuIiwiaWF0IjoxNzAyODU2Njg4LCJleHAiOjE3Mjg3NzY2ODh9.fAxqkf4iNgkFaQ0S8TXtiZorfvhZzhoBoOYRguWk9uo','2023-11-22 16:10:49','2023-12-18 02:36:57','Nguyễn Thị Hải vân'),(31,'nhathieu22','1','nhathieu@gmail.com','1999-01-26 17:00:00','Gia Lai',0,'09777222111','U','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5oYXRoaWV1QGdtYWlsLmNvbSIsImlkX3Bvc2l0aW9uIjoiVSIsInVzZXJuYW1lIjoibmhhdGhpZXUyMiIsImlhdCI6MTcwMjg2MDUzNiwiZXhwIjoxNzI4NzgwNTM2fQ.zs_kGul5L0gHca3GALtXgCI4P1tG6M7QiZlyc5SmsUE','2023-12-18 00:48:43','2023-12-18 02:08:20','Nhật Hiếu'),(33,'nhathieu23','1','nhathieu23@gmail.com','1999-02-10 17:00:00','Gia Lai',1,'095533423','A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5oYXRoaWV1MjNAZ21haWwuY29tIiwiaWRfcG9zaXRpb24iOiJBIiwidXNlcm5hbWUiOiJuaGF0aGlldTIzIiwiaWF0IjoxNzAyODY0ODE1LCJleHAiOjE3Mjg3ODQ4MTV9.sEnJ7bgQz9u9FMPlqTI9wNtqLJZ0sZfV4GpJFDtdN54','2023-12-18 01:01:31','2023-12-18 02:10:15','Nhật Hiếu'),(36,'admin','$2b$10$SyVFsopGjo0FoinxBWqqhOl46.1QThlkHf2iVXZq.dO6DKjGOGF4q','haivannn@gmail.com','2002-10-18 01:42:41','Đức Cơ - Gia Lai',1,'0971259323','A','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhaXZhbm5uQGdtYWlsLmNvbSIsImlkX3Bvc2l0aW9uIjoiQSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDM4NjYzMzEsImV4cCI6MTcyOTc4NjMzMX0.wri6kSOlg_qDMhSq3AKdXflli8lVWZXruZf9Lgmnb7Y','2023-12-18 02:43:10','2023-12-29 16:12:11','Nguyễn Hoàng Nam');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_workshift`
--

LOCK TABLES `employee_workshift` WRITE;
/*!40000 ALTER TABLE `employee_workshift` DISABLE KEYS */;
INSERT INTO `employee_workshift` VALUES (1,3,2,'2023-09-25 00:22:02','2023-09-25 00:22:02'),(2,1,2,'2023-09-25 00:22:02','2023-09-25 00:22:02'),(10,2,36,'2023-12-18 02:43:11','2023-12-18 02:43:11'),(11,1,36,'2023-12-18 02:43:11','2023-12-18 02:43:11');
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
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_employee` (`id_employee`),
  KEY `id_customer` (`id_customer`),
  KEY `id_promotion` (`id_promotion`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (35,1,NULL,NULL,60000,'2023-10-05 01:53:00',1,'2023-10-04 07:53:18','2023-10-05 01:53:00'),(45,2,1,24,0,'2023-12-17 11:44:00',1,'2023-12-17 11:46:24','2023-12-17 11:46:25'),(47,NULL,NULL,NULL,35000,'2023-12-17 17:15:18',1,'2023-12-17 17:11:01','2023-12-17 17:15:18'),(48,NULL,NULL,NULL,35000,'2023-12-17 17:19:06',1,'2023-12-17 17:17:24','2023-12-17 17:19:06'),(49,NULL,NULL,NULL,175000,'2023-12-17 17:44:03',1,'2023-12-17 17:35:26','2023-12-17 17:44:03'),(50,NULL,NULL,NULL,100000,'2023-12-17 17:43:54',1,'2023-12-17 17:39:31','2023-12-17 17:43:55'),(52,NULL,NULL,NULL,206000,'2023-12-17 17:45:43',1,'2023-12-17 17:44:14','2023-12-17 17:47:06'),(53,NULL,NULL,NULL,230000,'2023-12-17 17:58:16',1,'2023-12-17 17:47:32','2023-12-17 17:58:16'),(54,8,NULL,NULL,35000,'2023-12-18 00:45:35',1,'2023-12-18 00:45:25','2023-12-18 00:45:35'),(55,NULL,NULL,NULL,92000,'2023-12-18 01:10:44',1,'2023-12-18 01:10:09','2023-12-18 01:10:45'),(56,NULL,NULL,NULL,32000,'2023-12-18 01:11:32',1,'2023-12-18 01:11:08','2023-12-18 01:11:32'),(58,8,66,NULL,67000,'2023-12-18 03:44:47',1,'2023-12-18 03:43:22','2023-12-18 03:44:48'),(59,36,NULL,NULL,40000,'2023-12-18 07:37:28',1,'2023-12-18 07:36:35','2023-12-18 07:37:28'),(61,36,NULL,NULL,176000,'2023-12-28 15:41:36',1,'2023-12-28 08:09:16','2023-12-28 15:41:36'),(63,36,NULL,NULL,70000,NULL,1,'2023-12-28 08:16:24','2023-12-28 15:41:23'),(64,36,NULL,NULL,112000,NULL,2,'2023-12-28 15:46:51','2023-12-28 15:54:31'),(66,36,NULL,NULL,167000,NULL,2,'2023-12-29 01:24:12','2023-12-29 16:10:53'),(67,36,NULL,NULL,168000,NULL,0,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(68,36,NULL,NULL,653000,'2024-01-01 03:01:32',1,'2024-01-01 03:00:56','2024-01-01 03:01:32'),(69,36,NULL,NULL,116000,NULL,2,'2024-01-03 00:11:45','2024-01-03 00:12:46'),(70,36,NULL,NULL,70000,'2024-01-03 00:45:10',2,'2024-01-03 00:44:14','2024-01-03 01:13:08'),(71,36,NULL,NULL,70000,NULL,2,'2024-01-03 00:45:33','2024-01-03 01:13:03'),(72,36,NULL,NULL,99000,NULL,2,'2024-01-03 01:13:17','2024-01-03 01:15:34'),(73,36,NULL,NULL,102000,'2024-01-03 02:26:45',0,'2024-01-03 01:15:43','2024-01-03 02:26:45'),(74,36,NULL,NULL,313000,'2024-01-03 02:25:32',1,'2024-01-03 02:20:00','2024-01-03 02:25:32');
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
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_detail`
--

LOCK TABLES `invoice_detail` WRITE;
/*!40000 ALTER TABLE `invoice_detail` DISABLE KEYS */;
INSERT INTO `invoice_detail` VALUES (74,35,NULL,NULL,1,23243,1,'2023-10-04 07:53:18','2023-10-04 08:07:49'),(89,47,50,NULL,0,35000,1,'2023-12-17 17:13:58','2023-12-17 17:13:58'),(91,48,50,NULL,0,35000,1,'2023-12-17 17:17:35','2023-12-17 17:17:35'),(94,49,50,NULL,0,175000,5,'2023-12-17 17:39:10','2023-12-17 17:39:10'),(98,50,52,NULL,0,80000,2,'2023-12-17 17:43:32','2023-12-17 17:43:32'),(99,50,53,NULL,0,20000,1,'2023-12-17 17:43:32','2023-12-17 17:43:32'),(109,52,52,NULL,0,40000,1,'2023-12-17 17:47:09','2023-12-17 17:47:09'),(110,52,50,NULL,0,70000,2,'2023-12-17 17:47:09','2023-12-17 17:47:09'),(111,52,51,NULL,0,96000,3,'2023-12-17 17:47:09','2023-12-17 17:47:09'),(130,53,50,NULL,0,70000,2,'2023-12-17 17:57:44','2023-12-17 17:57:44'),(131,53,51,NULL,0,64000,2,'2023-12-17 17:57:44','2023-12-17 17:57:44'),(132,53,61,NULL,0,56000,1,'2023-12-17 17:57:44','2023-12-17 17:57:44'),(133,53,52,NULL,0,40000,1,'2023-12-17 17:57:44','2023-12-17 17:57:44'),(134,54,77,NULL,0,10000,1,'2023-12-18 00:45:25','2023-12-18 00:45:25'),(135,54,82,NULL,0,25000,1,'2023-12-18 00:45:25','2023-12-18 00:45:25'),(136,55,51,NULL,0,32000,1,'2023-12-18 01:10:09','2023-12-18 01:10:09'),(137,55,52,NULL,0,40000,1,'2023-12-18 01:10:09','2023-12-18 01:10:09'),(138,55,53,NULL,0,20000,1,'2023-12-18 01:10:09','2023-12-18 01:10:09'),(139,56,51,NULL,0,32000,1,'2023-12-18 01:11:08','2023-12-18 01:11:08'),(142,58,50,NULL,0,35000,1,'2023-12-18 03:44:22','2023-12-18 03:44:22'),(143,58,51,NULL,0,32000,1,'2023-12-18 03:44:22','2023-12-18 03:44:22'),(144,59,52,NULL,0,40000,1,'2023-12-18 07:36:35','2023-12-18 07:36:35'),(149,63,52,NULL,0,40000,1,'2023-12-28 08:16:24','2023-12-28 08:16:24'),(150,63,62,NULL,0,30000,1,'2023-12-28 08:16:24','2023-12-28 08:16:24'),(151,64,52,NULL,0,80000,2,'2023-12-28 15:46:51','2023-12-28 15:46:51'),(152,64,51,NULL,0,32000,1,'2023-12-28 15:46:51','2023-12-28 15:46:51'),(157,61,57,NULL,0,40000,1,'2023-12-29 01:05:30','2023-12-29 01:05:30'),(158,61,52,NULL,0,40000,1,'2023-12-29 01:05:30','2023-12-29 01:05:30'),(159,61,51,NULL,0,96000,3,'2023-12-29 01:05:30','2023-12-29 01:05:30'),(180,66,50,NULL,0,35000,1,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(181,66,51,NULL,0,32000,1,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(182,66,52,NULL,0,40000,1,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(183,66,53,NULL,0,60000,3,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(184,67,61,NULL,0,56000,1,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(185,67,51,NULL,0,32000,1,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(186,67,52,NULL,0,80000,2,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(187,68,NULL,15,1,50000,1,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(188,68,NULL,21,1,60000,2,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(189,68,NULL,81,1,237000,3,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(190,68,NULL,86,1,306000,3,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(191,69,61,NULL,0,56000,1,'2024-01-03 00:11:45','2024-01-03 00:11:45'),(192,69,62,NULL,0,30000,1,'2024-01-03 00:11:45','2024-01-03 00:11:45'),(193,69,63,NULL,0,30000,1,'2024-01-03 00:11:45','2024-01-03 00:11:45'),(195,70,50,NULL,0,70000,2,'2024-01-03 00:44:51','2024-01-03 00:44:51'),(196,71,50,NULL,0,70000,2,'2024-01-03 00:45:33','2024-01-03 00:45:33'),(201,72,51,NULL,0,64000,2,'2024-01-03 01:15:02','2024-01-03 01:15:02'),(202,72,50,NULL,0,35000,1,'2024-01-03 01:15:02','2024-01-03 01:15:02'),(203,73,50,NULL,0,70000,2,'2024-01-03 01:15:43','2024-01-03 01:15:43'),(204,73,51,NULL,0,32000,1,'2024-01-03 01:15:43','2024-01-03 01:15:43'),(214,74,50,NULL,0,35000,1,'2024-01-03 02:24:06','2024-01-03 02:24:06'),(215,74,51,NULL,0,32000,1,'2024-01-03 02:24:06','2024-01-03 02:24:06'),(216,74,52,NULL,0,160000,4,'2024-01-03 02:24:06','2024-01-03 02:24:06'),(217,74,61,NULL,0,56000,1,'2024-01-03 02:24:06','2024-01-03 02:24:06'),(218,74,62,NULL,0,30000,1,'2024-01-03 02:24:06','2024-01-03 02:24:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (2,'Đường','Đường trắng ',3970,'kg','2023-09-25 03:00:00','2023-09-28 02:24:51','2024-01-03 02:20:23'),(3,'Muối','Muối',346173,'kg','2023-09-24 10:00:00','2023-09-28 02:25:05','2024-01-03 02:20:23'),(5,'Ổi','Ổi chín',200,'kg','2023-09-24 10:00:00','2023-09-28 02:25:19','2023-12-18 01:52:53'),(7,'Trân châu','Trân trâu đường đen',209,'kg','2023-09-24 10:00:00','2023-09-28 02:25:35','2023-12-18 01:52:40'),(12,'Sữa tươi','Sữa tươi không đường',47,'hộp','2023-11-29 11:30:39','2023-11-22 08:31:35','2024-01-01 03:01:20'),(16,'Xoài','Xoài chín',2011,'kg','2023-12-19 22:19:21','2023-12-17 12:19:32','2023-12-28 15:41:23'),(17,'Bơ lạc','Giàu chất dinh dưỡng',11,'kg','2023-12-28 17:05:35','2023-12-17 17:05:59','2024-01-01 03:01:20'),(18,'Trứng ','Tốt cho phát triển cơ bắp',30,'quả','2023-12-29 10:07:37','2023-12-17 17:08:04','2023-12-17 17:09:26'),(19,'Dầu ăn cá lân','Dầu ăn',20,'lít','2023-12-29 10:10:53','2023-12-17 17:11:08','2023-12-18 01:07:15'),(20,'Khoai tây','Khoai tây',30,'kg','2023-12-30 03:12:45','2023-12-17 17:13:04','2023-12-18 01:07:37'),(21,'Thịt bò kobe','Thịt bò cao cấp được xuất khẩu tại nhật bản',30,'kg','2024-01-03 10:16:53','2023-12-17 17:17:39','2023-12-18 01:08:27'),(22,'Bột mì ','Bột mì',30,'kg','2023-12-29 10:18:47','2023-12-17 17:19:01','2023-12-18 01:08:39'),(23,'Dâu ','Tươi ngon đến từ Đà Lạt',100,'kg','2023-12-27 03:30:44','2023-12-17 17:31:09','2023-12-18 01:08:55'),(24,'Xúc xích','100% làm từ thịt',100,'kg','2023-12-25 20:34:52','2023-12-17 17:35:05','2023-12-18 01:11:02'),(25,'Tôm','Tôm hùm',40,'kg','2023-12-28 03:36:52','2023-12-17 17:37:02','2023-12-18 01:09:39'),(26,'Cafe','Được trồng tại Gia lai nên uống rất phê',100,'kg','2024-01-04 10:38:37','2023-12-17 17:39:05','2023-12-18 01:10:03'),(27,'Dưa hấu ','Dưa hấu tươi mát',50,'kg','2024-01-05 10:41:07','2023-12-17 17:41:33','2023-12-18 01:10:23'),(28,'Nho','Nho nhập khẩu từ Mỹ ',20,'kg','2024-01-05 10:46:20','2023-12-17 17:46:31','2023-12-18 01:10:50'),(31,'Gạo',NULL,10,'kg','2025-01-22 17:00:00','2024-01-02 17:42:43','2024-01-02 17:42:43');
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
INSERT INTO `position` VALUES ('A','Admin','2023-09-25 00:20:21','2023-09-25 00:20:21'),('M','Manager','2023-09-25 00:20:12','2023-09-25 00:20:12'),('string','string','2023-12-15 07:57:47','2023-12-15 07:57:47'),('U','User','2023-09-25 00:20:04','2023-09-25 00:20:04');
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (50,'Trà Sữa matcha',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/ts3-1702375954054.jpg',35000,'Cốc',3,'2023-12-12 10:12:33','2023-12-12 10:12:34'),(51,'Trà Sữa thạch','k,k','https://storage.googleapis.com/nestjs-398217.appspot.com/ts2-1702375974365.jpg',32000,'Cốc',3,'2023-12-12 10:12:53','2023-12-18 01:30:53'),(52,'Machiato',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/machiato-1702376077343.jpg',40000,'Cốc',11,'2023-12-12 10:14:36','2023-12-12 10:14:37'),(53,'Cafe Muối',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/cfmuoi-1702454834525.jpg',20000,'Cốc',11,'2023-12-13 08:07:13','2023-12-13 08:07:14'),(57,'Bánh plan',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/plan-1702456412049.jpg',40000,'phần',6,'2023-12-13 08:33:31','2023-12-13 08:33:32'),(61,'Bánh ngọt',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/banh1-1702484997872.jpg',56000,'phần',13,'2023-12-13 16:29:57','2023-12-13 16:29:58'),(62,'Sinh tố xoài',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/beverage-909517_640-1702815384556.jpg',30000,'1 cốc',17,'2023-12-17 12:16:23','2023-12-17 12:16:25'),(63,'Trứng cút chiên',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/egg-4977357_640-1702815883400.jpg',30000,'1 đĩa',18,'2023-12-17 12:24:42','2023-12-17 12:24:43'),(64,'Gà rán',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/food-3271156_640-1702815974304.jpg',80000,'1 đĩa',18,'2023-12-17 12:26:13','2023-12-17 12:26:14'),(66,'Khoai tây chiên',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/french-fries-4977353_1280-1702830239373.jpg',20000,'1 đĩa',18,'2023-12-17 16:23:59','2023-12-17 16:23:59'),(67,'Hambuger',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/hamburger-1238246_640-1702830307372.jpg',40000,'1 cái',6,'2023-12-17 16:25:06','2023-12-17 16:25:07'),(68,'Bánh vòng',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-vova-kras-4237496-1702830495407.jpg',20000,'1 cái',6,'2023-12-17 16:28:14','2023-12-17 16:28:15'),(70,'Pizza',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pizza-2068272_640-1702830644805.jpg',100000,'1 cái',13,'2023-12-17 16:30:43','2023-12-17 16:30:45'),(71,'Sinh tố dâu',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/smoothie-1444356_640-1702830711907.jpg',30000,'1 cốc',17,'2023-12-17 16:31:51','2023-12-17 16:31:52'),(72,'Kem dâu tây',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/strawberry-dessert-2191973_640-1702830824381.jpg',25000,'1 cốc',19,'2023-12-17 16:33:43','2023-12-17 16:33:44'),(74,'Khoai viên ngọt',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/sweet-potato-4977350_640-1702830894084.jpg',15000,'1 đĩa',18,'2023-12-17 16:34:53','2023-12-17 16:34:54'),(75,'Kem que',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-jill-wellington-461189-1702831179480.jpg',10000,'1 cái',19,'2023-12-17 16:39:39','2023-12-17 16:39:39'),(77,'Kem ốc quế',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-teejay-1362534-1702831219737.jpg',10000,'1 cái',19,'2023-12-17 16:40:19','2023-12-17 16:40:19'),(78,'Báng mì kẹp xúc xích',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-polina-tankilevitch-4518647-1702831659447.jpg',20000,'1 cái',6,'2023-12-17 16:47:38','2023-12-17 16:47:39'),(79,'Xúc xích','Xúc xích ngon\n','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-mali-maeder-929137-1702831701682.jpg',10000,'1 cái',6,'2023-12-17 16:48:21','2023-12-17 16:54:12'),(80,'Mì trộn',NULL,'https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-polina-tankilevitch-4518892-1702832109198.jpg',30000,'1 đĩa',6,'2023-12-17 16:55:08','2023-12-17 16:55:09'),(81,'Cà phê đen','Cà phê đen đậm hương vị tây nguyên','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-victor-freitas-733763-1702832201392.jpg',25000,'1 cốc',11,'2023-12-17 16:56:40','2023-12-17 16:56:41'),(82,'Cà phê sữa','Uống vào là phê','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-cup-of-couple-8472242-1702832244833.jpg',25000,'1 cốc',11,'2023-12-17 16:57:23','2023-12-17 16:57:25'),(83,'Sinh tố dưa hấu','Sinh tố dưa hấu mát lạnh mùa hè','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-bruno-scramgnon-1337825-1702832792167.jpg',20000,'1 cốc',17,'2023-12-17 17:06:31','2023-12-17 17:06:32'),(84,'Sinh tố ổi','Sinh tố ổi mát lạnh mùa hè','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-quang-nguyen-vinh-2134037-1702832828917.jpg',20000,'1 cốc',17,'2023-12-17 17:07:08','2023-12-17 17:07:09'),(85,'Kimbap','Kimbap ngon cực','https://storage.googleapis.com/nestjs-398217.appspot.com/pexels-nadin-sh-12288356-1702833246434.jpg',30000,'1 đĩa',6,'2023-12-17 17:14:06','2023-12-17 17:14:06'),(87,'Bánh mì kẹp thịt','Bánh mì kẹp thịt ngon','https://storage.googleapis.com/nestjs-398217.appspot.com/banh-mi-kep-thit-1702833631259.jpg',15000,'1 cái',13,'2023-12-17 17:20:31','2023-12-17 17:20:31'),(88,'Bánh mì nho','Bánh mì nho thanh đạm cơ thể','https://storage.googleapis.com/nestjs-398217.appspot.com/banh-mi-trai-cay-1702833666704.jpg',20000,'1 cái',13,'2023-12-17 17:21:06','2023-12-17 17:21:06'),(89,'Sữa chua','Sữa chua mát tốt cho da','https://storage.googleapis.com/nestjs-398217.appspot.com/screenshot_1702808333-1702833718717.png',20000,'1 cốc',19,'2023-12-17 17:21:58','2023-12-17 17:21:58'),(90,'Viên chiên','Viên chiên giòn','https://storage.googleapis.com/nestjs-398217.appspot.com/screenshot_1702808600-1702833867695.png',20000,'1 đĩa',18,'2023-12-17 17:24:27','2023-12-17 17:24:27'),(91,'Pepsi','Pepsi mát lạnh','https://storage.googleapis.com/nestjs-398217.appspot.com/soda-5295697_640-1702834218982.png',10000,'1 cốc',21,'2023-12-17 17:30:18','2023-12-17 17:30:19'),(92,'Coca cola','Coca mát lạnh','https://storage.googleapis.com/nestjs-398217.appspot.com/drink-7108191_640-1702834258096.jpg',10000,'1 cốc',21,'2023-12-17 17:30:57','2023-12-17 17:30:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (24,'Khuyến mãi mua 2 tặng 1',2,3,10,'2023-11-22 03:04:14','2023-11-22 03:16:07'),(26,'Giảm giá sốc',2,10,10,'2023-11-22 03:08:51','2023-11-22 03:11:03'),(30,'Giảm giá ăn nhanh',62,10,10,'2023-12-17 16:40:06','2023-12-18 01:06:31');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230924153205-change-arrival-time-type.js'),('20230929101239-create-user.js'),('20231228071349-change_status_data_type.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (5,7,1,420000,'2023-10-10 00:21:06','2023-10-10 00:21:06'),(11,1,2,300230,'2023-11-23 08:24:06','2023-11-23 08:24:07'),(13,1,1,600460,'2023-11-23 08:24:33','2023-11-23 08:24:34'),(33,1,2,0,'2023-12-16 01:50:43','2023-12-16 01:50:43'),(34,3,1,0,'2023-12-16 01:52:33','2023-12-16 01:52:33'),(35,3,4,0,'2023-12-16 13:46:17','2023-12-16 13:46:17'),(36,4,8,0,'2023-12-16 13:48:10','2023-12-16 13:48:10'),(37,1,1,0,'2023-12-16 13:57:16','2023-12-16 13:57:16'),(38,7,4,0,'2023-12-16 14:10:01','2023-12-16 14:10:01'),(39,4,1,0,'2023-12-16 14:48:18','2023-12-16 14:48:18'),(40,1,1,0,'2023-12-16 16:41:38','2023-12-16 16:41:38'),(41,3,4,0,'2023-12-16 16:43:49','2023-12-16 16:43:49'),(42,5,1,0,'2023-12-16 16:44:58','2023-12-16 16:44:58'),(43,1,2,0,'2023-12-17 00:46:28','2023-12-17 00:46:28'),(44,5,4,0,'2023-12-17 02:39:23','2023-12-17 02:39:23'),(45,1,1,0,'2023-12-17 03:38:55','2023-12-17 03:38:55'),(46,7,NULL,0,'2023-12-17 03:40:25','2023-12-17 03:40:25'),(47,6,4,0,'2023-12-17 03:53:27','2023-12-17 03:53:27'),(48,1,1,0,'2023-12-17 04:46:31','2023-12-17 04:46:31'),(49,1,8,0,'2023-12-17 05:00:49','2023-12-17 05:00:49'),(50,3,1,0,'2023-12-17 11:26:22','2023-12-17 11:26:22'),(51,1,8,0,'2023-12-17 13:00:48','2023-12-17 13:00:48'),(52,6,8,0,'2023-12-17 17:08:32','2023-12-17 17:08:32'),(54,3,1,0,'2023-12-18 01:07:04','2023-12-18 01:07:04'),(55,6,31,1221,'2023-12-18 01:37:09','2023-12-18 01:37:09'),(56,5,31,12000,'2023-12-18 01:39:06','2023-12-18 01:39:06'),(57,3,1,0,'2023-12-18 03:53:38','2023-12-18 03:53:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_food`
--

LOCK TABLES `table_food` WRITE;
/*!40000 ALTER TABLE `table_food` DISABLE KEYS */;
INSERT INTO `table_food` VALUES (1,'Bàn 1',0,'2023-10-03 08:16:05','2024-01-03 01:15:34'),(2,'Bàn 2',0,'2023-10-03 08:16:09','2024-01-03 01:13:03'),(3,'Bàn 3',0,'2023-10-03 08:16:12','2024-01-03 02:26:45'),(4,'Bàn 4',0,'2023-10-03 08:16:26','2024-01-03 02:25:32'),(5,'Bàn 5',0,'2023-10-03 08:17:00','2024-01-01 03:01:32'),(6,'Bàn 6',0,'2023-10-03 08:17:05','2024-01-01 03:01:32'),(7,'Bàn 7',0,'2023-10-03 08:17:10','2024-01-03 00:12:46'),(8,'Bàn 8',0,'2023-10-03 08:17:17','2024-01-03 00:12:46'),(9,'Bàn 9',0,'2023-12-17 17:58:33','2023-12-29 08:13:22'),(10,'Bàn 10',0,'2023-12-17 17:59:09','2023-12-29 08:13:22'),(11,'Bàn 11',0,'2023-12-17 17:59:23','2023-12-29 08:13:22'),(12,'Bàn 12',0,'2023-12-17 17:59:31','2023-12-17 17:59:31'),(13,'Bàn 13',0,'2023-12-17 18:03:14','2023-12-17 18:03:14'),(14,'Bàn 14',0,'2023-12-17 18:03:25','2023-12-17 18:03:25'),(15,'Bàn 15',0,'2023-12-17 18:03:32','2023-12-17 18:03:32'),(16,'Bàn 16',0,'2023-12-17 18:03:38','2023-12-17 18:03:38'),(17,'Bàn 17',0,'2023-12-17 18:03:46','2023-12-17 18:03:46'),(18,'Bàn 18',0,'2023-12-17 18:03:53','2023-12-17 18:03:53'),(19,'Bàn 19',0,'2023-12-17 18:03:59','2023-12-17 18:03:59'),(20,'Bàn 20',0,'2023-12-17 18:04:05','2023-12-17 18:04:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_food_invoice`
--

LOCK TABLES `table_food_invoice` WRITE;
/*!40000 ALTER TABLE `table_food_invoice` DISABLE KEYS */;
INSERT INTO `table_food_invoice` VALUES (21,1,35,'2023-10-04 07:53:18','2023-10-04 07:53:18'),(22,2,35,'2023-10-04 07:53:18','2023-10-04 07:53:18'),(27,1,45,'2023-12-17 11:46:25','2023-12-17 11:46:25'),(30,3,47,'2023-12-17 17:13:59','2023-12-17 17:13:59'),(31,6,47,'2023-12-17 17:13:59','2023-12-17 17:13:59'),(32,5,48,'2023-12-17 17:17:35','2023-12-17 17:17:35'),(33,2,48,'2023-12-17 17:17:35','2023-12-17 17:17:35'),(38,3,49,'2023-12-17 17:39:10','2023-12-17 17:39:10'),(39,1,49,'2023-12-17 17:39:10','2023-12-17 17:39:10'),(42,7,50,'2023-12-17 17:43:32','2023-12-17 17:43:32'),(43,5,50,'2023-12-17 17:43:32','2023-12-17 17:43:32'),(52,5,52,'2023-12-17 17:47:09','2023-12-17 17:47:09'),(53,3,52,'2023-12-17 17:47:09','2023-12-17 17:47:09'),(60,1,53,'2023-12-17 17:57:44','2023-12-17 17:57:44'),(61,5,54,'2023-12-18 00:45:25','2023-12-18 00:45:25'),(62,2,55,'2023-12-18 01:10:09','2023-12-18 01:10:09'),(63,3,55,'2023-12-18 01:10:09','2023-12-18 01:10:09'),(64,3,58,'2023-12-18 03:44:23','2023-12-18 03:44:23'),(65,2,58,'2023-12-18 03:44:23','2023-12-18 03:44:23'),(66,9,59,'2023-12-18 07:36:35','2023-12-18 07:36:35'),(72,2,63,'2023-12-28 08:16:24','2023-12-28 08:16:24'),(73,5,64,'2023-12-28 15:46:51','2023-12-28 15:46:51'),(74,2,64,'2023-12-28 15:46:51','2023-12-28 15:46:51'),(76,3,61,'2023-12-29 01:05:30','2023-12-29 01:05:30'),(77,2,61,'2023-12-29 01:05:30','2023-12-29 01:05:30'),(88,6,66,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(89,1,66,'2023-12-29 16:02:22','2023-12-29 16:02:22'),(90,3,67,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(91,2,67,'2023-12-29 16:24:58','2023-12-29 16:24:58'),(92,6,68,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(93,5,68,'2024-01-01 03:00:57','2024-01-01 03:00:57'),(94,7,69,'2024-01-03 00:11:46','2024-01-03 00:11:46'),(95,8,69,'2024-01-03 00:11:46','2024-01-03 00:11:46'),(96,2,71,'2024-01-03 00:45:33','2024-01-03 00:45:33'),(99,1,72,'2024-01-03 01:15:02','2024-01-03 01:15:02'),(100,3,73,'2024-01-03 01:15:43','2024-01-03 01:15:43'),(102,4,74,'2024-01-03 02:22:23','2024-01-03 02:22:23');
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_material`
--

LOCK TABLES `use_material` WRITE;
/*!40000 ALTER TABLE `use_material` DISABLE KEYS */;
INSERT INTO `use_material` VALUES (26,50,3,3,'2023-12-13 16:22:18','2023-12-13 16:22:18'),(28,50,2,3,'2023-12-13 16:22:59','2023-12-13 16:22:59'),(29,61,3,3,'2023-12-13 16:30:10','2023-12-13 16:30:10'),(30,61,2,3,'2023-12-13 16:30:10','2023-12-13 16:30:10'),(31,52,3,1,'2023-12-13 16:41:41','2023-12-13 16:41:41'),(32,62,16,1,'2023-12-17 12:20:21','2023-12-17 12:20:21'),(33,62,2,20,'2023-12-17 12:21:37','2023-12-17 12:21:37'),(36,64,3,12,'2023-12-17 16:41:22','2023-12-17 16:41:22'),(37,64,12,4,'2023-12-17 16:42:21','2023-12-17 16:42:21'),(38,57,12,1,'2023-12-17 17:03:50','2023-12-17 17:03:50'),(39,57,17,3,'2023-12-17 17:06:36','2023-12-17 17:06:36'),(40,63,18,2,'2023-12-17 17:08:47','2023-12-17 17:08:47'),(41,66,3,1,'2023-12-17 17:11:39','2023-12-17 17:11:39'),(43,66,20,2,'2023-12-17 17:13:35','2023-12-17 17:13:35'),(52,66,19,1,'2023-12-17 17:22:14','2023-12-17 17:22:14'),(53,67,21,1,'2023-12-17 17:23:42','2023-12-17 17:23:42'),(54,67,22,1,'2023-12-17 17:23:54','2023-12-17 17:23:54'),(55,68,2,2,'2023-12-17 17:28:48','2023-12-17 17:28:48'),(57,68,22,1,'2023-12-17 17:29:05','2023-12-17 17:29:05'),(58,70,22,1,'2023-12-17 17:29:42','2023-12-17 17:29:42'),(59,70,17,1,'2023-12-17 17:29:53','2023-12-17 17:29:53'),(60,71,2,1,'2023-12-17 17:30:20','2023-12-17 17:30:20'),(63,72,12,1,'2023-12-17 17:32:09','2023-12-17 17:32:09'),(64,72,23,3,'2023-12-17 17:32:21','2023-12-17 17:32:21'),(65,74,2,2,'2023-12-17 17:32:41','2023-12-17 17:32:41'),(66,74,20,4,'2023-12-17 17:32:51','2023-12-17 17:32:51'),(67,75,12,1,'2023-12-17 17:33:09','2023-12-17 17:33:09'),(68,75,20,1,'2023-12-17 17:33:32','2023-12-17 17:33:32'),(69,77,2,1,'2023-12-17 17:33:49','2023-12-17 17:33:49'),(70,77,12,1,'2023-12-17 17:33:56','2023-12-17 17:33:56'),(71,78,22,1,'2023-12-17 17:34:13','2023-12-17 17:34:13'),(72,78,3,1,'2023-12-17 17:34:29','2023-12-17 17:34:29'),(73,78,24,1,'2023-12-17 17:35:24','2023-12-17 17:35:24'),(74,79,3,1,'2023-12-17 17:36:00','2023-12-17 17:36:00'),(75,79,24,1,'2023-12-17 17:36:07','2023-12-17 17:36:07'),(76,80,3,1,'2023-12-17 17:36:25','2023-12-17 17:36:25'),(77,80,22,1,'2023-12-17 17:36:32','2023-12-17 17:36:32'),(78,80,25,4,'2023-12-17 17:37:41','2023-12-17 17:37:41'),(79,81,26,1,'2023-12-17 17:39:30','2023-12-17 17:39:30'),(80,81,2,1,'2023-12-17 17:39:39','2023-12-17 17:39:39'),(81,82,2,1,'2023-12-17 17:39:49','2023-12-17 17:39:49'),(82,82,12,1,'2023-12-17 17:39:57','2023-12-17 17:39:57'),(83,82,26,1,'2023-12-17 17:40:05','2023-12-17 17:40:05'),(84,82,26,1,'2023-12-17 17:40:06','2023-12-17 17:40:06'),(85,83,27,1,'2023-12-17 17:41:57','2023-12-17 17:41:57'),(86,84,5,2,'2023-12-17 17:42:19','2023-12-17 17:42:19'),(87,85,3,1,'2023-12-17 17:42:46','2023-12-17 17:42:46'),(88,85,25,1,'2023-12-17 17:42:58','2023-12-17 17:42:58'),(89,87,3,1,'2023-12-17 17:43:10','2023-12-17 17:43:10'),(90,87,22,1,'2023-12-17 17:43:28','2023-12-17 17:43:28'),(91,88,22,1,'2023-12-17 17:43:41','2023-12-17 17:43:41'),(92,88,28,2,'2023-12-17 17:46:52','2023-12-17 17:46:52'),(93,89,2,1,'2023-12-17 17:47:01','2023-12-17 17:47:01'),(94,89,12,1,'2023-12-17 17:47:08','2023-12-17 17:47:08'),(95,90,25,1,'2023-12-17 17:47:28','2023-12-17 17:47:28'),(96,90,22,2,'2023-12-17 17:47:40','2023-12-17 17:47:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshift`
--

LOCK TABLES `workshift` WRITE;
/*!40000 ALTER TABLE `workshift` DISABLE KEYS */;
INSERT INTO `workshift` VALUES (1,'08:00:00','12:09:31','2023-09-25 00:21:31','2023-12-18 00:45:02'),(2,'12:09:00','17:09:31','2023-09-25 00:21:37','2023-09-25 00:21:37'),(3,'17:09:00','22:09:31','2023-09-25 00:21:43','2023-09-25 00:21:43'),(5,'22:08:56','23:08:58','2023-12-17 15:26:46','2023-12-17 15:26:46'),(10,'23:13:03','23:13:06','2023-12-17 16:13:15','2023-12-17 16:13:15');
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

-- Dump completed on 2024-02-05 22:45:27
