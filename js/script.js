'use strict'
//we blank the form  to prevent user from duplicate entries
$('#input-form')[0].reset();

//if user chooses to offer a gift we unhides the gift list else it remains hidden
$('.gift-decision > input').click(function(){
$('.gift-decision > input:checked').val() === 'Oui'  ?
        $('.gift-select').show() :
        $('.gift-select').hide();
});

//managing connectin and submission to the spreadsheet

$('#input-form').one('submit',function(){
    $('.error').remove();
    var inputq1 = encodeURIComponent($('#input-nom').val());
    var inputq2 = encodeURIComponent($('#input-prenom').val());
    var inputq3 = encodeURIComponent($('.input-reponseInvitation:checked').val());
    var inputq4 = encodeURIComponent($('#input-email').val());
    var inputq5 = encodeURIComponent($('.input-reponseGift:checked').val());
    //on verifie si la personne veut choisir un cadeau , si oui on enregistre son cadeau choisi sinon on envoie rien
    var inputq6 = $('.input-reponseGift:checked').val() === 'Oui'  ?  inputq6 = encodeURIComponent($('.gift-select option:selected').val()) : "";

    var q1ID = "entry.1003926060" ;//Non
    var q2ID = "entry.204419478" ;//Prenom
    var q3ID = "entry.1984655021" ;//confirmation
    var q4ID = "entry.1337704207" ;//email
    var q5ID = "entry.1717756256" ;//reponse cadeau
    var q6ID = "entry.276914198" ;//cadeaux choisis

    //creation de l'url de submission

    var baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdLv_Ycj9u65jqiEsy4Li9mQFrLTlTdPXpzepDBgZiTgZMTFQ/formResponse?';
  //  var submitRef = '&submit=3454553694072844193';
      var submitRef = '&submit=5360371415756194249';
    var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + "&" + q3ID + "=" + inputq3 + "&" + q4ID +  "=" + inputq4 + "&" + q5ID + "=" + inputq5+ "&" + q6ID + "=" + inputq6  + submitRef);

    if (inputq1 === "" && inputq2 === "" ){
      $('legend').after("<br><p class = 'error' style ='color:red'>Veuillez inserer votre nom et prenom</p>");
      $(this)[0].action="";
    }
  else {
    console.log(submitURL);
    $(this)[0].action=submitURL;
    // on cache la forme apres l'envoie des donnees
    $('#input-form ').hide();
    $('#input-feedback').text("Merci d'avoir répondu ,nous vous contacterons :).");
  }


});


//https://github.com/heaversm/google-custom-form

/* gift list managemment*/
$('.gift-link').click(function(){
  $('.list-type2').toggle();
  $('.gift-link').html($('.gift-link').text() == 'Cachez la liste de Cadeaux' ? 'Cliquez ici pour la liste de Cadeaux' : 'Cachez la liste de Cadeaux');
});


 /*  managing the mini-gift system
 if specific item from the gift list has been chosen so it is removed from the gift array*/

//Liste des cadeaux disponibles
var giftList_available=[ "Réfrigérateur","Four à gaz ","Micro onde", "Blender ","Ventilateur","TV ","Radio ","Fer à repasser ", "Machine à laver", "Cafetière ", "Toaster ", "Water  cooler", "Tasses ", "Verres", "Couverts", "Assietes ", "Rideaux ",   "Jeu de couteaux", "Draps", "Coffee maker", "Lampe de nuit"];
giftList_available.sort();
//Liste des cadeaux selectionnés
 var giftList_Taken= [];

//function that retrieve the list of seelected gift from the spreadsheet on googledrive using the google api explorer
$.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1EW0v6Retxj9_LFraUxQDjY6-UdvhWIxBLUQbOHZOuNo/values/g2%3Ag200?key=AIzaSyBvyJ-3XmqfZhThVnYU68nR32pnVyf0Ao0' , function(data) {
            //Si la liste est vide on affiche l'ensemble des cadeaux
           if(data.values.length === 0){
             $.each(giftList_available, function(index, element){
                $('.gift-select').append("<option value='"+ element +"'>"+ element +"</option>");

               //affichage des cadeaux avec distinction dispo ou non dispo basee sur le style
               $('.list-type2').append("<li><a href='#'>"+ element+"</a></li>");
             });

             //sinon on affichera l'ensemble des cadeaux non selectionnés en affichage
           }else{
             //console.log(data.values);
             $.each(data.values, function(index, element) {
               //console.log(data.values[index][0]);
                 //console.log( element[0]);
                 giftList_available = giftList_available.filter(function(i) {
                if(i == element[0]){
                  giftList_Taken.push(element[0]);
                }
                return i != element[0]

              });
               //console.log(giftList_available);
               //console.log(giftList_Taken);


       });
             $.each(giftList_available,function(index,element1){
                $('.gift-select').append("<option value='"+ element1 +"'>"+ element1 +"</option>");
                $('.list-type2 ol').append("<li><a href='#'>"+ element1+"</a></li>");
             });
              //on ajoute les elements deja choisis a la liste de cadeaux
             $.each(giftList_Taken,function(index,element2){
                 $('.list-type2 ol').append("<li class='gift_taken'><span class='strike'><a href='#'>"+ element2+"</a></span></li>");
             });
           }
              //on ajoute autres en fin de liste pour le dropdown.
            $('.gift-select').append("<option value='Autres...'>Autres...</option>");


           })
  .done(function() {
      $('.list-type2 ol').append("<li ><a href='#'>Autres... </a></li>");
               })
  .fail(function() {  $('.list-type2 ol').text("Erreur lors du chargement de donnée"); });

         /*
//link to see results in html table
//https://spreadsheets.google.com//tq? &gid=0
//link to see results using query  Query to be encoded is : SELECT G WHERE G<>''
//https://spreadsheets.google.com//tq?tqx=out:html&tq=SELECT+G+WHERE+G%3C%3E%27%27&key=1EW0v6Retxj9_ &gid=0
*/
