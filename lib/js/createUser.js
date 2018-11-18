
//Der laves laves en event handler til opret bruger knappen
$("#createUserBtn").click(function(e){
    e.preventDefault(); //Hvis de indtastede passwords er forskellige fra hinanden vil felterne tømmes for teksten .empty og vi oplyser brugeren om at de ikke stemmer overens
    if($("#password").val() !== $("#passwordAgain").val()){
        $("#error").empty();
        $("#error").show();
        $("#error").append("<p>Passwords matcher ikke</p>");
        return;
    }
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    console.log(user);
    $.ajax({
        type: 'POST',
        url: apiURL + '/user/signup',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user),

        //Succes boksen  bliver vist hvis at brugernavnet ikke allerede er lagret i databasen
        success: function (data) {
            $("#error").hide();
            $("#success").empty();
            $("#success").show();
            $("#success").append("<p>Brugeren er nu oprettet. Du kan logge ind her: <a href='index.html'>Login</a></p>");
            console.log(data);
        },

        //error boksen bliver vist hvis brugernavnet er optaget eller hvis kodeordene som er indtastet (se i toppen) ikke er ens i begge felter
        error: function(data){
            $("#error").empty();
            $("#error").show();
            $("#error").append("<p>Brugernavnet er optaget</p>");
        }
    })

});