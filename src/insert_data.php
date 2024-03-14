<?php

$mysqli = new mysqli('localhost', 'root', '***', 'sampledb');

if ($mysqli->connect_error){
	die('Connect Error:('.$mysqli->connect_errno.')'.$mysqli->connect);
}

print 'Connection with mysql class has a succeeded.';

$mysqli->close();

?>