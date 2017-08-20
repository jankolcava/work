<?php
if(isset($_GET['translatedID']) && isset($_GET['fromJS'])){
	include('language.php');
}

if(!isset($_COOKIE['lang'])){
	echo $array_languages_init[$_GET['translatedID']];
} else {
	switch ($_COOKIE['lang']) {
		case 'cz':
		echo $array_languages_czech[$_GET['translatedID']];
		break;

		default:
		echo $array_languages_init[$_GET['translatedID']];
		break;
	}
}
?>