<?php
header("Access-Control-Allow-Origin: *");
//in the future this will go somewhere else (and may differ)

set_include_path(__DIR__);

$server="104.197.26.248";
$user="codemog";
$password="demography";
$port="5433";


//$GET Variables

//potential multi select (comma delimited list)
if (isset($_POST['field'])){$field = $_POST['field'];} //comma delimited list
if (isset($_POST['state'])){$state = $_POST['state'];}
if (isset($_POST['county'])){$county = $_POST['county'];}
if (isset($_POST['geonum'])){$geonum = $_POST['geonum'];} //comma delimited list
if (isset($_POST['geoid'])){$geoid = $_POST['geoid'];}
if (isset($_POST['sumlev'])){$sumlev = $_POST['sumlev'];}
if (isset($_POST['table'])){$table = $_POST['table'];} //comma delimited list

//potential single select
if (isset($_POST['type'])){$type = $_POST['type'];}else{$type='json';} //if no db given, assume most current
if (isset($_POST['db'])){$db = $_POST['db'];}else{$db='acs1014';} //if no db given, assume most current
//set default for schema if it is missing
if (isset($_POST['schema'])){$schema = $_POST['schema'];}else{
     if($db=='acs1014'){$schema='data';}elseif // for example, acs0812 defaults to data 
  ($db=='acs0913'){$schema='data';}elseif // for example, acs0812 defaults to data     
  ($db=='acs0812'){$schema='data';}elseif // for example, acs0812 defaults to data
  ($db=='c2010'){$schema='data';}elseif // c2010 defaults to data
  ($db=='c2000'){$schema='sf1';}elseif // c1990 defaults to sf1
  ($db=='c1990'){$schema='sf1';}elseif
  ($db=='c1980'){$schema='sf1';}else{$schema='';} //no valid database - will deal with later
}
if (isset($_POST['geo'])){$geo = $_POST['geo'];}
if (isset($_POST['series'])){$series = $_POST['series'];}
if (isset($_POST['type'])){$type = $_POST['type'];}

  $limit=1000;  //by default limits to 1000 search results.  POST 
if (isset($_POST['limit'])){$limit = $_POST['limit'];}

//if database is acs0812, check to see if moe option is flagged
$moe='no';
if($db=='acs0812' or $db=='acs0913' or $db=='acs1014'){if (isset($_POST['moe'])){$moe=$_POST['moe'];}}



//declare useful vars
  $fullarray=[]; //final data array
  $metaarrfull=[]; //final field metadata array
  $tblarrfull=[];  //final table metadata array
  $errorarray=[]; //store all errors and warnings

//variables and arrays to use later
  $tablelist=[]; //array of all tables used in query
  $jointablelist=""; //working string of tables to be inserted into sql query
  $joinlist="";  //working string of 'where' condition to be inserted into sql query
  $arr=[];
  $arr2=[];
  $moefields=[]; //moe field array
  $tcolumns=[]; //columns gathered from table(s?)

  //get list of all parameters - check all are valid
$getkey=[];

//<>
  $metacsv = []; //array for csv field descriptions only
//<>


//push $_POST vars into simple array for each $key
foreach ($_POST as $key => $value){
  array_push($getkey,$key);  
} 

//loop through $keys, check against list of valid values
foreach($getkey as $gk){
  if($gk!=='field' and $gk!=='state' and $gk!=='county' and $gk!=='sumlev' and $gk!=='place' and $gk!=='geonum' and $gk!=='geoid' and $gk!=='db' and $gk!=='schema' and $gk!=='geo' and $gk!=='series' and $gk!=='type' and $gk!=='limit' and $gk!=='moe' and $gk!=='table' and $gk!=='type'){array_push($errorarray, 'Your parameter -'.$gk.'- is not valid.');}
}

  //validate database selected
    if($db!='c1980' and $db!='c1990' and $db!='c2000' and $db!='c2010' and $db!='acs0812' and $db!='acs0913' and $db!='acs1014'){
      array_push($errorarray, 'Your database choice `'.$db.'` is not valid.');
    $db=""; goto a;
    }

  //more validate??

  //if no fields or tables are selected
if (!(isset($_POST['table'])) && !(isset($_POST['field']))){array_push($errorarray, 'You need to specify a table or fields to query.'); goto a;}

  //as far as errors go, tell people they are wasting their time specifying table(s) if they specified field.
