$("#write").click(function () {
  $(".write").show();
});

function more(e) {
  $.ajax({
    url: "/api/select",
    type: "GET",
    data: { idx: e },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
      document.getElementById("modify").setAttribute("idx", e);
      document.getElementById("name_read").innerHTML = data.name;
      document.getElementById("title_read").innerHTML = data.title;
      document.getElementById("content_read").innerHTML = data.content;
      $(".show").show();
    },
    error: function (err) {
      console.log(err);
    },
  });
}


$(".close").click(function () {
  // 닫기는 공통
  document.getElementById("password_update").value = "";
  document.getElementById("password_write").value = "";

  $(".modal").hide();
});

document.getElementById('update').onclick = function(){
  $.ajax({
    url: "/api/select/confirm",
    type: "POST",
    data: {
      idx: document.getElementById("modify").getAttribute("idx"),
      password: document.getElementById("password_update").value,
    },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
      if (data == "empty") {
        alert("비밀번호를 확인해주세요.");
      } else {
        document.getElementById("modi_idx").setAttribute("idx", data.board.idx);
        document.getElementById("name_modi").value = data.board.name;
        document.getElementById("title_modi").value = data.board.title;
        document.getElementById("content_modi").innerHTML = data.board.content;
        $(".update").show();
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}


$(document).ready(function () {
  $.ajax({
    url: "/api/select",
    type: "GET",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
      list(data);
    },
    error: function (err) {
      console.log(err);
    },
  });
});

function list(datalist) {
  console.log(datalist)
  for (var i in datalist) {
    var result = Math.floor(Math.random() * 23) + 1;
    var _tr =
      '<article class="item">\n' +
      "<header>\n" +
      '<a href="javascript:void(0);" onclick="more(' +
      datalist[i].idx +
      ')"><img src="../images/' +
      result +
      '.jpg" alt="" /></a><h3>' +
      datalist[i].title +
      "</h3>\n" +
      "</header> <p>" +
      datalist[i].name +
      "</p>\n" +
      '<button onclick="more(' +
      datalist[i].idx +
      ')">More</button>\n' +
      "</article>";
    $("#list").append(_tr);
  }
}

document.getElementById("delete").onclick = function () {
  $.ajax({
    url: "/api/delete",
    type: "DELETE",
    data: {
      password: document.getElementById("password_update").value,
      idx: document.getElementById("modify").getAttribute("idx")
    },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
      data == "fail" ? alert("비밀번호를 확인해주세요.") : location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#writer").click(function () {
  $.ajax({
    url: "/api/insert",
    type: "POST",
    data: { 
      name: document.getElementById("name_writer").value,
      title: document.getElementById("title_writer").value,
      content: document.getElementById("content_writer").value,
      password: document.getElementById("password_write").value
    },
    success: function (data) {
      console.log(data);
      location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$("#update_btn").click(function () {
  $.ajax({
    url: "/api/put",
    type: "PUT",
    data: {
      idx: document.getElementById("modi_idx").getAttribute("idx"),
      name: document.getElementById("name_modi").value,
      title: document.getElementById("title_modi").value,
      content: document.getElementById("content_modi").value
    },
    success: function (data) {
      // console.log(data)
      location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
});
