# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19-0ubuntu0.16.04.1)
# Database: duckmate
# Generation Time: 2017-08-07 02:07:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table chart_broadcaster
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chart_broadcaster`;

CREATE TABLE `chart_broadcaster` (
  `idx` int(11) NOT NULL COMMENT '순위',
  `singer_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '가수이름',
  `album_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '앨범이름',
  `song_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '노래제목',
  `broadcaster
Broadcaster
broadcaster` int(11) DEFAULT NULL COMMENT '방송사 1:genie 2:melon 3:mnet',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table chart_sample
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chart_sample`;

CREATE TABLE `chart_sample` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `singer_name` varchar(45) DEFAULT NULL,
  `album_name` varchar(45) DEFAULT NULL,
  `song_name` varchar(45) DEFAULT NULL,
  `is_up` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

LOCK TABLES `chart_sample` WRITE;
/*!40000 ALTER TABLE `chart_sample` DISABLE KEYS */;

INSERT INTO `chart_sample` (`idx`, `singer_name`, `album_name`, `song_name`, `is_up`)
VALUES
	(1,'빅스','도원경','도원경',0),
	(2,'마마무','나말같','나말같',0),
	(3,'트와이스','signal','signal',0),
	(4,'엑소','코코몽','코코몽',0),
	(5,'블랙핑크','처음처럼','처음처럼',0),
	(6,'젝스키스','끼얏호','끼얏호',1),
	(7,'라붐','라아','부움',0),
	(8,'신화','신','화',1);

/*!40000 ALTER TABLE `chart_sample` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `member_name` varchar(45) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '회원 닉네임',
  `member_img` varchar(100) CHARACTER SET utf8 DEFAULT '' COMMENT '회원 사진',
  `member_level` int(11) DEFAULT NULL COMMENT '회원 레벨',
  `fcm_token` text COLLATE utf8_unicode_ci COMMENT 'firebase 알림 토큰',
  `member_email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '회원 메일주소',
  `member_passwd` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '회원 비밀번호',
  `helpFlag` int(11) DEFAULT NULL COMMENT 'findpasswd flag',
  `firebaseToken` text COLLATE utf8_unicode_ci COMMENT 'firebase로그인토큰',
  `today_alarm` tinyint(1) DEFAULT '0' COMMENT '오늘의 알람',
  `singer0_id` int(11) DEFAULT NULL,
  `0_flag` json DEFAULT NULL,
  `0_vote_count` int(11) DEFAULT NULL,
  `singer1_id` int(11) DEFAULT NULL,
  `1_flag` json DEFAULT NULL,
  `1_vote_count` int(11) DEFAULT NULL,
  `singer2_id` int(11) DEFAULT NULL,
  `2_flag` json DEFAULT NULL,
  `2_vote_count` int(11) DEFAULT NULL,
  `singer3_id` int(11) DEFAULT NULL,
  `3_flag` json DEFAULT NULL,
  `3_vote_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;

INSERT INTO `member` (`member_id`, `member_name`, `member_img`, `member_level`, `fcm_token`, `member_email`, `member_passwd`, `helpFlag`, `firebaseToken`, `today_alarm`, `singer0_id`, `0_flag`, `0_vote_count`, `singer1_id`, `1_flag`, `1_vote_count`, `singer2_id`, `2_flag`, `2_vote_count`, `singer3_id`, `3_flag`, `3_vote_count`)
VALUES
	(0,'hi','',NULL,NULL,'dfd@dd.dd','h',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDAzMTA4LCJleHAiOjE1MDIwMDY3MDgsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.iMGjVRL_spdoU-4aNMDl4tIsNIrGMIj-ZUjpq3WZGOHiRBvJ_2OvC917C0z2Kbcf7GbwBuRi82bhC75rX_ZAnZhzAuba-fUm2dALeS6TNT_6C5W3RBnePmW2LPKt2RCgNc-Z8QXZ6dPq9tOqEE3sbbqI5DYd1aZ4DeBHgC81WAupc4EZZSu4SGM2k-2YD_1pLRHpuXss_ubsDRpQr88IOZhX0kLFb_ClWyzsbPX1hY1O5NJPK5ONmB3vGZenX2btvGnIjN7evGP2V6GvPVOkuIOjhEIgSLfDGHgVFgO92T7Iuh2-J3oYF4mlVt81mPp2PQUxAPVZTdApYZct23sl3Q',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,'dfd@dd.dd','h',NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDAzMTE2LCJleHAiOjE1MDIwMDY3MTYsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.0us9iFe19z13ptpZmZK7h97ylXKIqA35T4GxjPrKs_h58xVcvJImZ5x8YmyTQX_xyx7B2Zy0M1PjdFo3PAhBsT20AjbbRA_QnTeyljomw9pOUcm-IJeHsUmMk1cNiij8JvRyOnXW33VD_cljUpay9NnuC2T4T1Dpvexvy_u1BTZ2RLK3XQtyQCtm5ruvvZBCPHYN5E6A0jfcee01E090_B6zzvrReCYHHyUd5N9q6CyGR14__r5pL-L6dPF3RHpKNDzbiVkJ2kAZOfCN10Fwsqf4ImS2KwYA9r-mBkKWV5NfLJZso3WYQHW7XRj-ABj8k5b3tFJqehN2nbqgOGLJuQ',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,'dfd@dd.dd','h',NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDExNjgzLCJleHAiOjE1MDIwMTUyODMsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.bG7I1tC6PolNppJ0_nPg6nPkuf-eCdal0uETkwVKaeEviL-1p6sx5q5HmG8C_BZvocjyLy8qosoaxhVKLOezWAcSjOeurtTF-R6aqkySoF9LexZzuUD5xq1U-c1aK6AOvr3q_lAtMm_-yl3Dx3KluAim-ARpm_FedORoK2tEHD_s-aEPKtIYeyCSkTtTW58rx4u-pDIEyVaDr3C2a56b-oEcl6tYGkG1Mt1Z0p2xldu8GwL0PmbG7t8sK4XwY-URcfaKtuXTEJAoGKpMlbYu6O7OHw7_6cMbwqw3FcTiV3xyF93KyGDyBBWiKM7sBHfpDNFkbTipLBu4HEqtKWWzFA',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDExNjg5LCJleHAiOjE1MDIwMTUyODksImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.XXkg0exROGD2N360SbrXr0eEXDiZWXZj3dRTYPEJHEUlqqz5sX9_T2QX_G5P-v7cgVfYBvWva190yMEoBZbqrvJvqI9alk29BE_XFHzmwQkis-C-OSAh0ekhNFni7RfaETYDloToEOpLGONRg85Js815mmFXaZNjeRqdM_N9nQ3A5CwZczdJ8Hc0yacUt8K85G4r0E5AkpPLDMnlpHEHbES8yWdhbOed2uUpsGRdJLsNx8CDCPu7dFiJ6OQ7Q9uKM5y4DOP3TJxSps4LQpGY0lamSubZxfrZFLzMKVvvlgHyi8yfCTS1Fxt_qGC0hK7JA0-msVVyzPOlcYbjNUYbOA',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,'dfd@dd.dd','h',NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDE5Nzk1LCJleHAiOjE1MDIwMjMzOTUsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.ZMGaxvKS1kfQeeMAXqCyTbIfntx6o4N_pfVx2cSTULQkU0hsASCtwIELh0Q3WLw5GpQ8ZupbEh97EZE4URgL-rhRSvhlV2R3OToAKV4iVq6ti0jhRe2pGNygtEitoE-hZfAH2eOQJpiyXOVUCuKqubgXPsf-9IIadF7SU2NWJ1sRXcW81QkmomVWfSMK3eUIjJqY4oXNmlXCi23Q_oTIdXE5KygOf3XXlsC06YJV5UCxmmrWh2apnEjknWJLuzrva5bwow64OqZoWD1SFkanMiibIXmyjZK_rm8MbHenjckSpeLkfc2XST46V54DRKL-dyjDmCFwZAIikUpOg9tgeQ',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,'dfd@dd.dd','h',NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDE5ODIwLCJleHAiOjE1MDIwMjM0MjAsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.waxHybq5Lmy3bsPqth_R3uP1f-U8L52hlf-SCGfbUIUfTGY3WVh5vIsWAh5y0S22IRdao3JEJ8d3xfpbR4cVWU6NbdFVMcGhmmM1Er6Jbmdg5lhJgwZgp9VFZxaU2DJjPnBu1pwepcHz_oJk24tpOxr7kG5KeHz3Efr_HKXBNvVWcWqz0tLAOspyM_rhSzCuoZKkez8_oLW-yJYy_j_ngtbgvkzBPutCUm2pi8SszKKMMSJkbUcwztSTq3KDUo9gFDWauxUeTNsv2zjyTez6QBE5BPmimE7yIRUCE4EI9mRauF5i8AlFYCpdj5JPxbvLggPLL-j0bN5_skxDAbYHBA',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(0,'hi','',NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJoaWhpIiwiaWF0IjoxNTAyMDE5ODIwLCJleHAiOjE1MDIwMjM0MjAsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstdXlnY3VAZGVva2ppbG1hdGUtOTRjODcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay11eWdjdUBkZW9ramlsbWF0ZS05NGM4Ny5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.waxHybq5Lmy3bsPqth_R3uP1f-U8L52hlf-SCGfbUIUfTGY3WVh5vIsWAh5y0S22IRdao3JEJ8d3xfpbR4cVWU6NbdFVMcGhmmM1Er6Jbmdg5lhJgwZgp9VFZxaU2DJjPnBu1pwepcHz_oJk24tpOxr7kG5KeHz3Efr_HKXBNvVWcWqz0tLAOspyM_rhSzCuoZKkez8_oLW-yJYy_j_ngtbgvkzBPutCUm2pi8SszKKMMSJkbUcwztSTq3KDUo9gFDWauxUeTNsv2zjyTez6QBE5BPmimE7yIRUCE4EI9mRauF5i8AlFYCpdj5JPxbvLggPLL-j0bN5_skxDAbYHBA',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notice
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `notice_id` int(11) NOT NULL,
  `notice_title` varchar(45) CHARACTER SET utf8 NOT NULL,
  `notice_main` varchar(200) CHARACTER SET utf8 NOT NULL,
  `notice_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;