if (isset($field)){
if (isset($_POST['table'])){array_push($errorarray, 'You specified TABLE.  This parameter is ignored when you also specify FIELD');};
}
  
// attempt a connection
$dbh = pg_connect("host=".$server." dbname=".$db." port=".$port." user=".$user." password=".$password);

if (!$dbh) {
    die("Error in connection: " . pg_last_error());
}



  //if no fields are selected (then a table must be).  Create fields list based on the given table.
if (!(isset($_POST['field']))){
  
  $atablearray=explode(",", $table);
  $atablestr="";
  
  foreach($atablearray as $ata){
          $atablestr=$atablestr." table_name='".$ata."' or";    
  }
  
    //trim last trailing 'or'
  $atablestr=substr($atablestr,0,-2);
  
    //Query table fields --ONLY SINGLE TABLE SELECT AT THIS TIME--
  $tablesql="SELECT column_name from information_schema.columns 
where (".$atablestr.") and table_schema='".$schema."';";

  $tableresult = pg_query($dbh, $tablesql);
  
while ($tablerow = pg_fetch_array($tableresult)) {

  //add metadata information to metadata array for each (non-moe) field
  //$metaarr=array('column_id' => $metarow['column_id'], 'column_title' => $metarow['column_verbose']);
  if($tablerow['column_name']<>'geonum'){array_push($tcolumns, $tablerow['column_name']);}
  }
  
  $field = implode(',', $tcolumns); //$field becomes fields queried from info schema based upon table

}



  //break the comma delimited records from field into an array  
$ttlfields=explode(",", $field);
  
    //if moe is set to yes, add the moe version of each field (push into new array, then merge with existing)
  if($moe=='yes'){

    foreach($ttlfields as $tmoe){
      //if text _moe doesn't already occur in the field name
      $pos=strpos($tmoe,'_moe');
      if($pos === false){
        array_push($moefields, substr_replace($tmoe, '_moe', -3, 0));
      }
    }
    $ttlfields = array_merge($ttlfields, $moefields);

    //remove duplicate field names
    $ttlfields=array_unique($ttlfields); 
  
  //send moe modified field list back to main field list
  $field = implode(',', $ttlfields);
  }
  
//get a list of tables based upon characters in each field name  (convention: last 3 characters identify field number, previous characters are table name) 
    foreach($ttlfields as $t){
      array_push($tablelist, substr($t,0,-3));
    }

  //remove duplicate tables in array
    $tablelist=array_unique($tablelist);
  
  //create a string to add to sql statement
    foreach($tablelist as $t){  
      $jointablelist=$jointablelist." natural join ".$schema.".".$t;
    }


  //validate all fields exist
  
  //validate geoid
  
  //validate geonum


  //this is where field metadata is gathered
  $metafieldlist="";
  //construct 'where' statement for column_id metadata
  //iterate through all fields
    foreach ($ttlfields as $metafields){
          $metafieldlist=$metafieldlist." column_id='".$metafields."' or";
    }
  
    //trim last trailing 'or'
  $metafieldlist=substr($metafieldlist,0,-2);

  
  //Query metadata
  $metasql="SELECT column_id, column_verbose from ".$schema.".census_column_metadata where".$metafieldlist.";";
  $metaresult = pg_query($dbh, $metasql);
  
while ($metarow = pg_fetch_array($metaresult)) {

  //add metadata information to metadata array for each (non-moe) field
  $metaarr=array('column_id' => $metarow['column_id'], 'column_title' => $metarow['column_verbose']);
    array_push($metaarrfull, $metaarr);
  }

//<>
//$metacsv
foreach ($ttlfields as $ttlf){
  foreach ($metaarrfull as $metasub){
    if($ttlf==$metasub['column_id']){
      array_push($metacsv, $metasub['column_title']);
    }
  }
}
//<>
  
  //this is where table metadata is gathered
    $tblstr="";
  //construct 'where' statement for column_id metadata
  //iterate through all fields
    foreach ($tablelist as $tbl){
          $tblstr=$tblstr." table_id='".$tbl."' or";
    }
  
    //trim last trailing 'or'
  $tblstr=substr($tblstr,0,-2);

  
  //Query metadata
  $tblsql="SELECT table_id, table_title, universe from ".$schema.".census_table_metadata where".$tblstr.";";
  $tblresult = pg_query($dbh, $tblsql);
  
