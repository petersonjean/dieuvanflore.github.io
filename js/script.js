'use strict'
//$('.list-type2').hide();
//managing connectin and submission to the spreadsheet

$('#input-form').one('submit',function(){
    $('.error').remove();
    var inputq1 = encodeURIComponent($('#input-nom').val());
    var inputq2 = encodeURIComponent($('#input-prenom').val());
    var inputq3 = encodeURIComponent($('.input-reponseInvitation:checked').val());
    var inputq4 = encodeURIComponent($('#input-email').val());
    var q1ID = "entry.1003926060";
    var q2ID = "entry.204419478";
    var q3ID = "entry.1984655021";
    var q4ID = "entry.1337704207";

    var baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdLv_Ycj9u65jqiEsy4Li9mQFrLTlTdPXpzepDBgZiTgZMTFQ/formResponse?';
    var submitRef = '&submit=3454553694072844193';
    var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + "&" + q3ID + "=" + inputq3 + "&" + q4ID + "=" + inputq4 + submitRef);
  //  console.log(submitURL);

    if (inputq1 ==="" && inputq2 ==="" ){
      $('legend').after("<br><p class='error' style='color:red'>Veuillez inserer votre nom et prenom</p>");
      $(this)[0].action="";
    }
  else {
    $(this)[0].action=submitURL;
      $('#input-form ').hide();
    $('#input-feedback').text("Merci d'avoir répondu ,nous vous contacterons :).");
  }


});


//https://github.com/heaversm/google-custom-form
/* gift list managment*/
$('.gift-link').click(function(){
  $('.list-type2').toggle();
});


/*
//https://docs.google.com/spreadsheets/d/1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo/edit?usp=sharing
// publish link  https://docs.google.com/spreadsheets/d/1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo/pubhtml?gid=997817498&single=true
var spreadsheet_reponse = 'spreadsheets.google.com/feeds/list/1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo/od6/public/values?alt=json-in-script&callback='
/*$.getJSON("https://spreadsheets.google.com//tq?tqx=out:json&tq=SELECT+G+WHERE+G%3C%3E%27%27&key=1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo&gid=0", function(data) {
  //first row "title" column
  console.log("fsys:   "+data);
});
//GET https://sheets.googleapis.com/v4/spreadsheets/1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo/values/Sheet1!A1:G10

$.ajax({
                    type: "GET",
                    url: "https://spreadsheets.google.com//tq?tqx=out:json&tq=SELECT+G+WHERE+G%3C%3E%27%27&key=1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo&gid=0",
                    crossDomain: true,
                    jsonpCallback: 'google.visualization.Query.setResponse',
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (msg) {
                      alert(msg);
                         $.each(msg.table.rows, function (key, value){
                              alert(key +"is"+value);
                    }
                  );
                }
         });
//link to see results in html table
//https://spreadsheets.google.com//tq?tqx=out:html&tq=&key=1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo&gid=0
//link to see results using query  Query to be encoded is : SELECT G WHERE G<>''
//https://spreadsheets.google.com//tq?tqx=out:html&tq=SELECT+G+WHERE+G%3C%3E%27%27&key=1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo&gid=0
*/
