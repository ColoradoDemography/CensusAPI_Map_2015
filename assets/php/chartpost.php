<?php
header("Access-Control-Allow-Origin: *");
//in the future this will go somewhere else (and may differ)

set_include_path(__DIR__);

$server="104.197.26.248";
$user="codemog";
$password="demography";
$port="5433";


//$GET Variables
if (isset($_POST['geonum'])){$geonum = $_POST['geonum'];} 
if (isset($_POST['table'])){$table = $_POST['table'];} 
if (isset($_POST['numerator'])){$numerator = $_POST['numerator'];} 
if (isset($_POST['denominator'])){$denominator = $_POST['denominator'];} 


//declare useful vars
  $fullarray=[]; //final data array

  
// attempt a connection
$dbh = pg_connect("host=".$server." dbname=acs1014 port=".$port." user=".$user." password=".$password);

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}


//create moe table name using regular table name
$moetable = substr_replace($table, "_moe", 6, 0);

//turn geonums into a where statement
$geonum = " WHERE geonum=".str_replace(",", " OR geonum=", $geonum);


//create join tables statement (search.data, table, table_moe)
$joinstatement = "FROM search.data_exp NATURAL JOIN data.".$table." NATURAL JOIN data.".$moetable;





//remove fp. from all variables
$numerator = str_replace("fp.", "", $numerator);
$denominator = str_replace("fp.", "", $denominator);

//remove Number() from all variables
$numerator = str_replace("Number", "", $numerator);
$denominator = str_replace("Number", "", $denominator);

//select first statement
$selectfirst = "SELECT geoname, ((".$numerator.")/(".$denominator.")) as firstvar, ";


//select second statement
//$selectsecond = " (".$moenumerator."/".$moedenominator.") as secondvar ";

$moenum=$numerator;
$moeden=$denominator;
//add _moe to each var

//search for $moenum for $table
//replace each instance with $moetable
$moenum = str_replace($table, $moetable, $moenum);
$moeden = str_replace($table, $moetable, $moeden);


//MOEnum
//find if contains +
if (strpos($moenum, '+') !== FALSE){
  //yes
  $moenum = str_replace("+", "^2 + ", $moenum);
  //add ^2 to end
  $moenum = $moenum."^2";
  //sqrt everything
  $moenum = "sqrt(".$moenum.") ";
}else{
  //nothing needs to be done
  
}


//MOEden
if (strpos($moeden, '+') !== FALSE){
  //yes
  $moeden = str_replace("+", "^2 + ", $moeden);
  //add ^2 to end
  $moeden = $moeden."^2";
  //sqrt everything
  $moeden = "sqrt (".$moeden.") ";
}else{
  //nothing needs to be done
}


//situations
//Denominator is 1 - simple MOE
//Denominator not equal to 1 - derived ratio

if($denominator=="1"){
  $selectsecond = " (".$moenum."/".$moeden.") as secondvar ";
}else{
  //derived ratio
  $selectsecond = " ((sqrt(((".$moenum.")^2)+((((".$numerator.")/".$denominator.")^2)*((".$moeden.")^2))))/".$denominator.") as secondvar ";
}


//create entire sql statement
$sql=$selectfirst.$selectsecond.$joinstatement.$geonum.";";


//run
$result = pg_query($dbh, $sql);


  //flag error
if (!$result) {
    die("Error in SQL query: " . pg_last_error());
}

  
  //iterate through every search result row
while ($row = pg_fetch_array($result)) {

  $miniarray=array('State' => stateabbrev($row['geoname']), 'result' =>$row['firstvar'], 'moe' =>$row['secondvar']);
 
  //add record to results array
  array_push($fullarray, $miniarray);

  }

      
      header('Content-Type: application/json');
      echo json_encode($fullarray);


