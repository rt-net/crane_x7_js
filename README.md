# CRANE_X7_JS

CRANE_X7をNode.js,three.jsを使用してWebブラウザで動作できるサンプルです.   

## 開発環境

- OS: Linux Ubuntu 16.04 64bit
- ブラウザ: Firefox 61.0.1 64bit
- Node.js: v10.16.0
- npm: v6.9.0
- three.js: r97

## 動作確認済みブラウザ
- Firefox: 67.0
- Google Chrom: 69.0.3497.100（Official Build） （64 ビット）
- Vivaldi: 2.1.1337.36 (Stable channel) (64-bit)

## nodeのインストール

本プログラムは[Node.js](https://nodejs.org/ja/)を使用しています.   

nodeのインストール方法として,
[nodesource/distributions](https://github.com/nodesource/distributions/blob/master/README.md)と[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)を使ったインストール方法を記載します.   


- ### nodesource/distributionsでインストール

Node.js: 10.16.0 をapt でインストールする.   
```
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt install nodejs
```

- ### nodebrewを使ってインストール

[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)はNode.jsのバージョン管理ツールです。パッケージマネージャのようにNode.jsのバージョンを切り替えて使うことができます.     

``` 
$ sudo apt install curl
$ curl -L git.io/nodebrew | perl - setup
$ echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bashrc
$ source ~/.bashrc
```

nodebrewを使ってNode.js: 10.16.0 をインストールする方法は以下の通りです.   
```
$ nodebrew install v10.16.0
$ nodebrew use v10.16.0
```

## パッケージのインストール

### CRANE_X7_JSリポジトリのclone

本リポジトリを `git clone` コマンドでダウンロードします.   

```
$ git clone https://github.com/rt-net/crane_x7_js.git 
```

### npmパッケージのインストール

本プログラムで使用する以下の6つのnpmパッケージをインストールします.   

- serialport: ^7.0.2
- socket.io: ^2.2.0
- express: ^4.16.4
- async: ^2.6.1
- three: ^0.106.2
- jquery: ^3.4.1

```
$ cd crane_x7_js/CRANE_X7_JS
$ npm install
```

コマンドを実行することで、必要なパッケージをインストールできます.   

## 起動方法

### プログラムの実行
以下、コマンドを実行して、Webサーバを起動します.   
```
$ cd crane_x7_js/CRANE_X7_JS
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
### <img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/color.png" width="50px">:[モデル変更]

![color](https://github.com/rt-net/crane_x7_js/blob/image/img/color.png)
#### 色変更
 最上部(1~11)が各リンクの色を変更できます.

#### モデル回転
 `@`でモデルが回転します.   
 
### <img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/range.png" width="50px">:[ジョイント操作]
![range](https://github.com/rt-net/crane_x7_js/blob/image/img/range.png)   
#### モデル操作
 `スライドバー`を動かすことで対応する関節が動きます.

### <img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/slot.png" width="50px">:[モーション作成]
![slot](https://github.com/rt-net/crane_x7_js/blob/image/img/slot.png)     

 - `1,2,3`はデータスロットとなっていて3種類のモーションを保存 
 
 - `#`:モデルが初期姿勢に変化     
 - `再生`<img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/move.png" width="20px">
:選択したデータを再生(**実機のトルクがONの場合実機が動作します**)   
 - `loop`:チェックボックスにチェックすると、モーションをループ   
          ボックス内には、保存したデータが表示   
 - `DEL`:選択したデータの削除(Delキーでも可能)   
 - `ALL`:ボックス内のデータを全選択   
 - `clip`:現在の姿勢をデータに追加(選択状態のデータに上書き可能)   
 - `SAVE`:対応するスロットにデータを保存   
 
 データを選択して再生することで、ブラウザ及び実機で動作確認することが可能です.   
 
 ![slot](https://github.com/rt-net/crane_x7_js/blob/image/img/demo.gif) 
 
## <img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/send.png" width="50px">:[実機動作]
### 実機に関して
ブラウザで作成した動作を実機で動作させることができます.   
実機は[CRANE-X7の製品ページ](https://www.rt-net.jp/products/crane-x7)を確認して下さい.   
[![x7](https://www.rt-net.jp/wp-content/uploads/2018/06/img_crane-x7-06-768x768.png)](https://www.rt-net.jp/products/crane-x7)

### 実機接続確認

デバイスを接続して、別端末を開いて、以下の操作を行います.   

- USB接続   
    [SMPS2Dynamixel](https://www.rt-shop.jp/index.php?main_page=product_info&cPath=1348_5&products_id=523)などの電源基板と[U2D2](https://www.rt-shop.jp/index.php?main_page=product_info&products_id=3618)などのUSB通信コンバータを接続し、電源を入れて、USBポートに接続して下さい.      

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
- `port`にport名を入力することで特定のデバイスに接続可能   
- `copy`を押すと、`coping`に変わり実機の姿勢をトレース   
- `SET`:実機が画面上のモデルと同じ姿勢に移動   
- `ON`:トルクON  
- `OFF`:トルクOFF    
- `再生`<img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/move.png" width="20px">:教示保存したデータを再生
- `教示`<img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/log.png" width="20px">:実機でトレースした動きを保存
- `RESET`:ブラウザ上のモデルを初期姿勢に変更   

**実機のトルクがONの場合実機が動作します**   
## 教示再生手順
1. 実機をトルクOFF状態にし、`copy`を実行
2. `coping`状態中に、教示ボタン<img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/log.png" width="20px">を押すことで動作の保存を開始
3. もう一度教示ボタン<img src="https://github.com/rt-net/crane_x7_js/blob/master/CRANE_X7_JS/js/img/out.png" width="20px">を押すことで動作の保存を終了
4. 再生を押すことで、教示した動作を実行   
5. 実機をトルクON状態にし、再生を押すことで実際に実機が教示した動作を実行

[デモ](https://youtu.be/3mZW4eVuI-c)

## 注意事項

__緊急停止としてキー入力(a\~zA\~Z)を行うとトルクがOFFになります__

## License

This repository is licensed under the Apache License Version 2.0, see [LICENSE](./LICENSE).

このリポジトリはApache License Version 2.0で公開されています。詳細は[LICENSE](./LICENSE)を確認してください。
