<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dipak_app";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if($conn){
        date_default_timezone_set("Asia/Calcutta");
    }

    if(!$conn){
        echo "Connection Failed";
    }

?>