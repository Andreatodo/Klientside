
// Der laves en eventhandler til min log ind knap

$("#loginBtn").click(function(e){
    e.preventDefault();
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    console.log(user);
    $.ajax({ //http request til serveren
        type: 'POST',
        url: apiURL + '/user/login',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user), // jeg laver user om til et json objekt

        success: function (data) { //alle responses i kode 200 fra serveren, udløser succes, dvs serveren svarer positvit tilbage
            data = data.replace(/"/g, "");//fjerner gåseøjne fra token
            localStorage.setItem('token', data); //serveren sender et token, som vi gemmer lokalt
            $.ajax({
                type: 'GET',
                url: apiURL + '/user/myuser',//vi henter oplysningerne på serveren, via vores user endpoint på serveren, som giver oplysninger om vores bruger
                dataType: 'json',
                contentType: 'application/json',
                headers: {"Authorization": data},

                success: function (data) {
                    data = JSON.parse(data);
                    var type = data.type;
                    var userID = data.userId;
                    var username = data.username;
                    localStorage.setItem("type", type);
                    localStorage.setItem("userID", userID);
                    localStorage.setItem("username", username);

                    //brugeren diregeres til startsiden ved log ind
                    window.location.href = "startSide.html";
                }
            });
        }, //Såfremt brugeren ikke er oprettet, dvs hvis der ikke er oplysninger om brugeren i min database, så vil brugeren få et window alert via denne fejlhåndtering
        error: function(){
            alert("Forkert brugernavn eller kodeord");
        }
    })

});
