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

function createJson(){//Jsonファイルを作成

  var data = {  //このdataに突っ込んでください♡
    "a": "aaa",
    "b": "bbb"
  };
  data = JSON.stringify(data);  //objectを文字列に変換する関数
  var blob = new Blob([data], {type : "text/json"});
  var file_title;
 // if(document.querySelector('#textbox_1').value != ''){　//textbox_1に何も入力されていないと実行できないようにするif文
    file_title = "your_english_words" //ここを書き換えることでダウンロードリンクのタイトルが変わる
// }
 // if(file_title != undefined){  //ファイルタイトルが何も入力されていなかった場合、実行できなくする
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

function createForm(){
    $(".mdl-layout__content").empty();
    // var data= '[\
    //             {\
    //               "e_word":"respect…" ,\
    //               "j_word":"…を尊敬する"\
    //             },\
    //             {\
    //                "e_word":"will" ,\
    //                "j_word":"意思"\
    //             },\
    //             {\
    //               "e_word":"individual" ,\
    //               "j_word":"個人"\
    //             },\
    //             {\
    //               "e_word":"Take it easy.",\
    //               "j_word":"気楽にやれ"\
    //             },\
    //             {\
    //               "e_word":"assure A (that) ~",\
    //               "j_word":"Aに~を確約する"\
    //             },\
    //             {\
    //               "e_word":"turn out (to be)…",\
    //               "j_word":"…という結果になる"\
    //             }\
    //           ]'
    $(".mdl-layout__content").append('<div class="form">以下に英語とそれの日本語訳を記入し自分のフラッシュカードを作成できます<br>\
                                        <textarea name="japanese" id="japanese" rows="25"></textarea>\
                                        <textarea name="english" id="english" rows="25"></textarea>\
                                        </br>\
                                        <a href="#" onClick=createJson()>ダウンロードリンクの生成</button></div>');
    componentHandler.upgradeDom();
}


function chooseJson() {
  $(".mdl-layout__content").empty();
  $(".mdl-layout__content").append('<div class="form"><input type="file" name="name" value="" id="file_1">\
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
