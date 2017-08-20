$(document).ready(function() {
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function isEmpty(str) {
		return str.replace(/^\s+|\s+$/gm, '').length == 0;
	}

	function isJSONEmpty(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop))
				return false;
		}

		return true;
	}

	function afterType() {
		mainInputBoxValue = $('#mainInputBox').val();

		if (!mainInputBoxValue == '' && mainInputBoxValue.length >= 3) {
			$('#searchBox .searchInputTitle').html(translatedWords.Results_for + ' ' + mainInputBoxValue);

			$.post('./scripts/search_query.php', {
					queryValue: mainInputBoxValue,
					sort: sortValue
				},
				function(data) {
					gettedJSON = JSON.parse(data);

					if (isJSONEmpty(gettedJSON)) {
						$('#searchBox .results').html('<div class="noResults">' + translatedWords.No_results + '</div>');
					}

					if (JSON.stringify(gettedJSON) == filterExist) {
						return false;
					}

					$('#searchBox .results').html('');

					for (var i = 0; i < gettedJSON.length; i++) {
						perexDescription = gettedJSON[i]['description'].split(' ');

						if (perexDescription.length >= perexWords) {

							for (var c = 0; c < perexWords; c++) {

								if (c === perexWords - 1) {
									perexFinalString = perexFinalString.slice(0, -1);
									perexFinalString += '...';
								} else {
									perexFinalString += perexDescription[c] + ' ';
								}

							}

						} else {
							perexFinalString = gettedJSON[i]['description'];
						}

						perexReview = gettedJSON[i]['review'].split(' ');

						if (perexReview.length >= perexWords) {

							for (var l = 0; l < perexWords; l++) {

								if (l === perexWords - 1) {
									perexFinalStringReview = perexFinalString.slice(0, -1);
									perexFinalStringReview += '...';
								} else {
									perexFinalStringReview += perexReview[l] + ' ';
								}

							}

						} else {
							perexFinalStringReview = gettedJSON[i]['review'];
						}

						for (var d = 0; d < gettedJSON[i]['stars']; d++) {
							finalStars += '<i class="fa fa-star" aria-hidden="true"></i>';
						}

						if (gettedJSON[i]['likes'] > gettedJSON[i]['dislikes']) {
							firstColor = 'green';
							secondColor = 'white';
						}

						if (gettedJSON[i]['dislikes'] > gettedJSON[i]['likes']) {
							firstColor = 'white';
							secondColor = 'red';
						}

						if (gettedJSON[i]['dislikes'] == gettedJSON[i]['likes']) {
							firstColor = 'white';
							secondColor = 'white';
						}

						$('#searchBox .results').append('<div class="resultItem"> \
							<div class="topItemContent"><h3>' + gettedJSON[i]['name'] + '</h3></div> \
							<div class="middleItemContent"> \
							<div class="frontImage"> \
							<i class="fa fa-refresh fa-spin fa-fw id' + i + '"></i> \
							<img src="" class="frontImageComplete' + i + '" style="display: none; width: 180px; height: 180px;" /> \
							</div> \
							<div class="descriptionMiddle"> \
							<p> \
							' + perexFinalString + ' \
							</p> \
							</div> \
							<div class="reviewMiddle"> \
							<p><i class="fa fa-quote-left fa-pull-left" aria-hidden="true"></i> \
							' + perexFinalStringReview + ' \
							</p> \
							</div> \
							</div> \
							<div class="ratingPanel"> \
							<i class="fa fa-facebook" style="margin-right: 8px;" aria-hidden="true"></i> \
							<i class="fa fa-twitter" style="margin-right: 8px;" aria-hidden="true"></i> \
							<i class="fa fa-envelope" style="margin-right: 8px;" aria-hidden="true"></i> \
							<i class="fa fa-link" aria-hidden="true"></i> \
							| \
							' + finalStars + ' \
							| <i class="fa fa-thumbs-up" voteId="' + gettedJSON[i]['id'] + '" title="' + gettedJSON[i]['likes'] + '" style="cursor: pointer; margin-right: 8px; color: ' + firstColor + ';" aria-hidden="true"></i> \
							   <i class="fa fa-thumbs-down" voteId="' + gettedJSON[i]['id'] + '" title="' + gettedJSON[i]['dislikes'] + '" style="cursor: pointer; color: ' + secondColor + ';" aria-hidden="true"></i> \
							</div> \
							</div>');

						$('.ratingPanel .fa.fa-thumbs-up').click(function() {
							addVote('like', this);
						});

						$('.ratingPanel .fa.fa-thumbs-down').click(function() {
							addVote('dislike', this);
						});

						(function(index) {

							window['frontImage' + index] = new Image;
							window['frontImage' + index].onload = function() {
								$('.fa.fa-refresh.fa-spin.fa-fw.id' + index).remove();
								$('.frontImageComplete' + index).attr('src', this.src);
								$('.frontImageComplete' + index).toggle();

								console.log(this.width);
								console.log(this.height);
								
							}
							window['frontImage' + index].src = gettedJSON[index]['front_image'];

						})(i);

						perexFinalString = '', finalStars = '';

					}

					filterExist = JSON.stringify(gettedJSON);
				}
			);
		} else {
			filterExist = '  ';
			$('#searchBox .searchInputTitle').html(translatedWords.Results_for);
			$('#searchBox .results').html('');
		}
	}

	function addVote(voteType, cacheThis) {
		$.post('./scripts/vote_control.php', {
			posted_id: $(cacheThis).attr('voteId')
		}, function(gettedResult) {

			if (gettedResult == 0) {

				$.post('./scripts/vote_control_write.php', {
					id: $(cacheThis).attr('voteId'),
					type: voteType
				}, function(gettedTrue) {

					if (gettedTrue == 1) {
						$(cacheThis).css({
							'-webkit-transform': 'rotate(360deg)',
							'-moz-transform': 'rotate(360deg)',
							'-ms-transform': 'rotate(360deg)',
							'transform': 'rotate(360deg)',
							'-webkit-transition': '-webkit-transform 0.7s linear 0.2s',
							'-moz-transition': '-moz-transform 0.7s linear 0.2s',
							'-ms-transition': '-ms-transform 0.7s linear 0.2s',
							'transition': 'transform 0.7s linear 0.2s'
						});
					}

				});

			}

		});
	}

	function endButton() {
		topContent.html('');
		middleContent.html('');
		bottomContent.html('');
		visibilityContainer.hide(200);
		choosedRating = 0;
	}

	function geolocation() {
		if (navigator.geolocation) {
			var optn;

			navigator.geolocation.getCurrentPosition(function(position) {
				//console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);

				cacheTopContent = topContent.html();
				cacheMiddleContent = middleContent.html();
				cacheBottomContent = bottomContent.html();

				cacheValueName = $('.serviceName').val();
				cacheDescriptionName = $('.descriptionName').val();
				cacheReviewName = $('.reviewName').val();
				cacheCategoryName = $('.categoryName').val();
				cacheForegroundName = $('.foregroundName').val();

				topContent.html('');
				middleContent.html('');
				bottomContent.html('');

				topContent.append('<div class="paragraph"><h2>' + translatedWords.Service_position + '</h2></div>');

				middleContent.append('<div class="mapWrapper"><div class="map"></div><div>');

				(function initMap() {
					map = new google.maps.Map(document.getElementsByClassName('map')[0], {
						center: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						},
						zoom: 18,
						mapTypeId: google.maps.MapTypeId.SATELLITE
					});

					$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAiMRP9nxzCnQqK3KneoEYZqLs9YAPvVIY', function(result) {
						fullAdress = result.results[0].formatted_address;
					});

				})();

				bottomContent.append('<div class="buttons"> \
						<a href="" class="done"><i class="fa fa-plus" aria-hidden="true"></i> ' + translatedWords.Done + '</a> \
						</div>');

				$('.done').click(function(eventDone) {
					topContent.html(cacheTopContent);
					middleContent.html(cacheMiddleContent);
					bottomContent.html(cacheBottomContent);

					$('.serviceName').val(cacheValueName);
					$('.descriptionName').val(cacheDescriptionName);
					$('.reviewName').val(cacheReviewName);
					$('.categoryName').val(cacheCategoryName);
					$('.foregroundName').val(cacheForegroundName);

					$('.fa.fa-location-arrow').click(function(e) {
						geolocation();
					});

					$('.closeButton').click(function() {
						endButton();
					});

					$('.adressName').val(fullAdress);

					starRating();

					allCompleteClick();

					searchCategories();

					addCategoryInput();

					eventDone.preventDefault();
					return false;
				});

			}, function(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						//x.innerHTML = "User denied the request for Geolocation."
						break;

					case error.POSITION_UNAVAILABLE:
						//x.innerHTML = "Location information is unavailable."
						break;

					case error.TIMEOUT:
						//x.innerHTML = "The request to get user location timed out."
						break;

					case error.UNKNOWN_ERROR:
						//x.innerHTML = "An unknown error occurred."
						break;
				}
			}, optn);

		} else {
			alert('Geolocation is not supported in your browser');
		}
	}

	function starRating() {
		for (var i = 0; i < 5; i++) {
			$('.stars .fa.fa-star-o.' + i).hover(function() {

				$('.stars .fa.fa-star').removeClass('fa fa-star').addClass('fa fa-star-o');
				for (var c = $(this).attr('index'); c >= 0; c--) {
					$('.stars .fa.fa-star-o.' + c).removeClass('fa fa-star-o').addClass('fa fa-star');
				}

			}, function() {});

			$('.stars .fa.fa-star-o.' + i).click(function() {
				if ($(this).attr('index') <= 4) {
					choosedRating = parseInt($(this).attr('index')) + 1;
				}
			});
		}

		$('.stars').hover(function() {}, function() {
			$('.stars .fa.fa-star').removeClass('fa fa-star').addClass('fa fa-star-o');

			for (var i = 0; i < choosedRating; i++) {
				$('.stars .fa.fa-star-o.' + i).removeClass('fa fa-star-o').addClass('fa fa-star');
			}

		});
	}

	function allCompleteClick() {
		$('.allComplete').click(function(e) {
			var checkEmptyFields = {
				'serviceNameCheck': {
					'input': $('.serviceName'),
					'tr': $('.serviceNameCheck')
				},

				'categoryNameCheck': {
					'input': $('.categoryName'),
					'tr': $('.categoryNameCheck')
				}
			};

			if (isEmpty(checkEmptyFields.serviceNameCheck.input.val())) {
				checkEmptyFields.serviceNameCheck.tr.append('<td><i style="color: red;" class="fa fa-exclamation-triangle" aria-hidden="true" title="' + translatedWords.Empty_field + '"></i></td>');

				$('#visibilityContainer .mainContent').animate({
					scrollTop: 0
				});
				return false;
			}

			if (isEmpty(checkEmptyFields.categoryNameCheck.input.val())) {
				checkEmptyFields.categoryNameCheck.tr.append('<td><i style="color: red;" class="fa fa-exclamation-triangle" aria-hidden="true" title="' + translatedWords.Empty_field + '"></i></td>');

				$('#visibilityContainer .mainContent').animate({
					scrollTop: 0
				});
				return false;
			}

			if ($('.foregroundName').val() == '') {
				$('.foregroundName').val('./design/icons/no-image.png');
			}

			$.post('./scripts/add_new_item.php', {
					name: checkEmptyFields.serviceNameCheck.input.val(),
					category: $('.categoryNamePlaceHolder').attr('defaultLang'),
					address: getCookie('address'),
					description: $('.descriptionName').val(),
					review: $('.reviewName').val(),
					stars: choosedRating,
					foreground_image: $('.foregroundName').val(),
					time: Math.floor(Date.now() / 100),
					latitude: getCookie('latitude'),
					longitude: getCookie('longitude')
				},
				function(data) {
					if (data == 1) {
						swal({
							title: translatedWords.The_new_service_has_been_added,
							text: translatedWords.Link_for_adjust,
							type: "success",
							confirmButtonText: translatedWords.Indeed,
							confirmButtonColor: "#336699"
						});
						endButton();
					} else {
						console.log(data);
					}
				}
			);

			e.preventDefault();
			return false;
		});
	}

	function searchCategories() {
		$('.categoryName').focus(function() {
			$('.categoryNamePlaceHolder').toggle();
		});

		$('.categoryName').focusout(function() {
			$('.categoryNamePlaceHolder').toggle();
		});

		$('.categoryName').keyup(function() {
			if (!$('.categoryName').val() == '') {

				$.post('./scripts/search_categories_query.php', {
						queryValue: $('.categoryName').val(),
						lang: getCookie('lang')
					},
					function(data) {
						gettedJSON = JSON.parse(data);

						if (gettedJSON.length != 0) {
							$('.categoryNamePlaceHolder').val(gettedJSON[0].category);
							$('.categoryNamePlaceHolder').prop('disabled', 'true');
							$('.categoryNamePlaceHolder').attr('defaultLang', gettedJSON[0].original_lang);
						} else {
							$('.categoryNamePlaceHolder').val('');
							$('.categoryNamePlaceHolder').prop('disabled', 'true');
							$('.categoryNamePlaceHolder').attr('defaultLang', $('.categoryName').val());
						}

					}
				);
			}
		});
	}

	function addCategoryInput() {
		$('.categories .fa.fa-plus.addNewCategory').click(function() {
			console.log('Ahoj!');
		});
	}

	function mainStart() {
		$('.serviceName').focus();

		$('#visibilityContainer .mainContent').animate({
			scrollTop: 0
		});
	}

	function getAddress(latitude, longitude){
		$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyAiMRP9nxzCnQqK3KneoEYZqLs9YAPvVIY', function(result) {
			return result.results[0].formatted_address;
		});
	}

	//A little joke for me, yea - i love Luis
	var jokeAnswers = [1, 2, 3, 4];
	if (jokeAnswers[Math.floor((Math.random() * 3) + 0)] == 1) {
		$('#mainInputBox').prop('placeholder', 'I Want A Big Butter');
	}

	var mainInputBoxValue, gettedJSON;
	var translatedWords = {
		'Results_for: ': '',
		'Add_service': '',
		'Name': '',
		'Category': '',
		'Adress': '',
		'Service_position': '',
		'Done': '',
		'Back': '',
		'Review': '',
		'Empty_field': '',
		'The_new_service_has_been_added': '',
		'Indeed': '',
		'Link_for_adjust': '',
		'Foreground_image': '',
		'No_results': '',
		'Select_a_location_on_the_map': '',
		'The_new_position_has_been_set': '',
		'Current_position': '',
		'Latitude': '',
		'Longitude': ''
	};

	$.get('./scripts/translated.php', {
		'translatedID': 9,
		'fromJS': true
	}, function(data) {
		translatedWords.Results_for = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 19,
		'fromJS': true
	}, function(data) {
		translatedWords.Add_service = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 20,
		'fromJS': true
	}, function(data) {
		translatedWords.Name = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 21,
		'fromJS': true
	}, function(data) {
		translatedWords.Category = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 22,
		'fromJS': true
	}, function(data) {
		translatedWords.Adress = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 23,
		'fromJS': true
	}, function(data) {
		translatedWords.Service_position = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 24,
		'fromJS': true
	}, function(data) {
		translatedWords.Done = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 25,
		'fromJS': true
	}, function(data) {
		translatedWords.Back = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 26,
		'fromJS': true
	}, function(data) {
		translatedWords.Description = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 27,
		'fromJS': true
	}, function(data) {
		translatedWords.Review = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 28,
		'fromJS': true
	}, function(data) {
		translatedWords.Empty_field = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 29,
		'fromJS': true
	}, function(data) {
		translatedWords.The_new_service_has_been_added = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 30,
		'fromJS': true
	}, function(data) {
		translatedWords.Indeed = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 31,
		'fromJS': true
	}, function(data) {
		translatedWords.Link_for_adjust = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 32,
		'fromJS': true
	}, function(data) {
		translatedWords.Foreground_image = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 41,
		'fromJS': true
	}, function(data) {
		translatedWords.No_results = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 42,
		'fromJS': true
	}, function(data) {
		translatedWords.Select_a_location_on_the_map = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 43,
		'fromJS': true
	}, function(data) {
		translatedWords.The_new_position_has_been_set = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 44,
		'fromJS': true
	}, function(data) {
		translatedWords.The_new_position_has_been_set = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 45,
		'fromJS': true
	}, function(data) {
		translatedWords.Latitude = data;
	});

	$.get('./scripts/translated.php', {
		'translatedID': 46,
		'fromJS': true
	}, function(data) {
		translatedWords.Longitude = data;
	});

	var geolocation = {
		'options': {},
		'latitude': 0,
		'longitude': 0,
		'address': '',
		'element': $('.rightSort .defaultPosition'),
		'map': 0,
		'marker': false,
		'infoWindow': 0
	};

	if (getCookie('longitude') == '' || getCookie('latitude') == '' || getCookie('address') == '') {
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position) {
				$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAiMRP9nxzCnQqK3KneoEYZqLs9YAPvVIY', function(result) {
					geolocation.address = result.results[0].formatted_address;
					geolocation.latitude = position.coords.latitude;
					geolocation.longitude = position.coords.longitude;

					setCookie('longitude', position.coords.longitude, 365);
					setCookie('latitude', position.coords.latitude, 365);
					setCookie('address', geolocation.address, 365);

					geolocation.element.val(geolocation.address);
				});

			}, function(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:

						break;

					case error.POSITION_UNAVAILABLE:

						break;

					case error.TIMEOUT:

						break;

					case error.UNKNOWN_ERROR:

						break;
				}
			}, geolocation.options);

		} else {
			alert('Geolocation is not supported in your browser');
		}
	} else {
		geolocation.element.val(getCookie('address'));
	}

	geolocation.element.focusout(function() {
		geolocation.address = geolocation.element.val();

		$.getJSON('http://maps.google.com/maps/api/geocode/json?address=' + geolocation.address + '&sensor=false', function(result) {
			geolocation.address = result.results[0].formatted_address;
			geolocation.latitude = result.results[0].geometry.location.lat;
			geolocation.longitude = result.results[0].geometry.location.lng;

			setCookie('longitude', geolocation.longitude, 365);
			setCookie('latitude', geolocation.latitude, 365);
			setCookie('address', geolocation.address, 365);

			geolocation.element.val(geolocation.address);
		});
	});

	$('.rightSort .fa.fa-globe').click(function() {
		visibilityContainer.show(200);

		topContent.append('<div class="paragraph"><h2>' + translatedWords.Select_a_location_on_the_map + '</h2></div>');


		topContent.append('<div class="closeButton"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>');
		closeButton = $('#visibilityContainer .mainContent .mainWrap .topContent .closeButton');

		middleContent.append('<div class="mapWrapper"><div class="map"></div><div>');

		geolocation.map = new google.maps.Map(document.getElementsByClassName('map')[0], {
			center: {
				lat: parseFloat(getCookie('latitude')),
				lng: parseFloat(getCookie('longitude'))
			},
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.HYBRID
		});

		if(geolocation.marker){
        		geolocation.marker.setPosition({lat: parseFloat(getCookie('latitude')), lng: parseFloat(getCookie('longitude'))});
        } else {
        	geolocation.marker = new google.maps.Marker({
        		position: {lat: parseFloat(getCookie('latitude')), lng: parseFloat(getCookie('longitude'))}, 
        		map: geolocation.map,
        		title: translatedWords.Current_position + geolocation.address
        	});

        	geolocation.infowindow = new google.maps.InfoWindow({
    			content: '<p><strong>' + translatedWords.Adress + '</strong>' + getCookie('address') + '</p> \
    			<p><strong>' + translatedWords.Latitude + '</strong>' + getCookie('latitude') + '&deg;' + '</p> \
    			<p><strong>' + translatedWords.Longitude + '</strong>' + getCookie('longitude') + '&deg;' + '</p>'
			});

			google.maps.event.addListener(geolocation.marker, 'click', function() {
  				geolocation.infowindow.open(geolocation.map, geolocation.marker);
			});
        }

		google.maps.event.addListener(geolocation.map, 'click', function(event) {

        	geolocation.marker.setPosition(event.latLng);

        	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.latLng.lat() + ',' + event.latLng.lng() + '&key=AIzaSyAiMRP9nxzCnQqK3KneoEYZqLs9YAPvVIY', function(result) {
				geolocation.address = result.results[0].formatted_address;

				geolocation.latitude = event.latLng.lat();
				geolocation.longitude = event.latLng.lng();

				setCookie('longitude', geolocation.longitude, 365);
				setCookie('latitude', geolocation.latitude, 365);
				setCookie('address', geolocation.address, 365);

				swal({
					title: translatedWords.The_new_position_has_been_set,
					text: translatedWords.Adress + geolocation.address,
					type: "success",
					confirmButtonText: translatedWords.Indeed,
					confirmButtonColor: "#336699"
				});
					
				geolocation.element.val(geolocation.address);
				endButton();
			});

        });

		closeButton.click(function() {
			endButton();
		});
	});

	var sortValue = 'likes';

	$('.sortClicked').change(function() {
		sortValue = $(this).val();
	});

	var filterExist, perexDescription, perexReview, perexWords = 20,
		perexFinalString = '',
		perexFinalStringReview = '';
	var finalStars = '',
		firstColor, secondColor, cacheThis;

	$('#mainInputBox').keyup(afterType);

	var speechRecognitionStatus = false,
		recognition;
	var speechRecognition = $('#speechRecognition');

	speechRecognition.click(function() {
		if (speechRecognitionStatus === true) {

			$(this).removeClass('enabled');
			recognition.stop();
			speechRecognitionStatus = false;

		} else {
			$(this).addClass('enabled');

			if (!('webkitSpeechRecognition' in window)) {
				alert('Error');
			} else { //Let’s do some cool stuff :)
				recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
				recognition.continuous = true; //Suitable for dictation. 
				recognition.interimResults = true; //If we want to start receiving results even if they are not final.
				//Define some more additional parameters for the recognition:

				switch (getCookie('lang')) {
					case 'en':
						recognition.lang = 'en-US';
						break;

					case 'cz':
						recognition.lang = 'cs-CZ';
						break;
				};

				recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...

				recognition.onstart = function() {
					console.log('start');
					//Listening (capturing voice from audio input) started.
					//This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
				};

				recognition.onend = function() {
					speechRecognitionStatus = true;
					speechRecognition.removeClass('enabled');
					recognition.stop();
					//Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
				};

				recognition.onresult = function(event) { //the event holds the results
					//Yay – we have results! Let’s check if they are defined and if final or not:
					if (typeof(event.results) === 'undefined') { //Something is wrong…
						recognition.stop();
						console.log('chyba');
						return;
					}

					for (var i = event.resultIndex; i < event.results.length; ++i) {
						if (event.results[i].isFinal) { //Final results
							$('#mainInputBox').val(event.results[i][0].transcript); //Of course – here is the place to do useful things with the results.
							afterType();
						} else { //i.e. interim...
							$('#mainInputBox').val(event.results[i][0].transcript); //You can use these results to give the user near real time experience.
							afterType();
						}
					} //end for loop
				};
			}

			recognition.start();

			speechRecognitionStatus = true;
		}

		console.log(speechRecognitionStatus);
	});

	var visibilityContainer = $('#visibilityContainer');
	var mainContent = $('#visibilityContainer  .mainContent .mainWrap');
	var topContent = $('#visibilityContainer  .mainContent .mainWrap .topContent');
	var middleContent = $('#visibilityContainer  .mainContent .mainWrap .middleContent');
	var bottomContent = $('#visibilityContainer  .mainContent .mainWrap .bottomContent');
	var closeButton, currentLocation = '',
		cacheTopContent, cacheMiddleContent, cacheBottomContent, map, fullAdress;
	var cacheValueName, cacheDescriptionName, cacheReviewName, cacheCategoryName, cacheForegroundName;
	var choosedRating = 0;

	$('.fa.fa-plus').click(function() {
		visibilityContainer.show(200);

		topContent.append('<div class="paragraph"><h2>' + translatedWords.Add_service + '</h2></div>');


		topContent.append('<div class="closeButton"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>');
		closeButton = $('#visibilityContainer .mainContent .mainWrap .topContent .closeButton');

		closeButton.click(function() {
			endButton();
		});

		middleContent.append('<table> \
			<tr class="serviceNameCheck"> \
			<td>' + translatedWords.Name + '</td> \
			<td><input type="text" class="serviceName" style="text-align: center;" /></td> \
			</tr> \
			<tr class="categoryNameCheck"> \
			<td>' + translatedWords.Category + '</td> \
			<td class="categories"><input type="text" style="text-align: center;" class="categoryName" /> <i class="fa fa-plus addNewCategory" aria-hidden="true"></i></td> \
			</tr> \
			<tr> \
			<td></td> \
			<td><input type="text" style="text-align: center; outline: 0; border: 0;" class="categoryNamePlaceHolder" /> </td> \
			</tr> \
			<tr> \
			<td>' + translatedWords.Foreground_image + '</td> \
			<td><input type="text" class="foregroundName" /></td> \
			<td><input type="file" title=" " class="uploadImage"></td> \
			</tr> \
			<tr> \
			<td>' + translatedWords.Description + '</td> \
			<td><textarea class="descriptionName"></textarea></td> \
			</tr> \
			<tr> \
			<td>' + translatedWords.Review + '</td> \
			<td><textarea class="reviewName"></textarea></td> \
			</tr> \
			</table>');

		middleContent.append('<div class="stars"></div>');

		for (var i = 0; i < 5; i++) {
			$('.stars').append('<i class="fa fa-star-o ' + i + '" index="' + i + '" aria-hidden="true"></i>');
		}

		starRating();

		bottomContent.append('<div class="buttons"> \
						<a href="" class="allComplete"><i class="fa fa-check" aria-hidden="true"></i> ' + translatedWords.Done + '</a> \
						</div>');

		allCompleteClick();

		searchCategories();

		addCategoryInput();

		mainStart();

		return false;
		e.preventDefault();
	});

});