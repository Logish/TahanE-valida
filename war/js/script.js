var sisseLogitud = false;

function logi(viis) {
	if (viis == 'naita') {
		if (document.getElementById("login").className == 'peaPaneel All') {
			$('#login').toggleClass('All Nahtaval');
			$('#valikud').toggleClass('uleval Nahtaval');
		}
	} else if (viis == 'valja'){
		$('#loginInfo').hide();
		$('#loginNupp').show();
		aktiveeriValikuteVaade('uudised');
	} else {
		sisseLogitud = true;
		$('#login').toggleClass('All Nahtaval');
		$('#valikud').toggleClass('uleval Nahtaval');
		$('#loginNupp').hide();
		$('#loginInfo').show();		
	}  
}

function lehtLaetud() {
	$('#loginInfo').hide();
	$('#login').addClass('All');
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