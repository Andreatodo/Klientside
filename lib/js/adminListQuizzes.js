
//Filen henter en liste af quizes til et givent courseID - som vi har i databasen, og viser det på siden

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
                $(".content").append("<li>" + jsonData[i].quizTitle + "</li>");
            }
        });
    }
});