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
/*
色変更のform
*/
var div_shift   = document.createElement('div');
var shift       = document.createElement('a');
var shift_img   = document.createElement('img');
shift_img.setAttribute('type','image');
shift_img.setAttribute('src','js/img/color.png');
shift_img.setAttribute('alt','color');
shift_img.setAttribute('width','35');
shift_img.setAttribute('height','35');
var div_shift_top       = 20;
var div_shift_left      = 20;
div_shift.style.cssText = get_css_base(div_shift_top, div_shift_left);
div_shift.onclick = function(){
    obj                             = document.getElementById('open1').style;
    obj.display                     = (obj.display=='none')?'inline':'none';
    div_shift.style.backgroundColor = (obj.display=='none')?'#EEEEEE':'#CCCCCC';

    if(obj.display === 'none'){
        var color_obj_pos = parseInt(document.getElementById('color').style.top);
        form_position(color_obj_pos, color_form);
        diff_pos -= color_form;
    }else{
        color_select.style.cssText = get_css_form(form_pos+diff_pos, 20, 0xEEEEEE);
        diff_pos += color_form;
    }
}
div_shift.appendChild(shift_img);
div_shift.appendChild(shift);
document.body.appendChild(div_shift);

//各リンクに対応した処理
var button_base             = document.createElement( 'button' );
button_base.style.cssText   = get_css(form_pos,20,0xFF0000);
button_base.textContent     = '[1]';
button_base.onclick = function(){
    BaseColorIndex = check_color( BaseColorIndex + 1 );
    set_color( button_base, ColorTable[BaseColorIndex], 'Base.stl', 20, 20 );
};
button_base.hidden          = ui_hidden;

var button_link1            = document.createElement( 'button' );
button_link1.style.cssText  = get_css(20,70,0xEEEEEE);
button_link1.textContent    = '[2]';
button_link1.onclick = function(){
    Link1ColorIndex = check_color( Link1ColorIndex + 1 );
    set_color( button_link1, ColorTable[Link1ColorIndex], 'Link1.stl', 20, 70 );
};
button_link1.hidden         = ui_hidden;

var button_cov2             = document.createElement( 'button' );
button_cov2.style.cssText   = get_css(20,120,0xFF0000);
button_cov2.textContent     = '[3]';
button_cov2.onclick = function(){
    Cover2ColorIndex = check_color( Cover2ColorIndex + 1 );
    set_color( button_cov2, ColorTable[Cover2ColorIndex], 'Link_Cover_2R.stl', 20, 120 );
    set_color( button_cov2, ColorTable[Cover2ColorIndex], 'Link_Cover_2L.stl', 20, 120 );
};
button_cov2.hidden          = ui_hidden;

var button_link2            = document.createElement( 'button' );
button_link2.style.cssText  = get_css(20,170,0xEEEEEE);
button_link2.textContent    = '[4]';
button_link2.onclick = function(){
    Link2ColorIndex = check_color( Link2ColorIndex + 1 );
    set_color( button_link2, ColorTable[Link2ColorIndex], 'Link2.stl', 20, 170 );
};
button_link2.hidden         = ui_hidden;

var button_link3            = document.createElement( 'button' );
button_link3.style.cssText  = get_css(20,220,0xEEEEEE);
button_link3.textContent    = '[5]';
button_link3.onclick = function(){
    Link3ColorIndex = check_color( Link3ColorIndex + 1 );
    set_color( button_link3, ColorTable[Link3ColorIndex], 'Link3.stl', 20, 220 );
};
button_link3.hidden         = ui_hidden;

var button_cov4             = document.createElement( 'button' );
button_cov4.style.cssText   = get_css(20,270,0xFF0000);
button_cov4.textContent     = '[6]';
button_cov4.onclick = function(){
    Cover4ColorIndex = check_color( Cover4ColorIndex + 1 );
    set_color( button_cov4, ColorTable[Cover4ColorIndex], 'Link_Cover_4R.stl', 20, 270 );
    set_color( button_cov4, ColorTable[Cover4ColorIndex], 'Link_Cover_4L.stl', 20, 270 );
};
button_cov4.hidden          = ui_hidden;

var button_link4        = document.createElement( 'button' );
var button_link4_top    = 20;
var button_link4_left   = 320;
if( window.innerWidth < 300 ){
    button_link4_top    += 50;
    button_link4_left   -= 300;
}
button_link4.style.cssText  = get_css(button_link4_top,button_link4_left,0xEEEEEE);
button_link4.textContent    = '[7]';
button_link4.onclick = function(){
    Link4ColorIndex = check_color( Link4ColorIndex + 1 );
    set_color( button_link4, ColorTable[Link4ColorIndex], 'Link4.stl', button_link4_top, button_link4_left );
};
button_link4.hidden         = ui_hidden;

