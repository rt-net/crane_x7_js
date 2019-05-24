/**
   @LICENSE
   Copyright 2019 RT Corporation and Riki Hayashi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
form作成に必要な変数,関数の定義
*/
var COLOR_WHITE         = 0xEEEEEE;
var COLOR_BLACK         = 0x333333;
var COLOR_RED           = 0xFF0000;
var COLOR_BLUE          = 0x2766FF;
var COLOR_YELLOW        = 0xF3B31A;
var COLOR_GREEN         = 0x4DFF40;
var ColorTable          = [ COLOR_WHITE, COLOR_BLACK, COLOR_RED, COLOR_BLUE, COLOR_YELLOW, COLOR_GREEN ];
var RabbitColorTable    = [ COLOR_RED, COLOR_RED, COLOR_WHITE, COLOR_RED, COLOR_RED, COLOR_RED ];
var TextColorTable      = [ COLOR_BLACK, COLOR_WHITE, COLOR_WHITE, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK ];
var ColorName           = [ '白', '黒', '赤', '青', '黄', '緑' ];
var ColorMax            = 3;
var BaseColorIndex      = 2;
var Link1ColorIndex     = 0;
var Link2ColorIndex     = 0;
var Link3ColorIndex     = 0;
var Link4ColorIndex     = 0;
var Link5ColorIndex     = 0;
var Link6ColorIndex     = 0;
var Link7ColorIndex     = 2;
var Cover2ColorIndex    = 2;
var Cover4ColorIndex    = 2;
var Cover5ColorIndex    = 0;
var get_saleem = function( c ){
    var em='', moji='';
    for(var i=0;i<c.length;i++){
        code = c.charCodeAt(i);
        em  += String.fromCharCode(code+32);
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

var ref_data    = [Link1RotIndex, Link2RotIndex, Link3RotIndex, Link4RotIndex, Link5RotIndex, Link6RotIndex, Link7RotIndex, Link8RotIndex];
var off_fig     = [0,-35, 0,-145, 0, 0, 0, 90];

//form size Z_asix
var color_form  = 69;
var range_form  = 210;
var send_form   = 150;
var slot_form   = 140;
var form_pos    = 85;
var diff_pos    = 0;

var loader = new THREE.FileLoader();
var player = new APP.Player();

var load_progress           = document.createElement( 'progress' );
load_progress.style.cssText = 'position: absolute; top: 50%; left: ' + ((window.innerWidth-300)/2) + 'px; witdh: 300px; height: 40px; color: #00AA00; background: #fff; border: 1px solid #FFFFFF;';
load_progress.max           = 10000;
load_progress.value         = 0;
document.body.appendChild( load_progress )
var is_loaded   = false;

var color_param = player.getColorParam();
var ui_hidden   = false;
if( player.getHiddenParam() == 'true'){
    ui_hidden = true;
}

function player_play(){
    player.setSize( window.innerWidth, window.innerHeight );
    player.play();
    document.body.appendChild( player.dom );
    window.addEventListener( 'resize', function (){
        player.setSize( window.innerWidth, window.innerHeight );
    });
    document.body.removeChild( load_progress );
}

var model_name  = 'app.json';
//var model_name = 'crane_x7.gz';
var userAgent   = window.navigator.userAgent.toLowerCase();
if( userAgent.match(/firefox/)  || userAgent.match(/trident/) || (!userAgent.match(/chrome/) && userAgent.match(/safari/)) && userAgent.match(/macintosh/)){
    model_name = 'app.json';
}

loader.setResponseType( 'text' );
loader.load( model_name, function ( text ){
    var k       = JSON.parse(text);
    player.load( JSON.parse( text ) );
    is_loaded   = true;
    if( (color_param.length > 0) && ((Number(color_param) ) || color_param == '00000000000') ){
        set_color_all( color_param );
    }
    player_play();
}, function ( xhr ){
    load_progress.max   = xhr.total;
    load_progress.value = xhr.loaded;
} );

var get_css = function( top, left, back_color_dec ){
    var back_color_rgb  = '#' +  back_color_dec.toString(16) + ';';
    var text_color      = COLOR_BLACK;
    if( back_color_dec == COLOR_BLACK ){
        text_color  = COLOR_WHITE;
    }
    var res_css         = ('padding: 12px 14px; color: #' + text_color.toString(16) + '; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: ' + back_color_rgb + ';');
    return res_css;
};

var get_css_form = function( top, left, back_color_dec ){
    var back_color_rgb  = '#' +  back_color_dec.toString(16) + ';';
    var text_color      = COLOR_BLACK;
    if( back_color_dec == COLOR_BLACK ){
        text_color = COLOR_WHITE;
    }
    var res_css         = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 12px 14px; color: #' + text_color.toString(16) + '; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: ' + back_color_rgb + '; display: table;');
    return res_css;
};

var get_css_move = function( top, left, back_color_dec ){
    var back_color_rgb  = '#' +  back_color_dec.toString(16) + ';';
    var text_color      = COLOR_BLACK;
    if ( back_color_dec == COLOR_BLACK ){
        text_color = COLOR_WHITE;
    }
    var res_css         = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 20px 20px; color: #' + text_color.toString(16) + '; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: ' + back_color_rgb + '; display: table;');
    return res_css;
};

var get_css_module = function( top, left){
    var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 8px 10px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE; display: table;');
    return res_css;
};

var get_css_base = function( top, left){
    var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 12px 14px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE;');
    return res_css;
};

var get_css_range = function( top, left){
    var res_css = ('position: absolute; top: ' + top + 'px; left: ' + left + 'px; padding: 5px 7px; color: #333333; border: 1px solid #000000; border-radius: 4px; text-decoration: none; background-color: #EEEEEE; display: table;');
    return res_css;
};

