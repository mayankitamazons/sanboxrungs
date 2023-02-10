-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2022 at 11:49 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `rider_id` int(11) DEFAULT NULL,
  `booked_seat` int(11) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL,
  `from_lat` varchar(255) DEFAULT NULL,
  `from_lng` varchar(255) DEFAULT NULL,
  `destination_address` varchar(255) DEFAULT NULL,
  `destination_lat` varchar(255) DEFAULT NULL,
  `destination_lng` varchar(255) DEFAULT NULL,
  `base_fare` int(11) DEFAULT NULL,
  `extra_amount` int(11) DEFAULT NULL,
  `discount_amount` int(11) DEFAULT NULL,
  `total_fare` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_code` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `payment_status` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means Pending\r\n1 Means Success',
  `booking_status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0' COMMENT '0 Means Pending\r\n1 Means Active\r\n2 Means Completed\r\n3 Means Cancelled' CHECK (json_valid(`booking_status`)),
  `remark` varchar(255) DEFAULT NULL COMMENT 'Remark when cancelled',
  `cancelled_by` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means Rider\r\n1 Means Driver',
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `trip_id`, `rider_id`, `booked_seat`, `from_location`, `from_lat`, `from_lng`, `destination_address`, `destination_lat`, `destination_lng`, `base_fare`, `extra_amount`, `discount_amount`, `total_fare`, `coupon_id`, `coupon_code`, `message`, `payment_status`, `booking_status`, `remark`, `cancelled_by`, `created`, `modified`) VALUES
(1, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:54', '2022-11-29 19:47:54'),
(2, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(3, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(4, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(5, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(6, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(7, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:57', '2022-11-29 19:47:57'),
(8, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:58', '2022-11-29 19:47:58'),
(9, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:58', '2022-11-29 19:47:58'),
(10, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:58', '2022-11-29 19:47:58'),
(11, 1, 4, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', 125, 10, 15, 135, 125, 'abcd', NULL, '0', '0', NULL, '0', '2022-11-29 19:47:58', '2022-11-29 19:47:58');

-- --------------------------------------------------------

--
-- Table structure for table `booking_payments`
--

CREATE TABLE `booking_payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `transaction_date_time` datetime DEFAULT NULL,
  `transaction_message` varchar(255) DEFAULT NULL,
  `transaction_status` enum('0','1','2','3','4','5') NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_options`
--

CREATE TABLE `payment_options` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `card_name` varchar(255) DEFAULT NULL,
  `payment_gateway_id` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recurring_trips`
--

CREATE TABLE `recurring_trips` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `trip_date` date DEFAULT NULL,
  `status` enum('0','1','2','3') NOT NULL DEFAULT '0' COMMENT '0 Means Pending\r\n1 Means Active\r\n2 Means Completed\r\n3 Means Cancelled',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recurring_trips`
--

INSERT INTO `recurring_trips` (`id`, `trip_id`, `trip_date`, `status`, `created`, `modified`) VALUES
(1, 1, '2022-11-26', '0', '2022-11-23 18:29:13', '2022-11-23 18:29:13'),
(2, 1, '2022-11-28', '0', '2022-11-23 18:29:13', '2022-11-23 18:29:13'),
(3, 1, '2022-11-26', '0', '2022-11-23 18:30:08', '2022-11-23 18:30:08'),
(4, 1, '2022-11-28', '0', '2022-11-23 18:30:08', '2022-11-23 18:30:08'),
(5, 1, '2022-11-26', '0', '2022-11-23 18:30:33', '2022-11-23 18:30:33'),
(6, 1, '2022-11-28', '0', '2022-11-23 18:30:33', '2022-11-23 18:30:33'),
(7, 2, '2022-11-26', '0', '2022-11-23 18:30:48', '2022-11-23 18:30:48'),
(8, 2, '2022-11-28', '0', '2022-11-23 18:30:48', '2022-11-23 18:30:48'),
(9, 1, '2022-11-26', '0', '2022-11-23 18:31:00', '2022-11-23 18:31:00'),
(10, 1, '2022-11-28', '0', '2022-11-23 18:31:00', '2022-11-23 18:31:00'),
(11, 1, '2022-11-26', '0', '2022-11-23 18:31:00', '2022-11-23 18:31:00'),
(12, 1, '2022-11-28', '0', '2022-11-23 18:31:00', '2022-11-23 18:31:00'),
(13, 1, '2022-11-26', '0', '2022-11-23 18:31:28', '2022-11-23 18:31:28'),
(14, 1, '2022-11-28', '0', '2022-11-23 18:31:28', '2022-11-23 18:31:28'),
(15, 1, '2022-11-26', '0', '2022-11-23 19:14:13', '2022-11-23 19:14:13'),
(16, 1, '2022-11-28', '0', '2022-11-23 19:14:13', '2022-11-23 19:14:13'),
(17, 9, '2022-12-05', '0', '2022-11-30 15:33:45', '2022-11-30 15:33:45'),
(18, 9, '2022-12-07', '0', '2022-11-30 15:33:45', '2022-11-30 15:33:45');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `review_by` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means Rider\r\n1 Means Driver',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `from_location` varchar(255) DEFAULT NULL,
  `from_lat` varchar(255) DEFAULT NULL,
  `from_lng` varchar(255) DEFAULT NULL,
  `destination_address` varchar(255) DEFAULT NULL,
  `destination_lat` varchar(255) DEFAULT NULL,
  `destination_lng` varchar(255) DEFAULT NULL,
  `no_of_seat` int(11) DEFAULT NULL,
  `trip_schedule` enum('1','2') DEFAULT NULL COMMENT '1 For One Time\r\n2 For Recurring ',
  `trip_type` enum('1','2') DEFAULT NULL COMMENT '1 Means one way\r\n2 Means Return',
  `departure_date_time` datetime DEFAULT NULL,
  `return_date_time` datetime DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` enum('0','1','2','3') NOT NULL DEFAULT '0' COMMENT '0 Means inactive\r\n1 Means Active\r\n2 means Completed\r\n3 Means Cancelled',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `driver_id`, `from_location`, `from_lat`, `from_lng`, `destination_address`, `destination_lat`, `destination_lng`, `no_of_seat`, `trip_schedule`, `trip_type`, `departure_date_time`, `return_date_time`, `price`, `vehicle_id`, `parent_id`, `status`, `created`, `modified`) VALUES
(1, 1, 'jaipur', '26.8926976', '75.7792768', 'delhi', '28.527582', '77.0688969', NULL, '1', '2', '2022-11-22 19:50:12', '2022-11-23 19:50:12', NULL, NULL, NULL, '1', '2022-11-22 19:47:29', '2022-11-22 19:47:29'),
(2, 1, 'jaipur', '26.890726', '75.7554731', 'Rohtak', '28.8896188', '76.4810439', NULL, '1', '1', '2022-11-22 19:50:12', '2022-11-23 19:50:12', NULL, NULL, NULL, '0', '2022-11-22 19:47:51', '2022-11-22 19:47:51'),
(3, 1, 'jaipur', '26.9271742', '75.7397432', 'Bhiwadi', '28.2037159', '76.772404', NULL, '1', '1', NULL, NULL, NULL, NULL, NULL, '0', '2022-11-22 19:50:00', '2022-11-22 19:50:00'),
(4, 1, 'jaipur', '26.9912325', '75.7530003', 'Rewari', '28.1990935', '76.5523352', NULL, '1', '1', NULL, NULL, NULL, NULL, NULL, '0', '2022-11-22 19:50:12', '2022-11-22 19:50:12'),
(5, 1, 'Udaipur', '24.6082257', '73.569578', 'Chandigarh', '30.7350626', '76.6934878', NULL, '1', '1', NULL, NULL, NULL, NULL, NULL, '0', '2022-11-22 19:50:12', '2022-11-22 19:50:12'),
(8, 1, '1', '26.772091999999997', '75.6789513', 'ifc pizza', '26.8973525', '75.71287389999999', 2, '1', '2', '2022-11-30 19:30:12', '2022-12-01 19:30:12', NULL, NULL, NULL, '0', '2022-11-30 14:38:41', '2022-11-30 14:38:41'),
(9, 1, 'Malviya Nagar,Jaipur', '26.8503065', '75.8179064', 'New Delhi Railway Station', '28.6445167', '77.2193459,17', 2, '1', '2', '2022-11-30 19:30:12', '0000-00-00 00:00:00', NULL, NULL, NULL, '0', '2022-11-30 14:39:05', '2022-11-30 14:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `trip_facilities`
--

CREATE TABLE `trip_facilities` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `luggage_type` enum('1','2','3','4') NOT NULL DEFAULT '1' COMMENT '1 Means No\r\n2 Means Small\r\n3 Means medium\r\n4 Means Large',
  `back_side_seat_for_two_only` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `smoking_allow` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `drinking_allow` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `pets_allow` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `reach_on_time` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `wear_face_mask` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 Means No\r\n1 Means Yes',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trip_facilities`
--

INSERT INTO `trip_facilities` (`id`, `trip_id`, `luggage_type`, `back_side_seat_for_two_only`, `smoking_allow`, `drinking_allow`, `pets_allow`, `reach_on_time`, `wear_face_mask`, `created`, `modified`) VALUES
(1, 1, '1', '1', '1', '1', '1', '1', '1', '2022-11-23 19:20:40', '2022-11-23 19:20:40');

-- --------------------------------------------------------

--
-- Table structure for table `trip_find_request`
--

CREATE TABLE `trip_find_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_lat` varchar(255) DEFAULT NULL,
  `user_lng` varchar(255) DEFAULT NULL,
  `user_destination_address` varchar(255) DEFAULT NULL,
  `user_destination_lat` varchar(255) DEFAULT NULL,
  `user_destination_lng` varchar(255) DEFAULT NULL,
  `user_departure_date_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trip_find_request`
--

INSERT INTO `trip_find_request` (`id`, `user_id`, `user_address`, `user_lat`, `user_lng`, `user_destination_address`, `user_destination_lat`, `user_destination_lng`, `user_departure_date_time`) VALUES
(1, 4, NULL, '26.8926976', '75.7792768', NULL, '28.527582', '77.0688969', '2022-11-30 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `trip_stops`
--

CREATE TABLE `trip_stops` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `destination_address` varchar(255) DEFAULT NULL,
  `destination_lat` varchar(255) DEFAULT NULL,
  `destination_lng` varchar(255) DEFAULT NULL,
  `departure_date_time` datetime DEFAULT NULL,
  `no_of_seat` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trip_stops`
--

INSERT INTO `trip_stops` (`id`, `trip_id`, `destination_address`, `destination_lat`, `destination_lng`, `departure_date_time`, `no_of_seat`, `price`, `created`, `modified`) VALUES
(1, 1, 'Bhiwadi', '28.2037159', '76.772404', NULL, NULL, 25, '2022-11-22 19:47:29', '0000-00-00 00:00:00'),
(2, 1, 'Rewari', '28.1990935', '76.5523352', NULL, NULL, 45, '2022-11-22 19:47:29', '0000-00-00 00:00:00'),
(3, 4, 'Noida', '28.4983936', '77.2453693', NULL, NULL, 25, '2022-11-22 19:50:12', '0000-00-00 00:00:00'),
(4, 4, 'Bawal', '28.0906668', '76.519853', NULL, NULL, 45, '2022-11-22 19:50:12', '0000-00-00 00:00:00'),
(5, 5, 'Jaipur', '26.8926976', '75.7792768', NULL, NULL, 45, '2022-11-22 19:50:12', '0000-00-00 00:00:00'),
(6, 5, 'Delhi', '28.527582', '77.0688969', NULL, NULL, 45, '2022-11-22 19:50:12', '0000-00-00 00:00:00'),
(9, 9, 'Agra', '27.165440', '78.054520', NULL, 2, 250, '2022-11-30 14:39:05', '0000-00-00 00:00:00'),
(10, 9, 'Rewari', '28.192762', '76.623940', NULL, 2, 250, '2022-11-30 14:39:05', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `trip_vehicles`
--

CREATE TABLE `trip_vehicles` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `colour` varchar(255) DEFAULT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 Means Active\r\n2 Means Incative',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trip_vehicles`
--

INSERT INTO `trip_vehicles` (`id`, `trip_id`, `image`, `model`, `type_id`, `colour`, `registration_number`, `status`, `created`, `modified`) VALUES
(1, 1, 'ashish.jpg', 'Tata Neno', 1, 'white', 'RJ-21-BA-2525', '1', '2022-11-23 19:14:16', '2022-11-23 19:14:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `total_people_drive` int(11) DEFAULT NULL,
  `total_ride_taken` int(11) DEFAULT NULL,
  `total_km_shard` int(11) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `social_plateform` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `forgot_password_otp` varchar(255) DEFAULT NULL,
  `otp_for_mobile` varchar(255) DEFAULT NULL,
  `mobile_verified` enum('Y','N') NOT NULL DEFAULT 'N',
  `otp_for_email` varchar(255) DEFAULT NULL,
  `email_verified` enum('Y','N') NOT NULL DEFAULT 'N',
  `is_driver` enum('0','1') NOT NULL DEFAULT '1' COMMENT '0 Means no\r\n1 Means Yes',
  `rating` int(11) DEFAULT NULL,
  `smoking` tinyint(1) DEFAULT NULL,
  `chattingess` varchar(255) DEFAULT NULL,
  `driver_id_verified` tinyint(1) DEFAULT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '1' COMMENT '1 Means Active\r\n2 Means Inactive\r\n0 Means Block by admin',
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `email`, `country_code`, `mobile`, `dob`, `total_people_drive`, `total_ride_taken`, `total_km_shard`, `social_id`, `social_plateform`, `profile_pic`, `gender`, `about`, `location`, `password`, `forgot_password_otp`, `otp_for_mobile`, `mobile_verified`, `otp_for_email`, `email_verified`, `is_driver`, `rating`, `smoking`, `chattingess`, `driver_id_verified`, `status`, `created`, `modified`) VALUES
(1, 'mohit r', NULL, 'upa', 'm@gmail.com', NULL, '9001025477', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$IDJmnWbjaK4QI8uJ.5nn9OHqCHjKTMp6BBiy9HkaF87NPG4wdC70y', '', NULL, 'N', NULL, 'N', '1', NULL, NULL, NULL, 1, '1', '2022-11-30 10:41:26', '2022-11-30 10:41:26'),
(2, 'raj', NULL, 'sharma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456', 'fb', '', NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, 'N', '1', NULL, NULL, NULL, NULL, '1', '2022-11-30 11:38:50', '2022-11-30 11:38:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_verifications`
--

CREATE TABLE `user_verifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name_as_id` varchar(255) DEFAULT NULL,
  `last_name_as_id` varchar(255) DEFAULT NULL,
  `photo_id_image` varchar(255) DEFAULT NULL,
  `doc_type` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '0 Means Pending\r\n1 Means Approved\r\n2 Means Rejected',
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_verifications`
--

INSERT INTO `user_verifications` (`id`, `user_id`, `first_name_as_id`, `last_name_as_id`, `photo_id_image`, `doc_type`, `remark`, `status`, `created`, `modified`) VALUES
(1, 1, 'mayank', 'sharma', 'photo', 'dl', NULL, '0', '2022-11-30 11:57:19', '2022-11-30 11:57:19'),
(5, 1, 'mayank', 'sharma', 'photo', 'dl2', NULL, '0', '2022-11-30 12:20:21', '2022-11-30 12:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `total_seat` int(11) DEFAULT NULL,
  `fule_type` enum('1','2','3','4') NOT NULL DEFAULT '1' COMMENT '1 Means Petrol\r\n2 Means diesel\r\n3 Means Gas\r\n4 Means Electric',
  `ac` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 Means Yes\r\n2 Means No',
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 Means Active\r\n2 Means Inactive',
  `created` datetime DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `brand_name`, `type`, `model`, `total_seat`, `fule_type`, `ac`, `status`, `created`, `modified`) VALUES
(1, 'Tata', 'Small Car', 'Neno', 4, '1', '2', '1', '2022-11-29 06:08:27', '2022-11-29 06:08:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_payments`
--
ALTER TABLE `booking_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_options`
--
ALTER TABLE `payment_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recurring_trips`
--
ALTER TABLE `recurring_trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_facilities`
--
ALTER TABLE `trip_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_find_request`
--
ALTER TABLE `trip_find_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_stops`
--
ALTER TABLE `trip_stops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip_vehicles`
--
ALTER TABLE `trip_vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `booking_payments`
--
ALTER TABLE `booking_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_options`
--
ALTER TABLE `payment_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recurring_trips`
--
ALTER TABLE `recurring_trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `trip_facilities`
--
ALTER TABLE `trip_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trip_find_request`
--
ALTER TABLE `trip_find_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trip_stops`
--
ALTER TABLE `trip_stops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `trip_vehicles`
--
ALTER TABLE `trip_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_verifications`
--
ALTER TABLE `user_verifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
