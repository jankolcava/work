<?php

include('connect.php');

if($_POST['sort'] == 'likes'){
	$search_results = $db->query('SELECT * FROM items WHERE name LIKE "%'. $_POST['queryValue'] .'%" OR category LIKE "%'. $_POST['queryValue'] .'%" ORDER BY likes DESC, dislikes ASC ');
} elseif ($_POST['sort'] == 'newest') {
	$search_results = $db->query('SELECT * FROM items WHERE name LIKE "%'. $_POST['queryValue'] .'%" OR category LIKE "%'. $_POST['queryValue'] .'%" ORDER BY time DESC ');
} elseif ($_POST['sort'] == 'oldest') {
	$search_results = $db->query('SELECT * FROM items WHERE name LIKE "%'. $_POST['queryValue'] .'%" OR category LIKE "%'. $_POST['queryValue'] .'%" ORDER BY time ');
} elseif ($_POST['sort'] == 'stars') {
	$search_results = $db->query('SELECT * FROM items WHERE name LIKE "%'. $_POST['queryValue'] .'%" OR category LIKE "%'. $_POST['queryValue'] .'%" ORDER BY stars ASC, likes ASC ');
}

$array_search_results = array();

while ($row_search_results = $search_results->fetchArray()) {
	array_push($array_search_results, array(
		'id' => $row_search_results['id'],
        'name' => $row_search_results['name'],
        'category' => $row_search_results['category'],
        'front_image' => $row_search_results['front_image'],
        'description' => $row_search_results['description'],
        'review' => $row_search_results['review'],
        'stars' => $row_search_results['stars'],
        'likes' => $row_search_results['likes'],
        'dislikes' => $row_search_results['dislikes']
    ));

}

echo json_encode($array_search_results);

?>