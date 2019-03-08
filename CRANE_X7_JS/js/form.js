var COLOR_WHITE = 0xEEEEEE;
var COLOR_BLACK = 0x333333;
var COLOR_RED = 0xFF0000;
var COLOR_BLUE = 0x2766FF;
var COLOR_YELLOW = 0xF3B31A;
var COLOR_GREEN = 0x4DFF40;
var ColorTable = [ COLOR_WHITE, COLOR_BLACK, COLOR_RED, COLOR_BLUE, COLOR_YELLOW, COLOR_GREEN ];
var RabbitColorTable = [ COLOR_RED, COLOR_RED, COLOR_WHITE, COLOR_RED, COLOR_RED, COLOR_RED ];
var TextColorTable = [ COLOR_BLACK, COLOR_WHITE, COLOR_WHITE, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK ];
var ColorName = [ '白', '黒', '赤', '青', '黄', '緑' ];
var ColorMax = 3;
var BaseColorIndex = 2;
var Link1ColorIndex = 0;
var Link2ColorIndex = 0;
var Link3ColorIndex = 0;
var Link4ColorIndex = 0;
var Link5ColorIndex = 0;
var Link6ColorIndex = 0;
var Link7ColorIndex = 2;
var Cover2ColorIndex = 2;
var Cover4ColorIndex = 2;
var Cover5ColorIndex = 0;
var get_saleem = function( c ){
	var em="", moji="";
	for(var i=0;i<c.length;i++){
		code = c.charCodeAt(i);
		em += String.fromCharCode(code+32);
	}
	return em;
}

//Todo deg or rad // ref_rot
var Link1RotIndex = 0;  //Z
var Link2RotIndex = 45;  //Y 45
var Link3RotIndex = 0;  //Z
var Link4RotIndex = -135;  //Y -135
var Link5RotIndex = 0;  //Z
var Link6RotIndex = -65;  //Y -65
var Link7RotIndex = 0;  //Z
var Link8RotIndex = 0;  //Z

var ref_data = [Link1RotIndex, Link2RotIndex, Link3RotIndex, Link4RotIndex, Link5RotIndex, Link6RotIndex, Link7RotIndex, Link8RotIndex];

var off_fig = [0,-35, 0,-145, 0, 0, 0, 90];

var loader = new THREE.FileLoader();
var player = new APP.Player();

var load_progress = document.createElement( 'progress' );
load_progress.style.cssText = 'position: absolute; top: 50%; left: ' + ((window.innerWidth-300)/2) + 'px; witdh: 300px; height: 40px; color: #00AA00; background: #fff; border: 1px solid #FFFFFF;';
load_progress.max = 10000;
load_progress.value = 0;
document.body.appendChild( load_progress )
var is_loaded = false;

var color_param = player.getColorParam();
var ui_hidden = false;
if( player.getHiddenParam() == 'true'){
	ui_hidden = true;
}

function player_play(){
	player.setSize( window.innerWidth, window.innerHeight );
	player.play();
	document.body.appendChild( player.dom );
	window.addEventListener( 'resize', function () {
		player.setSize( window.innerWidth, window.innerHeight );
	} );
	document.body.removeChild( load_progress );
}

var model_name = 'app.json';
//var model_name = 'crane_x7.gz';
var userAgent = window.navigator.userAgent.toLowerCase();
if ( userAgent.match(/firefox/)	|| userAgent.match(/trident/)
	|| (!userAgent.match(/chrome/) && userAgent.match(/safari/)) && userAgent.match(/macintosh/)) {
    model_name = 'app.json';
}

loader.setResponseType( 'text' );
loader.load( model_name, function ( text ) {
	var k = JSON.parse(text);
	player.load( JSON.parse( text ) );
	is_loaded = true;
	if( (color_param.length > 0) && ((Number(color_param) ) || color_param == "00000000000") ){
		set_color_all( color_param );
	}
	player_play();
}, function ( xhr ) {
	load_progress.max = xhr.total;
	load_progress.value = xhr.loaded;
} );

var get_css = function( top, left, back_color_dec ) {
	var back_color_rgb = '#' +  back_color_dec.toString(16) + ';';
	var text_color = COLOR_BLACK;
	if ( back_color_dec == COLOR_BLACK ) {
		text_color = COLOR_WHITE;
	}
	var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 12px 14px; color: #' + text_color.toString(16) + '; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: ' + back_color_rgb + '; display: table;');
	return res_css;
};

