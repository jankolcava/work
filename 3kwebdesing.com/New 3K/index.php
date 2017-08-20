<?php
	require('system/functions.php');

	$nav_pages = [
		"home" => "",
		"team" => "",
		"reference" => "",
		"services" => "",
		"contact" => ""
	];

	$pageExist = false;

	$get_page = isset($_GET['page']) ? $_GET['page'] : 'home';

	foreach (array_keys($nav_pages) as $key => $value)
	{
		if($value === $get_page)
		{
			$pageExist = true;
			break;
		}
	}


	if($pageExist)
		$nav_pages[$get_page] = "active";
	else
		$get_page = '404';
?>

<!DOCTYPE html>
<html lang="cs-cz">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

	<title>Webdesign</title>
	<link rel="shortcut icon" href="./design/icons/favicon.ico" />

	<link rel="stylesheet" type="text/css" href="./design/font-awesome/css/font-awesome.min.css" />
	<link rel="stylesheet" type="text/css" href="./css/sweetalert.css" />
	<link rel="stylesheet" type="text/css" href="./css/nprogress.css" />

	<link rel="stylesheet" type="text/css" href="./css/style.css" />

	<script type="text/javascript" src="./js/jquery.js"></script>
	<script type="text/javascript" src="./js/nprogress.js"></script>
	<script type="text/javascript" src="./js/sweetalert.min.js"></script>
	<script type="text/javascript" src="./js/main.js"></script>
</head>
<body>
	<div id="page" class="slick-menu-off over-header-off">
		<header id="header">
			<div class="logo">
				<a href="/">
					<img src="design/images/logo.png" />

					<div class="title">
						Webdesign
					</div>
				</a>
			</div>

			<div class="menu">

				<div class="primary-nav">
					<a class="<?php echo($nav_pages['home']); ?>" 
						href="?page=home"> Domů
			        </a>
					<a class="<?php echo($nav_pages['team']); ?>"
						href="?page=team">
						Tým
					</a>
					<a class="<?php echo($nav_pages['reference']); ?>"
						href="?page=reference">
						Reference
					</a>
					<a class="<?php echo($nav_pages['services']); ?>"
						href="?page=services">
						Služby
					</a>
					<a class="<?php echo($nav_pages['kontakt']); ?>"
						href="?page=contact">
						Kontakt
					</a>
				</div>

				<div class="slick-nav">
					<div id="slick-menu-btn" class="slick-btn" href="">
						<span class="slick-txt">MENU</span>
						<div class="slick-ico">
							<span class="slick-off fa fa-bars"></span>
							<span class="slick-on fa fa-times"></span>
						</div>
					</div>
				</div>
				
			</div>

			<div id="headerBorder"></div>
		</header>

		<div id="slick-menu">
			<div class="menu">
				<a class="<?php echo($nav_pages['home']); ?>" 
						href="?page=home"> Domů
			        </a>
					<a class="<?php echo($nav_pages['team']); ?>"
						href="?page=team">
						Tým
					</a>
					<a class="<?php echo($nav_pages['reference']); ?>"
						href="?page=reference">
						Reference
					</a>
					<a class="<?php echo($nav_pages['services']); ?>"
						href="?page=services">
						Služby
					</a>
					<a class="<?php echo($nav_pages['kontakt']); ?>"
						href="?page=contact">
						Kontakt
					</a>
			</div>

			<div class="slick-foot">
				<div class="socialSites">
					<a class="fa fa-envelope ico-envelope" href="mailto:my@3kwebdesign.com"
				 	target="_blank"></a>
					<a class="fa fa-twitter ico-twitter" href="" target="_blank"></a>
					<a class="fa fa-facebook ico-facebook" href="https://www.facebook.com/3kwebdesignczech/"
				 	target="_blank"></a>
				</div>
			</div>
		</div>

		<div id="sub_header">
			<div class="wrapper">
				<div class="content">
					<h1 class="main_title">A už si to piš, bobku!</h1>
					<h2 class="sub_title">Ani farář nekáže dvakrát</h2>
				</div>
			</div>
		</div>

		<div id="mainContent">
			<div class="mainWrap">

				<?php
					loadPage($get_page);
				?>

			</div>
		</div>

		<footer id="foot">
			<div class="socialSites">
				<a class="fa fa-envelope ico-envelope" href="mailto:my@3kwebdesign.com"
				 target="_blank"></a>
				<a class="fa fa-twitter ico-twitter" href="" target="_blank"></a>
				<a class="fa fa-facebook ico-facebook" href="www.facebook.com/3kwebdesignczech"
				 target="_blank"></a>
			</div>
		</footer>
	</div>

	<script>

    	NProgress.start();

    	var interval = setInterval(function() { NProgress.inc(); }, 1000);        

    	$(window).load(function () {
        	clearInterval(interval);
        	NProgress.done();
    	});

    	$(window).unload(function () {
        	NProgress.start();
    	});

	</script>
</body>
</html>