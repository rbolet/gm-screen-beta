-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2020 at 11:44 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gmScreenv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaignImages`
--

DROP TABLE IF EXISTS `campaignImages`;
CREATE TABLE `campaignImages` (
  `campaignImageId` int(11) NOT NULL,
  `campaignId` int(11) NOT NULL,
  `imageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campaignImages`
--

INSERT INTO `campaignImages` (`campaignImageId`, `campaignId`, `imageId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(11, 2, 11),
(12, 2, 12),
(13, 2, 13),
(14, 2, 14),
(15, 2, 15),
(16, 2, 16),
(17, 2, 17),
(18, 2, 18),
(19, 2, 19),
(20, 2, 20),
(21, 2, 21),
(22, 2, 22),
(23, 2, 23);

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE `campaigns` (
  `campaignId` int(11) NOT NULL,
  `campaignName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `campaignGM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`campaignId`, `campaignName`, `campaignGM`) VALUES
(1, 'Erebor', 1),
(2, 'Guest Campaign', 5);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `imageId` int(11) NOT NULL,
  `fileName` varchar(60) NOT NULL,
  `category` varchar(20) NOT NULL,
  `alias` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imageId`, `fileName`, `category`, `alias`) VALUES
(1, '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png', 'Secondary', 'belf'),
(2, '9cf9225a-979f-40cc-a934-e270c1c752a9..jpg', 'Environment', 'Village'),
(3, 'e065a3a2-f00a-4ed5-af0b-e4fd19c1d901..png', 'Secondary', 'Fett'),
(4, '9cf9225a-979f-40cc-a934-e270c1c752a9..jpg', 'Environment', 'Village'),
(5, '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png', 'Secondary', 'Elf'),
(6, '11c251c6-1364-4888-8b1f-970e24146384..jpg', 'Environment', 'Spooky Forest'),
(7, '165749fb-643f-4d73-ab23-b73636ee81e7..jpg', 'Secondary', 'Wraith'),
(8, '972b8a94-eeaf-42d1-bde2-e3625cd9a48e..jpg', 'Secondary', 'Fighter'),
(9, 'd8b26836-3958-480f-9965-40e2a428c797..png', 'Secondary', 'Villager'),
(11, '31b0d0c2-0617-47ba-a03e-d7e384aca53b..png', 'Secondary', 'Stromtroopers'),
(12, '68fdc558-44c6-405e-a60b-19613d8dbf73..jpg', 'Environment', 'Imperial Hangar'),
(13, 'cb1b8bcf-106c-48b6-88cd-da34f3635da7..jpg', 'Environment', 'Imp Exterior'),
(14, '5edafd50-c143-482c-bb42-9fa2c40e89c7..jpg', 'Environment', 'Imp Hallway'),
(15, '769596ae-cf4d-46cf-b88e-c6ce5d94b0b3..png', 'Secondary', 'Imperial Officer'),
(16, '9c3d88ac-b1d7-4385-b498-f88b2cec3ae6..png', 'Secondary', 'Dog'),
(17, '92463c6c-b93f-4673-a7f6-2903d55ccfcd..png', 'Secondary', 'Blaster'),
(18, '01075924-0fea-4185-9cf3-82dde418dff6..png', 'Secondary', 'Mando'),
(19, '5a70a07d-a183-4298-a772-fc22473b360e..png', 'Secondary', 'Duros'),
(20, '65b48396-adfa-40f3-9c92-ddeaa25d6a37..png', 'Secondary', 'b1'),
(21, '18974c1a-428f-482b-ace5-20ac7dc2b965..png', 'Secondary', 'Bith'),
(22, 'dc0bd8c6-1ba6-4eee-8fe7-5630a070ef78..png', 'Secondary', 'bb-8'),
(23, '7c517791-cbfa-4382-b2c5-fb5ff31a4a8c..jpg', 'Secondary', 'k2so');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `sessionId` int(11) NOT NULL,
  `campaignId` int(11) DEFAULT NULL,
  `updated` int(11) NOT NULL,
  `environmentImageFileName` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sessionId`, `campaignId`, `updated`, `environmentImageFileName`) VALUES
(1, 2, 1586365652, '11c251c6-1364-4888-8b1f-970e24146384..jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `tokenId` int(11) NOT NULL,
  `imageFileName` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionId` int(11) NOT NULL,
  `tokenName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tokenDetails` varchar(280) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT ' ',
  `hidden` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`tokenId`, `imageFileName`, `sessionId`, `tokenName`, `tokenDetails`, `hidden`) VALUES
(30, '165749fb-643f-4d73-ab23-b73636ee81e7..jpg', 1, 'Wraith (Hidden)', 'Sam can see', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tokenVisibleTo`
--

DROP TABLE IF EXISTS `tokenVisibleTo`;
CREATE TABLE `tokenVisibleTo` (
  `tokenVisibleToId` int(11) NOT NULL,
  `tokenId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokenVisibleTo`
--

INSERT INTO `tokenVisibleTo` (`tokenVisibleToId`, `tokenId`, `userId`) VALUES
(2, 30, 5),
(3, 30, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `password`) VALUES
(1, 'admiralAckbar', 'itsatrap'),
(2, 'Person', 'person'),
(3, 'Leia', 'pewpew'),
(4, 'goldOne', 'asplode'),
(5, 'Guest GM', 'guest'),
(6, 'Guest Player 1', 'guest'),
(7, 'Guest Player 2', 'guest'),
(8, 'Guest Player 3', 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaignImages`
--
ALTER TABLE `campaignImages`
  ADD PRIMARY KEY (`campaignImageId`),
  ADD KEY `campaignId` (`campaignId`),
  ADD KEY `imageId` (`imageId`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaignId`),
  ADD KEY `campaignGM` (`campaignGM`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`imageId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionId`),
  ADD KEY `campaignId` (`campaignId`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`tokenId`),
  ADD KEY `sessionId` (`sessionId`);

--
-- Indexes for table `tokenVisibleTo`
--
ALTER TABLE `tokenVisibleTo`
  ADD PRIMARY KEY (`tokenVisibleToId`),
  ADD KEY `tokenId` (`tokenId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaignImages`
--
ALTER TABLE `campaignImages`
  MODIFY `campaignImageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `campaignId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `sessionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `tokenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `tokenVisibleTo`
--
ALTER TABLE `tokenVisibleTo`
  MODIFY `tokenVisibleToId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaignImages`
--
ALTER TABLE `campaignImages`
  ADD CONSTRAINT `campaignImages_ibfk_1` FOREIGN KEY (`campaignId`) REFERENCES `campaigns` (`campaignId`) ON DELETE CASCADE,
  ADD CONSTRAINT `campaignImages_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `images` (`imageId`) ON DELETE CASCADE;

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`campaignGM`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`campaignId`) REFERENCES `campaigns` (`campaignId`) ON DELETE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`sessionId`) ON DELETE CASCADE;

--
-- Constraints for table `tokenVisibleTo`
--
ALTER TABLE `tokenVisibleTo`
  ADD CONSTRAINT `tokenVisibleTo_ibfk_1` FOREIGN KEY (`tokenId`) REFERENCES `tokens` (`tokenId`) ON DELETE CASCADE,
  ADD CONSTRAINT `tokenVisibleTo_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
