<?php
    require "./config/headerconfig.php";
    // header("Content-Type: multipart/form-data");

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

    // get question
    function doGet(){
        if(@$_GET['id']){
            @$id = $_GET['id'];
            $where = " WHERE `id`=".$id;
        }else{
            $id = 0;
            $where = "";
        }
        require "./config/dbconfig.php";

        $sql = "SELECT * FROM `question`".$where;

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
    
    // post question
    function doPost(){
        $data = json_decode(file_get_contents("php://input"));
        if($data){
            require "./config/dbconfig.php";
            $sql = "INSERT INTO `question`(examCode,question,a,b,c,d,answer) VALUES('$data->examCode','$data->question','$data->a','$data->b','$data->c','$data->d','$data->answer')";
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
    
    // put question
    function doPut(){
        $data = json_decode(file_get_contents("php://input"));
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "UPDATE `question` SET 
            `examCode` = '$data->examCode',
            `question` = '$data->question',
            `a` = '$data->a',
            `b` = '$data->b',
            `c` = '$data->c',
            `d` = '$data->d',
            `answer` = '$data->answer'
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
    
    // delete question
    function doDelete(){
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "DELETE FROM `question` WHERE `id` = '".$_GET['id']."'";
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