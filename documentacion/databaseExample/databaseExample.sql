-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: node_project
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `entradilla` varchar(200) DEFAULT NULL,
  `topic` enum('politica','espana','deportes','tecnologia','viajes','salud','economia','entretenimiento','internacional','galicia') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,1,'Nam non neque sed felis volutpat convallis aenean.','Suspendisse elementum, arcu a dapibus sodales, neque nisi efficitur leo, sit amet tincidunt leo orci sed odio. Nam eleifend venenatis risus vel consequat. Suspendisse magna sem, sagittis cursus lectus in, interdum gravida odio. Ut hendrerit placerat enim non tempor. Nunc finibus felis vel feugiat finibus. Suspendisse imperdiet, est non volutpat facilisis, nisi ex interdum dui, non iaculis neque massa non nulla. Integer aliquet ornare nulla vitae vestibulum. Nullam ac arcu vel urna auctor hendrerit. Nulla quis cursus tellus. Morbi nec nunc quis nisi accumsan feugiat id et metus. Aenean consequat nunc at rutrum sodales. Phasellus eget dui dui. Ut dictum, eros sit amet rhoncus ullamcorper, dui ipsum semper dolor, at mattis dolor metus non risus. Fusce a vestibulum tellus, at euismod placerat.','Ut egestas magna in lorem euismod eleifend. Fusce a leo enim. Aenean eget lectus leo. Nullam aenean.','tecnologia','2022-06-06 20:19:16','2022-06-06 20:19:16'),(2,1,'Mauris lobortis nunc at sed.','Nam et dignissim felis, vel mollis felis. Integer rhoncus non nisi vel consectetur. Maecenas rutrum orci auctor, tincidunt ex in, scelerisque nisi. Nulla tortor ipsum, vestibulum at mauris quis, pharetra imperdiet ex. Fusce et nulla at urna suscipit bibendum a non neque. Aliquam in dignissim augue. Morbi in nulla vitae velit aliquet bibendum eu ut diam. Nam posuere, sapien et feugiat maximus, urna purus hendrerit diam, eget congue nisi libero lobortis arcu. In vel nunc finibus, venenatis est eu, egestas tellus. Aenean eget commodo nisi, sed maximus leo. Donec quis augue non ipsum vestibulum vehicula at sit amet augue.','Ut sit amet odio et erat iaculis elementum eu sed magna. Maecenas vel nisi.','tecnologia','2022-06-06 20:20:35','2022-06-06 20:20:35'),(3,1,' Nullam finibus fringilla tincidunt. Nullam vel.','Fusce vitae erat odio. Fusce fermentum augue et est fringilla dignissim. Duis rutrum, nulla gravida mattis sollicitudin, mauris sapien dictum enim, a commodo purus diam eget sem. Donec dapibus nec sem ac placerat. Etiam euismod, lectus vel malesuada pellentesque, lorem tortor consectetur metus, vel maximus ex purus et neque. Donec tincidunt sapien et arcu efficitur porta. Nulla quis nisi ac odio cursus condimentum. Duis at nisl finibus, euismod arcu a, euismod enim. Morbi quis malesuada nunc. Fusce fermentum, ipsum quis.','Phasellus ligula justo, blandit eu aliquet ut, mollis et mauris. Nunc sodales cursus eu.','entretenimiento','2022-06-06 20:21:26','2022-06-06 20:21:26'),(4,2,'Sed dolor.','Nunc tempor varius libero in pellentesque. Morbi laoreet neque nibh, et condimentum tortor facilisis sit amet. Phasellus tempus ultricies ligula sed tempus. Pellentesque mi mauris, feugiat a scelerisque eu, commodo at turpis. In consectetur quam vel mauris ullamcorper, non porta ex maximus. Pellentesque eleifend turpis diam, nec imperdiet felis viverra eu. Etiam imperdiet convallis lobortis. Suspendisse eu risus elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porttitor iaculis tortor quis sollicitudin. Cras nec velit neque. Mauris id augue vitae lacus aliquam sodales a quis nisl.\r\n\r\nDonec eget ante sit amet nunc varius semper eu et est. Donec ultrices, nulla ac sagittis vestibulum tortor.','Donec scelerisque porttitor consequat. Suspendisse ultrices lorem non integer.','entretenimiento','2022-06-06 20:22:44','2022-06-06 20:22:44'),(5,2,'Etiam a molestie augue, quis molestie orci libero.','Proin feugiat metus sed velit tristique pulvinar. Proin tempor dui sed laoreet finibus. Nam id nisi at lectus consequat hendrerit eu dapibus eros. Nullam eget porttitor eros. Cras mollis sodales leo, non gravida leo bibendum sed. Integer metus tortor, vestibulum ullamcorper rutrum sed, placerat non tortor. Fusce magna ipsum, tempor sit amet euismod non, gravida in justo. Fusce ultrices sapien ut dui tristique ullamcorper sit amet non nisi orci aliquam.','nteger vitae dapibus enim, vel varius nisl. Vivamus id tincidunt enim. Class aptent nam.','tecnologia','2022-06-06 20:23:34','2022-06-06 20:23:34'),(6,2,' Proin facilisis malesuada nullam.','Curabitur pulvinar ac est non placerat. Suspendisse posuere nunc vel erat aliquet hendrerit. Sed luctus vehicula vulputate. In porttitor elit sed odio viverra consectetur. Etiam aliquet odio vitae enim porta ultricies. Maecenas odio elit, suscipit at ante quis, pellentesque lacinia lorem. Sed ac blandit sapien. Morbi bibendum congue lacus, ac interdum ligula dapibus rhoncus. Integer at dui ultricies, sollicitudin orci in, facilisis lectus. Fusce lacinia auctor convallis. Cras sed euismod lorem, nec dignissim leo. Aliquam interdum sed sapien in tempor. Aliquam eget ornare ipsum.Duis euismod est at sem ultricies ultricies. Fusce et auctor sem, placerat luctus dolor. Phasellus et neque eu mauris rutrum volutpat ornare luctus diam. Donec nibh lorem, dapibus et vestibulum sed, tincidunt metus','Fusce nec ultrices arcu, at maximus neque odio.','galicia','2022-06-06 20:24:58','2022-06-06 20:24:58'),(7,3,'Integer a dictum orci. Morbi gravida est ante nec.','Nullam hendrerit mollis nisi, nec egestas orci bibendum vel. Praesent venenatis, dui non consequat commodo, tellus ipsum varius erat, dignissim ornare nisi augue sed lectus. Donec diam nisl, ullamcorper id porta sit amet, malesuada id nibh. Quisque imperdiet ut ex vitae fermentum. Ut a neque sapien. Vivamus quis massa fermentum, porta purus vitae, ultricies nisi. Donec porttitor, odio nec sodales consectetur, ligula elit molestie magna, elementum mattis nisl dui sit amet nibh. Suspendisse potenti. Maecenas ipsum dui, dignissim nec lobortis a, luctus id augue. Phasellus sagittis laoreet nullam','Integer ultrices dictum ipsum in fermentum. Suspendisse at dictum libero, eu interdum ut.','galicia','2022-06-06 20:26:07','2022-06-06 20:26:07'),(8,3,'Nunc biam.','Suspendisse vitae nunc rutrum massa posuere gravida. Pellentesque eget nisi convallis, efficitur libero id, lacinia libero. Vestibulum suscipit ex ac accumsan bibendum. Vestibulum at pellentesque magna, ac hendrerit nisi. Nulla vel placerat dui, quis tempus magna. Nullam facilisis tincidunt purus nec congue. Etiam nec viverra nisl. Nunc feugiat sed nisl non eleifend. Fusce vitae dolor eget felis congue condimentum. Maecenas varius lobortis ligula id blandit. In semper felis in augue imperdiet maximus. Nullam metus neque, consectetur eget fringilla quis, malesuada at enim. Suspendisse molestie.','Sed faucibus elit quis lectus lobortis molestie. Ut at aliquet turpis.','economia','2022-06-06 20:28:33','2022-06-06 20:28:33'),(9,3,'Sed velit.','Praesent consequat metus augue, sed ultrices nibh imperdiet vitae. Sed a nisl vel lorem suscipit sagittis sed ut massa. Etiam mauris urna, luctus at tincidunt quis, ornare nec urna. Mauris elementum nibh a vehicula dignissim. Pellentesque fermentum et nunc at ornare. In in scelerisque neque. Praesent fermentum, elit quis blandit facilisis, justo velit dictum diam, condimentum maximus enim enim ut augue. Aliquam erat volutpat.\r\n\r\nAliquam quis quam molestie, efficitur lorem id, cursus orci. Curabitur lacinia scelerisque est, et porta eros placerat tellus.','Duis sit amet nisl sed tellus vulputate accumsan. Cras mi mauris, porttitor egestas tincidunt donec','salud','2022-06-06 20:29:22','2022-06-06 20:29:22');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_images`
--

DROP TABLE IF EXISTS `news_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `new_id` int DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `new_id` (`new_id`),
  CONSTRAINT `news_images_ibfk_1` FOREIGN KEY (`new_id`) REFERENCES `news` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_images`
--

LOCK TABLES `news_images` WRITE;
/*!40000 ALTER TABLE `news_images` DISABLE KEYS */;
INSERT INTO `news_images` VALUES (1,1,'5197acf6-786f-42ef-87f4-9ee5ccb90565.jpg'),(2,2,'570420e7-a384-4dae-a9ed-942edf75dd89.jpg'),(3,3,'342dbbd8-7579-49b6-986d-ab6c04bf1148.jpg'),(4,4,'c4d46fd2-d83f-4ce1-96e4-fa71a6bd40e5.jpg'),(5,5,'a31e402e-b1cb-4003-9e83-d277228930ca.jpg'),(6,6,'59cecf3e-4e4c-46a9-bb33-d0d680af34f5.jpg'),(7,7,'a01d6163-f677-4f33-9f06-f3d5af5737db.jpg'),(8,8,'73824e23-ef49-4376-8c42-4e0e700078c3.jpg'),(9,9,'606811ef-3f86-45d0-b45d-22b276ed78dd.jpg');
/*!40000 ALTER TABLE `news_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_votes`
--

DROP TABLE IF EXISTS `news_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_votes` (
  `user_id` int NOT NULL,
  `new_id` int NOT NULL,
  PRIMARY KEY (`new_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `news_votes_ibfk_1` FOREIGN KEY (`new_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  CONSTRAINT `news_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_votes`
--

LOCK TABLES `news_votes` WRITE;
/*!40000 ALTER TABLE `news_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `registrationCode` varchar(100) DEFAULT NULL,
  `passwordUpdateCode` varchar(100) DEFAULT NULL,
  `bio` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1@mail.com','$2b$10$CtKu1dzHHb9jdJMCez8dz.sCyfzLmcmmbnKhEc.5uH1QeQJ4vh89C','user1',1,NULL,NULL,'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam provident quaerat tempore eligendi, deserunt, sequi perspiciatis dolore quasi dolorum explicabo ad dolorem fuga, in aperiam. Fugiat reiciendis velit ipsa maiores.','2022-06-06 19:31:53'),(2,'user2@mail.com','$2b$10$Ux/7LR208cFQd54xGt9FfuCwQ13mTJbZ8fmUjFo6t8DTt.c0L.CUm','user2',1,NULL,NULL,'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam provident quaerat tempore eligendi, deserunt, sequi perspiciatis dolore quasi dolorum explicabo ad dolorem fuga, in aperiam. Fugiat reiciendis velit ipsa maiores.','2022-06-06 19:34:05'),(3,'user3@mail.com','$2b$10$VfiJCsXYprL4Im5yug6vneIkzOqMxfBVhJomZMkKl3PuVf.I0rhba','user3',1,NULL,NULL,'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam provident quaerat tempore eligendi, deserunt, sequi perspiciatis dolore quasi dolorum explicabo ad dolorem fuga, in aperiam. Fugiat reiciendis velit ipsa maiores.','2022-06-06 19:35:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_images`
--

DROP TABLE IF EXISTS `users_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_images`
--

LOCK TABLES `users_images` WRITE;
/*!40000 ALTER TABLE `users_images` DISABLE KEYS */;
INSERT INTO `users_images` VALUES (1,1,'a8f2dec0-4763-4922-979a-f93e4b5775f0.jpg'),(2,2,'53c4b19f-0c2f-4329-91bd-861c12ad0f14.jpg'),(3,3,'dbce2a83-516a-470c-84ea-e662bddc826f.jpg');
/*!40000 ALTER TABLE `users_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-14 11:57:28
