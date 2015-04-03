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
$tr=$_GET["tr"];

$d='';
if (isset($_GET['d'])){$d = '\&d='.$_GET['d'];}
//if (isset($_GET['tr'])){$tr = '\&tr='.$_GET['tr'];}

exec ('phantomjs phantomjs/rasterize.js http://'.$_SERVER['SERVER_NAME'].'/CensusAPI_Map/index.html?lat='.$lat.'\&lng='.$lng.'\&z='.$z.'\&s='.$s.'\&v='.$v.'\&sn='.$sn.'\&tr='.$tr.'\&bm='.$cs.'\&bm='.$bm.'\&cl='.$cl.'\&print=yes'.$d.'  dump/'.$outname.'.'.$type);

?>
