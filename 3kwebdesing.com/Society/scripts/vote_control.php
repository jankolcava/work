<?php

include('connect.php');

$search_vote_results = $db->querySingle('SELECT COUNT(*) as count FROM ratings WHERE ip="'. $_SERVER['REMOTE_ADDR'] .'" AND from_id="'. $_POST['posted_id'] .'" ');

echo $search_vote_results;

?>