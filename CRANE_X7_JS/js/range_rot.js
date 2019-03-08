var div_shift_select = document.createElement('div');
div_shift_select.setAttribute("id","open2");
div_shift_select.setAttribute("style","display:none;clear:both;");
document.body.appendChild( div_shift_select );

function range_html(id, max_range, min_range, RotIndex, style_top, style_left)
{
	var div = document.createElement('div');
	div.setAttribute("class","link"+id);
	var label = document.createElement('label');
	if(id == 8)
		label.textContent = "[E]";
	else
		label.textContent = "[" + id + "]";

	label.style.cssText = 'vertical-align: middle; display: table-cell;';
	var range = document.createElement('INPUT');
	range.setAttribute("id","link"+id);
	range.setAttribute("type","range");
	range.setAttribute("min", min_range);
	range.setAttribute("max", max_range);
	range.setAttribute("value", RotIndex);
	var target = document.getElementById('value');
	var rangeValue = function (range, target) {
		return function(evt){
			set_data(id-1, this.value);
		}
	}
	range.addEventListener('input', rangeValue(range, target));
	range.hidden = ui_hidden;
	div.appendChild( label );
	div.appendChild( range );
	div.style.cssText = get_css_range(style_top,style_left);
	document.body.appendChild( div );
	div_shift_select.appendChild(div);
}

var div_select_shift = document.createElement('div');
var select_shift = document.createElement('a');
select_shift.setAttribute("style","cursor: pointer;");
select_shift.textContent = 'range';
var div_select_shift_top = 510;
var div_select_shift_left = 300;
div_select_shift.style.cssText = get_css_base(div_select_shift_top, div_select_shift_left);
div_select_shift.onclick = function(){
	obj=document.getElementById('open2').style; 
	obj.display=(obj.display=='none')?'inline':'none';
	div_select_shift.style.backgroundColor = (obj.display=='none')?'#EEEEEE':'#CCCCCC';
}
div_select_shift.appendChild(select_shift);
document.body.appendChild(div_select_shift);

var range_link1 = range_html(1, 157, -157, Link1RotIndex, 120, 20);
var range_link2 = range_html(2,  90,  -90, Link2RotIndex, 155, 20);
var range_link3 = range_html(3, 157, -157, Link3RotIndex, 190, 20);
var range_link4 = range_html(4,   0, -145, Link4RotIndex, 225, 20);
var range_link5 = range_html(5, 157, -157, Link5RotIndex, 260, 20);
var range_link6 = range_html(6,  90,  -90, Link6RotIndex, 295, 20);
var range_link7 = range_html(7, 160, -160, Link7RotIndex, 330, 20);
var range_link8 = range_html(8,  90,    0, Link8RotIndex, 365, 20);
