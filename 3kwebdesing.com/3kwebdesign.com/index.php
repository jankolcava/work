<?php
require_once('functions.php');

$if_page_set = false;

if(isset($_GET['page'])){
	$if_page_set = base64_decode($_GET['page']);
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta name="description" content="Tvoříme moderní responzivní weby na zakázku s originální grafikou a kvalitním zpracováním." />
	<meta name="author" content="Daniel Krůl, Tomáš Konečný, Jan Kolčava" />
	<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
	<link rel="icon" href="favicon.png" type="image/x-icon" />
	<meta name="keywords" content="web, webdesign, design, kódování, coding, code, 3K, 3K Webdesign" />

	<title>3K Webdesign</title>

	<link rel="stylesheet" type="text/css" href="./css/style.css" />
	<link rel="stylesheet" href="./font-awesome/css/font-awesome.min.css" />

	<script type="text/javascript" src="./js/jquery.js"></script>
	<script type="text/javascript" src="./js/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./css/sweetalert.css" />
	<script type="text/javascript" src="./js/main.js"></script>
	<script type="text/javascript" src="./js/smooth.js"></script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-42571558-3', 'auto');
		ga('send', 'pageview');

	</script>
</head>
<body>
	<a href="http://www.toplist.cz/" style="display: none;" target="_top"><img src="https://toplist.cz/dot.asp?id=1717672" border="0" alt="TOPlist" width="1" height="1"/></a>

	<div id="page">
		<header id="header">
			<div class="cover">
				<a href="/">
					<div class="logo">
						<h1><span class="underline">3K</span> webdesign</h1>
					</div>
				</a>

				<menu class="menu">
					<a href="/">Domů</a>
					<a href="?page=<?php echo base64_encode('about'); ?>">O nás</a>
					<a href="?page=<?php echo base64_encode('reference'); ?>">Reference</a>
					<a href="?page=<?php echo base64_encode('cenik'); ?>">Ceník prací</a>
					<span class="underline"><a href="?page=<?php echo base64_encode('kontakt'); ?>">Kontakt</a></span>
				</menu>

				<div class="quote">
					<i class="fa fa-quote-left fa-2x fa-pull-left" aria-hidden="true" style="color: white;"></i>

					<h2>Jsme tým profesionálních webových designérů a vývojářů. Tvoříme moderní responsivní webdesign podle přání zákazníka.</h2>
				</div>
			</div>
		</header>

		<div id="content">
			<div class="facebook" title="Facebook">
				<a href="http://www.facebook.com/3kwebdesignczech" target="_blank">
					<img src="http://icons.iconarchive.com/icons/danleech/simple/64/facebook-icon.png" width="32" />
				</a>
			</div>

			<?php

			if(!$if_page_set){
				include(dirname(__FILE__). '/pages/main.php');
			} else {
				switch ($if_page_set) {
					case 'about':
					include(dirname(__FILE__) . '/pages/' . $if_page_set . '.php');
					break;

					case 'contribute':
					include(dirname(__FILE__) . '/pages/' . $if_page_set . '.php');
					break;

					case 'kontakt':
					include(dirname(__FILE__) . '/pages/' . $if_page_set . '.php');
					break;

					case 'reference':
					include(dirname(__FILE__) . '/pages/' . $if_page_set . '.php');
					break;

					case 'cenik':
					include(dirname(__FILE__) . '/pages/' . $if_page_set . '.php');
					break;

					default:
					include(dirname(__FILE__) . '/pages/404.php');
					break;
				}
			}
			?>
		</div>
	</div>
</body>
</html>