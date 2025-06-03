-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2025 at 03:46 PM
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
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `due_date` datetime NOT NULL,
  `status` enum('pending','in-progress','completed') NOT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `category` text DEFAULT NULL,
  `task_comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `due_date`, `status`, `assigned_to`, `category`, `task_comment`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(8, 'This is my new task', 'This is task description for task id 1', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:27:42', '2025-03-28 20:27:42', '', ''),
(9, 'This is my new task', 'This is task description for task id 2', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:28:01', '2025-03-28 20:28:01', '', ''),
(10, 'This is my updated task', 'This is task description', '1999-12-26 00:00:00', 'completed', 'Ram', 'Hot', 'good task', '2025-03-28 20:28:09', '2025-03-28 20:36:38', '', ''),
(11, 'This is my new task', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:30:20', '2025-03-28 20:30:20', '', ''),
(12, 'This is my new task', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 11:16:05', '2025-05-28 11:16:05', '', ''),
(13, 'This is my new task', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 11:18:07', '2025-05-28 11:18:07', '', ''),
(14, 'This is my new task', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:47:49', '2025-05-28 14:47:49', '', ''),
(15, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:48:07', '2025-05-28 14:48:07', '', ''),
(16, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:48:08', '2025-05-28 14:48:08', '', ''),
(17, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:48:10', '2025-05-28 14:48:10', '', ''),
(18, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 40000', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:48:15', '2025-05-28 14:48:15', '', ''),
(20, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 40000', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:54:45', '2025-05-28 14:54:45', '1', '1'),
(21, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 40000', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:54:46', '2025-05-28 14:54:46', '1', '1'),
(22, 'This is my new hfkj ghdfkhgkjhdfkjh gkdfh gkfdtask', 'This is task description for task id 40000', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 14:54:47', '2025-05-28 14:54:47', '1', '1'),
(23, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 17:48:54', '2025-05-28 17:48:54', '1', '1'),
(24, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 17:49:34', '2025-05-28 17:49:34', '1', '1'),
(25, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 18:30:46', '2025-05-28 18:30:46', '1', '1'),
(26, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 18:38:21', '2025-05-28 18:38:21', '1', '1'),
(27, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 18:39:06', '2025-05-28 18:39:06', '1', '1'),
(28, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 18:46:47', '2025-05-28 18:46:47', '1', '1'),
(29, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 19:08:40', '2025-05-28 19:08:40', '1', '1'),
(30, 'Test Task', 'Test description', '2025-12-31 00:00:00', 'pending', NULL, NULL, NULL, '2025-05-28 19:10:56', '2025-05-28 19:10:56', '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
