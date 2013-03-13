var sisseLogitud = false;

$(function() {
	   $('#kandidaaditabel').dataTable( {
	      "sAjaxSource": '../js/candidates.json',
	      "sAjaxDataProp": "candidates",
			"bPaginate": false,
			"bLengthChange": false,
			"bFilter": true,
			"bSort": true,
			"bInfo": false,
			"bAutoWidth": true,
			"sProcessing": "<img src='../img/ajax-loader.gif'",
			"aoColumns": [
				         { "mDataProp": "id" },
				         { "mDataProp": "party.name" },
				         { "mDataProp": "person.name" }
				          ]
				
	   });
	   $('#kandidaaditabel tbody').delegate("tr", "click", rowClick);
	});


function logi(viis) {
	if (viis == 'naita') {
		if (document.getElementById("login").className == 'peaPaneel All') {
			$('#login, #kandideeri').toggleClass('All Nahtaval');
			$('#valikud').toggleClass('uleval Nahtaval');
		}
	} else if (viis == 'valja') {
		muudaLoginStaatust();
		aktiveeriValikuteVaade('uudised');
		if (document.getElementById("login").className == 'peaPaneel Nahtaval') {
			$('#login, #kandideeri').toggleClass('All Nahtaval');
			$('#valikud').toggleClass('uleval Nahtaval');
		}

	} else {
		$('#login, #kandideeri').toggleClass('All Nahtaval');
		$('#valikud').toggleClass('uleval Nahtaval');
		muudaLoginStaatust();
	}
}

function sule() {
	$('#login, #kandideeri').toggleClass('All Nahtaval');
	$('#valikud').toggleClass('uleval Nahtaval');
}

function abi() {
	var left = (screen.width / 2) - 400;
	window
			.open(
					'abi.html',
					'',
					'toolbar = no, location = no, directories = no, status = no, menubar = no, scrollbars = no, resizable = no, width = 800, height = 500, top = 200, left='
							+ left);
}

function kandideeri() {
	if (document.getElementById("kandideeri").className == 'peaPaneel All') {
		$('#login, #kandideeri').toggleClass('All Nahtaval');
		$('#valikud').toggleClass('uleval Nahtaval');
	}
}

function muudaLoginStaatust() {
	if (sisseLogitud = true) {
		sisseLogitud = false;
		$('.login.pais').toggleClass('sees valjas')
		$('#login, #kandideeri').toggle();
	} else {
		sisseLogitud = true;
		$('.loginPais').toggleClass('sees valjas')
		$('#login, #kandideeri').toggle();
	}
}

function lehtLaetud() {
	$('.login.pais').addClass('valjas')
	$('#kandideeri').hide();
	$('#login, #kandideeri').addClass('All');
	$('#valikud').addClass('Nahtaval');
	aktiveeriValikuteVaade('uudised');
}

function aktiveeriValikuteVaade(nimi) {
	$('.navigatsioon.nupp').removeClass("aktiivne");
	$('.navigatsioon.nupp.' + nimi).addClass('aktiivne');
	$('.navigatsioon.indikaator, .valikutePohipaneel').removeClass(
			'uudised kandidaadid tulemused statistika');
	$('.navigatsioon.indikaator, .valikutePohipaneel').addClass(nimi);
	$('.statistikaPohipaneel').removeClass('riik piirkond partei kandidaat');
	if (nimi == 'kandidaadid') {
		laekandidaadid();
	} else if (nimi == 'statistika') {
		laestatistika();
	}
}

function laekandidaadid() {
	$('#uudised').children('.tabeliRida').not('.pais').remove();
	/*
	 * $.getJSON('uudised.json', function(data) {
	 * $('#uudised').children('.tabeliRida').not('.pais').hover(function() {
	 * $(this).children('.tabelireaTaust').addClass('hiirPeal'); }, function() {
	 * $(this).children('.tabelireaTaust').removeClass('hiirPeal'); }); });
	 */
}

function laestatistika() {
	document.getElementById("statistikavalik").value = 'riik';
}

function aktiveeriStatistikavaade(nimi) {
	$('.statistikaPohipaneel').removeClass('riik piirkond partei kandidaat');
	$('.statistikaPohipaneel').addClass(nimi.value);
}

$(document).ready(
		function() {

			kohustuslik = [ "eesnimi", "perekonnanimi",
					"kandideerimispiirkond", "erakond" ];

			$("#andmed").submit(
					function() {
						for (i = 0; i < kohustuslik.length; i++) {
							var vali = $('#' + kohustuslik[i]);
							if (vali.val() == "") {
								vali.addClass("error");
								$('#' + kohustuslik[i] + 'Info').text(
										'See väli on kohustuslik.')
							} else {
								vali.removeClass("error");
							}
						}

						if ($(":input").hasClass("error")) {
							return false;
						} else {
							return true;
						}
					});

			$(":input").focus(function() {
				if ($(this).hasClass("error")) {
					$(this).removeClass("error");
				}
			});
		});