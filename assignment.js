$(document).ready(function () {
    $.getJSON("practice_1.json", function(data){
        for(var i in data){
        $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-js-ripple-effect'>" + data[i].e_word + "</div>");
        componentHandler.upgradeDom()
        }
    });
});
