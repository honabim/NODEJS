// phía server tạo file này
// mục đích: trả về client những trang web, layout nào đó
// console.log("chay duoc roi ne");
var express = require("express");
var app = express();
app.use(express.static("public")); // tất cả request client gửi lên
                                     // thì đi vào folder public mà tìm
app.set("view engine", "ejs"); 
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers=[];

io.on("connection", function(socket){
    console.log("có người kết nối: " + socket.id);

    socket.on("Client-send-Username", function(data){
        if(mangUsers.indexOf(data)>=0){
            //fail
            socket.emit("Server-send-dki-thatbai");
            console.log("thử tên khác đi");
        }
        else{
            //success
            mangUsers.push(data);
            socket.Username = data;
            socket.emit("Server-send-dki-thanhcong", data);
            io.sockets.emit("Server-send-danhsach-Users", mangUsers);
        }
    });
    socket.on("logout", function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        )
        socket.broadcast.emit("Server-send-danhsach-Users",mangUsers);
    });
    socket.on("User-send-message", function(data){
        io.sockets.emit("Server-send-message", {un:socket.Username, nd: data});
    });
    socket.on("Toi-dang-go-chu", function(){
        s = socket.Username+" Đang gõ chữ";
        io.sockets.emit("ai-do-dang-go", s);
    });
    socket.on("Toi-stop-go-chu", function(){
        console.log(socket.Username+" STOP gõ chữ");
        io.sockets.emit("Stop-go-roi");
    });
    socket.on("disconnect",function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        )
        socket.broadcast.emit("Server-send-danhsach-Users",mangUsers);
    });
});

app.get("/", function(req,res){
    res.render("trangchu");
});