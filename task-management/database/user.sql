-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2025 at 03:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `refresh_token`, `created_at`) VALUES
(1, 'Ram Pandey', 'rampandey@gmail.com', '$2b$10$lAye0opM6o2ZYco8lDfkHudWqKGr9JM4ZT.88ofKubbEnm71hyIH2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODQzOTY1NiwiZXhwIjoxNzQ5MDQ0NDU2fQ.RQNb8Mp0j5GJYs-gqXdaY-3-avEs8yXTytowq1Ar5c4', '2025-05-28 07:20:57'),
(2, 'Ram Pandey', 'rampand5678ey@gmail.com', '$2b$10$l60rzwH0Cw5CnylQvXMCLuO4XJGZFDQc8ZdAbD9WLslIfHpmycfGC', NULL, '2025-05-28 08:51:36'),
(19, 'Ram Pandey', 'abc@gmail.com', '$2b$10$MnLa4WtTfGIXUwl3akb6CO6zM//YjK/izKGnE5VKy2FGr9SeRxdHW', NULL, '2025-05-28 13:15:43'),
(23, 'Ram Pandey', 'absac@gmail.com', '$2b$10$rAAqePeRY6NgSo8mfg1q8eyfct0uOC/gVF.KYCtbpPqtKh0Vtlk4i', NULL, '2025-05-28 13:38:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
