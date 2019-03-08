function select_html()
{
	var div = document.createElement('div');
	div.setAttribute("class","select");
	
	var label = document.createElement('label');
	label.setAttribute("for","select");
	label.textContent = "slot:";
	label.style.cssText = 'vertical-align: middle; display: inline;';
	
	var button1 = document.createElement('button');
	button1.setAttribute("id","slot");
	button1.setAttribute("value","1");
	button1.textContent = "1";
	button1.style.cssText = 'vertical-align: middle; display: inline; padding: 2px 11px; background-color: #CCCCCC;';
	
	var button2 = document.createElement('button');
	button2.setAttribute("id","slot");
	button2.setAttribute("value","2");
	button2.textContent = "2";
	button2.style.cssText = 'vertical-align: middle; display: inline;';
	
	var button3 = document.createElement('button');
	button3.setAttribute("id","slot");
	button3.setAttribute("value","3");
	button3.textContent = "3";
	button3.style.cssText = 'vertical-align: middle; display: inline;';
	
	var all_selected = document.createElement('button');
	all_selected.setAttribute("id","slot");
	all_selected.textContent = "ALL";
	all_selected.style.cssText = 'vertical-align: middle; display: inline;';
	
	var button_save = document.createElement('button');
	button_save.setAttribute("id","save");
	button_save.textContent = "SAVE";
	button_save.style.cssText = 'vertical-align: middle; display: inline;';

	var button_move = document.createElement( 'input' );
	button_move.setAttribute("id", "move");
	button_move.setAttribute("type","image");
	button_move.setAttribute("src","js/img/move.png");
	button_move.setAttribute("alt","MOVE");
	button_move.setAttribute("width","35");
	button_move.setAttribute("height","35");
	button_move.style.cssText = "vertical-align: top; display: inline;";

	var button_reset = document.createElement( 'button' );
	button_reset.style.cssText = 'margin-left: 10px; vertical-align: bottom; display: inline;';
	button_reset.textContent = '#';
	button_reset.setAttribute("id", "reset");
	button_reset.onclick = function() {
		player.resetRotation();
		set_start();
	}

	var list_select_flag = 1;
	var text_list = document.createElement('select');
	text_list.setAttribute("multiple","multiple");
	text_list.setAttribute("id", "select");
	text_list.setAttribute("size", "3");
	$.get('js/data/out1.txt',function(data){
		data = data.split(/,|\n/);
		var step = data[0];
		for(var i=1; i<=data.length;i++){
			if(i%8 == 0){
				$('#select').append($('<option>').html("ROT:"+step).val(step));
				step = [];
			}else{
				step = step + ",";
			}
			step = step + data[i];
		}
	});
	text_list.style.cssText = 'vertical-align: middle; display: block;';
	text_list.onchange = function() {
		var input = $('#select > option:selected').val();
		if($('#select > option:selected').size() == 1){ list_select_flag = 1; }
		else{ list_select_flag = 0; }
		var buf = input.split(",");
		set_rot_data(buf);
		set_range(buf);
	}

	var button_clip = document.createElement( 'button' );
	button_clip.setAttribute("id", "clip");
	button_clip.style.cssText = 'vertical-align: middle; display: inline;';
	button_clip.textContent = 'clip';
	button_clip.onclick = function() {
		data = get_rot_data();
		button_clip.setAttribute("val",data);
		if($('#select > option:selected').size())
			$('#select > option:selected').html("ROT:"+data).val(data);
		else 
			$('#select').append($('<option>').html("ROT:"+data).val(data));
	}
	button_clip.hidden = ui_hidden;

	var button_clear = document.createElement( 'button' );
	button_clear.setAttribute("id", "clear");
	button_clear.style.cssText = "vertical-align: middle; display: inline;";
	button_clear.textContent = 'DEL';

	var div_loop = document.createElement('div');
	div_loop.setAttribute("class","loop");
	div_loop.style.cssText = 'vertical-align: top; display: inline-block;';
	var label = document.createElement('label');
	label.setAttribute("for","loop");
	label.textContent = "loop";
	label.style.cssText = 'vertical-align: top; display: block;';
	var checkbox = document.createElement('INPUT');
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("id","loop");
	checkbox.setAttribute("value","loop");
	checkbox.style.cssText = 'display: block;';

	div.appendChild( label );
	div.appendChild( button1 );
	div.appendChild( button2 );
	div.appendChild( button3 );
	div.appendChild( button_reset );
	div.appendChild( button_move );
	
	div_loop.appendChild( label );
	div_loop.appendChild( checkbox );
	div.appendChild( div_loop );
	div.appendChild( text_list );
	div.appendChild( button_clear );
	div.appendChild( all_selected );
	div.appendChild( button_clip );
	div.appendChild( button_save );

	div.style.cssText = get_css_module(460,20);

	document.body.appendChild( div );
	$(".select").on('click touchend', function(event){
		if(!$(event.target).closest(text_list).length && !$(event.target).closest(all_selected).length && !$(event.target).closest(button_move).length && !$(event.target).closest(div_loop).length){
			$("#select option").attr("selected", false);
		}
	});
	button1.onclick = function()
	{
		button1.style.cssText = "padding: 2px 11px; background-color: #CCCCCC;";
		button2.style.cssText = "background-color: ;";
		button3.style.cssText = "background-color: ;";
		$('#select').children().remove();
		$('#slot').val(1);
		$.get('js/data/out1.txt',function(data){
			data = data.split(/,|\n/);
			var step = data[0];
			for(var i=1; i<=data.length;i++){
				if(i%8 == 0){
					$('#select').append($('<option>').html("ROT:"+step).val(step));
					step = [];
				}else{
					step = step + ",";
				}
				step = step + data[i];
			}
		});
	}
	button2.onclick = function()
	{
		button1.style.cssText = "background-color: ;";
		button2.style.cssText = "padding: 2px 11px; background-color: #CCCCCC;";
		button3.style.cssText = "background-color: ;";
		$('#slot').val(2);
		$('#select').children().remove();
		$.get('js/data/out2.txt',function(data){
			data = data.split(/,|\n/);
			var step = data[0];
			for(var i=1; i<=data.length;i++){
				if(i%8 == 0){
					$('#select').append($('<option>').html("ROT:"+step).val(step));
					step = [];
				}else{
					step = step + ",";
				}
				step = step + data[i];
			}
		});
	}
	button3.onclick = function()
	{
		button1.style.cssText = "background-color: ;";
		button2.style.cssText = "background-color: ;";
		button3.style.cssText = "padding: 2px 11px; background-color: #CCCCCC;";
		$('#slot').val(3);
		$('#select').children().remove();
		$.get('js/data/out3.txt',function(data){
			data = data.split(/,|\n/);
			var step = data[0];
			for(var i=1; i<=data.length;i++){
				if(i%8 == 0){
					$('#select').append($('<option>').html("ROT:"+step).val(step));
					step = [];
				}else{
					step = step + ",";
				}
				step = step + data[i];
			}
		});
	}
	button_move.onclick = function()
	{
		//$(this).prop('disabled',true);
		$('[id=set]').attr('disabled',true);
		$('[id=on]').attr('disabled',true);
		$('[id=off]').attr('disabled',true);
		$('[id=move]').attr('disabled',true);
		button_copy_text = 'copy';
		button_copy.textContent = button_copy_text;
		var input = $('[id=select]').val();
	}
	all_selected.onclick = function()
	{
		var len = $("#select").children().length;
		$("#select option").attr("selected",true);
		$("#select option").prop("selected",true);
	}
	button_save.onclick = function()
	{
		var input = $("#select").val();
	}
	$(window).keydown(function(e)
	{
		if(e.keyCode == 46)
			$('#select > option:selected').remove();
		else if(65 < e.keyCode && e.keyCode < 90)
			servoOFF();
	});
	button_clear.onclick = function()
	{
		$('#select > option:selected').remove();
	}
}

select_html();
