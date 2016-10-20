function loadSection(name) {//jsonファイルを基にカードを生成
  $.getJSON(name, function　createCard(data){
    $(".mdl-layout__content").empty();
      for(var i in data){
      $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p class='e_w'>"
                                        + data[i].e_word + "</p><p class='j_w'>" + data[i].j_word + "</p></div>");
      componentHandler.upgradeDom();
      }
  });
}

function　createCard(data){//データを直接渡しカードを生成
  $(".mdl-layout__content").empty();
    for(var i in data){
    $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p class='e_w'>"
                                      + data[i].e_word + "</p><p class='j_w'>" + data[i].j_word + "</p></div>");
    componentHandler.upgradeDom();
    }
  }

function splitByLine(text_name) {
  var text  = document.getElementById(text_name).value.replace(/\r\n|\r/g, "\n");
  var lines = text.split( '\n' );
  var outArray = new Array();

  for ( var i = 0; i < lines.length; i++ ) {
      // 空行は無視する
      if ( lines[i] == '' ) {
          continue;
      }
      outArray.push( lines[i] );
  }
  return outArray;
}

function createJson(){//Jsonファイルを作成

  var data = [];
  english_words = splitByLine('english');
  japanese_words = splitByLine('japanese');

  for(i = 0; i < english_words.length && i < japanese_words.length; i++){
    data[i] = {"e_word": "",
                "j_word": ""}

    data[i].e_word = english_words[i];
    data[i].j_word = japanese_words[i];
  }

  data = JSON.stringify(data);  //objectを文字列に変換する関数
  var blob = new Blob([data], {type : "text/json"});
  var file_title;
 // if(document.querySelector('#textbox_1').value != ''){　//textbox_1に何も入力されていないと実行できないようにするif文
  file_title = document.getElementById("title").value + ".json"; //ここを書き換えることでダウンロードリンクのタイトルが変わる
// }
 if(file_title == ".json"){
   file_title = "your_english_words.json"
 }
  if(window.navigator.msSaveBlob){
    window.navigator.msSaveBlob(blob, file_title);
    window.navigator.msSaveOrOpenBlob(blob, file_title);
  }
  else
  {
    window.URL = window.URL || window.webkitURL;
    var links = document.querySelector(".form");
    var temp = document.createElement("a");
    temp.innerHTML = file_title;
    temp.href = window.URL.createObjectURL(blob);
    temp.setAttribute("class", "download_link");
    temp.setAttribute("download", file_title);
    links.appendChild(temp);
  }
  // componentHandler.upgradeDom();
}

function createForm(){//Exportフォーム
    $(".mdl-layout__content").empty();
    $(".mdl-layout__content").append('<div class="form">以下に英語とそれの日本語訳を記入し自分のフラッシュカードを作成できます<br>\
                                        保存するタイトル名：<input type="text" id="title" name="title">\
                                        </br>\
                                        <textarea name="english" id="english" rows="25" cols="30"></textarea>\
                                        <textarea name="japanese" id="japanese" rows="25" cols="30"></textarea>\
                                        </br>\
                                        <a href="#" onClick=createJson()>ダウンロードリンクの生成</br></div>');
    componentHandler.upgradeDom();
}


function chooseJson() {
  $(".mdl-layout__content").empty();
  $(".mdl-layout__content").append('<div class="form"><input type="file" name="name" value="" id="file_1"></br>\
                                    <a href="#" onClick="loadJson();">決定</a></div>');
  componentHandler.upgradeDom();
}

function loadJson(){
  var inp_file = document.querySelector('#file_1').files[0];  //ファイルフォームのidをここに指定
  var reader = new FileReader();
  reader.addEventListener('load',function (e){
    var file_data = reader.result;
    file_data = JSON.parse(file_data);
    createCard(file_data);
    //オブジェクトを配列に書き換える処理なので、いるなら使ってやってください
    // file_data = $.map(file_data, function(val, key) { return val; });

    //これでfile_dataにオブジェクトが追加されてるんで、このカッコの中で画面に描画する処理をしてください。

    // console.log(file_data); //ほら。読めてるでしょ？

  }, true);
  reader.readAsText(inp_file);
}

function dFocus(){
  $('.mdl-layout__obfuscator').trigger("click");
};

$(document).ready(function(){
  loadSection('./json/practice_1.json');
});

$('.e_card').live('click',function(){

  if ($(".j_w",this).is(':hidden')){
    $(".j_w",this).css("display","block");
  }else{
    $(".j_w",this).css("display","none");
  }
});
