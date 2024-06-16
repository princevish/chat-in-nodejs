let socket = io();
let list = new Set();
let a = 0;
let to;
let user;

let imagefile = document.getElementById("imagefile");


socket.on("online", (data) => {
  $("option").remove();
  $("#chatonline").append(new Option("All User", ""));
  for (let x in data) {
    let id = data[x].id;
    let user = data[x].user;
    list.add(id);

    if (list.has(`${id}`)) {
      $("#chatonline").append(new Option(user, id));
    }
  }
});


do {
  user = prompt("Enter username");
  socket.emit("adduser", user);
} while (!user);


$("#chatonline").change(function () {
  var $option = $(this).find("option:selected");
  var value = $option.val();
  var text = $option.text();
  to = value;
  $("#massageboxf").append(
    $("<div>")
      .attr("class", "text-center text-primary")
      .text(`--------- ${text} ---------`)
  );
});

function addmassage() {
  socket.emit("msg_send", {
    to,
    users: user,
    msg: $("#inputfield").val().trim(),
  });

  $("#massageboxf").append(
    $("<div>")
      .attr("id", "mass-right")
      .append($("<spam>").text($("#inputfield").val().trim()))
  );
  scrollToBottom();
  $("#inputfield").val(" ");
}

$("#buttons").click(() => {
  if ($("#inputfield").val().trim()) {
    addmassage(to);
  }
});

socket.on("msg_rcvd", (data) => {
  var massage = `${data.msg}`;
  var username = `${data.users}`;
  if (data.file) {
    $("#massageboxf").append($("<p>").text(username).attr("class", "username"));
    ImageShow(data.file, false);
  } else {
    $("#massageboxf").append($("<p>").text(username).attr("class", "username"));
    $("#massageboxf").append(
      $("<div>").attr("id", "mass-left").append($("<spam>").text(massage))
    );
  }
  scrollToBottom();
});

function scrollToBottom() {
  massageboxf.scrollTop = massageboxf.scrollHeight;
}
$("#inputfield").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    // the enter key code
    addmassage();
  }
});

function ImageShow(filedata, position) {
  var file = new Blob([filedata], { type: filedata.type });
  const render = new FileReader();
  render.readAsDataURL(file);
  if (filedata.type === "video/mp4") {
    var video = document.createElement("video");
    video.autoplay = false;
    video.controls = true;
    video.id = "video";
    render.onloadend = function () {
      video.src = render.result;
    };
    if (position) {
      $("#massageboxf").append(
        $("<div>").attr("id", "imageDivRight").append(video)
      );
    } else {
      $("#massageboxf").append(
        $("<div>").attr("id", "imageDivLeft").append(video)
      );
    }
  } else {
    var img = document.createElement("img");
    img.alt = filedata.name;
    img.id = "image";


    render.onloadend = function () {
      img.src = render.result;
      if (position) {
        $("#massageboxf").append(
          $("<div>").attr("id", "imageDivRight").append(
            $("<a>").attr("href", URL.createObjectURL(file)).attr('target', '_blank').attr('class', 'image-link').append(img)
          ))
      } else {
        $("#massageboxf").append(
          $("<div>").attr("id", "imageDivLeft").append(
            $("<a>").attr("href", render.result).attr('target', '_blank').attr('class', 'image-link').attr('download', 'image.jpg').append(img)
          ))
      }
    }
  };

}

function onSelectFile({ target: { files } }) {
  ImageShow(files[0], true);
  socket.emit("msg_send", {
    to: to,
    users: user,
    file: files[0],
  });
  $("#File1").val("");
}