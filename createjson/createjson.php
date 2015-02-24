<?php
header('Content-Type: application/json');

//num and denom can be comma delimited

if (isset($_GET['geo'])){$geo = $_GET['geo'];} //geo is either bg, tract, county, place, state
if (isset($_GET['num'])){$num = $_GET['num'];} //numerator
if (isset($_GET['denom'])){
  
  //create denominator array
  $denom = $_GET['denom'];
  if($denom=='1'){unset($_GET['denom']);}  //if was passed '1' as denom, just delete
  $denomarray = explode(",", $denom);
  
} //denominator

//create numerator array
$numarray = explode(",", $num);




$table=substr($numarray[0],0,6);

$geopossible=0;
if($geo=='bg'){$geopossible=217478;}
if($geo=='tract'){$geopossible=72859;}
if($geo=='county'){$geopossible=3143;}
if($geo=='place'){$geopossible=29257;}
if($geo=='state'){$geopossible=51;}


require 'connect.php';

$darray=[];

// attempt a connection
$dbh = pg_connect("host=".$server." dbname=acs0913 user=".$user." password=".$password);

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}




$sql="select * from carto.".$geo." natural join data.".$table." where gid in ( select round(random() * 72859)::integer as gid from generate_series(1, 3000) group by gid) limit 2500;";

if($geo=="state"){
$sql="select * from carto.state natural join data.".$table.";";
}


//if isset denom then denominator = 1


  $tableresult = pg_query($dbh, $sql);
  
while ($tablerow = pg_fetch_array($tableresult)) {

  $numerator=0;
$denominator=0;
  
  foreach($numarray as $n){
    $numerator=$numerator + $tablerow[$n];
  }

  if (isset($_GET['denom'])){
    foreach($denomarray as $d){
      $denominator=$denominator + $tablerow[$d];
    }
    
  }else{$denominator=1;}
  
  if($denominator==0){$denominator=1;}

  //echo 'numerator; '.$numerator.' denominator: '.$denominator;
  //echo 'num/denom: '.($numerator/$denominator);
  
  //ifnull discard automatically
  if(is_null($numerator/$denominator)){}else{
  //if discard zero is set to yes, only enter non zero values into array, otherwise, enter all values
  if($_GET['discard']=='yes'){if(($numerator/$denominator)==0){}else{ array_push($darray, ($numerator/$denominator));}}else{
    array_push($darray, ($numerator/$denominator));    
  }
  }
  
  }


echo json_encode($darray);



?>