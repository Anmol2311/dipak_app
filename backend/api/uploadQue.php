<?php  
require "./config/headerconfig.php";
require "./config/dbconfig.php";
$request_method = $_SERVER["REQUEST_METHOD"];
$response = array();
// $data = json_decode(file_get_contents("php://input"));
// $fileName = basename($data->uploadCSV);
if($request_method == "POST")
{
 if($_FILES['selectFile']['name'])
 {
  $filename = explode(".", $_FILES['selectFile']['name']);
  if($filename[1] == 'csv')
  {
   $handle = fopen($_FILES['selectFile']['tmp_name'], "r");
   while($csvData = fgetcsv($handle))
   {
        @$examCode = mysqli_real_escape_string($conn, $csvData[0]);  
        @$question = mysqli_real_escape_string($conn, $csvData[1]);  
        @$a = mysqli_real_escape_string($conn, $csvData[2]);
        @$b = mysqli_real_escape_string($conn, $csvData[3]);
        @$c = mysqli_real_escape_string($conn, $csvData[4]);
        @$d = mysqli_real_escape_string($conn, $csvData[5]);
        @$answer = mysqli_real_escape_string($conn, $csvData[6]);
        $sql = "INSERT INTO `question`(examCode,question,a,b,c,d,answer) VALUES('$examCode','$question','$a','$b','$c','$d','$answer')";
        // $query = "INSERT into excel(excel_name, excel_email) values('$item1','$item2')";
        // mysqli_query($connect, $query);
        $query = $conn->query($sql);
   }
   $response[] = array("message"=>"success"); 
   fclose($handle);
//    echo "<script>alert('Import done');</script>";
  }
  else{
    $response[] = array("message"=>"failed"); 
  }
  
  echo json_encode($response);
 }
}
$conn->close();

?>  