while ($tblrow = pg_fetch_array($tblresult)) {

  //add metadata information to metadata array for each (non-moe) field
  $tblarr=array('table_id' => $tblrow['table_id'], 'table_title' => $tblrow['table_title'], 'universe' => $tblrow['universe']);
    array_push($tblarrfull, $tblarr);
  }


//here's where you figure out what case situation you're in


//CASE 1:  you have a geonum
//essentially you don't care about anything else.  just get the data for that/those geonum(s)
if (isset($geonum)){

  //as far as errors go, tell people they are wasting their time specifying sumlev, state, county, place and geoid if they specified geonum.
if (isset($_POST['state'])){array_push($errorarray, 'You specified STATE.  This parameter is ignored when you also specify GEONUM');};
if (isset($_POST['county'])){array_push($errorarray, 'You specified COUNTY.  This parameter is ignored when you also specify GEONUM');};
if (isset($_POST['sumlev'])){array_push($errorarray, 'You specified SUMLEV.  This parameter is ignored when you also specify GEONUM');};
if (isset($_POST['geoid'])){array_push($errorarray, 'You specified GEOID.  This parameter is ignored when you also specify GEONUM');};
  
    //break the comma delimited records from geonum into an array  
  $geonumarray=explode(",", $geonum);
  
//iterate through all geonum's
foreach ($geonumarray as $geonumlist){
      $joinlist=$joinlist." geonum=".$geonumlist." or";
}
  
  //trim last trailing 'or'
  $joinlist=substr($joinlist,0,-2);
  
//END CASE 1
}elseif (isset($geoid)) {
//CASE 2:  you have a geoid
  
  //as far as errors go, tell people they are wasting their time specifying sumlev, state, county, place and geoid if they specified geonum.
if (isset($_POST['state'])){array_push($errorarray, 'You specified STATE.  This parameter is ignored when you also specify GEOID');};
if (isset($_POST['county'])){array_push($errorarray, 'You specified COUNTY.  This parameter is ignored when you also specify GEOID');};
if (isset($_POST['sumlev'])){array_push($errorarray, 'You specified SUMLEV.  This parameter is ignored when you also specify GEOID');};
  
      //break the comma delimited records from geonum into an array  
  $geoidarray=explode(",", $geoid);
  
//iterate through all geoids, simply put a '1' in front and treat them like geonums
foreach ($geoidarray as $geoidlist){
      $joinlist=$joinlist." geonum=1".$geoidlist." or";
}
  
  //trim last trailing 'or'
  $joinlist=substr($joinlist,0,-2);
 
//END CASE 2  
}elseif ((isset($sumlev) || isset($county) || isset($state))){
  //CASE 3 - query
  
  $condition=""; //condition is going to be a 3 character string which identifies sumlev, county, state (yes/no) (1,0)
  if(isset($sumlev)){$condition="1";}else{$condition="0";}
  if(isset($county)){$condition=$condition."1";}else{$condition=$condition."0";}
  if(isset($state)){$condition=$condition."1";}else{$condition=$condition."0";}

  
   
  if(isset($county)){
//create county array out of delimited list
    $countylist="";
  
    //break the comma delimited records from county into an array  
  $countyarray=explode(",", $county);
  
//iterate through all counties
foreach ($countyarray as $carray){
      $countylist=$countylist." county=".$carray." or";
}
  
  //trim last trailing 'or'
  $countylist=substr($countylist,0,-2);
  }
  
  
   if(isset($state)){
//create state array out of delimited list
      $statelist="";
  
    //break the comma delimited records from county into an array  
  $statearray=explode(",", $state);
  
//iterate through all states
foreach ($statearray as $starray){
      $statelist=$statelist." state=".$starray." or";
}
  
  //trim last trailing 'or'
  $statelist=substr($statelist,0,-2);
   }
  
  
   if(isset($sumlev)){
//create sumlev array out of delimited list
       $sumlevlist="";
  
    //break the comma delimited records from county into an array  
  $sumlevarray=explode(",", $sumlev);
  
//iterate through all sumlevs
foreach ($sumlevarray as $suarray){
      $sumlevlist=$sumlevlist." sumlev=".$suarray." or";
}
  
  //trim last trailing 'or'
  $sumlevlist=substr($sumlevlist,0,-2);
   }
   
  //every possible combination of sumlev, county, state
  if($condition=='001'){$joinlist = " (".$statelist.") ";}
  if($condition=='011'){$joinlist = " (".$countylist.") and (".$statelist.") ";}
  if($condition=='111'){$joinlist = " (".$sumlevlist.") and (".$countylist.") and (".$statelist.") ";}
  if($condition=='010'){$joinlist = " (".$countylist.") ";}
  if($condition=='110'){$joinlist = " (".$sumlevlist.") and (".$countylist.")";}
  if($condition=='100'){$joinlist = " (".$sumlevlist.") ";}
  if($condition=='101'){$joinlist = " (".$sumlevlist.") and (".$statelist.") ";}
  
  //END CASE 3
}else{
  // CASE 4: No Geo
  array_push($errorarray, 'No geography specified.');
  goto a;
//END CASE 4
}

  //CONSTRUCT MAIN SQL STATEMENT
