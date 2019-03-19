var SerialPort = require('serialport');

var port;
var portconnect = 0;

exports.sendserialport = function(){
    dev = '/dev/ttyUSB0';
    port = new SerialPort(dev, {
        baudRate:3000000
    });
    if(port != null){
        portconnect = 1;
        console.log('port connect');
    }
}

exports.makedata = function(val){
    var pos =  deg2value(Number(val));
    return pos;
}

exports.makepacket = function(val, len){
    var data = Buffer.alloc(len);
    switch(len){
        case '1':
            data[0] = val;
    return data;
            break;
        case '2':
            data[0] = LOBYTE(val);
            data[1] = HIBYTE(val);
    return data;
            break;
        case '4':
            data[0] = LOBYTE(LOWORD(deg2value(val)));
            data[1] = HIBYTE(LOWORD(deg2value(val)));
            data[2] = LOBYTE(HIWORD(deg2value(val)));
            data[3] = HIBYTE(HIWORD(deg2value(val)));
    return data;
            break;
    }
}

function updateCRC(s)
{
  var i;
  var crc_table = [0x0000,
  0x8005, 0x800F, 0x000A, 0x801B, 0x001E, 0x0014, 0x8011,
  0x8033, 0x0036, 0x003C, 0x8039, 0x0028, 0x802D, 0x8027,
  0x0022, 0x8063, 0x0066, 0x006C, 0x8069, 0x0078, 0x807D,
  0x8077, 0x0072, 0x0050, 0x8055, 0x805F, 0x005A, 0x804B,
  0x004E, 0x0044, 0x8041, 0x80C3, 0x00C6, 0x00CC, 0x80C9,
  0x00D8, 0x80DD, 0x80D7, 0x00D2, 0x00F0, 0x80F5, 0x80FF,
  0x00FA, 0x80EB, 0x00EE, 0x00E4, 0x80E1, 0x00A0, 0x80A5,
  0x80AF, 0x00AA, 0x80BB, 0x00BE, 0x00B4, 0x80B1, 0x8093,
  0x0096, 0x009C, 0x8099, 0x0088, 0x808D, 0x8087, 0x0082,
  0x8183, 0x0186, 0x018C, 0x8189, 0x0198, 0x819D, 0x8197,
  0x0192, 0x01B0, 0x81B5, 0x81BF, 0x01BA, 0x81AB, 0x01AE,
  0x01A4, 0x81A1, 0x01E0, 0x81E5, 0x81EF, 0x01EA, 0x81FB,
  0x01FE, 0x01F4, 0x81F1, 0x81D3, 0x01D6, 0x01DC, 0x81D9,
  0x01C8, 0x81CD, 0x81C7, 0x01C2, 0x0140, 0x8145, 0x814F,
  0x014A, 0x815B, 0x015E, 0x0154, 0x8151, 0x8173, 0x0176,
  0x017C, 0x8179, 0x0168, 0x816D, 0x8167, 0x0162, 0x8123,
  0x0126, 0x012C, 0x8129, 0x0138, 0x813D, 0x8137, 0x0132,
  0x0110, 0x8115, 0x811F, 0x011A, 0x810B, 0x010E, 0x0104,
  0x8101, 0x8303, 0x0306, 0x030C, 0x8309, 0x0318, 0x831D,
  0x8317, 0x0312, 0x0330, 0x8335, 0x833F, 0x033A, 0x832B,
  0x032E, 0x0324, 0x8321, 0x0360, 0x8365, 0x836F, 0x036A,
  0x837B, 0x037E, 0x0374, 0x8371, 0x8353, 0x0356, 0x035C,
  0x8359, 0x0348, 0x834D, 0x8347, 0x0342, 0x03C0, 0x83C5,
  0x83CF, 0x03CA, 0x83DB, 0x03DE, 0x03D4, 0x83D1, 0x83F3,
  0x03F6, 0x03FC, 0x83F9, 0x03E8, 0x83ED, 0x83E7, 0x03E2,
  0x83A3, 0x03A6, 0x03AC, 0x83A9, 0x03B8, 0x83BD, 0x83B7,
  0x03B2, 0x0390, 0x8395, 0x839F, 0x039A, 0x838B, 0x038E,
  0x0384, 0x8381, 0x0280, 0x8285, 0x828F, 0x028A, 0x829B,
  0x029E, 0x0294, 0x8291, 0x82B3, 0x02B6, 0x02BC, 0x82B9,
  0x02A8, 0x82AD, 0x82A7, 0x02A2, 0x82E3, 0x02E6, 0x02EC,
  0x82E9, 0x02F8, 0x82FD, 0x82F7, 0x02F2, 0x02D0, 0x82D5,
  0x82DF, 0x02DA, 0x82CB, 0x02CE, 0x02C4, 0x82C1, 0x8243,
  0x0246, 0x024C, 0x8249, 0x0258, 0x825D, 0x8257, 0x0252,
  0x0270, 0x8275, 0x827F, 0x027A, 0x826B, 0x026E, 0x0264,
  0x8261, 0x0220, 0x8225, 0x822F, 0x022A, 0x823B, 0x023E,
  0x0234, 0x8231, 0x8213, 0x0216, 0x021C, 0x8219, 0x0208,
  0x820D, 0x8207, 0x0202 ];

  var crc = 0;

  for (var j = 0; j < s.length-2; j++)
  {
    i = ((crc >> 8) ^ s[j]) & 0xFF;
    crc = (crc << 8) ^ crc_table[i];
  }
  return ((crc ^ 0) & 0xFFFF);
}

