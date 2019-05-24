/**
 * @author Riki Hayashi
 * @copyright 2019 RikiHayashi
 * @license http://www.apache.org/licenses/license-2.0 Apache-2.0
 */

var express =   require('express');
var app     =   express();

var http    =   require('http').Server(app);
var async   =   require('async');
var serial  =   require('./serial.js');

var fs      =   require('fs');
var io      =   require('socket.io')(http);

var os      =   require('os');

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__diname + '/index.html');
});

var state = {
    on      :   0,
    off     :   0,
    send    :   0,
    set     :   0,
    move    :   0,
    copy    :   0
};
var copy_data = String();
fs.appendFileSync('copy.txt','0');

io.on('connection', function(socket){
    console.log('connected');
    socket.setMaxListeners(50);
    socket.on('disconnect', function(){
        console.log('disconnect');
    });
    socket.emit('state',state);

    socket.on('send', function(ref){
        state   =   ref;
        io.emit('state',state);
    });

    socket.on('command', function(data){
        serial.clearParam();
        switch(data.value){
            case 'on':  //トルクON
                for(var id=2;id<=9;id++)
                    serial.addParam(id,64,1,'1');
                serial.bulkwriteTxPacket();
                break;
            case 'off': //トルクOFF
                for(var id=2;id<=9;id++)
                    serial.addParam(id,64,1,'0');
                serial.bulkwriteTxPacket();
                break;
            case 'set': //サーボに角度送信
                var deg     =   new String(data.deg);
                deg         =   deg.split(',');
                for(var id=2;id<=9;id++)
                        serial.addParam(id,116,4,deg[id-2]);
                serial.bulkwriteTxPacket();
                break;
            case 'move': //point-to-pointのデータ保存
                var text    =   new String();
                if(data.deg == null)break;

                for(var i=0; i < data.deg.length; i++){
                    text += String(data.deg[i] + '\n');
                }
                var slot    =   'data/' + 'out'+data.num+'.txt';
                fs.writeFileSync(slot,text);
                break;
            case 'copy': //サーボの角度取得と教示再生データの管理
                async.series([
                    function(callback){
                        serial.syncreadRxPacket(132, 4);
                        callback(null);
                    },
                    function(callback){
                        serial.rxPacket(0, 120, function(result){
                            var text = String();
                            if(!data.num){
                                if(state.copy){
                                    fs.appendFile('copy.txt',copy_data,function(err){
                                        if(err){
                                            console.log('append err');
                                            throw err;
                                        }
                                    });
                                }
                            }else{
                                if(!state.copy){
                                    fs.unlink('copy.txt', function(err){
                                        copy_data = String();
                                        if(err){
                                            console.log('unlink err');
                                            throw err;
                                        }
                                    });
                                }
                                copy_data += String(result + '\n');
                            }
                            state.copy = data.num;
                            socket.emit('read', result);
                        });
                        callback(null);
                    }]);
                break;
            case 'send':
                if(!state.send) serial.sendserialport(data.num);
                break;
        }
    });
});

var ip_port = getLocalAddress().ipv4;
http.listen(8080,ip_port, function(){
    console.log('port * : 8080');
    console.log('http://' + ip_port +':8080');
});

//ipアドレスの取得
function getLocalAddress() {
    var ifacesObj   =   {};
    ifacesObj.ipv4;
    ifacesObj.ipv6;
    var interfaces  =   os.networkInterfaces();

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
    if(ifacesObj.ipv4 == undefined) ifacesObj.ipv4 = 'localhost';
    return ifacesObj;
};

