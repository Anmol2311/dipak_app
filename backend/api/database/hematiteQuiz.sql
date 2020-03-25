-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 03, 2020 at 08:12 PM
-- Server version: 5.6.47-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hematiteQuiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `examCode` int(11) NOT NULL,
  `examName` varchar(50) NOT NULL,
  `examStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `examCode`, `examName`, `examStatus`) VALUES
(1, 1, 'angular 4/5', 1),
(2, 2, 'java', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `examCode` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `a` varchar(200) NOT NULL,
  `b` varchar(200) NOT NULL,
  `c` varchar(200) NOT NULL,
  `d` varchar(200) NOT NULL,
  `answer` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `examCode`, `question`, `a`, `b`, `c`, `d`, `answer`) VALUES
(1, 2, 'Which was the first purely object oriented programming language developed?', 'Java', 'C++', 'SmallTalk', 'Kotlin', 'c'),
(2, 2, 'Which of the following best defines a class?', 'Parent of an object', 'Instance of an object', 'Scope of an object', 'Blueprint of an object', 'd'),
(3, 2, 'Which is not feature of OOP in general definitions?', 'Code reusability', 'Modularity', 'Duplicate/Redundant data', 'Efficient Code', 'c'),
(4, 2, 'Which Feature of OOP illustrated the code reusability?', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation', 'b'),
(5, 2, 'Why Java is Partially OOP language?', 'It supports usual declaration of primitive data types', 'It doesnâ€™t support all types of inheritance', 'It allows code to be written outside classes', 'It does not support pointers', 'a'),
(6, 2, 'Which of the following is not feature of pure OOP', 'Classes must be used', 'Inheritance', 'Data may/may not be declared using object', 'Functions Overloading', 'c'),
(7, 2, 'Which among the following doesnâ€™t come under OOP concept', 'Platform independent', 'Data binding', 'Message passing', 'Data hiding', 'a'),
(8, 2, 'Which feature of OOP is indicated by the following code?\nclass student{ int marks; };\nclass topper:public student{ int age; topper(int age){ this.age=age; } };', 'Polymorphism', 'Inheritance', 'Inheritance and polymorphism', 'Encapsulation and Inheritance', 'd'),
(9, 2, 'Which of these operators is used to allocate memory to array variable in Java?', 'malloc', 'alloc', 'new', 'new malloc', 'c'),
(10, 2, 'Which of these is an incorrect array declaration?', 'int arr[] = new int[5]', 'int [] arr = new int[5]', 'int arr[] = new int[5]', 'int arr[] = int [5] new', 'd'),
(11, 2, 'What will be the output of the following Java code?\nint arr[] = new int [5];\n / System.out.print(arr);', '0', 'value stored in arr[0]', '0', 'Class name@ hashcode in hexadecimal form', 'd'),
(12, 2, 'Which of these can be returned by the operator &', 'Integer', 'Boolean', 'Character', 'Integer or Boolean', 'd'),
(13, 2, 'Which of these can not be used for a variable name in Java?', 'identifier', 'keyword', 'identifier & keyword', 'none of the mentioned', 'b'),
(14, 2, 'Which of the following is a method having same name as that of its class?', 'finalize', 'delete', 'class', 'constructor', 'd'),
(15, 2, 'What will be the output of the following Java code?', 'compile time error', 'run time error', 'compile and runs fine', 'unreported exception java.io.IOException in default constructor', 'a'),
(16, 2, 'Which of this access specifies can be used for a class so that its members can be accessed by a different class in the same package?', 'Public', 'Protected', 'No Modifier', 'All of the mentioned', 'd'),
(17, 2, 'Which of the following is the correct way of importing an entire package â€˜pkgâ€™?', 'import pkg', 'Import pkg.', 'import pkg.*', 'Import pkg*', 'c'),
(18, 2, 'Which of the following is an incorrect statement about packages?', 'Package defines a namespace in which classes are stored', 'A package can contain other package within it', 'Java uses file system directories to store packages', 'A package can be renamed without renaming the directory in which the classes are stored', 'd'),
(19, 2, 'Which of the following package stores all the standard java classes?', 'lang', 'java', 'util', 'java.packages', 'b'),
(20, 2, 'Which of the following keywords is used for throwing exception manually?', 'finally', 'try', 'throw', 'catch', 'c'),
(21, 2, 'Which of the following classes can catch all exceptions which cannot be caught?', 'RuntimeException', 'Error', 'Exception', 'ParentException', 'b'),
(22, 2, 'Which of the following is a super class of all exception type classes', 'Catchable', 'RuntimeExceptions', 'String', 'Throwable', 'd'),
(23, 2, 'Which part of code gets executed whether exception is caught or not?', 'finally', 'try', 'catch', 'throw', 'a'),
(24, 2, 'Which of the following should be true of the object thrown by a thrown statement?', 'Should be assignable to String type', 'Should be assignable to Exception type', 'Should be assignable to Throwable type', 'Should be assignable to Error type', 'c'),
(25, 2, 'Which of these is a super class of all exceptional type classes?', 'String', 'RuntimeExceptions', 'Throwable', 'Cacheable', 'c'),
(26, 2, 'Which of these class is related to all the exceptions that cannot be caught?', 'Error', 'Exception', 'RuntimeExecption', 'All of the mentioned', 'a'),
(27, 2, 'Which of these class contains the methods used to write in a file?', 'FileStream', 'FileInputStream', 'BUfferedOutputStream', '', 'b'),
(28, 2, 'Which of these exception is thrown in cases when the file specified for writing is not found?', 'IOException', 'FileException', 'FileNotFoundException', 'FileInputException', 'c'),
(29, 2, 'Which of these methods are used to read in from file?', 'get()', 'read()', 'scan()', 'readFileInput()', 'b'),
(30, 2, 'Which of these values is returned by read() method is end of file (EOF) is encountered?', '0', '1', '-1', 'Null', 'c'),
(31, 2, 'Which of these methods is used to write() into a file?', 'put()', 'putFile()', 'write()', 'writeFile()', 'c'),
(32, 2, 'Which of these is used to perform all input & output operations in Java?', 'streams', 'Variables', 'classes', 'Methods', 'a'),
(33, 2, 'Which of these class is used to read from byte array?', 'InputStream', 'BufferedInputStream', 'ArrayInputStream', 'ByteArrayInputStream', 'd'),
(34, 2, 'Which of these methods deletes all the elements from invoking collection?', 'clear()', 'reset()', 'delete()', 'refresh()', 'a'),
(35, 2, 'What is Collection in Java?', 'A group of objects', 'A group of classes', 'A group of interfaces', 'None of the mentioned', 'a'),
(36, 2, 'Which of these packages contain all the collection classes?', 'java.lang', 'java.util', 'java.net', 'java.awt', 'b'),
(37, 2, 'Which of these classes is not part of Javaâ€™s collection framework?', 'Maps', 'Array', 'Stack', 'Queue', 'a'),
(38, 2, 'Which of this interface is not a part of Javaâ€™s collection framework?', 'List', 'Set', 'SortedMap', 'SortedList', 'd'),
(39, 2, 'Which of the following is not pre defined annotation in Java?', '@Deprecated', '@Overriden', '@SafeVarags', '@FunctionInterface', 'b'),
(40, 2, 'Which one of the following annotations is not used in Hibernate?', '@Entity', '@Column', '@Basic', '@Query', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `examId` int(11) DEFAULT NULL,
  `totalMarks` int(11) DEFAULT NULL,
  `obtainedMarks` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `grade` varchar(2) DEFAULT NULL,
  `examDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id`, `studentId`, `examId`, `totalMarks`, `obtainedMarks`, `status`, `grade`, `examDate`) VALUES
(8, 1, 2, 40, 9, 'fail', 'C', '2019-11-15 05:48:32'),
(17, 1, 2, 40, 2, 'fail', 'C', '2019-11-15 09:09:23'),
(18, 1, 2, 40, 0, 'fail', 'C', '2019-11-15 16:22:09'),
(19, 1, 2, 40, 0, 'fail', 'C', '2020-02-01 09:13:37'),
(20, 1, 1, 40, 1, 'fail', 'C', '2020-02-03 07:14:26'),
(21, 1, 2, 40, 4, 'fail', 'C', '2020-02-09 10:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `dob` varchar(30) NOT NULL,
  `contact` bigint(20) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `organization` varchar(20) NOT NULL,
  `branch` varchar(20) NOT NULL,
  `pnrNo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `fname`, `lname`, `email`, `dob`, `contact`, `gender`, `organization`, `branch`, `pnrNo`) VALUES
