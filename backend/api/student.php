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
        $sql = "SELECT * FROM `student`".$where;
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
            $sql = "INSERT INTO `student`(fname,lname,email,dob,contact,gender,organization,branch,pnrNo) VALUES('$data->fname','$data->lname','$data->email','$data->dob','$data->contact','$data->gender','$data->organization','$data->branch','$data->pnrNo')";
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
            $sql = "UPDATE `student` SET 
            `fname` = '$data->fname',
            `lname` = '$data->lname',
            `email` = '$data->email',
            `dob` = '$data->dob',
            `contact` = '$data->contact',
            `gender` = '$data->gender',
            `organization` = '$data->organization',
            `branch` = '$data->branch',
            `pnrNo` = '$data->pnrNo'
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
    
    // delete student
    function doDelete(){
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "DELETE FROM `student` WHERE `id` = '".$_GET['id']."'";
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