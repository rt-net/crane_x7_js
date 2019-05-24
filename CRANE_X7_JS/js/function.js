/**
 * @author Riki Hayashi
 * @copyright 2019 RikiHayashi
 * @license http://www.apache.org/licenses/license-2.0 Apache-2.0
 */
//モデルの色変更
function set_color( element, color, name, top, left ){
    if( is_loaded ){
        player.setObjColor(name, color);
    }
    element.style.cssText = get_css(top,left,color);
}

//モデルの各関節の変更
function set_rotate( rot, deg, name ){
    rotate      = [0,0,0];
    rotate[0]   = deg * 3.1415 / 180;   //回転軸
    rotate[2]   = rot;                  //回転角度
    if( is_loaded ){
        player.setObjRot(name, rotate);
    }
}

function check_color( color ){
    if( color >= ColorTable.length ){
        color = 0;
    }
    return color;
}

function check_rot( rot ){
    return 3.1415 * rot / 180;
}

function rot_check( rot ){
    return 180 * rot / 3.1415;
}

function get_color_index( color, no ){
    return Math.round( Math.floor((color / Math.pow(10,no)) % 10));
}

function get_color_text(){
    var result = String(Link7ColorIndex) + String(Link6ColorIndex) + String(Cover5ColorIndex)
                    + String(Link5ColorIndex) + String(Link4ColorIndex) + String(Cover4ColorIndex)
                    + String(Link3ColorIndex) + String(Link2ColorIndex) + String(Cover2ColorIndex)
                    + String(Link1ColorIndex) + String(BaseColorIndex);
    return result;
}

