<?php

include('connect.php');

switch ($_POST['lang']) {
	case 'cz':
		$lang_table = 'category_lang_' . $_POST['lang'];
		break;
	
	default:
		$lang_table = 'category';
		break;
}

$search_results = $db->query('SELECT * FROM categories WHERE '. $lang_table .' LIKE "%'. $_POST['queryValue'] .'%" ');

$array_search_results = array();

while ($row_search_results = $search_results->fetchArray()) {
	array_push($array_search_results, array(
        'id' => $row_search_results['id'],
        'category' => $row_search_results[$lang_table],
        'original_lang' => $row_search_results['category']
    ));

}

echo json_encode($array_search_results);

?>