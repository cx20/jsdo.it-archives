// forked from Takahito Yagami's "SL.JS" http://labs.creazy.net/sl/bookmarklet.js

/**
 * SL.JS
 * 
 * # execute bookmarklet below
 * javascript:(function(){var d=document,sl_open,sl_run,sl_close,s=d.createElement('script');s.charset='UTF-8';s.src='http://labs.creazy.net/sl/bookmarklet.js';d.body.appendChild(s)})();
 * 
 * @author  Takahito Yagami <takahito.yagami[at]gmail[dot]com> (a.k.a yager)
 * @version v1.0.0 2008/02/16
 */
(function(){
	//------------------------------------------------------------
	// Setting (You can chage options in this block)
	//------------------------------------------------------------
	var sl_speed = 100;
	var sl_pitch = 15;
	var sl_tx_color = "#FFFFFF";
	var sl_bg_color = "#000000";
	//------------------------------------------------------------

	//------------------------------------------------------------
	// SL Parts
	//------------------------------------------------------------
	var sl_steam = [];
	sl_steam[0]
		="                      (@@) (  ) (@)  ( )  @@    ()    @     O     @     O      @<br>"
		+"                 (   )<br>"
		+"             (@@@@)<br>"
		+"          (    )<br>"
		+"<br>"
		+"        (@@@)<br>";
	sl_steam[1]
		="                      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O<br>"
		+"                 (@@@)<br>"
		+"             (    )<br>"
		+"          (@@@@)<br>"
		+"<br>"
		+"        (   )<br>";
	
	var sl_body
		="      ====        ________                ___________ <br>"
		+"  _D _|  |_______/        \\__I_I_____===__|_________| <br>"
		+"   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________         <br>"
		+"   /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A  <br>"
		+"  |      |  |   H  |__--------------------| [___] |   =|                        |  <br>"
		+"  | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |  <br>"
		+"  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_ <br>";
	
	var sl_wheels = [];
	sl_wheels[0]
		="__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";
	sl_wheels[1]
		="__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";
	sl_wheels[2]
		="__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";
	sl_wheels[3]
		="__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\_O=====O=====O=====O/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";
	sl_wheels[4]
		="__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=   O=====O=====O=====O|_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";
	sl_wheels[5]
		="__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__|__________________________|_ <br>"
		+" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   <br>"
		+"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    <br>";

	sl_steam[0]  = sl_steam[0].replace(/ /g,'&nbsp;');
	sl_steam[1]  = sl_steam[1].replace(/ /g,'&nbsp;');
	sl_body      = sl_body.replace(/ /g,'&nbsp;');
	sl_wheels[0] = sl_wheels[0].replace(/ /g,'&nbsp;');
	sl_wheels[1] = sl_wheels[1].replace(/ /g,'&nbsp;');
	sl_wheels[2] = sl_wheels[2].replace(/ /g,'&nbsp;');
	sl_wheels[3] = sl_wheels[3].replace(/ /g,'&nbsp;');
	sl_wheels[4] = sl_wheels[4].replace(/ /g,'&nbsp;');
	sl_wheels[5] = sl_wheels[5].replace(/ /g,'&nbsp;');
	
	var sl_patterns = [];
	sl_patterns[0]  = sl_steam[0] + sl_body + sl_wheels[0];
	sl_patterns[1]  = sl_steam[0] + sl_body + sl_wheels[1];
	sl_patterns[2]  = sl_steam[0] + sl_body + sl_wheels[2];
	sl_patterns[3]  = sl_steam[1] + sl_body + sl_wheels[3];
	sl_patterns[4]  = sl_steam[1] + sl_body + sl_wheels[4];
	sl_patterns[5]  = sl_steam[1] + sl_body + sl_wheels[5];
	
	//------------------------------------------------------------
	// SL Initialize
	//------------------------------------------------------------
	var sl_counter  = 0;
	var sl_position = 0;
	var scrollTop = document.body.scrollTop  || document.documentElement.scrollTop;
	if (window.opera||document.layers) {
		var windowWidth = window.innerWidth;
	} else if (document.all) {
		var windowWidth = document.body.clientWidth;
	} else if(document.getElementById){
		var windowWidth = window.innerWidth;
	}
/*
    var sl_style_base
		='display: block;'
		+'position: absolute;'
		+'text-align: left;'
		+'overflow: visible;'
		+'white-space: pre;'
		+'font: 12px/12px monospace;';
*/
    var sl_style_base
		='display: block;'
		+'position: absolute;'
		+'text-align: left;'
		+'overflow: visible;'
		+'white-space: pre;'
        +'font: 12px/12px Courier New;monospace;';
    
	var sl_style_main
		=sl_style_base
		+'top: '+(scrollTop+100)+'px;'
		+'left: '+windowWidth+'px;'
		+'padding: 20px;'
		+'z-index: 999;'
		+'color: '+sl_tx_color+';';

	document.body.innerHTML += '<div id="__sl_main__" style="'+sl_style_main+'">'+sl_patterns[0]+'</div>';

	var sl_w = document.getElementById("__sl_main__").clientWidth;
	var sl_h = document.getElementById("__sl_main__").clientHeight;

	var sl_style_background
		=sl_style_base
		+'top: '+(scrollTop+100)+'px;'
		+'left: 0px;'
		+'width: '+windowWidth+'px;'
		+'height: '+sl_h+'px;'
		+'z-index: 998;'
		+'background-color: '+sl_bg_color+';'
		+'filter: alpha(opacity=0);'
		+'-moz-opacity: 0.0;'
		+'opacity: 0.0;';

	document.body.innerHTML += '<div id="__sl_background__" style="'+sl_style_background+'"><br /></div>';

	//------------------------------------------------------------
	// Actions
	//------------------------------------------------------------
	var sl_bg_counter = 0;

	/**
	 * sl_open (gradually open background)
	 */
	sl_open = function() {
		var oid = "__sl_background__";
		var op  = sl_bg_counter;
		var ua  = navigator.userAgent
		document.getElementById(oid).style.filter = 'alpha(opacity=' + (op * 10) + ')';
		document.getElementById(oid).style.MozOpacity = op / 10;
		document.getElementById(oid).style.opacity = op / 10;
		if ( sl_bg_counter < 8 ) {
			sl_bg_counter++;
			setTimeout('sl_open()',100);
		} else {
			sl_run();
		}

	}

	/**
	 * sl_run (move a train)
	 */
	sl_run = function() {
		document.getElementById("__sl_main__").innerHTML = sl_patterns[sl_counter];
		document.getElementById("__sl_main__").style.left = windowWidth - sl_position + "px";
		if ( sl_counter < 5 ) {
			sl_counter++;
		} else {
			sl_counter = 0;
		}
		sl_position += sl_pitch;
		if ( sl_w + (windowWidth - sl_position) < 0 ) {
			sl_counter  = 0;
			sl_position = 0;
			document.body.removeChild(document.getElementById("__sl_main__"));
			sl_close();
		} else {
			setTimeout('sl_run()',sl_speed);
		}
	}

	/**
	 * sl_close (gradually close background)
	 */
	sl_close = function() {
		var oid = "__sl_background__";
		var op  = sl_bg_counter;
		var ua = navigator.userAgent
		document.getElementById(oid).style.filter = 'alpha(opacity=' + (op * 10) + ')';
		document.getElementById(oid).style.MozOpacity = op / 10;
		document.getElementById(oid).style.opacity = op / 10;
		if ( sl_bg_counter > 0 ) {
			sl_bg_counter--;
			setTimeout('sl_close()',100);
		} else {
			document.body.removeChild(document.getElementById(oid));
		}
	}

	// start actions !
	sl_open();

})();