<?php
mb_internal_encoding("UTF-8");

$services = ['Kontakt', 'Statický web', 'Dynamický web', 'E-shop'];

$output = '';
$send = false;

$name = '';
$email = '';
$telefon = '';
$message = '';
$selected = isset($_GET['service']) ? $_GET['service'] : 0;

if(isset($_POST['kontakt']))
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

			$name = '';
			$email = '';
			$telefon = '';
			$message = '';
			$selected = 0;
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

if($output)
{
	if($send)
	{
		sweetAlert($output, 'Brzy vám odpovíme', 'success');
	}
	else
	{
		sweetAlert('Chyba!', $output, 'error');
	}
}
?>
<hr class="mainBorder" />
<h1 class="mainTitle">Kontaktujte nás!</h1>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus dui diam, et faucibus tellus accumsan a. Aenean at odio lectus. Integer tortor dui, iaculis eget efficitur sed, egestas nec odio.
</p>

<div id="contact-icons">
	<div class="icon-wrapper">
		<div class="icon email">
			<div class="fa fa-envelope"></div>
		</div>
		<h2>my@3kwebdesign.com</h2>
	</div>

	<div class="icon-wrapper">
		<div class="icon phone">
			<div class="fa fa-phone"></div>
		</div>
		<h2>+420 001 999 911</h2>
	</div>
</div>

<form id="kontakt-form" method="POST">
	<div class="col-flex">
	<div class="col">
		<div class="row">
			<label for="name">Jméno</label>
			<input type="text" name="name" value="<?= $name ?>" />
		</div>

		<div class="row">
			<label for="email">E-mail</label>
			<input type="email" name="email" value="<?= $email ?>" />
		</div>

		<div class="row">
			<label for="telefon">Telefon</label>
			<input type="text" name="telefon" value="<?= $telefon ?>" />
		</div>
	</div>

	<div class="col">
		<div class="row">
			<label for="service">Služba</label>

			<select id="service" name="service">
				<option value="0" <?php if($selected == 0) echo('selected'); ?>>
					Kontakt
				</option>

				<option value="1" <?php if($selected == 1) echo('selected'); ?>>
					Statický web
				</option>

				<option value="2" <?php if($selected == 2) echo('selected'); ?>>
					Dynamický web
				</option>

				<option value="3" <?php if($selected == 3) echo('selected'); ?>>
					E-Shop
				</option>
			</select>
		</div>

		<div class="row msg">
			<textarea name="message" placeholder="Vaše zpráva"><?= $message ?></textarea>
		</div>
	</div>
	</div>

	<input type="submit" name="kontakt" value="Odeslat" class="contactButton" />
</form>
<hr class="mainBorder" />