<?php

$outname = $_GET["outname"];
$type = $_GET["type"];

$lat = $_GET["lat"];
$lng = $_GET["lng"];
$z = $_GET["z"];
$s = $_GET["s"];
$v = $_GET["v"];
$sn = $_GET["sn"];
$cs = $_GET["cs"];
$cl = $_GET["cl"];

$bm=$_GET["bm"];


$d='';
if (isset($_GET['d'])){$d = '\&d='.$_GET['d'];}

$ch='';
if (isset($_GET['ch'])){$ch = '\&ch='.$_GET['ch'];}
$dt='';
if (isset($_GET['dt'])){$dt = '\&dt='.$_GET['dt'];}
$rc='';
if (isset($_GET['rc'])){$rc = '\&rc='.$_GET['rc'];}

$tr='';
if (isset($_GET['tr'])){$tr = '\&tr='.$_GET['tr'];}

exec ('phantomjs phantomjs/rasterize.js http://'.$_SERVER['SERVER_NAME'].'/CensusAPI_Map/index.html?lat='.$lat.'\&lng='.$lng.'\&z='.$z.'\&s='.$s.'\&v='.$v.'\&sn='.$sn.'\&bm='.$cs.'\&bm='.$bm.'\&cl='.$cl.'\&print=yes'.$d.$ch.$dt.$rc.$tr.'  dump/'.$outname.'.'.$type);

?>
