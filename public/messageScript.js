$(document).ready(() => {

    get_todos();

    setInterval(get_todos, 10000);


    function get_todos() {

        //console.log($("#messageBox").length);

        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/todos',
            success: function (object) {

                //console.log(todos);


                $.each(object.todos, function (index, todo) {
                    //Check if already exist
                    if ($("#messageBox").text().match(todo.text)) {
                        console.log(true);
                    }
                    else {
                        console.log(false);

                        var button = "<button type='button' class='btn btn-danger todoDelete'>Delete</button>";

                        var todoText = "<p class='msg'>" + todo.text + button + "</p>";
                        $("#messageBox").append(todoText);
                    }
                });

                var buttons = $('.todoDelete');


                $.each(buttons, function (index, btnTodo) {

                    $(btnTodo).click(() => {
                        console.log(index);
                    })

                });

            }

        });
    }

    $("#todoText").focus(function () {
        $(this).css("background", "#f3d5bd");
        console.log($(this));

    });

    $("#todoText").blur(function () {
        $(this).css("background", "#fff");
    });

    $("#sendTodo").click(() => {
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
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });


        $("#messageBox").append(frontendText)
    });


    function delete_todo(_id) {

        console.log(_id);

        var data = {};
        data.id = _id;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/todos',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });


    }


    const colors = ["yellow", "pink", "red", "green"];
    let index = 0;
    $("#changeBorderColor").click(() => {
        /*colors.forEach(color => {
            $("#messageBox").css("border", color)
        });*/

        $(".msg").css("border", "5px " + changeColors() + " solid");

        index++;
    });

    function changeColors() {
        if (index >= colors.length)
            index = 0;

        return colors[index];
    }

});
