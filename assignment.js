function loadSection(num) {
    $.getJSON("practice_" + num + ".json", function(data){
      $(".mdl-layout__content").empty();
        for(var i in data){
        $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p>" + data[i].e_word + "</p><p>" + data[i].j_word + "</p></div>");
        componentHandler.upgradeDom();
        }
    });
  };
function dFocus(){
  $('.mdl-layout__obfuscator').trigger("click");
};

$(document).ready(function(){
  loadSection(1);
});
