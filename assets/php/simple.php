<?php
header("Access-Control-Allow-Origin: *");
//in the future this will go somewhere else (and may differ)

header('Content-Type: application/json');

//num and denom can be comma delimited

if (isset($_GET['db'])){$db = $_GET['db'];} 
if (isset($_GET['schema'])){$schema = $_GET['schema'];} 
if (isset($_GET['table'])){$table = $_GET['table'];}
if (isset($_GET['geonum'])){$geonum = $_GET['geonum'];} 

require '../../../CensusAPI/connect.php';

// attempt a connection
$dbh = pg_connect("host=".$server." dbname=".$db." port=".$port." user=".$user." password=".$password);

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}

$fullarray=[];

$sql="select * from ".$schema.".".$table." where geonum=".$geonum.";";



  $result = pg_query($dbh, $sql);



$row = pg_fetch_assoc($result);
  
      
      header('Content-Type: application/json');
      echo json_encode($row);

?>