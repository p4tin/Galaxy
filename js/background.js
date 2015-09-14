var ship_types = [
	{ id: 1, name: 'Corvette', build_time: 2, tech_level: 10, speed: 2, shields: 5, attack: 1 },
	{ id: 2, name: 'Scout', build_time: 1, tech_level: 20, speed: 5, shields: 2, attack: 0 },
	{ id: 3, name: 'Transport', build_time: 2, tech_level: 30, speed: 1, shields: 15, attack: 0 }
];

var player = loadPlayer();
if( player == undefined ) {
	var fleets = new Array();
	var flt0 = new Array(50);
	fleets[0] = flt0;
	player = {
		name: '',
		time_spent: 0,
		producing: 'gold',
		producing_ship: '',
		tech: 0,
		ore: 0,
		gold: 0,
		fleets: fleets
	}
	savePlayer(player);
}
var resetInterval = 10000;  //End Turn (in millis)

setInterval(endTurn, resetInterval);

function endTurn() {
    if(player.producing == "gold")
    	player.gold++;
    else if(player.producing == "ore")
    	player.ore++;
    else if(player.producing == "tech")
    	player.tech++;
    else if(player.producing == "ship") {
    	player.time_spent++;
    	var stype = find_shiptype_by_name(player.ship_type);
    	if(player.time_spent < stype.build_time) {
    		savePlayer(player);
    		return;
    	}
    	else {
    		player.fleets[0][stype.id+2] = player.fleets[0][stype.id+2] + 1;
    		player.time_spent = 0;
    		player.ship_type = '';
    	}
    }
    player.producing = '';
    savePlayer(player);
}

function loadPlayer() {
	return JSON.parse(localStorage.getItem('player'));
}

function savePlayer(player) {
	localStorage.setItem('player', JSON.stringify(player));
}

function find_shiptype_by_name(name) {
	for (var i = 0; i < ship_types.length; i++) {
		if(ship_types[i].name == name)
			return ship_types[i];
	};
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "savePlayer") savePlayer(player);
    }
);
