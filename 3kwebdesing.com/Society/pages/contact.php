<?php

$output = '';
$send = false;

if(isset($_GET['send'])) $send = true;
if($send) $output = 'E-mail byl úspěšně odeslán';

$email = '';
$subject = '';
$message = '';

if(isset($_POST['contact']))
{
	$email = isset($_POST['email']) ? $_POST['email'] : '';
	$subject = isset($_POST['subject']) ? $_POST['subject'] : '';
	$message = isset($_POST['message']) ? $_POST['message'] : '';

	if($email && $subject && $message)
	{
		$send = sendMail("my@3kwebdesign.com", $subject, $email, $text);

		if($send)
		{
			header('Location: '.base64_encode('contact').'&send=true');
			exit();
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
<h2>
	<?php $_GET['translatedID'] = 14; include('scripts/translated.php'); ?>
</h2>

<div class="textInside">
<form id="contact" method="POST">
	<table>
		<tr>
			<td><input type="email" name="email" placeholder="E-mail" <?php echo(htmlspecialchars($email))?> /></td>
			<td><input type="text" name="subject" placeholder="Předmět" <?php echo(htmlspecialchars($subject))?> /></td>
		</tr>

		<tr>
			<td>
				<textarea name="message" placeholder="Vaše zpráva"><?php echo(htmlspecialchars($message))?></textarea>
			</td>
		</tr>

		<tr>
			<td colspan="2"><input type="submit" name="contact" value="Odeslat"/></td>
		</tr>
	</table>
</form>
</div>