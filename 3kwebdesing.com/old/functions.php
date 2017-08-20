<?php
	
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
?>