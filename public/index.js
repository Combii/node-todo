$(document).ready(function () {
    $(".add-items").submit(function (event) {
        event.preventDefault();
        //console.log('test');
        var item = $("#todo-list-item").val();

        if (item) {
            $("#list-items").append("<li><input class='checkbox' type='checkbox'/>" + item + "<a class='remove'>x</a><hr></li>")
            $("#todo-list-item").val("");
        }
    });

    /*$(".checkbox").change(function () {
        console.log('Checkbox checked');
    })*/


    $(document).on("change", ".checkbox", function () {

        if ($(this).is(':checked')) {
            console.log(true);
        }
        else
            console.log(false);


        $(this).parent().toggleClass("completed");


        //Get text
        //console.log($(this).parent().text());
    });


    $(document).on("click", ".remove", function () {

        $(this).parent().remove();

    });
});