//replace some text strings with abbreviations to make labels smaller
function stateabbrev($name){
    $name = str_replace("County, Alabama", "AL", $name);
    $name = str_replace("County, Alaska", "AK", $name);
    $name = str_replace("County, Arizona", "AZ", $name);
    $name = str_replace("County, Arkansas", "AR", $name);
    $name = str_replace("County, California", "CA", $name);
    $name = str_replace("County, Colorado", "CO", $name);
    $name = str_replace("County, Connecticut", "CT", $name);
    $name = str_replace("County, Delaware", "DE", $name);
    $name = str_replace(", District of Columbia", " DC", $name);
    $name = str_replace("County, Florida", "FL", $name);
    $name = str_replace("County, Georgia", "GA", $name);
    $name = str_replace("County, Hawaii", "HI", $name);
    $name = str_replace("County, Idaho", "ID", $name);
    $name = str_replace("County, Illinois", "IL", $name);
    $name = str_replace("County, Indiana", "IN", $name);
    $name = str_replace("County, Iowa", "IA", $name);
    $name = str_replace("County, Kansas", "KS", $name);
    $name = str_replace("County, Kentucky", "KY", $name);
    $name = str_replace("Parish, Louisiana", "LA", $name);
    $name = str_replace("County, Maine", "ME", $name);
    $name = str_replace("County, Maryland", "MD", $name);
    $name = str_replace("County, Massachusetts", "MA", $name);
    $name = str_replace("County, Michigan", "MI", $name);
    $name = str_replace("County, Minnesota", "MN", $name);
    $name = str_replace("County, Mississippi", "MS", $name);
    $name = str_replace("County, Missouri", "MO", $name);
    $name = str_replace("County, Montana", "MT", $name);
    $name = str_replace("County, Nebraska", "NE", $name);
    $name = str_replace("County, Nevada", "NV", $name);
    $name = str_replace("County, New Hampshire", "NH", $name);
    $name = str_replace("County, New Jersey", "NJ", $name);
    $name = str_replace("County, New Mexico", "NM", $name);
    $name = str_replace("County, New York", "NY", $name);
    $name = str_replace("County, North Carolina", "NC", $name);
    $name = str_replace("County, North Dakota", "ND", $name);
    $name = str_replace("County, Ohio", "OH", $name);
    $name = str_replace("County, Oklahoma", "OK", $name);
    $name = str_replace("County, Oregon", "OR", $name);
    $name = str_replace("County, Pennsylvania", "PA", $name);
    $name = str_replace("County, Rhode Island", "RI", $name);
    $name = str_replace("County, South Carolina", "SC", $name);
    $name = str_replace("County, South Dakota", "SD", $name);
    $name = str_replace("County, Tennessee", "TN", $name);
    $name = str_replace("County, Texas", "TX", $name);
    $name = str_replace("County, Utah", "UT", $name);
    $name = str_replace("County, Vermont", "VT", $name);
    $name = str_replace("County, Virginia", "VA", $name);
    $name = str_replace("County, Washington", "WA", $name);
    $name = str_replace("County, West Virginia", "WV", $name);
    $name = str_replace("County, Wisconsin", "WI", $name);
    $name = str_replace("County, Wyoming", "WY", $name);

      $name = str_replace(", Alabama", ", AL", $name);
    $name = str_replace(", Alaska", ", AK", $name);
    $name = str_replace(", Arizona", ", AZ", $name);
    $name = str_replace(", Arkansas", ", AR", $name);
    $name = str_replace(", California", ", CA", $name);
    $name = str_replace(", Colorado", ", CO", $name);
    $name = str_replace(", Connecticut", ", CT", $name);
    $name = str_replace(", Delaware", ", DE", $name);
    $name = str_replace(", Florida", ", FL", $name);
    $name = str_replace(", Georgia", ", GA", $name);
    $name = str_replace(", Hawaii", ", HI", $name);
    $name = str_replace(", Idaho", ", ID", $name);
    $name = str_replace(", Illinois", ", IL", $name);
    $name = str_replace(", Indiana", ", IN", $name);
    $name = str_replace(", Iowa", ", IA", $name);
    $name = str_replace(", Kansas", ", KS", $name);
    $name = str_replace(", Kentucky", ", KY", $name);
    $name = str_replace(", Louisiana", ", LA", $name);
    $name = str_replace(", Maine", ", ME", $name);
    $name = str_replace(", Maryland", ", MD", $name);
    $name = str_replace(", Massachusetts", ", MA", $name);
    $name = str_replace(", Michigan", ", MI", $name);
    $name = str_replace(", Minnesota", ", MN", $name);
    $name = str_replace(", Mississippi", ", MS", $name);
    $name = str_replace(", Missouri", ", MO", $name);
    $name = str_replace(", Montana", ", MT", $name);
    $name = str_replace(", Nebraska", ", NE", $name);
    $name = str_replace(", Nevada", ", NV", $name);
    $name = str_replace(", New Hampshire", ", NH", $name);
    $name = str_replace(", New Jersey", ", NJ", $name);
    $name = str_replace(", New Mexico", ", NM", $name);
    $name = str_replace(", New York", ", NY", $name);
    $name = str_replace(", North Carolina", ", NC", $name);
    $name = str_replace(", North Dakota", ", ND", $name);
    $name = str_replace(", Ohio", ", OH", $name);
    $name = str_replace(", Oklahoma", ", OK", $name);
    $name = str_replace(", Oregon", ", OR", $name);
    $name = str_replace(", Pennsylvania", ", PA", $name);
    $name = str_replace(", Rhode Island", ", RI", $name);
    $name = str_replace(", South Carolina", ", SC", $name);
    $name = str_replace(", South Dakota", ", SD", $name);
    $name = str_replace(", Tennessee", ", TN", $name);
    $name = str_replace(", Texas", ", TX", $name);
    $name = str_replace(", Utah", ", UT", $name);
    $name = str_replace(", Vermont", ", VT", $name);
    $name = str_replace(", Virginia", ", VA", $name);
    $name = str_replace(", Washington", ", WA", $name);
    $name = str_replace(", West Virginia", ", WV", $name);
    $name = str_replace(", Wisconsin", ", WI", $name);
    $name = str_replace(", Wyoming", ", WY", $name);
  
    $name = str_replace("Census Tract", "", $name);  
    $name = str_replace("Block Group", "", $name);    
  
  return $name;
}

?>