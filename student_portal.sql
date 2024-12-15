-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 07:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `id` int(11) NOT NULL,
  `teacherName` varchar(100) NOT NULL,
  `subName` varchar(100) NOT NULL,
  `assignmentName` varchar(200) NOT NULL,
  `postDate` date NOT NULL,
  `dueDate` date NOT NULL,
  `aStatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`id`, `teacherName`, `subName`, `assignmentName`, `postDate`, `dueDate`, `aStatus`) VALUES
(1, 'teacher 1', 'sub 1', 'assignment 2', '2024-12-13', '2024-12-19', 'Posted'),
(2, 'teacher 3', 'subject 3', 'assignment 2', '2024-12-14', '2024-12-23', 'Posted'),
(3, 'teacher 4', 'subject 4', 'assignment 3', '2024-12-15', '2024-12-23', 'Posted');

-- --------------------------------------------------------

--
-- Table structure for table `submitted`
--

CREATE TABLE `submitted` (
  `sId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `status` varchar(100) NOT NULL,
  `submittedDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submitted`
--

INSERT INTO `submitted` (`sId`, `userId`, `assignmentId`, `content`, `status`, `submittedDate`) VALUES
(1, 1, 2, 'test content', 'deleted\r\n', '2024-12-14'),
(2, 2, 2, 'test content', 'submitted', '2024-12-14'),
(3, 2, 2, 'test content', 'deleted\r\n', '2024-12-14'),
(4, 6, 1, 'Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\n\narjun: 8527469635\naduljith: 8574968574\ndevan: 9874567895\n# comments for testing \n# these lines will be removed\n# this is a test comment', 'deleted\r\n', '2024-12-14'),
(12, 6, 1, 'Twinkle, twinkle, little star,\r\nHow I wonder what you are!\r\nUp above the world so high,\r\nLike a diamond in the sky.\r\n\r\narjun: 8527469635\r\naduljith: 8574968574\r\ndevan: 9874567895\r\n# comments for testing \r\n# these lines will be removed\r\n# this is a test comment', 'submitted', '2024-12-14'),
(13, 6, 2, 'Twinkle, twinkle, little star,\r\nHow I wonder what you are!\r\nUp above the world so high,\r\nLike a diamond in the sky.\r\n\r\narjun: 8527469635\r\naduljith: 8574968574\r\ndevan: 9874567895\r\n# comments for testing \r\n# these lines will be removed\r\n# this is a test comment', 'submitted', '2024-12-15');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rollno` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `rollno`, `type`, `email`, `password`) VALUES
(4, 'new3', 9, 'student', 'new3@mail.com', '$2b$10$Uj7qGFuzRN1lz.HmWwWT.OjIJpN/CwNO5zUrkHXDQU0xxEWa8udAK'),
(6, 'new5', 8, 'student', 'new4@mail.com', '$2b$10$0CMJB.ev8hC/2ZkIgOd81ubB98PFVr3btTO/Pa.QMnH9FYlwIop7i'),
(7, 'admin', 1, 'admin', 'admin@gmail.com', '$2b$10$McWcWxwS5ciE9kLGaVw.HeZSrVA0TU32FsAd.yCVVjOpXU8trjT2m');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submitted`
--
ALTER TABLE `submitted`
  ADD PRIMARY KEY (`sId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rollno` (`rollno`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `submitted`
--
ALTER TABLE `submitted`
  MODIFY `sId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
