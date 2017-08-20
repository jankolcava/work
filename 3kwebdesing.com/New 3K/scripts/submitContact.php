<?php
mb_internal_encoding("UTF-8");
require('../system/functions.php');

$services = ['Kontakt', 'Statický web', 'Dynamický web', 'E-shop'];

$output = '';
$send = false;

if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$name = isset($_POST['name']) 		 ? htmlspecialchars($_POST['name']) : '';
	$email = isset($_POST['email']) 	 ? htmlspecialchars($_POST['email']) : '';
	$telefon = isset($_POST['telefon'])  ? htmlspecialchars($_POST['telefon']) : '';
	$message = isset($_POST['message'])  ? htmlspecialchars($_POST['message']) : '';
	$selected = isset($_POST['service']) ? (int)$_POST['service'] : 0;

	if($name && $email && $message)
	{
		$text = $name + $telefon;
		$text .= $message;

		$send = sendMail("my@3kwebdesign.com", $name.' - '.$services[$selected],
		 				 $email, $text);

		if($send)
		{
			$output = 'E-mail byl úspěšně odeslán';
		}
		else
		{
			$output = 'E-mail se nepodařilo odeslat';
		}
	}
	else
	{
		$output = 'Formulář není správně vyplněn';
	}
}

$data = ['send'=>$send, 'text'=>$output];
echo(json_encode($data));
?>