var button_link5        = document.createElement( 'button' );
var button_link5_top    = 20;
var button_link5_left   = 370;
if( window.innerWidth < 300 ){
    button_link5_top    += 50;
    button_link5_left   -= 300;
}
button_link5.style.cssText  = get_css(button_link5_top,button_link5_left,0xEEEEEE);
button_link5.textContent    = '[8]';
button_link5.onclick = function(){
    Link5ColorIndex = check_color( Link5ColorIndex + 1 );
    set_color( button_link5, ColorTable[Link5ColorIndex], 'Link5.stl', button_link5_top, button_link5_left );
};
button_link5.hidden         = ui_hidden;

var button_cov5         = document.createElement( 'button' );
var button_cov5_top     = 20;
var button_cov5_left    = 420;
if( window.innerWidth < 300 ){
    button_cov5_top     += 50;
    button_cov5_left    -= 300;
}
button_cov5.style.cssText   = get_css(button_cov5_top,button_cov5_left,0xEEEEEE);
button_cov5.textContent     = '[9]';
button_cov5.onclick = function(){
    Cover5ColorIndex = check_color( Cover5ColorIndex + 1 );
    set_color( button_cov5, RabbitColorTable[Cover5ColorIndex], 'Logo_Rabbit_L.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, RabbitColorTable[Cover5ColorIndex], 'Logo_Rabbit_R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5,   TextColorTable[Cover5ColorIndex],   'Logo_Text_L.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5,   TextColorTable[Cover5ColorIndex],   'Logo_Text_R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5,       ColorTable[Cover5ColorIndex], 'Link_Cover_5R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5,       ColorTable[Cover5ColorIndex], 'Link_Cover_5L.stl', button_cov5_top, button_cov5_left );
};
button_cov5.hidden = true;

var button_link6        = document.createElement( 'button' );
var button_link6_top    = 20;
var button_link6_left   = 470;
if( window.innerWidth < 300 ){
    button_link6_top    += 50;
    button_link6_left   -= 300;
}
button_link6.style.cssText  = get_css(button_link6_top,button_link6_left,0xEEEEEE);
button_link6.textContent    = '[10]';
button_link6.onclick = function(){
    Link6ColorIndex = check_color( Link6ColorIndex + 1 );
    set_color( button_link6, ColorTable[Link6ColorIndex], 'Link6.stl', button_link6_top, button_link6_left );
};
button_link6.hidden         = ui_hidden;

var button_link7        = document.createElement( 'button' );
var button_link7_top    = 20;
var button_link7_left   = 530;
if( window.innerWidth < 300 ){
    button_link7_top    += 50;
    button_link7_left   -= 300;
}
button_link7.style.cssText  = get_css(button_link7_top,button_link7_left,0xFF0000);
button_link7.textContent    = '[11]';
button_link7.onclick = function(){
    Link7ColorIndex = check_color( Link7ColorIndex + 1 );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'Link7.stl', button_link7_top, button_link7_left );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'HandA.stl', button_link7_top, button_link7_left );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'HandB.stl', button_link7_top, button_link7_left );
};
button_link7.hidden         = ui_hidden;

var button_pause            = document.createElement( 'pause' );
var button_pause_top        = 70;
var button_pause_left       = 20;
var button_pause_text       = '@';
button_pause.style.cssText  = get_css(button_pause_top,button_pause_left,0xEEEEEE);
button_pause.textContent    = button_pause_text;
button_pause.onclick = function(){
    player.pauseRotation();
    if( button_pause_text == '@' ){
        button_pause_text = '-';
    }else{
        button_pause_text = '@';
    }
    button_pause.textContent = button_pause_text;
}
button_pause.hidden         = ui_hidden;

var color_select            = document.createElement('div');
color_select.setAttribute('class', 'select');
color_select.setAttribute('id','color');
color_select.appendChild(button_base);
color_select.appendChild(button_link1);
color_select.appendChild(button_cov2);
color_select.appendChild(button_link2);
color_select.appendChild(button_link3);
color_select.appendChild(button_cov4);
color_select.appendChild(button_link4);
color_select.appendChild(button_link5);
color_select.appendChild(button_link6);
color_select.appendChild(button_link7);
color_select.appendChild(button_pause);
color_select.style.cssText  = get_css_form(form_pos, 20, 0xEEEEEE);

var div_shift_base          = document.createElement('div');
div_shift_base.setAttribute('id','open1');
div_shift_base.setAttribute('style','display:none;clear:both;');
div_shift_base.appendChild( color_select );
document.body.appendChild( div_shift_base );
