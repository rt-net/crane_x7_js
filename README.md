# CRANE_X7_JS

CRANE_X7をWebブラウザで動かせるソフト

## 開発環境

- OS: Linux Ubuntu 16.04 64bit
- ブラウザ: Firefox 61.0.1 64bit

## nodeのインストール

本プログラムは[Node.js](https://nodejs.org/ja/)を使用しています。  
[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)を使ってインストールするか、ソースからインストールします。

### nodebrewを使ってインストール

[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)はNode.jsのバージョン管理ツールです。パッケージマネージャのようにNode.jsのバージョンを切り替えて使うことができます。  
nodebrewを使ってNode.js: 8.11.3 LTSをインストールする方法は以下の通りです。

``` 
$ sudo apt-get -y install curl
$ curl -L git.io/nodebrew | perl - setup
$ echo "export PATH=\$HOME/.nodebrew/current/bin:\$PATH" >> ~/.bashrc
$ export PATH=$HOME/.nodebrew/current/bin:$PATH
$ nodebrew install-binary v8.11.3
$ nodebrew use v8.11.3
```

### ソースからインストール

Node.js: 8.11.3 LTSを[node-v8.11.3 source](https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz)からインストールする方法は以下の通りです。

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

本リポジトリを `git clone` コマンドでダウンロードします。

```
$ git clone https://github.com/rt-net/CRANE_X7_JS.git 
```

### npmパッケージのインストール

本プログラムで使用する以下の4つのnpmパッケージをインストールします。

- serialport
- socket.io
- express
- async

```
$ cd crane_x7_js/CRANE_X7_JS
$ npm install
```

コマンドを実行することで、必要なパッケージをインストールできます。

## 起動方法

### プログラムの実行

```
$ npm start
```

### Webサーバに接続

ブラウザを開いて [`http://localhost:8080/`](http://localhost:8080/) にアクセス、又はターミナル画面の[`http://localhost:8080/`](http://localhost:8080/)を右クリックするとCRANE_X7_JSが起動します。
指定のIPアドレスに接続することでアプリケーションが起動します。

![screenshot from 2019-03-08 14-31-00](https://user-images.githubusercontent.com/12367951/54010996-3d4ebd80-41b4-11e9-888c-3a59b645d5f9.png)
![screenshot from 2019-03-08 14-31-15](https://user-images.githubusercontent.com/12367951/54010999-3f188100-41b4-11e9-96c3-32d2352dd74f.png)

## 使用方法 各種操作説明
各ボタンを押すと要素が開きます。
### モデル変更 `color`
![color](https://user-images.githubusercontent.com/12367951/54011810-2fe70280-41b7-11e9-8e4b-dc8157d9a602.png)
#### 色変更
 最上部(1~11)が各リンクの色を変更できます。

#### モデル回転
 `@`はモデルの回転

### ジョイント操作 `range`
![54171118-a425ec80-44bc-11e9-92a5-7f1afc662f1b_](https://user-images.githubusercontent.com/12367951/54171622-61651400-44be-11e9-8a97-7ea57b66a071.jpg)
#### モデル操作
 `スライドバー`を動かすことで対応する関節が動きます。


### モーション作成
![54171118-a425ec80-44bc-11e9-92a5-7f1afc662f1b_1](https://user-images.githubusercontent.com/12367951/54171606-498d9000-44be-11e9-8626-9323362e7efc.jpg)  

 `1,2,3`はデータスロットとなっていて3種類のモーションを保存 
 
 `#`:モデルが初期姿勢になる     
 `再生`:選択したデータを再生(**実機のトルクがONの場合実機が動作します**)   
 `loop`:チェックボックスにチェックすると、モーションをループ   
 ボックス内には、保存したデータが表示   
  `DEL`:選択したデータの削除(Delキーでも可能)   
  `ALL`:ボックス内のデータを全選択   
  `clip`:現在の姿勢をデータに追加(選択状態のデータに上書き可能)   
  `SAVE`:対応するスロットにデータを保存   

## 実機動作 `send`
### 実機に関して
[`CRANE-X7 カラー検討ページ`](https://www.rt-net.jp/CRANE-X7/index.html)

### デバイス接続

デバイスを接続して、別端末を開いて、以下の操作を行います。

- デバイスが認識されているか確認します。

```
$ ls /dev/ttyUSB*  
ttyUSB0
```

- 接続されたデバイスに書き込み読み込みの権限を渡します。

```
$ sudo chmod a+rw /dev/ttyUSB0
```

### 実機接続

1. USB接続
    USBポートに[U2D2](https://www.rt-shop.jp/index.php?main_page=product_info&products_id=3618)などのUSB通信コンバータを接続、電源も入れてください。  
1. `connect` ボタンを押すと実機と接続   
接続切断後はサーバを再起動して下さい.

### 実機動作
![54171115-a2f4bf80-44bc-11e9-9c6e-b9ed1459db73](https://user-images.githubusercontent.com/12367951/54171540-0af7d580-44be-11e9-8742-c170717445f0.png)
`copy`を押すと、`coping`に変わり実機の姿勢をトレース   
`SET`:実機が画面上のモデルと同じ姿勢に移動   
`ON`:トルクON  
`OFF`:トルクOFF    
**実機のトルクがONの場合実機が動作します**   

## 注意事項

__baudrate,IDの書き換えを行った場合、USBケーブルを抜いてデバイスの再接続を行ってください__   
__緊急停止としてキー入力(特殊キー抜く)を行うとトルクがOFFになります__

## License

This repository is licensed under the Apache License Version 2.0, see [LICENSE](./LICENSE).

このリポジトリはApache License Version 2.0で公開されています。詳細は[LICENSE](./LICENSE)を確認してください。
