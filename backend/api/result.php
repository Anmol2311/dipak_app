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
        case "DELETE":
            response(doDelete());
            break;
    }

    // get result
    function doGet(){
        require "./config/dbconfig.php";
        $sql = "SELECT exam.examName, student.fname,student.lname,student.organization,student.branch,result.id,result.studentId,result.examId,result.totalMarks,result.obtainedMarks,result.grade,result.status, result.examDate FROM ((`result` INNER JOIN `exam` ON result.examId = exam.examCode)INNER JOIN `student` ON result.studentId = student.id) ORDER BY result.examDate DESC";
       
        if($query = $conn->query($sql)) {
            while($row = $query->fetch_assoc()){
                $response[] = $row;
            }
        } else {
            $response[] = array("message"=>"failed");
        }
        $conn->close();
        return $response;
    }
    
    // post result
    function doPost(){
        $data = json_decode(file_get_contents("php://input"));
        if($data){
            require "./config/dbconfig.php";

            $sql = "INSERT INTO `result`(studentId,examId,totalMarks,obtainedMarks,grade,status) VALUES('$data->studentId','$data->examId','$data->totalMarks','$data->obtainedMarks','$data->grade','$data->status')";

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
    
    // delete result
    function doDelete(){
        if($_GET){
            require "./config/dbconfig.php";
            $sql = "DELETE FROM `result` WHERE `id` = '".$_GET['id']."'";
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