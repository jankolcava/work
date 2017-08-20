<div class="langSelect">
	<form name="langForm" action="" method="POST">
		<select name="countries" onchange="langForm.submit();">
			<option value="en" 
			<?php 
			$lang_value_set = 'en';
			
			if(isset($_COOKIE['lang'])){
				if($_COOKIE['lang'] == $lang_value_set){
					echo 'selected';
				}
			}
			?> 
			>English</option>
			<option value="cz" 
			<?php 
			$lang_value_set = 'cz';
			
			if(isset($_COOKIE['lang'])){
				if($_COOKIE['lang'] == $lang_value_set){
					echo 'selected';
				}
			}
			?> 
			>Čeština</option>
		</select>
	</div>