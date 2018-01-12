
// Der tilkobles et event til min log ind knap

$("#loginBtn").click(function(e){
    e.preventDefault();
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    console.log(user);
    $.ajax({
        type: 'POST',
        url: apiURL + '/user/login',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user),

        success: function (data) {
            data = data.replace(/"/g, "");
            localStorage.setItem('token', data);
            $.ajax({
                type: 'GET',
                url: apiURL + '/user/myuser',
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
        }
    })

});
