
//Der foretages forbindelse til serveren, ved beder den om oplysninger på fagene
$.ajax({
    type: 'GET',
    url: apiURL + '/course',
    dataType: 'json',

    headers: {"Authorization": localStorage.getItem("token")},
    success: function (data) {
        $("#courses").append("<h3>Bachelor fag på Ha(IT)</h3>");
        var jsonData = JSON.parse(data);
        $.each(jsonData, function(i, item) {
            console.log(jsonData[i]);
            console.log(jsonData[i].courseTitle);
            $("#courses").append("<li><a href='#' data-course='" + jsonData[i].courseId + "' class='courseButton'>" + jsonData[i].courseTitle + "</a></li>");
        });
    }
});
$(document).on("click", ".courseButton", function(){
    localStorage.setItem("courseID", $(this).attr("data-course"));
    window.location.href = "course.html";
});