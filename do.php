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

$tr='';

$d='';
if (isset($_GET['d'])){$d = '\&d='.$_GET['d'];}
//if (isset($_GET['tr'])){$tr = '\&tr='.$_GET['tr'];}

exec ('phantomjs ~/workspace/www/phantomjs/rasterize.js http://codemogapi-166520.usw1.nitrousbox.com/geo/index.html?lat='.$lat.'\&lng='.$lng.'\&z='.$z.'\&s='.$s.'\&v='.$v.'\&sn='.$sn.'\&cs='.$cs.'\&cl='.$cl.'\&print=yes'.$d.'  ~/workspace/www/dump/'.$outname.'.'.$type);

?>
