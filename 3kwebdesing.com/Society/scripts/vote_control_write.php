<?php

include('connect.php');

$insert_vote = $db->exec("INSERT INTO ratings (from_id, ip) VALUES ('". $_POST["id"] ."', '". $_SERVER["REMOTE_ADDR"] ."' )");

if($_POST['type'] == 'like'){
	$update_vote = $db->exec("UPDATE items SET likes=likes + 1 WHERE id='". $_POST["id"] ."' ");
} else {
	$update_vote = $db->exec("UPDATE items SET dislikes=dislikes + 1 WHERE id='". $_POST["id"] ."' ");
}

if($insert_vote && $update_vote){
	echo 1;
} else {
	echo 0;
}

?>