//画面サイズによるformの再配置
function button_replace(){
    button_link5_top    = 20;
    button_link5_left   = 370;
    if( window.innerWidth < 550 ){
        button_link5_top    += 50;
        button_link5_left   -= 350;
    }
    set_color( button_link5, ColorTable[Link5ColorIndex], 'Link5.stl', button_link5_top, button_link5_left );

    button_cov5_top     = 20;
    button_cov5_left    = 420;
    if( window.innerWidth < 550 ){
        button_cov5_top     += 50;
        button_cov5_left    -= 300;
    }
    set_color( button_cov5, ColorTable[Cover5ColorIndex], 'Link_Cover_5R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, ColorTable[Cover5ColorIndex], 'Link_Cover_5L.stl', button_cov5_top, button_cov5_left );

    button_link6_top    = 20;
    button_link6_left   = 470;
    if( window.innerWidth < 550 ){
        button_link6_top    += 50;
        button_link6_left   -= 350;
    }
    set_color( button_link6, ColorTable[Link6ColorIndex], 'Link6.stl', button_link6_top, button_link6_left );

    button_link7_top    = 20;
    button_link7_left   = 530;
    if( window.innerWidth < 550 ){
        button_link7_top    += 50;
        button_link7_left   -= 350;
    }
    set_color( button_link7, ColorTable[Link7ColorIndex], 'Link7.stl', button_link7_top, button_link7_left );

    button_pause_top    = 70;
    button_pause_left   = 20;
    if( window.innerWidth < 550 ){
        button_pause_left   += 230;
    }
    button_pause.style.cssText = get_css(button_pause_top,button_pause_left,0xEEEEEE);
}

//隠れformの表示順の制御
function form_position(pos, diff){
    color_obj   = parseInt(document.getElementById('color'      ).style.top);
    range_obj   = parseInt(document.getElementById('range_obj'  ).style.top);
    slot_obj    = parseInt(document.getElementById('slot_list'  ).style.top);
    send_obj    = parseInt(document.getElementById('send_fig'   ).style.top);

    if( pos < color_obj) color_obj -= diff;
    if( pos < range_obj) range_obj -= diff;
    if( pos < slot_obj) slot_obj -= diff;
    if( pos < send_obj) send_obj -= diff;

    color_select.style.cssText  = get_css_form(color_obj, 20, 0xEEEEEE);
    main_div.style.cssText      = get_css_form(range_obj, 20, 0xEEEEEE);
    div.style.cssText           = get_css_module(slot_obj,20);
    div_fig.style.cssText       = get_css_form(send_obj, 20, 0xEEEEEE);
}

//各関節毎を動かす
function set_data(i, num){
    ref_data[i] = num;
    set_rot_data(ref_data);
    set_range(ref_data);
}

//全関節を動かす
function set_list(num){
    ref_data = num;
    set_rot_data(ref_data);
    set_range(ref_data);
}

//モデルの姿勢初期化
function set_start() {
    var start_data = [0,45,0,-135,0,-65,0,0];
        set_rot_data(start_data);
        set_range(start_data);
}

window.onresize = function () {
    button_replace();
}

window.onload = function() {
    set_start();
    button_replace();
}

//モデルから関節の角度を取得
function get_rot_data() {
    var get_data;
    get_data = [
            Math.round(rot_check(player.getObjRot('Link1.stl').z)),
            Math.round(rot_check(player.getObjRot('Link2.stl').z)),
            Math.round(rot_check(player.getObjRot('Link3.stl').z)),
            Math.round(rot_check(player.getObjRot('Link4.stl').z)),
            Math.round(rot_check(player.getObjRot('Link5.stl').z)),
            Math.round(rot_check(player.getObjRot('Link6.stl').z)),
            Math.round(rot_check(player.getObjRot('Link7.stl').z)),
            Math.round(rot_check(player.getObjRot('HandA.stl').z))
        ]
    return get_data;
}

//角度情報をモデルに適応
function set_rot_data(data) {
    if(data[3] < -145)data[3] = -145;   //limit angle
    Link1RotIndex = data[0];  //Z
    Link2RotIndex = data[1];  //Y 45
    Link3RotIndex = data[2];  //Z
    Link4RotIndex = data[3];  //Y -135
    Link5RotIndex = data[4];  //Z
    Link6RotIndex = data[5];  //Y -65
    Link7RotIndex = data[6];  //Z
    Link8RotIndex = data[7];  //Z
    set_rotate( check_rot(Link1RotIndex),   0, 'Link1.stl');
    set_rotate( check_rot(Link2RotIndex),  90, 'Link2.stl');
    set_rotate( check_rot(Link3RotIndex), -90, 'Link3.stl');
    set_rotate( check_rot(Link4RotIndex),  90, 'Link4.stl');
    set_rotate( check_rot(Link5RotIndex), -90, 'Link5.stl');
    set_rotate( check_rot(Link6RotIndex),  90, 'Link6.stl');
    set_rotate( check_rot(Link7RotIndex), -90, 'Link7.stl');
    set_rotate( check_rot(Link8RotIndex),  90, 'HandA.stl');
    set_rotate(-check_rot(Link8RotIndex),  90, 'HandB.stl');
}

//角度情報をスライドバーに適応
function set_range(buf){
    document.getElementById('link1').value = buf[0];
    document.getElementById('link2').value = buf[1];
    document.getElementById('link3').value = buf[2];
    document.getElementById('link4').value = buf[3];
    document.getElementById('link5').value = buf[4];
    document.getElementById('link6').value = buf[5];
    document.getElementById('link7').value = buf[6];
    document.getElementById('link8').value = buf[7];
    ref_data = buf;
}

function set_color_all( color_code ) {

    var result = String(Link7ColorIndex)
    + String(Link6ColorIndex)
    + String(Cover5ColorIndex)
    + String(Link5ColorIndex)
    + String(Link4ColorIndex)
    + String(Cover4ColorIndex)
    + String(Link3ColorIndex)
    + String(Link2ColorIndex)
    + String(Cover2ColorIndex)
    + String(Link1ColorIndex)
    + String(BaseColorIndex);
    // init color
    BaseColorIndex = check_color( get_color_index( parseInt(color_code,10), 0 ) );
    set_color( button_base, ColorTable[BaseColorIndex], 'Base.stl', 20, 20 );
    Link1ColorIndex = check_color( get_color_index( parseInt(color_code,10), 1 ) );
    set_color( button_link1, ColorTable[Link1ColorIndex], 'Link1.stl', 20, 70 );
    Cover2ColorIndex = check_color( get_color_index( parseInt(color_code,10), 2 ) );
    set_color( button_cov2, ColorTable[Cover2ColorIndex], 'Link_Cover_2R.stl', 20, 120 );
    set_color( button_cov2, ColorTable[Cover2ColorIndex], 'Link_Cover_2L.stl', 20, 120 );
    Link2ColorIndex = check_color( get_color_index( parseInt(color_code,10), 3 ) );
    set_color( button_link2, ColorTable[Link2ColorIndex], 'Link2.stl', 20, 170 );
    Link3ColorIndex = check_color( get_color_index( parseInt(color_code,10), 4 ) );
    set_color( button_link3, ColorTable[Link3ColorIndex], 'Link3.stl', 20, 220 );
    Cover4ColorIndex = check_color( get_color_index( parseInt(color_code,10), 5 ) );
    set_color( button_cov4, ColorTable[Cover4ColorIndex], 'Link_Cover_4R.stl', 20, 270 );
    set_color( button_cov4, ColorTable[Cover4ColorIndex], 'Link_Cover_4L.stl', 20, 270 );
    Link4ColorIndex = check_color( get_color_index( parseInt(color_code,10), 6 ) );
    set_color( button_link4, ColorTable[Link4ColorIndex], 'Link4.stl', button_link4_top, button_link4_left );
    Link5ColorIndex = check_color( get_color_index( parseInt(color_code,10), 7 ) );
    set_color( button_link5, ColorTable[Link5ColorIndex], 'Link5.stl', button_link5_top, button_link5_left );
    Cover5ColorIndex = check_color( get_color_index( parseInt(color_code,10), 8 ) );
    set_color( button_cov5, RabbitColorTable[Cover5ColorIndex], 'Logo_Rabbit_L.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, RabbitColorTable[Cover5ColorIndex], 'Logo_Rabbit_R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, TextColorTable[Cover5ColorIndex], 'Logo_Text_L.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, TextColorTable[Cover5ColorIndex], 'Logo_Text_R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, ColorTable[Cover5ColorIndex], 'Link_Cover_5R.stl', button_cov5_top, button_cov5_left );
    set_color( button_cov5, ColorTable[Cover5ColorIndex], 'Link_Cover_5L.stl', button_cov5_top, button_cov5_left );
    Link6ColorIndex = check_color( get_color_index( parseInt(color_code,10), 9 ) );
    set_color( button_link6, ColorTable[Link6ColorIndex], 'Link6.stl', button_link6_top, button_link6_left );
    Link7ColorIndex = check_color( get_color_index( parseInt(color_code,10), 10 ) );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'Link7.stl', button_link7_top, button_link7_left );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'HandA.stl', button_link7_top, button_link7_left );
    set_color( button_link7, ColorTable[Link7ColorIndex], 'HandB.stl', button_link7_top, button_link7_left );
}
