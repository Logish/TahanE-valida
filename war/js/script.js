var sisseLogitud = false;

$(document).ready(function() 
	    { 
	        $("#myTable").tablesorter( {sortList: [[0,0], [1,0]]} ); 
	    } 
	); 

function logi(viis) {
	if (viis == 'naita') {
		if (document.getElementById("login").className == 'peaPaneel All') {
			$('#login, #kandideeri').toggleClass('All Nahtaval');
			$('#valikud').toggleClass('uleval Nahtaval');
		}
	} else if (viis == 'valja'){
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
/*	$.getJSON('uudised.json', function(data) {
		$('#uudised').children('.tabeliRida').not('.pais').hover(function() {
			$(this).children('.tabelireaTaust').addClass('hiirPeal');
		}, function() {
			$(this).children('.tabelireaTaust').removeClass('hiirPeal');
		});
	});*/
}

function laestatistika() {
	document.getElementById("statistikavalik").value = 'riik';
}

function aktiveeriStatistikavaade(nimi) {
	$('.statistikaPohipaneel').removeClass('riik piirkond partei kandidaat');
	$('.statistikaPohipaneel').addClass(nimi.value);
}