// execute query
$sql = "SELECT geoname, state, county, place, tract, bg, geonum, ".$field." from search.".$schema.$jointablelist." where".$joinlist." limit $limit;";
$result = pg_query($dbh, $sql);


  //flag error
if (!$result) {
    die("Error in SQL query: " . pg_last_error());
}

  
  //iterate through every search result row
while ($row = pg_fetch_array($result)) {

  //add geoname as first element in every result record array
  $arr=array('geoname' => $row['geoname'], 'state' => $row['state'], 'county' => $row['county'], 'place' => $row['place'], 'tract' => $row['tract'], 'bg' => $row['bg'], 'geonum' => $row['geonum']);
  
  $arr3=[];
  
  //iterate over every field in query result row
      foreach($ttlfields as $t){
        $arr2=array($t => $row[$t]);
       $arr3 = array_merge($arr3, $arr2);
      }
  
    //ksort($arr3); //sort data field array
       $arr = array_merge($arr, $arr3);
  
  //add current array (record) to results array
  array_push($fullarray, $arr);

  }


// all arrays combined here and turned into JSON
a: {  
  
  //meta first record is combined with results from iteration over every query result row
  $withmeta=array('source'=>$db, 'schema'=>$schema, 'tablemeta' => $tblarrfull, 'fieldmeta'=> $metaarrfull, 'data'=>$fullarray, 'error'=> $errorarray);

  //add tablemeta to above
  
  //print resulting json

  
    if($type=='csv'){
    header("Content-Type: text/csv");
    header("Content-Disposition: attachment; filename=file.csv");
    // Disable caching
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
    header("Pragma: no-cache"); // HTTP 1.0
    header("Expires: 0"); // Proxies
      
  //add geonum to front of fields row array
  array_unshift($ttlfields, "geonum"); 
  array_unshift($ttlfields, "bg");  
  array_unshift($ttlfields, "tract");      
  array_unshift($ttlfields, "place");
  array_unshift($ttlfields, "county");
  array_unshift($ttlfields, "state");
  array_unshift($ttlfields, "geoname");
      
    //add geonum description to front of metadata row array
  array_unshift($metacsv, "Unique ID");
  array_unshift($metacsv, "BG FIPS");
  array_unshift($metacsv, "Tract FIPS");     
  array_unshift($metacsv, "Place FIPS");
  array_unshift($metacsv, "County FIPS");
  array_unshift($metacsv, "State FIPS");     
  array_unshift($metacsv, "Geographic Area Name");

  $csv_data = outputCSV($fullarray,$ttlfields,$metacsv);
      
      
  }else{
      //only need to bother sorting meta arrays if output is json
  usort($metaarrfull, "cmp"); //sort meta field array
  usort($tblarrfull, "cmp2"); //sort table field array  
      
      header('Content-Type: application/json');
      echo json_encode($withmeta);
  }
  
}



//supporting functions


//write csv
function outputCSV($data, $header, $meta) {
    $output = fopen("php://output", "w");
    array_unshift($data, $meta);
  array_unshift($data, $header);
    foreach ($data as $row) {
        fputcsv($output, $row); // here you can change delimiter/enclosure
    }
    fclose($output);
}


//sort field meta array
function cmp($a, $b)
{
    return strcmp($a["column_id"], $b["column_id"]);
}

//sort table meta array
function cmp2($a, $b)
{
    return strcmp($a["table_id"], $b["table_id"]);
}

?>