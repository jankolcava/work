<h2>
	<?php $_GET['translatedID'] = 5; include('scripts/translated.php'); ?>
</h2>

<div class="searchInput">
	<div class="searchTop">
		<a href="" title="<?php $_GET['translatedID'] = 10; include('scripts/translated.php'); ?>"><i class="fa fa-plus" aria-hidden="true"></i></a>
		<input id="mainInputBox" autocomplete="off" title="<?php $_GET['translatedID'] = 7; include('scripts/translated.php'); ?>" autofocus placeholder="<?php $_GET['translatedID'] = 6; include('scripts/translated.php'); ?>" /> 
		<i title="<?php $_GET['translatedID'] = 18; include('scripts/translated.php'); ?>" id="speechRecognition" class="fa fa-microphone" aria-hidden="true"></i>
	</div>

	<div id="searchBox">
		<h3 class="searchInputTitle">
			<?php $_GET['translatedID'] = 9; include('scripts/translated.php'); ?>
		</h3>
		<div class="rightSort">
		<table>
			<tr>
				<td><?php $_GET['translatedID'] = 33; include('scripts/translated.php'); ?></td>
				<td><select class="sortClicked" style="margin-left: 8px; float: right;">
				<option value="likes"><?php $_GET['translatedID'] = 34; include('scripts/translated.php'); ?></option>
				<option value="newest"><?php $_GET['translatedID'] = 35; include('scripts/translated.php'); ?></option>
				<option value="oldest"><?php $_GET['translatedID'] = 36; include('scripts/translated.php'); ?></option>
				<option value="nearest"><?php $_GET['translatedID'] = 37; include('scripts/translated.php'); ?></option>
				<option value="furthest"><?php $_GET['translatedID'] = 38; include('scripts/translated.php'); ?></option>
				<option value="stars"><?php $_GET['translatedID'] = 39; include('scripts/translated.php'); ?></option>	
			</select></td>
			</tr>

			<tr>
				<td><?php $_GET['translatedID'] = 40; include('scripts/translated.php'); ?></td>
				<td><input style="margin-left: 8px;" type="text" class="defaultPosition" /></td>
				<td><i style="margin-left: 8px; cursor: pointer;" class="fa fa-globe" aria-hidden="true"></i></td>
			</tr>
		</table>
				
		</div>

		<hr />
		<div class="results">
		</div>
	</div>
</div>