INSERT INTO `notice` (`notice_id`, `notice_title`, `notice_main`, `notice_time`)
VALUES
	(0,'잠만보','잠자기','2017-06-05 00:00:00'),
	(1,'피카츄','백만볼트','2017-07-08 00:00:00');

/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table program
# ------------------------------------------------------------

DROP TABLE IF EXISTS `program`;

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `prgram_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `program_img` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `pre_flag` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_flag` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `year_flag` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;

INSERT INTO `program` (`program_id`, `prgram_name`, `program_img`, `pre_flag`, `time_flag`, `year_flag`)
VALUES
	(1,'인기가요','https://storage.googleapis.com/duckmate_1/musicShow/ingigayo.jpg','1','1','1'),
	(2,'엠카운트다운','https://storage.googleapis.com/duckmate_1/musicShow/mcountdown.jpg','1','1','1'),
	(3,'쇼챔피언','https://storage.googleapis.com/duckmate_1/musicShow/showchampion.jpg','1','1','1');

/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `questions_id` int(100) NOT NULL AUTO_INCREMENT,
  `firebaseToken` text COLLATE utf8_unicode_ci NOT NULL,
  `questions_title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `questions_main` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `questions_mail` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`questions_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`questions_id`, `firebaseToken`, `questions_title`, `questions_main`, `questions_mail`)
