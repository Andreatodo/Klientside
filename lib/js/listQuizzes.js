var courseID = localStorage.getItem("courseID");
$.ajax({
    type: 'GET',
    url: apiURL + '/quiz/' + courseID,
    dataType: 'json',

    headers: {"Authorization": localStorage.getItem("token")},
    success: function (data, textStatus, jqXHR) {
        if(jqXHR.status === 204){
            $(".content").append("<li>Der er ingen quizzes til det givne fag</li>");
            return;
        }
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        $.each(jsonData, function(i, item) {
            console.log(jsonData[i]);
            if(typeof jsonData[i].quizTitle != 'undefined'){
                $("#quizTable").append("<tr data-id='" + jsonData[i].quizId + "' data-name='"+item.quizTitle+"'><td><a class='takeQuiz'>" + jsonData[i].quizTitle + "</a></td></tr>");
                if(localStorage.getItem("type") === "1"){
                    $("[data-id=" + jsonData[i].quizId + "]").append("<a href='#'><span class=\"glyphicon glyphicon-trash removeQuiz\" aria-hidden=\"true\"></span></a>");
                    $("[data-id=" + jsonData[i].quizId +  "]").append("<a href='#'><span class=\"glyphicon glyphicon-pencil editQuiz\" aria-hidden=\"true\"></span></a>");
                }
            }
        });
    }
});