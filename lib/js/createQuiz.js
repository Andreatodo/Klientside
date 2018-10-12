$("#createQuizBtn").click(function(e){
    e.preventDefault();
    let quiz = {
        quizTitle: $("#title").val(),
        quizDescription: $("#description").val(),
        createdBy: localStorage.getItem("username"),
        courseId: localStorage.getItem("courseID"),
        questionCount: 0,
    };
    console.log(quiz);
    $.ajax({
        type: 'POST',
        url: apiURL + '/quiz/',
        dataType: 'json',
        contentType: 'application/json',
        headers: {"Authorization": localStorage.getItem("token")},
        data: JSON.stringify(quiz),

        //Succes boks der vises hvis quizzen er oprettet
        success: function (data) {
            $("#error").hide();
            $("#success").empty();
            $("#success").show();
            $("#success").append("<p>Quiz oprettet</p>");
            window.location.href = "startSide.html";
            console.log(data);
        },

        //error boks der vises hvis quizzen ikke kunne oprettes
        error: function(data){
            $("#error").empty();
            $("#error").show();
            $("#error").append("<p>Quizzen blev ikke oprettet</p>");
        }
    })

});
$("#backToMenu").click(function(e){
    window.location.href = "startSide.html";

})
