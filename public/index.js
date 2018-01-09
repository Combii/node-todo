$(document).ready(function () {

    var localTodoList = [];

    get_todos();

    setInterval(get_todos, 5000);

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

        $.each(todoList, function (index, todo) {
            if (searchList(todo._id) === null) {
                localTodoList.push({
                    id: todo._id,
                    text: todo.text,
                    completed: todo.completed,
                    completedAt: todo.completedAt
                });
                setupTodoFrontend(localTodoList[localTodoList.length - 1]);
            }
        });
    }

    function setupTodoFrontend(todo) {
        if(!todo.completed)
            $("#list-items").append("<li><input class='checkbox' type='checkbox'/>" + todo.text + "<a class='remove'>x</a><hr></li>");

        else
            $("#list-items").append("<li class='completed'><input class='checkbox' type='checkbox' checked/>" + todo.text + "<a class='remove'>x</a><hr></li>");
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


    // POST
    $(".add-items").submit(function (event) {
        event.preventDefault();

        var item = $("#todo-list-item").val();

        if (item.trim() !== "") {
            $("#todo-list-item").val("");

            var data = {};
            data.text = item;

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
        }
    });

    // Checkbox
    $(document).on("change", ".checkbox", function () {

        var todoText = $(this).parent().text();
        todoText = todoText.substring(0, todoText.length - 1);

        var returnData = {};

        if ($(this).is(':checked')) {
            returnData.completed = true;

            patchData(searchList(todoText).id, returnData);
            console.log(true);
        }
        else {
            returnData.completed = false;

            patchData(searchList(todoText).id, returnData);
            console.log(false);
        }

        $(this).parent().toggleClass("completed");
    });

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
            }
        });
    }

    // DELETE
    $(document).on("click", ".remove", function () {

        var todoText = $(this).parent().text();
        todoText = todoText.substring(0, todoText.length - 1);

        console.log(todoText);

        var id = searchList(todoText).id;

        $(this).parent().remove();

        console.log(id);

        $.ajax({
            url: '/todos/' + id,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
                //localTodoList.splice(index, 1);
            }
        });

    });
});
