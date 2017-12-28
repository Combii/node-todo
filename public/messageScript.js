$(document).ready(() => {

    $("#todoText").focus(function() {
        $(this).css("background", "#f3d5bd");
        console.log($(this));

    });

    $("#todoText").blur(function() {
       $(this).css("background", "#fff");
    });

    $("#sendTodo").click(() =>{
       var todoText = $("#todoText").val();

       var frontendText = "<p class='msg'>" + todoText + "</p>";

        console.log(todoText);

        var data = {};
        data.text = todoText;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/todos',
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });


       $("#messageBox").append(frontendText)
    });

    const colors = ["yellow", "pink", "red", "green"];
    let index = 0;


    $("#changeBorderColor").click(() =>{
        /*colors.forEach(color => {
            $("#messageBox").css("border", color)
        });*/

        $(".msg").css("border", "5px " + changeColors() + " solid");

        index++;
    });


    function changeColors() {
        if(index >= colors.length)
            index = 0;

        return colors[index];
    }

});
