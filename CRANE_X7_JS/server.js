var express	=	require('express');
var app		=	express();

var http	=	require('http').Server(app);
var async	=	require('async');
var serial	=	require('./serial.js');

var fs		=	require('fs');
var io		=	require('socket.io')(http);

var os		=	require('os');

app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.sendFile(__diname + '/index.html');
});

var state = {
	on	:	0,
	off	:	0,
	send	:	0,
	set	:	0,
	move	:	0
};

io.on('connection', function(socket){
	console.log('connected');
	socket.setMaxListeners(50);
	socket.on('disconnect', function(){
		console.log('disconnect');
	});
	socket.emit('state',state);

	socket.on('send', function(ref){
		state	=	ref;
		io.emit('state',state);
	});
	
	socket.on('command', function(data){
		serial.clearParam();
		switch(data.value){
			case 'on':
				for(var id=2;id<=9;id++)
					serial.addParam(id,64,1,'1');
				serial.bulkwriteTxPacket();
				break;
			case 'off':
				for(var id=2;id<=9;id++)
					serial.addParam(id,64,1,'0');
				serial.bulkwriteTxPacket();
				break;
			case 'set':
				var deg		=	new String(data.deg);
				deg			=	deg.split(',');
				for(var id=2;id<=9;id++)
						serial.addParam(id,116,4,deg[id-2]);
				serial.bulkwriteTxPacket();
				break;
			case 'move':
				var text	=	new String();
				if(data.deg == null)break;
				for(var i=0; i < data.deg.length; i++){
					text += String(data.deg[i] + '\n');
				}
				var slot	=	'data/' + 'out'+data.num+'.txt';
				fs.writeFileSync(slot,text);
			case 'copy':
				async.series([
					function(callback){
						serial.syncreadRxPacket(132, 4);
						callback(null);
					},
					function(callback){
						serial.rxPacket(0, 120, function(result){
							socket.emit('read', result);
						});
						callback(null);
					}]);
				break;
			case 'send':
				if(!state.send) serial.sendserialport();
				break;
		}
	});
});

//var ip_port = getLocalAddress().ipv4;
var ip_port = 'localhost';
http.listen(8080,ip_port, function(){
	console.log('port * : 8080');
	console.log('http://' + ip_port +':8080');
});

function getLocalAddress() {
	var ifacesObj	=	{};
	ifacesObj.ipv4;
	ifacesObj.ipv6;
	var interfaces	=	os.networkInterfaces();

	for(var dev in interfaces){
		interfaces[dev].forEach(function(details){
			if(!details.internal){
				switch(details.family){
					case 'IPv4':
						ifacesObj.ipv4 = details.address;
						break;
					case 'IPv6':
						ifacesObj.ipv6 = details.address;
						break;
				}
			}
		});
	}
	return ifacesObj;
};

