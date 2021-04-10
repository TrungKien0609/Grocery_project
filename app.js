$(document).ready(function () {
    var global_index_item;
})
$(".tool_bar .btn.submit_btn").click(function () {
    var item_title = $("#add_item_bar").val();
    if ($("#add_item_bar").val() != "") {
        //     let item = `<div class="item">
        //     <p class="title">${$("#add_item_bar").val()}</p>
        //     <div class="icon">
        //         <i class="edit fas fa-edit" onclick="edit(this)"></i>
        //         <i class="delete fas fa-trash"></i>
        //     </div>
        // </div>`
        //     $(item).appendTo(".items");
        //     // make input empty
        //     $("#add_item_bar").val("");
        //     // effect for notice
        //     notice($(".notice"), "item added to the list", "#FFE4C4")
        
        // using local storage
        let listitem = localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [];
        listitem.push({
            item_title: item_title
        })
        localStorage.setItem("key", JSON.stringify(listitem));
        $("#add_item_bar").val("");
        notice($(".notice"), "Added item to list", "#ADD8E6");
        show_list_item();
    }
    else {
        notice($(".notice"), "Please Enter Value", "#FFE4C4");
        $("#add_item_bar").focus();
    }
})
// effect for clear button
$(".container .clear_btn").click(function () {
    $(".tool_bar .submit_btn").css("display", "block");
    $(".tool_bar .edit_btn").css("display", "none");
    localStorage.clear();
    $(".items").html("");
    $("#add_item_bar").val("");
    notice($(".notice"), "Empty list", "#ADD8E6");
})
$(".tool_bar .edit_btn").click(function () {
    $(".tool_bar .submit_btn").css("display", "block");
    $(".tool_bar .edit_btn").css("display", "none");
    let listitem = localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [];
    console.log(global_index_item)
    $(".title").eq(global_index_item).text($("#add_item_bar").val());
    listitem[global_index_item].item_title = $("#add_item_bar").val();
    localStorage.setItem("key", JSON.stringify(listitem));
    notice($(".notice"), "Value changed", "#FFE4C4");
    $("#add_item_bar").val("");
})
// function for notice
var notice = function (link, textContent, background) {
    link.css("background", background);
    link.text(textContent);
    link.css("visibility", "visible");
    let index = 0;
    let temp = setTimeout(function () {
        link.css("visibility", "hidden");
        index++;
    }, 1000)
    if (index == 1)
        clearTimeout(temp);
}
// function for showing
function show_list_item() {
    let item = "";
    let listitem = localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [];
    listitem.map((value, index) => {
        item += `<div class="item">
        <p class="title">${value.item_title}</p>
        <div class="icon">
            <i class="edit fas fa-edit" onclick="edit(${index})"></i>
            <i class="delete fas fa-trash" onclick="delete_item(${index})"></i>
        </div>
     </div>`
    });
    $(".items").html(item);
}
// function for edit feature
function edit(localindex) {
    let listitem = localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [];
    $(".tool_bar .submit_btn").css("display", "none");
    $(".tool_bar .edit_btn").css("display", "block");
    $("#add_item_bar").val(listitem[localindex].item_title);
    global_index_item = localindex;
    notice($(".notice"), "Value edited", "#FFE4C4");
}
function delete_item(localindex) {
    let listitem = localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [];
    // if(listitem.findIndex(item => item.item_title == listitem[localindex].item_title ) == localindex)
    listitem.map( (item) => {
        if(item.item_title === listitem[localindex].item_title)
        listitem.splice(localindex,1);
    })
    
    localStorage.setItem("key",JSON.stringify(listitem))
    show_list_item();
    notice($(".notice"), "Deleted value", "#FFE4C4");
}