function LOBYTE(w)
{
    return w & 0xff;
}

function HIBYTE(w)
{
    return (w >> 8) & 0xff;
}

function LOWORD(l)
{
    return l & 0xffff;
}

function HIWORD(l)
{
    return (l >> 16) & 0xffff;
}

function MAKEWORD(a,b)
{
    return ((a) | ((b) << 8));
}

function MAKEDWORD(a,b)
{
    return ((a) | ((b) << 16));
}

function deg2value(deg)
{
    var value = 0;
    value = (180 + Number(deg)) * 4096 / 360;
    return value;
}

function value2deg(value)
{
    return value * 360 / 4096 - 180;
}

exports.pingPacket = function(ID){
    var txpacket = Buffer.alloc(10);
    var rxpacket = Buffer.alloc(14);

    txpacket[4] = ID;
    txpacket[5] = 0x03;
    txpacket[6] = 0x00;
    txpacket[7] = 0x01;

    txPacket(txpacket);
}

exports.writeTxPacket = function(ID, address, length, val){
    var total_packet = 12 + length;
    var txpacket = Buffer.alloc(total_packet);
    var data = Buffer.alloc(length);
    switch(length){
        case 1:
            data[0] = val;
            break;
        case 2:
            data[0] = LOBYTE(val);
            data[1] = HIBYTE(val);
            break;
        case 4:
            data[0] = LOBYTE(LOWORD(val));
            data[1] = HIBYTE(LOWORD(val));
            data[2] = LOBYTE(HIWORD(val));
            data[3] = HIBYTE(HIWORD(val));
            break;
    }

    txpacket[4] = ID;
    txpacket[5] = LOBYTE(length+5);
    txpacket[6] = HIBYTE(length+5);
    txpacket[7] = 0x03;
    txpacket[8] = LOBYTE(address);
    txpacket[9] = HIBYTE(address);

    for(var s=0; s < length; s++)
        txpacket[10+Number(s)] = data[s];

    txPacket(txpacket);
}

function txPacket(txpacket)
{
    txpacket[0] = 0xFF;
    txpacket[1] = 0xFF;
    txpacket[2] = 0xFD;
    txpacket[3] = 0x00;

    var crc = updateCRC(txpacket);
    txpacket[txpacket.length - 2] = LOBYTE(crc);
    txpacket[txpacket.length - 1] = HIBYTE(crc);

    write(txpacket); 
}

function write(buf) {
    if(portconnect == 1){
        port.write( buf, function(err, results) {
            if(err) {
                console.log('Err: ' + err);
                console.log('Results: ' + results);
            }
        });
    }
}

exports.readRxPacket = function(ID, address, length, callback){
    var txpacket = Buffer.alloc(14);

    txpacket[4] = ID;
    txpacket[5] = 7;
    txpacket[6] = 0;
    txpacket[7] = 0x02;
    txpacket[8] = LOBYTE(address);
    txpacket[9] = HIBYTE(address);
    txpacket[10] = LOBYTE(length);
    txpacket[11] = HIBYTE(length);

    txPacket(txpacket);
}

