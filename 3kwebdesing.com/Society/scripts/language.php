<?php
	include('connect.php');

	$query_languages = $db->query('SELECT * FROM languages');
	$array_languages_init = array();
	$array_languages_czech = array();

	while ($row_languages = $query_languages->fetchArray()) {
		array_push($array_languages_init, $row_languages['initial_word']);
		array_push($array_languages_czech, $row_languages['czech']);
	}
?>