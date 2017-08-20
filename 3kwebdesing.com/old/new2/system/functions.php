<?php

function loadPage($page)
{
	include('./pages/' .$page. '.php');
}

function sendMail($to, $subject, $from, $text)
{
	$header = 'From:' . $from;
    $header .= "\nMIME-Version: 1.0\n";
    $header .= "Content-Type: text/html; charset=\"utf-8\"\n";

    return mb_send_mail($to, $subject, $text, $header);
}

function sweetAlert($title, $text, $option)
{
	echo('<script type="text/javascript"> swal("'.$title.'", "'.$text.'", "'.$option.'"); </script>');
}

function loadRefItem($title, $src, $href)
{
	$item = '<div class="item">';
	$item .= '<img src="./design/images/'.$src.'">';
	$item .= '<div class="info">';
	$item .= '<a href="'.$href.'"> <h3>'.$title.'</h3> </a>';
	$item .= '</div>';
	$item .= '</div>';

	echo($item);
}
