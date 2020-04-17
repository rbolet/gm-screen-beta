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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`userId`, `userName`, `password`) VALUES
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
