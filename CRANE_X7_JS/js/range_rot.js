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
関節角度変更スライドバー
*/
var div_select_shift    = document.createElement('div');
var select_shift        = document.createElement('a');
var shift_img           = document.createElement('img');
shift_img.setAttribute('type','image');
shift_img.setAttribute('src','js/img/range.png');
shift_img.setAttribute('alt','range');
shift_img.setAttribute('width','35');
shift_img.setAttribute('height','35');
div_select_shift.appendChild(shift_img);
var div_select_shift_top        = 20;
var div_select_shift_left       = 100;
div_select_shift.style.cssText  = get_css_base(div_select_shift_top, div_select_shift_left);
div_select_shift.onclick        = function(){
    obj=document.getElementById('open2').style; 
    obj.display=(obj.display=='none')?'inline':'none';
    div_select_shift.style.backgroundColor = (obj.display=='none')?'#EEEEEE':'#CCCCCC';
    if(obj.display === 'none'){
        range_obj_pos = parseInt(document.getElementById('range_obj').style.top);
        form_position(range_obj_pos, range_form);
        diff_pos -= range_form;
    }else{
        main_div.style.cssText = get_css_form(form_pos+diff_pos, 20, 0xEEEEEE);
        diff_pos += range_form;
    }
}
div_select_shift.appendChild(select_shift);
document.body.appendChild(div_select_shift);

var main_div = document.createElement('div');
main_div.setAttribute('class','select');
main_div.setAttribute('id','range_obj');

//スライドバーのform作成
function range_html(id, max_range, min_range, RotIndex, style_top, style_left)
{
    var div     = document.createElement('div');
    div.setAttribute('class','link'+id);
    var label   = document.createElement('label');
    if(id == 8)
        label.textContent = '[E]';
    else
        label.textContent = '[' + id + ']';

    label.style.cssText = 'vertical-align: middle; display: table-cell;';
    var range           = document.createElement('INPUT');
    range.setAttribute('id','link'+id);
    range.setAttribute('type','range');
    range.setAttribute('min', min_range);
    range.setAttribute('max', max_range);
    range.setAttribute('value', RotIndex);
    var target      = document.getElementById('value');
    var rangeValue  = function (range, target) {
        return function(evt){
            set_data(id-1, this.value);
        }
    }
    range.addEventListener('input', rangeValue(range, target));
    range.hidden        = ui_hidden;
    div.appendChild( label );
    div.appendChild( range );
    div.style.cssText   = 'display: table;';

    main_div.appendChild(div);
}
main_div.style.cssText = get_css_form(form_pos, 20, 0xEEEEEE);

var range_link1 = range_html(1, 157, -157, Link1RotIndex, 120, 20);
var range_link2 = range_html(2,  90,  -90, Link2RotIndex, 155, 20);
var range_link3 = range_html(3, 157, -157, Link3RotIndex, 190, 20);
var range_link4 = range_html(4,   0, -145, Link4RotIndex, 225, 20);
var range_link5 = range_html(5, 157, -157, Link5RotIndex, 260, 20);
var range_link6 = range_html(6,  90,  -90, Link6RotIndex, 295, 20);
var range_link7 = range_html(7, 160, -160, Link7RotIndex, 330, 20);
var range_link8 = range_html(8,  90,    0, Link8RotIndex, 365, 20);

var div_shift_select = document.createElement('div');
div_shift_select.setAttribute('id','open2');
div_shift_select.setAttribute('style','display:none;clear:both;');
div_shift_select.appendChild( main_div );
document.body.appendChild( div_shift_select );
