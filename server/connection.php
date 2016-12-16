<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  $db_hostname = 'kc-sce-appdb01';
  $db_database = "afc4z3";
  $db_username = "afc4z3";
  $db_password = "RZljx5RKoA";
  

 $connection = mysqli_connect($db_hostname, $db_username,$db_password,$db_database);
 
 if (!$connection)
    die("Unable to connect to MySQL: " . mysqli_connect_errno());


?>