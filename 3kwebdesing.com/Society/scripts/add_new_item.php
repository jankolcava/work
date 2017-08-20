<?php

include('connect.php');

$insert_item = $db->exec("INSERT INTO items (name, category, address, description, review, stars, front_image, time, latitude, longitude) VALUES ('". $_POST["name"] ."', '". $_POST["category"] ."', '". $_POST["address"] ."', '". $_POST["description"] ."', '". $_POST["review"] ."', '". $_POST["stars"] ."', '". $_POST["foreground_image"] ."', '". $_POST["time"] ."', '". $_POST["latitude"] ."', '". $_POST["longitude"] ."' )");

if($insert_item){
	echo 1;
} else {
	echo $insert_item;
}

?>