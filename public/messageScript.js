$(document).ready(() => {

    var localTodoList = [];

    get_todos();

    setInterval(get_todos, 5000);

    // GET
    function get_todos() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/todos',
            success: function (object) {
                setup_todos(object.todos);
            }
        });
    }

    function setup_todos(todoList) {

        if(todoList.length < localTodoList.length){
            console.log("Online: " + todoList.length);
            console.log("Local: " + localTodoList.length);
            localTodoList = [];
            $("#messageBox").empty();
        }

        $.each(todoList, function (index, todo) {
            if (searchList(todo._id) === null) {
                localTodoList.push({
                    id: todo._id,
                    text: todo.text,
                    completed: todo.completed,
                    buttonListenerDelete: false,
                    buttonListenerCompleted: false
                });
                setupTodoFrontend(localTodoList[localTodoList.length - 1]);
                setupButtonListeners()
            }
        });
    }

    function setupTodoFrontend(todo) {

        var button = "<button type='button' class='btn btn-danger todoDelete'>Delete</button>";

        var completedButton = "";

        if(!todo.completed)
            completedButton = "<button type='button' class='btn btn-default completedButton'>False</button>";
        else
            completedButton = "<button type='button' class='btn btn-success completedButton'>True</button>";


        var todoText = "<p class='msg'>" + todo.text + " " + button + " " + completedButton + "</p>";
        $("#messageBox").append(todoText);
    }

    function setupButtonListeners() {
        //Setup button listeners
        var buttons = $('.todoDelete');

        $.each(buttons, function (index, btnTodo) {

            var id = localTodoList[index].id;

            if (!localTodoList[index].buttonListenerDelete) {
                $(btnTodo).click(() => {
                    $.ajax({
                        url: '/todos/' + id,
                        type: 'DELETE',
                        contentType: 'application/json',
                        success: function (data) {
                            console.log('success');
                            console.log(JSON.stringify(data));

                            $(btnTodo).closest('.msg').remove();
                            localTodoList.splice(index, 1);
                        }
                    });
                });
                localTodoList[index].buttonListenerDelete = true;
            }
        });


        //Setup checkbox listeners
        var completedButtons = $('.completedButton');
        $.each(completedButtons, function (index, completedButton) {

            if (!localTodoList[index].buttonListenerCompleted) {
                $(completedButton).click(() => {
                    var returnData = {};


                    if (!localTodoList[index].completed) {
                        $(completedButton).closest('.completedButton').removeClass('btn-default').addClass('btn-success').text('True');
                        console.log(true);

                        returnData.completed = true;

                        patchData(localTodoList[index].id, returnData)

                    }
                    else {
                        $(completedButton).closest('.completedButton').removeClass('btn-success').addClass('btn-default').text('False');
                        console.log(false);

                        returnData.completed = false;

                        patchData(localTodoList[index].id, returnData)
                    }
                });
                localTodoList[index].buttonListenerCompleted = true;
            }
        });
    }

    // PATCH
    function patchData(id, data) {

        console.log(id, data);

        $.ajax({
            type: 'PATCH',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/todos/' + id,
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));

                get_todos();
            }
        });
    }

    function searchList(object) {

        var todo = null;

        $.each(localTodoList, function (index, todoLocal) {
            if (todoLocal.id === object) {
                todo = todoLocal;
                return false;
            }
            else if (todoLocal.text === object) {
                todo = todoLocal;
                return false;
            }
        });
        return todo;
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