var names = document.getElementById("userName");
var passsWord = document.getElementById("psd");
var loginBtn = document.getElementsByClassName("loginBtn")[0];
var register = document.getElementById("register");

loginBtn.onclick = function () {
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/user/login",
    data: {
      us: names.value,
      ps: passsWord.value,
    },
    success: function (res) {
      console.log(res);
      if (res.err == 0) {
        alert("登录成功");
        window.s = localStorage.setItem("_id", res.data[0]._id);
        window.location.href = "./home.html";
      } else {
        alert("登录失败,请重新输入");
      }
    },
  });
};
register.onclick = function () {
  window.location.href = "./logon.html";
};
