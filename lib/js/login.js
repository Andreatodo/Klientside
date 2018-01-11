

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


    })

});
