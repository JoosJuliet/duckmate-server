# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19-0ubuntu0.16.04.1)
# Database: duckmate
# Generation Time: 2017-08-23 08:04:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table chart_sample
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chart_sample`;

CREATE TABLE `chart_sample` (
  `idx` int(11) NOT NULL,
  `singer_name` varchar(45) DEFAULT NULL,
  `song` varchar(45) DEFAULT NULL,
  `is_up` varchar(45) DEFAULT '0',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `chart_sample` WRITE;
/*!40000 ALTER TABLE `chart_sample` DISABLE KEYS */;

INSERT INTO `chart_sample` (`idx`, `singer_name`, `song`, `is_up`)
VALUES
	(1,'트와이스','코스터','1'),
	(2,'라붐','랴쁌','0'),
	(3,'빅스','삑쓰','1'),
	(4,'엑소','엑쏘','1'),
	(5,'신화','씬화','1'),
	(6,'젝스키스','젝쓰키쓰','0');

/*!40000 ALTER TABLE `chart_sample` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(45) NOT NULL,
  `member_img` varchar(200) DEFAULT NULL,
  `member_level` int(11) DEFAULT '0',
  `member_score` int(11) DEFAULT '0',
  `fcm_token` varchar(300) DEFAULT NULL,
  `member_email` varchar(100) DEFAULT NULL,
  `member_passwd` varchar(45) DEFAULT NULL,
  `helpFlag` varchar(45) DEFAULT NULL,
  `firebaseToken` varchar(300) DEFAULT NULL,
  `today_alarm` varchar(45) DEFAULT NULL,
  `singer0_id` int(11) DEFAULT NULL,
  `0_flag` varchar(45) DEFAULT NULL,
  `0_vote_count` int(11) DEFAULT NULL,
  `singer1_id` int(11) DEFAULT NULL,
  `1_flag` varchar(45) DEFAULT NULL,
  `1_vote_count` int(11) DEFAULT NULL,
  `singer2_id` int(11) DEFAULT NULL,
  `2_flag` varchar(45) DEFAULT NULL,
  `2_vote_count` int(11) DEFAULT NULL,
  `singer3_id` int(11) DEFAULT NULL,
  `3_flag` varchar(45) DEFAULT NULL,
  `3_vote_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;

INSERT INTO `member` (`member_id`, `member_name`, `member_img`, `member_level`, `member_score`, `fcm_token`, `member_email`, `member_passwd`, `helpFlag`, `firebaseToken`, `today_alarm`, `singer0_id`, `0_flag`, `0_vote_count`, `singer1_id`, `1_flag`, `1_vote_count`, `singer2_id`, `2_flag`, `2_vote_count`, `singer3_id`, `3_flag`, `3_vote_count`)
VALUES
	(1,'hi',NULL,1,37,'d',NULL,NULL,NULL,'asdfdsa','1',1,'[1,2]',NULL,3,'[0,1]',NULL,2,'[0,1,2]',NULL,4,'[0,1,2]',NULL),
	(2,'hello',NULL,2,43,NULL,NULL,NULL,NULL,'qwerty',NULL,4,NULL,NULL,2,NULL,NULL,5,NULL,NULL,1,NULL,NULL),
	(3,'hi',NULL,0,0,NULL,'dfd@dd.dd','h',NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAzNDcxNjQ2LCJleHAiOjE1MDM0NzUyNDYsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWF',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `main` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;

INSERT INTO `notice` (`id`, `title`, `main`)
VALUES
	(1,'\"??\"','???');

/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table program_cure
# ------------------------------------------------------------

DROP TABLE IF EXISTS `program_cure`;

CREATE TABLE `program_cure` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(45) DEFAULT NULL,
  `program_data` varchar(45) DEFAULT NULL,
  `singer1` varchar(45) DEFAULT NULL,
  `singer2` varchar(45) DEFAULT NULL,
  `singer3` varchar(45) DEFAULT NULL,
  `singer4` varchar(45) DEFAULT NULL,
  `singer5` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `program_cure` WRITE;
/*!40000 ALTER TABLE `program_cure` DISABLE KEYS */;

INSERT INTO `program_cure` (`program_id`, `program_name`, `program_data`, `singer1`, `singer2`, `singer3`, `singer4`, `singer5`)
VALUES
	(1,'인기가요','1월 1주차','라붐','신화','젝스키스','엑소','트와이스'),
	(2,'엠카운트다운','1월 1주차','','','','',''),
	(3,'뮤직뱅크','1월 1주차','','','','','');

/*!40000 ALTER TABLE `program_cure` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table program_pre
# ------------------------------------------------------------

DROP TABLE IF EXISTS `program_pre`;

CREATE TABLE `program_pre` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(45) DEFAULT NULL,
  `program_data` varchar(45) DEFAULT NULL,
  `singer1` varchar(45) DEFAULT NULL,
  `singer2` varchar(45) DEFAULT NULL,
  `singer3` varchar(45) DEFAULT NULL,
  `singer4` varchar(45) DEFAULT NULL,
  `singer5` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `program_pre` WRITE;
/*!40000 ALTER TABLE `program_pre` DISABLE KEYS */;

INSERT INTO `program_pre` (`program_id`, `program_name`, `program_data`, `singer1`, `singer2`, `singer3`, `singer4`, `singer5`)
VALUES
	(1,'인기가요','1월 1주차','라붐','신화','젝스키스','엑소','트와이스'),
	(2,'엠카운트다운','1월 1주차','라붐','신화','젝스키스','엑소','트와이스'),
	(3,'뮤직뱅크','1월 1주차','라붐','신화','젝스키스','엑소','트와이스');

/*!40000 ALTER TABLE `program_pre` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `questions_id` int(11) NOT NULL,
  `member_id` varchar(45) DEFAULT NULL,
  `questions_main` text,
  `questions_mail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`questions_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table singer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `singer`;

CREATE TABLE `singer` (
  `singer_id` int(11) NOT NULL,
  `singer_name` varchar(45) NOT NULL,
  `song_name` varchar(45) DEFAULT NULL,
  `album_name` varchar(45) DEFAULT NULL,
  `singer_img` varchar(100) DEFAULT NULL,
  `album_img` varchar(100) DEFAULT NULL,
  `choice_count` int(11) NOT NULL DEFAULT '0',
  `new_flag` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`singer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `singer` WRITE;
/*!40000 ALTER TABLE `singer` DISABLE KEYS */;

INSERT INTO `singer` (`singer_id`, `singer_name`, `song_name`, `album_name`, `singer_img`, `album_img`, `choice_count`, `new_flag`)
VALUES
	(1,'라붐','라','붐',NULL,NULL,12,'1'),
	(2,'젝스키스','젝스','키스',NULL,NULL,3,'0'),
	(3,'신화','신','화',NULL,NULL,3,'1'),
	(4,'트와이스','트와','이스',NULL,NULL,5,'1'),
	(5,'엑소','엑','소',NULL,NULL,1,'0'),
	(6,'빅스','빅','스',NULL,NULL,6,'1'),
	(7,'방탄소년단','방탄','소년단',NULL,NULL,7,'0');

/*!40000 ALTER TABLE `singer` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