var get_css_move = function( top, left, back_color_dec ) {
	var back_color_rgb = '#' +  back_color_dec.toString(16) + ';';
	var text_color = COLOR_BLACK;
	if ( back_color_dec == COLOR_BLACK ) {
		text_color = COLOR_WHITE;
	}
	var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 20px 20px; color: #' + text_color.toString(16) + '; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: ' + back_color_rgb + '; display: table;');
	return res_css;
};

var get_css_module = function( top, left) {
	var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 8px 10px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE; display: table;');
	return res_css;
};

var get_css_base = function( top, left) {
	var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 12px 14px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE;');
	return res_css;
};

var get_css_range = function( top, left) {
	var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 5px 7px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE; display: table;');
	return res_css;
};

var button_on = document.createElement( 'button' );
button_on.setAttribute("id", "on");
button_on.textContent = 'ON';
button_on.hidden = ui_hidden;
button_on.onclick = function(){
	button_servo.textContent = '|'
	button_copy_text = 'copy';
	button_copy.textContent = button_copy_text;
	ser = 0;
}

var button_off = document.createElement( 'button' );
button_off.setAttribute("id", "off");
button_off.textContent = 'OFF';
button_off.hidden = ui_hidden;
button_off.onclick = function(){
	button_servo.textContent = 'o'
	ser = 1;
}

var button_servo = document.createElement( 'button' );
button_servo.setAttribute("id","servo");
button_servo.textContent = 'o';
var ser = 1;
button_servo.setAttribute("value",ser);
button_servo.onclick = function(){
	button_servo.setAttribute("value",ser);
	if(port_connect == 1){
	if(ser == 1){
		button_servo.textContent = '|'
		ser = 0;
		}else{
		button_servo.textContent = 'o'
		var data = off_fig;
		button_copy_text = 'copy';
		button_copy.textContent = button_copy_text;
		button_set.setAttribute("val",data);
		ser = 1;
		}
	}
}
button_servo.hidden = ui_hidden;

var button_set = document.createElement( 'button' );
button_set.setAttribute("id", "set");
button_set.textContent = 'SET';
button_set.setAttribute("val",ref_data);
button_set.onclick = function() {
	$('[id=set]').attr('disabled',true);
	$('[id=on]').attr('disabled',true);
	$('[id=off]').attr('disabled',true);
	$('[id=move]').attr('disabled',true);
	var data = [Link1RotIndex, Link2RotIndex, Link3RotIndex, Link4RotIndex, Link5RotIndex, Link6RotIndex, Link7RotIndex, Link8RotIndex];
	button_set.setAttribute("val",data);
}
button_set.hidden = ui_hidden;

var button_copy = document.createElement( 'button' );
button_copy.setAttribute("id", "copy");
var button_copy_text = 'copy'
button_copy.textContent = button_copy_text;
button_copy.onclick = function() {
	if( button_copy_text == 'copying' ){
		button_copy_text = 'copy';
	}else{
		button_copy_text = 'copying';
	}
	button_copy.textContent = button_copy_text;
}
button_copy.hidden = ui_hidden;

var button_send = document.createElement( 'button' );
button_send.setAttribute("id", "send");
button_send.textContent = 'connect';
var port_connect = 0;
button_send.onclick = function() {
	port_connect = 1;
	button_send.textContent = 'connected';
	console.log("send port");
	}
button_send.hidden = ui_hidden;

var fig_shift = document.createElement('div');
var fig = document.createElement('a');
fig.setAttribute("style","cursor: pointer;");
fig.textContent = 'send';
var fig_shift_top = 560;
var fig_shift_left = 300;
fig_shift.style.cssText = get_css_base(fig_shift_top, fig_shift_left);
fig_shift.onclick = function(){
	obj=document.getElementById('open3').style; 
	obj.display=(obj.display=='none')?'inline':'none';
	fig_shift.style.backgroundColor = (obj.display=='none')?'#EEEEEE':'#CCCCCC';
}
fig_shift.appendChild(fig);
document.body.appendChild(fig_shift);

var div_fig = document.createElement('div');
div_fig.setAttribute("class","fig");
div_fig.appendChild( button_copy );
div_fig.appendChild( button_send );
div_fig.appendChild( button_set );
div_fig.appendChild( button_on );
div_fig.appendChild( button_off );
//div_fig.appendChild( button_servo );
div_fig.style.cssText = get_css(400, 20, 0xEEEEEE);
document.body.appendChild(div_fig);

var fig_tab = document.createElement('div');
fig_tab.setAttribute("id","open3");
fig_tab.setAttribute("style","display:none;clear:both;");
fig_tab.appendChild(div_fig);
document.body.appendChild(fig_tab);