var ref=[];
var deg_list=[];
exports.rxPacket = function(id, length, callback)
{
	if(portconnect == 1){
	port.once('data', function(input){
		port.setMaxListeners(100);
        var inputdata = Buffer(input);
        var dpacket = inputdata.length;
		if(dpacket != length) {
			return;
		}

        var data;
		if(id == inputdata[dpacket-11]){ 
                ref[id] = MAKEDWORD(MAKEWORD(inputdata[dpacket-6], inputdata[dpacket-5]), MAKEWORD(inputdata[dpacket-4], inputdata[dpacket-3]));
                deg = value2deg(ref[id]);
				callback(deg);
		}else{
			for(i=1;i<9;i++){
				dpacket = 15*i;
                ref[i-1] = MAKEDWORD(MAKEWORD(inputdata[dpacket-6], inputdata[dpacket-5]), MAKEWORD(inputdata[dpacket-4], inputdata[dpacket-3]));
                deg_list[i-1] = value2deg(ref[i-1]);
			}
			callback(deg_list);
		}
		port.removeListener('data',function(input){
			input = null;
			port = null;
		});
    });
	}else if(portconnect == 0){
		callback(0);
	}
}

function servo_list(inputdata){
    var packet_num = inputdata.length / 14;
    var id_list = [];
    for(var i=0;i<packet_num;i++){
        var id = inputdata[4 + (14 * i)];
        id_list.push(id);
    }
    return id_list;
}

var id_list_ = [];
var address_list_ = [];
var length_list_ = [];
var data_list_ = [];

function bulkWriteTxOnly( param, param_length){
    var txpacket = Buffer.alloc(param_length + 10);

    txpacket[4] = 254;
    txpacket[5] = LOBYTE(param_length + 3);
    txpacket[6] = HIBYTE(param_length + 3);
    txpacket[7] = 0x93;

    for(var s=0; s<param_length; s++)
        txpacket[8+s] = param[s];

    txPacket(txpacket);
}

function makeParam(){
    var param_length = 0;
    for(var i=0; i<id_list_.length; i++)
        param_length += 1 + 2 + 2 + length_list_[id_list_[i]];

    var param = Buffer.alloc(param_length);

    var idx = 0;
	var id = [];
	id_list_.length = 8;
    for(var i=0; i<id_list_.length; i++){
		 id = id_list_[i];

        param[idx++] = id;
        param[idx++] = LOBYTE(address_list_[id]);
        param[idx++] = HIBYTE(address_list_[id]);
        param[idx++] = LOBYTE(length_list_[id]);
        param[idx++] = HIBYTE(length_list_[id]);
        for(var c=0; c<length_list_[id]; c++){
            param[idx++] = data_list_[id][c];
		}
    }
    bulkWriteTxOnly(param, param_length);
}

var id_list_ = Buffer.alloc(0);
var address_list_ = Buffer.alloc(0);
var length_list_ = Buffer.alloc(0);
var data_list_ = Buffer.alloc(0);

module.exports.addParam = function(ID, address, length, val){
	id_list_.push(ID);
    address_list_[ID] = address;
    length_list_[ID] = length;
    data_list_[ID] = [];
    var data = Buffer(length);
    switch(length){
        case 1:
            data[0] = val;
            break;
        case 2:
            data[0] = LOBYTE(val);
            data[1] = HIBYTE(val);
            break;
        case 4:
            data[0] = LOBYTE(LOWORD(deg2value(val)));
            data[1] = HIBYTE(LOWORD(deg2value(val)));
            data[2] = LOBYTE(HIWORD(deg2value(val)));
            data[3] = HIBYTE(HIWORD(deg2value(val)));
            break;
    }
    for(var i=0; i<length; i++){
        data_list_[ID][i] = data[i];
	}
}

module.exports.clearParam = function(){
    id_list_ = [];
    address_list_ = [];
    length_list_ = [];
    data_list_ = [];
}

module.exports.bulkwriteTxPacket = function(){
    makeParam();
}

function syncmakeParam(){
	var param = Buffer.alloc(8);
	for(var i = 0; i < param.length; i++){
		param[i] = i+2;
	}
	return param;
}

exports.syncreadRxPacket = function(address, length, callback){
    var txpacket = Buffer.alloc(14+8);

    txpacket[4] = 0xFE;
    txpacket[5] = 7+8;
    txpacket[6] = 0x00;
    txpacket[7] = 0x82;
    txpacket[8] = LOBYTE(address);
    txpacket[9] = HIBYTE(address);
    txpacket[10] = LOBYTE(length);
    txpacket[11] = HIBYTE(length);

	var list = syncmakeParam();
	for(var i=1;i<list.length+1;i++){
		txpacket[11+i] = list[i-1];
	}

    txPacket(txpacket);
}

