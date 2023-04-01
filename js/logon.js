var logonBtn = document.getElementsByClassName("logonBtn")[0];
logonBtn.onclick = function () {
  var ema_Reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  var psd_Reg = /\w{6,18}$/;
  var psd = document.getElementById("psd").value;
  var againPsd = document.getElementById("againPsd").value;
  var email = document.getElementById("userEmail").value;
  if (psd == "" || againPsd == "" || email == "") {
    alert("密码或邮箱为空，请重新输入！");
  }
  if (psd != "" && againPsd != "" && email != "") {
    psdIsOk = psd_Reg.test(psd);
    emaIsOk = ema_Reg.test(email);
    if (psd != againPsd) {
      alert("两次密码输入不一致");
    }
    if (!emaIsOk && !psdIsOk) {
      alert("邮箱或密码格式不正确，请重新输入！");
    } else if (emaIsOk) {
      alert("注册成功，欢迎进入");
      window.location.href = "./home.html";
    }
  }
};

var gain = document.getElementsByClassName("gain")[0]; //获取验证码按钮
var time = 5;
gain.onclick = function () {
  move = setInterval(function () {
    if (time > 0) {
      gain.disabled = true;
      gain.innerHTML = "请在" + time + "秒后重试";
      time--;
    } else {
      clearInterval(move);
      time = 5;
      gain.disabled = false;
      gain.innerHTML = "获取验证码";
    }
  }, 1000);
};
