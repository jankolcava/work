<?php
mb_internal_encoding("UTF-8");

$output = '';
$send = false;

$services = ['Kontakt', 'Dynamický web', 'Statický web', 'Profesionální web'];
$selected = isset($_GET['service']) ? $_GET['service'] : 0;

$name = '';
$email = '';
$subject = '';
$service = '';
$text = '';

if(isset($_POST['kontakt']))
{
	$name = isset($_POST['name']) ? $_POST['name'] : '';
	$email = isset($_POST['email']) ? $_POST['email'] : '';
	$subject = isset($_POST['subject']) ? $_POST['subject'] : '';
	$selected = isset($_POST['service']) ? (int)$_POST['service'] : 0;
	$text = isset($_POST['text']) ? $_POST['text'] : '';

	if($name && $email && $subject && $text)
	{
		$send = sendMail("my@3kwebdesign.com",
			$name.' - '. $subject.' - '.$services[$selected], $email, $text);

		if($send)
		{
			$send = true;

			$name = '';
			$email = '';
			$subject = '';
			$selected = 0;
			$text = '';

			$output = 'Email byl úspěšně odeslán';
		}
		else
		{
			$output = 'E-mail se nepodařilo odeslat';
		}
	}
	else
	{
		$output = 'Vyplňte správně formulář!';
	}
}

if($output)
{
	if($send)
	{
		sweetAlert($output, 'brzy vám odpovíme', 'success');
	}
	else
	{
		sweetAlert('Chyba!', $output, 'error');
	}
}
?>
<article id="mainPage">
	<h2>Kontakt</h2>

	<form id="kontakt-form" method="POST">
		<table>
			<tr>
				<td>
					Jméno a příjmení: 
				</td>
				<td>
					<input type="text" name="name" placeholder="Jméno a příjmení" value="<?= htmlspecialchars($name) ?>" />
				</td>
			</tr>

			<tr>
				<td>
					Váš e-mail:
				</td>

				<td>

					<input type="email" name="email" placeholder="E-mail" value="<?= htmlspecialchars($email) ?>" />
				</td>
			</tr>

			<tr>
				<td>
					Předmět: 
				</td>
				<td>
					<input type="text" name="subject" placeholder="Předmět" value="<?= htmlspecialchars($subject) ?>" />
					<select name="service">
						<option <?php if($selected == 0) echo('selected');?> value="0">
							Kontakt
						</option>

						<option <?php if($selected == 1) echo('selected');?> value="1">
							Statický web
						</option>

						<option <?php if($selected == 2) echo('selected');?> value="2">
							Dynamický web
						</option>

						<option <?php if($selected == 3) echo('selected');?> value="3">
							Profesionální web
						</option>

					</select>
				</td>
			</tr>

			<tr>
				<td>
					Text:
				</td>
				
				<td colspan="2">
					<textarea name="text" placeholder="Zadejte text"><?= htmlspecialchars($text) ?></textarea>
				</td>
			</tr>

			<tr>
				<td colspan="2">
					<input type="submit" name="kontakt" value="Odeslat "/>
				</td>
			</tr>
		</table>
	</form>
</article>