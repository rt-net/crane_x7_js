/*
é¿ã@Ç∆ÇÃê⁄ë±Ç∆ìÆçÏ
*/
var button_on   = document.createElement( 'button' );
button_on.setAttribute('id', 'on');
button_on.textContent   = 'ON';
button_on.hidden        = ui_hidden;
button_on.onclick       = function(){
    button_copy_text            = 'copy';
    button_copy.textContent     = button_copy_text;
}

var button_off  = document.createElement( 'button' );
button_off.setAttribute('id', 'off');
button_off.textContent  = 'OFF';
button_off.hidden       = ui_hidden;
button_off.onclick      = function(){
}

var button_set  = document.createElement( 'button' );
button_set.setAttribute('id', 'set');
button_set.textContent      = 'SET';
button_set.setAttribute('val',ref_data);
button_set.onclick          = function(){
    $('[id=set]'    ).attr('disabled',true);
    $('[id=on]'     ).attr('disabled',true);
    $('[id=off]'    ).attr('disabled',true);
    $('[id=move]'   ).attr('disabled',true);
    var data = [Link1RotIndex, Link2RotIndex, Link3RotIndex, Link4RotIndex, Link5RotIndex, Link6RotIndex, Link7RotIndex, Link8RotIndex];
    button_set.setAttribute('val',data);
}
button_set.hidden           = ui_hidden;

var button_copy = document.createElement( 'button' );
button_copy.setAttribute('id', 'copy');
var button_copy_text        = 'copy'
button_copy.textContent     = button_copy_text;
button_copy.onclick         = function(){
    if( button_copy_text == 'copying' ){
        button_copy_text = 'copy';
    }else{
        button_copy_text = 'copying';
    }
    button_copy.textContent = button_copy_text;
}
button_copy.hidden          = ui_hidden;

var button_send = document.createElement( 'button' );
button_send.setAttribute('id', 'send');
button_send.textContent     = 'connect';
var port_connect            = 0;
button_send.onclick         = function(){
    port_connect            = 1;
    button_send.textContent = 'connected';
    console.log('send port');
}
button_send.hidden          = ui_hidden;

var port_div    = document.createElement('div');
port_div.style.cssText  = 'display: block';

var text_label  = document.createElement('label');
text_label.textContent      = 'port:'
text_label.style.cssText    = 'display: inline;';
var dev_textbox = document.createElement( 'input' );
dev_textbox.setAttribute('value','/dev/ttyUSB0');
dev_textbox.setAttribute('id','dev');

var fig_shift   = document.createElement('div');
var fig         = document.createElement('a');
var shift_img   = document.createElement('img');
shift_img.setAttribute('type','image');
shift_img.setAttribute('src','js/img/send.png');
shift_img.setAttribute('alt','send');
shift_img.setAttribute('width','35');
shift_img.setAttribute('height','35');
fig_shift.appendChild(shift_img);
var fig_shift_top       = 20;
var fig_shift_left      = 260;
fig_shift.style.cssText = get_css_base(fig_shift_top, fig_shift_left);
fig_shift.onclick       = function(){
    obj                             = document.getElementById('open3').style;
    obj.display                     = (obj.display=='none')?'inline':'none';
    fig_shift.style.backgroundColor = (obj.display=='none')?'#EEEEEE':'#CCCCCC';
    if(obj.display === 'none'){
        send_obj_pos = parseInt(document.getElementById('send_fig').style.top);
        form_position(send_obj_pos, send_form);
        diff_pos    -= send_form;
    }else{
        div_fig.style.cssText = get_css_form(form_pos+diff_pos, 20, 0xEEEEEE);
        diff_pos += send_form;
    }
}
fig_shift.appendChild(fig);
document.body.appendChild(fig_shift);

var copy_move = document.createElement('input');
copy_move.setAttribute('id','copy_move');
copy_move.setAttribute('type','image');
copy_move.setAttribute('src','js/img/move.png');
copy_move.setAttribute('alt','MOVE');
copy_move.setAttribute('width','35');
copy_move.setAttribute('height','35');
copy_move.style.cssText = 'vertical-align: top; display: inline;';

var copybox = document.createElement('INPUT');
copybox.setAttribute('type','checkbox');
copybox.setAttribute('id','copybox');
copybox.setAttribute('value','copybox');
copybox.style.cssText = 'outline: none; -webkit-appearance: none;';

var label = document.createElement('label');
label.setAttribute('for','copybox');
var img = document.createElement('img');
img.setAttribute('id','label_image');
img.setAttribute('src','js/img/log.png');
img.setAttribute('width','35');
img.setAttribute('height','35');
label.appendChild(img);

img.onclick = function(){
    var state = document.getElementById('copybox').checked; 
    if(state)
        img.setAttribute('src','js/img/log.png');
    else
        img.setAttribute('src','js/img/out.png');
}

var reset_button = document.createElement('button');
reset_button.setAttribute('id','reset');
reset_button.textContent    = 'RESET';
reset_button.onclick        = function(){
    set_start();
}

var copy_div = document.createElement('div');
copy_div.style.cssText = 'display: block';

port_div.appendChild( text_label );
port_div.appendChild( dev_textbox );

copy_div.appendChild( copy_move );
copy_div.appendChild( copybox );
copy_div.appendChild( label );

var div_fig = document.createElement('div');
div_fig.setAttribute('class','fig');
div_fig.setAttribute('id','send_fig');
div_fig.appendChild( port_div );
div_fig.appendChild( button_copy );
div_fig.appendChild( button_send );
div_fig.appendChild( button_set );
div_fig.appendChild( button_on );
div_fig.appendChild( button_off );
div_fig.appendChild( copy_div );
div_fig.appendChild( reset_button );
div_fig.style.cssText = get_css_form(form_pos, 20, 0xEEEEEE);
document.body.appendChild(div_fig);

var fig_tab = document.createElement('div');
fig_tab.setAttribute('id','open3');
fig_tab.setAttribute('style','display:none;clear:both;');
fig_tab.appendChild(div_fig);
document.body.appendChild(fig_tab);
