# CRANE_X7_JS

CRANE_X7をNode.js,three.jsを使用してWebブラウザで動作できるサンプルです.   

## 開発環境

- OS: Linux Ubuntu 16.04 64bit
- ブラウザ: Firefox 61.0.1 64bit

## nodeのインストール

本プログラムは[Node.js](https://nodejs.org/ja/)を使用しています.   
[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)を使ってインストールするか、ソースからインストールします.   

### nodebrewを使ってインストール

[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)はNode.jsのバージョン管理ツールです。パッケージマネージャのようにNode.jsのバージョンを切り替えて使うことができます.     
nodebrewを使ってNode.js: 8.11.3 LTSをインストールする方法は以下の通りです.   

``` 
$ sudo apt-get -y install curl
$ curl -L git.io/nodebrew | perl - setup
$ echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bashrc
$ export PATH=$HOME/.nodebrew/current/bin:$PATH
$ nodebrew install-binary v8.11.3
$ nodebrew use v8.11.3
```

### ソースからインストール

Node.js: 8.11.3 LTSを[node-v8.11.3 source](https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz)からインストールする方法は以下の通りです.   

``` 
$ wget https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz
$ tar xvf node-v8.11.3.tar.gz
$ cd node-v8.11.3
$ ./configure
$ make
$ sudo make install
```

## パッケージのインストール

### CRANE_X7_JSリポジトリのclone

本リポジトリを `git clone` コマンドでダウンロードします.   

```
$ git clone https://github.com/rt-net/CRANE_X7_JS.git 
```

### npmパッケージのインストール

本プログラムで使用する以下の4つのnpmパッケージをインストールします.   

- serialport
- socket.io
- express
- async

```
$ cd crane_x7_js/CRANE_X7_JS
$ npm install
```

コマンドを実行することで、必要なパッケージをインストールできます.   

## 起動方法

### プログラムの実行
以下、コマンドを実行して、Webサーバを起動します.   
```
$ npm start   
http://****:8080
```

### Webサーバに接続

端末に表示されるIPアドレス`http://****:8080`にブラウザから接続するとCRANE_X7のシミュレータ画面が表示されます.    
この画面で動作の作成などが行えます.   

![window_image](https://github.com/rt-net/crane_x7_js/blob/image/img/window_image.png)
![window](https://github.com/rt-net/crane_x7_js/blob/image/img/window.png)

## 使用方法 各種操作説明
各ボタンを押すと要素が開きます.   
### モデル変更 `color`
![color](https://github.com/rt-net/crane_x7_js/blob/image/img/color.png)
#### 色変更
 最上部(1~11)が各リンクの色を変更できます.

#### モデル回転
 `@`でモデルが回転します.   

### ジョイント操作 `range`
![range](https://github.com/rt-net/crane_x7_js/blob/image/img/range.jpg)   
#### モデル操作
 `スライドバー`を動かすことで対応する関節が動きます.


### モーション作成
![slot](https://github.com/rt-net/crane_x7_js/blob/image/img/slot.jpg)     

 - `1,2,3`はデータスロットとなっていて3種類のモーションを保存 
 
 - `#`:モデルが初期姿勢に変化     
 - `再生`:選択したデータを再生(**実機のトルクがONの場合実機が動作します**)   
 - `loop`:チェックボックスにチェックすると、モーションをループ   
          ボックス内には、保存したデータが表示   
 - `DEL`:選択したデータの削除(Delキーでも可能)   
 - `ALL`:ボックス内のデータを全選択   
 - `clip`:現在の姿勢をデータに追加(選択状態のデータに上書き可能)   
 - `SAVE`:対応するスロットにデータを保存   
 
 データを選択して再生することで、ブラウザ及び実機で動作確認することが可能です.   
 
 ![slot](https://github.com/rt-net/crane_x7_js/blob/image/img/demo.gif) 

## 実機動作 `send`
### 実機に関して
ブラウザで作成した動作を実機で動作させることができます.   
実機は[CRANE-X7の製品ページ](https://www.rt-net.jp/products/crane-x7)を確認して下さい.   
[![x7](https://www.rt-net.jp/wp-content/uploads/2018/06/img_crane-x7-06-768x768.png)](https://www.rt-net.jp/products/crane-x7)

### 実機接続確認

デバイスを接続して、別端末を開いて、以下の操作を行います.   

- USB接続   
    [SMPS2Dynamixel](http://www.robotis-shop-jp.com/?act=shop_jp.goods_view&GS=1267&GC=GD0C0102)などの電源基盤と[U2D2](https://www.rt-shop.jp/index.php?main_page=product_info&products_id=3618)などのUSB通信コンバータを接続し、電源を入れて、USBポートに接続して下さい.      

- デバイスが認識されているか確認   

```
$ ls /dev/ttyUSB*  
ttyUSB0
```

- 接続されたデバイスの書き込み読み込み権限を設定   

```
$ sudo chmod a+rw /dev/ttyUSB0
```

- `connect` ボタンを押すと実機と接続  
接続が完了すると`connected`に変わります.   
接続切断後はサーバを再起動して下さい.

### 実機動作
![send](https://github.com/rt-net/crane_x7_js/blob/image/img/send.png)   
- `copy`を押すと、`coping`に変わり実機の姿勢をトレース   
- `SET`:実機が画面上のモデルと同じ姿勢に移動   
- `ON`:トルクON  
- `OFF`:トルクOFF    
**実機のトルクがONの場合実機が動作します**   

## 注意事項
  
__緊急停止としてキー入力(特殊キー抜く)を行うとトルクがOFFになります__

## License

This repository is licensed under the Apache License Version 2.0, see [LICENSE](./LICENSE).

このリポジトリはApache License Version 2.0で公開されています。詳細は[LICENSE](./LICENSE)を確認してください。
