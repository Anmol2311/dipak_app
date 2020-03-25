<?php
    require "./config/headerconfig.php";

    $request_method = $_SERVER["REQUEST_METHOD"]; // get request method

    $response = array();

    // check request method
    switch ($request_method) {
        case "GET":
            response(doGet());
            break;
        case "POST":
            response(doPost());
            break;
        case "PUT":
            response(doPut());
            break;
        case "DELETE":
            response(doDelete());
            break;
    }

    // get exam
    function doGet(){
        if(@$_GET['id']){
            @$id = $_GET['id'];
            $where = " WHERE `id`=".$id;
        }else{
            $id = 0;
            $where = "";
        }
        require "./config/dbconfig.php";
        $sql = "SELECT * FROM `exam`".$where;
        $query = $conn->query($sql);
        if ($query->num_rows > 0) {
            while($row = $query->fetch_assoc()){
                $response[] = $row;
            }
        } else {
            $response[] = array("message"=>"get failed");
        }
        $conn->close();
        return $response;
    }
    
    // post exam
    function doPost(){
        $data = json_decode(file_get_contents("php://input"));
        if($data){
            require "./config/dbconfig.php";
            $sql = "INSERT INTO `exam`(examName,examCode,examStatus) VALUES('$data->examName','$data->examCode','$data->examStatus')";
            $query = $conn->query($sql);
            if($query){
                $response[] = array("message"=>"insert success");
            }else{
                $response[] = array("message"=>"insert failed");
            }
        }
        $conn->close();
        return $response;
    }
    
    // put exam
    function doPut(){
        $data = json_decode(file_get_contents("php://input"));
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "UPDATE `exam` SET 
            `examName` = '$data->examName',
            `examCode` = '$data->examCode',
            `examStatus` = '$data->examStatus'
            WHERE `id` = '".$_GET['id']."'";
            $query = $conn->query($sql);
            if($query){
                $response[] = array("message"=>"update success");
            }else{
                $response[] = array("message"=>"update failed");
            }
        }
        $conn->close();
        return $response;
    }
    
    // delete exam
    function doDelete(){
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "DELETE FROM `exam` WHERE `id` = '".$_GET['id']."'";
            $query = $conn->query($sql);
            if($query){
                $response[] = array("message"=>"delete success");
            }else{
                $response[] = array("message"=>"delete failed");
            }
        }
        $conn->close();
        return $response;
    }

    // response wrapper
    function response($response){
        echo json_encode($response);
    }

?>