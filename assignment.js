function loadSection(num) {
    $.getJSON("practice_" + num + ".json", function(data){
      $(".mdl-layout__content").empty();
        for(var i in data){
        $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p class='e_w'>"
                                          + data[i].e_word + "</p><p class='j_w'>" + data[i].j_word + "</p></div>");
        componentHandler.upgradeDom();
        }
    });
};

function createJson(){
  $(".mdl-layout__content").empty();
  $(".mdl-layout__content").append("<div class='j_form'><p>未実装です</p></div>");
  componentHandler.upgradeDom();
}

function dFocus(){
  $('.mdl-layout__obfuscator').trigger("click");
};

$(document).ready(function(){
  loadSection(1);
});

$('.e_card').live('click',function(){

  if ($(".j_w",this).is(':hidden')){
    $(".j_w",this).css("display","block");
  }else{
    $(".j_w",this).css("display","none");
  }
});
