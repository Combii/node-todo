$(document).ready(() => {

    var todoList = [];


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
                    if (todoList.indexOf(todo.text) > -1) {
                        //console.log(true);
                    }
                    else {
                        //console.log(false);

                        todoList.push(todo.text);

                        var button = "<button type='button' class='btn btn-danger todoDelete'>Delete</button>";
                        var completedButton = "<button type='button' class='btn btn-default completedButton'>False</button>";

                        var todoText = "<p class='msg'>" + todo.text + " " + button + " " + completedButton + "</p>";
                        $("#messageBox").append(todoText);



                        //Setup button listeners

                        var buttons = $('.todoDelete');
                        $.each(buttons, function (index, btnTodo) {

                            $(btnTodo).click(() => {


                                var id = object.todos[index]._id;

                                console.log(id);

                                $.ajax({
                                    url: '/todos/' + id,
                                    type: 'DELETE',
                                    contentType: 'application/json',
                                    success: function (data) {
                                        console.log('success');
                                        console.log(JSON.stringify(data));

                                        $(btnTodo).closest('.msg').remove();
                                        todoList.splice(index, 1);

                                    }
                                });


                                //delete_todo(object.todos[index]._id);
                                // $(btnTodo).closest('.msg').remove();
                                // todoList.splice(index, 1);
                            });
                        });


                        //Setup checkbox listeners

                        var completedButtons = $('.completedButton');
                        $.each(completedButtons, function (index, completedButton) {

                            var check = false;

                            $(completedButton).click(() => {

                                if (!check)
                                {
                                    check = true;
                                    console.log(true);

                                    $(completedButton).closest('.completedButton').removeClass('btn-default').addClass('btn-success').text('True');
                                }
                                else{
                                    check = false;
                                    console.log(false);

                                    $(completedButton).closest('.completedButton').removeClass('btn-success').addClass('btn-default').text('False');
                                }
                            });
                        });

                    }
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

    // POST
    $("#sendTodo").click(() => {
        var todoText = $("#todoText").val();

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


                get_todos();
            }
        });

    });


    // DELETE
    /*
    function delete_todo(_id) {

        console.log(_id);

        $.ajax({
            url: '/todos/' + _id,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));

                //$("#messageBox").remove(text);
            }
        });
    }
    */

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
