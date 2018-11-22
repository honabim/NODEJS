var socket = io("http://192.168.100.9:3000");
socket.on("Server-send-dkithatbai", function(){
    alert("Username đã được sử dụng. Hãy thử một tên khác");
});

socket.on("Server-send-danhsach-Users",function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='username'>" + i + "</div>");
    });
});

socket.on("Server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data); 
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("Server-send-message", function(data){
    $("#listMessages").append("<div class='ms'>"+ data.un + ":" + data.nd +"</div>");
})
socket.on("ai-do-dang-go", function(data){
    $("#thongbao").html(data + " <img width='20px' src='typing.gif'> ");
})
socket.on("Stop-go-roi", function(){
    $("#thongbao").html("");
})

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("Client-send-Username", $("#txtUserName").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
    });
    $("#btnSendMessage").click(function(){
        socket.emit("User-send-message",$("#txtMessage").val());
    });
    $("#txtMessage").focusin(function(){
        socket.emit("Toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("Toi-stop-go-chu");
    });
});