VALUES
	(1,'1','곱창먹고싶어','곱차아앙아ㅏ아아앙','hoho@ho.ho'),
	(2,'1','후','하','2@f.c'),
	(3,'1','후','하','2@f.c');

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table singer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `singer`;

CREATE TABLE `singer` (
  `singer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '가수 인덱스',
  `singer_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '가수 이름',
  `song_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '타이틀곡',
  `album_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '앨범 이름',
  `singer_img` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '가수 이미지',
  `album_img` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '앨범 이미지',
  `choice_count` int(11) DEFAULT NULL COMMENT '투표 카운트',
  `new_flag` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '새로 뜬 것 체크',
  PRIMARY KEY (`singer_id`,`singer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `singer` WRITE;
/*!40000 ALTER TABLE `singer` DISABLE KEYS */;

INSERT INTO `singer` (`singer_id`, `singer_name`, `song_name`, `album_name`, `singer_img`, `album_img`, `choice_count`, `new_flag`)
VALUES
	(1,'라붐','스','붐','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',1,'t'),
	(2,'젝스키스','젝스','키스','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',4,'f'),
	(3,'신화','신','화','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',100,'t'),
	(4,'모모랜드','모모','랜드','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',3,'f'),
	(5,'빅뱅','빅','뱅','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',4,'f'),
	(6,'엑소','엑','소','https://storage.googleapis.com/duckmate_1/test1.png','https://storage.googleapis.com/duckmate_1/test1.png',4,'f');

/*!40000 ALTER TABLE `singer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table singerlist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `singerlist`;

CREATE TABLE `singerlist` (
  `member_id` int(11) NOT NULL COMMENT '회원 인덱스',
  `singer_id` int(11) NOT NULL COMMENT '가수 인덱스',
  `program_id` int(11) NOT NULL COMMENT '프로그램 인덱스',
  `pre_do_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '사전투표 플래그',
  `pre_new_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  `time_do_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '실시간투표 플래그',
  `time_new_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  `year_do_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '연말 투표 플래그',
  `year_new_flag` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`member_id`,`singer_id`,`program_id`),
  KEY `singer_id_fk_idx` (`singer_id`),
  KEY `program_id_fk_idx` (`program_id`),
  CONSTRAINT `program_id_fk` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `singer_id_fk` FOREIGN KEY (`singer_id`) REFERENCES `singer` (`singer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `singerlist` WRITE;
/*!40000 ALTER TABLE `singerlist` DISABLE KEYS */;

INSERT INTO `singerlist` (`member_id`, `singer_id`, `program_id`, `pre_do_flag`, `pre_new_flag`, `time_do_flag`, `time_new_flag`, `year_do_flag`, `year_new_flag`)
VALUES
	(1,1,1,'1','1','1','1','1','1');

/*!40000 ALTER TABLE `singerlist` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