(1, 'anmol', 'chaware', 'anmolchaware23@gmail.com', '11/23/1993', 8830165402, 'male', 'lighthouse', 'aundh', 'null'),
(2, 'rupeshp', 'bhagat', 'bhagat.r29@gmail.com', '1991-11-29', 8329324580, 'male', 'cdac', '', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `emailId` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `contact` bigint(15) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `emailId`, `password`, `contact`, `gender`, `role`) VALUES
(1, 'anmol', 'chaware', 'anmolchaware23@gmail.com', 'Anmolc@123', 8830165402, 'male', 'admin'),
(2, 'rupesh', 'bhagat', 'bhagat.r29@gmail.com', 'Rupeshb@123', 8329324580, 'male', 'trainer'),
(7, 'ruchi', 'rao', 'ruchi.rao@hematitecorp.com', 'Ruchir@123', 8551068222, 'female', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int(11) NOT NULL,
  `voucherCode` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `voucherCode`, `status`) VALUES
(1, 'asasas', 0),
(2, 'zazaza', 1),
(3, 'Cb6g7P', 0),
(4, 'M3fXYS', 0),
(5, 'Is1oDc', 0),
(6, 'M3fXYS', 0),
(7, 'Is1oDc', 0),
(8, '6KNSoi', 0),
(9, '9s6fFs', 0),
(10, 'uMI5nd', 0),
(11, 'gSTb5h', 0),
(12, 'i348zN', 0),
(13, '6M24Ym', 0),
(14, 'e6b3xvc', 0),
(15, 'OvYgzQ', 0),
(16, 'XGDeIc', 0),
(17, 'hQtcAS', 0),
(18, 'A6umec', 0),
(19, 'qV5DyH', 0),
(20, 'wcSUpp', 0),
(21, 'iSlFid', 0),
(22, 'oY7S3W', 0),
(23, 'Ab6AA', 0),
(24, 'Ab6Ab', 0),
(25, 'tata6', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`,`examCode`),
  ADD UNIQUE KEY `examCode` (`examCode`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FOREIGN KEY` (`examCode`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result_ibfk_1` (`examId`),
  ADD KEY `result_ibfk_2` (`studentId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FOREIGN KEY` FOREIGN KEY (`examCode`) REFERENCES `exam` (`examCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exam` (`examCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `result_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
