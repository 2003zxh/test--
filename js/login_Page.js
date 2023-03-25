window.onload = function () {
    let register = document.getElementById('register'); 
    let login = document.getElementsByClassName('login')[0];
    let logon = document.getElementsByClassName('logon')[0];
    let before = document.getElementById('before');
    let loginBox = document.querySelector('.loginBox'); 
 //翻转
    register.onclick = function () {
      loginBox.style.transform = 'translateX(-50%) rotateY(180deg) ';
      login.style.display = 'none';
      logon.style.display = 'block';
      clear();
    }
    before.onclick = function () {
      loginBox.style.transform = 'translateX(-50%) rotate(360deg) ';
      logon.style.display = 'none';
      login.style.display = 'block';
      clear();
    }
 // 清空函数
    function clear() {
      let register_Input = logon.querySelectorAll('input'); //所有的注册信息
      let login_Input = login.querySelectorAll('input');
      for (let i = 0; i < register_Input.length; i++) {
         register_Input[i].nextElementSibling.style.display = 'none';//清空label
         register_Input[i].value = '';
        }
       for (let i = 0; i < login_Input.length; i++) {
          login_Input[i].value = '';
        }
    }
     //获取焦点弹出提示框
      let psd_Input = logon.querySelector('#psd_Input');
      psd_Input.addEventListener('focus', function () {
          this.nextElementSibling.style.display = 'block';//获取label
      })
      // 验证信息
      /* 获取相关元素 */
      let register_Input = logon.querySelectorAll('input'); 
      let login_Input = login.querySelectorAll('input');
      /* 正则开始 */
      let ema_Reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱
      let psd_Reg = /\w{6,18}$/; //设置密码为6，18位，只能包含字母、数字和下划线
      let reg = [psd_Reg, psd_Reg, ema_Reg]; //把正则表达式放到数组中，这样可以通过遍历实现
      for (let i = 0; i < register_Input.length; i++) {
          register_Input[i].onblur = function () {
              if (i >= 1) {
                  if (!reg[i - 1].test(register_Input[i].value)) { // 如果不符合正则表达，弹出提示信息
                      this.nextElementSibling.style.display = 'block';
                  } else {
                      this.nextElementSibling.style.display = 'none';
                  }
              }
              if (i == 2) {
                  if (this.value == register_Input[1].value) { // 如果两次输入的密码不一致，弹出提示信息
                      this.nextElementSibling.style.display = 'none';
                  } else {
                      this.nextElementSibling.style.display = 'block';
                  }
              }
          }
      }
      /* 正则结束 */
       /* 登录 */
    let login_Btn = document.querySelector('#login_Btn');
    let register_Btn = document.querySelector('#newBtn')
    let err = document.querySelector('#err');
    let login_Name = document.querySelector('#login_Name');
    let login_Psd = document.querySelector('#login_Psd');
    let ins = document.querySelector('#ins')
    console.log(err);
    login_Btn.onclick = function () {
        if (login_Name.value != '' && login_Psd.value != '') {
            $.ajax({
                type: 'post',
                url: ' http://118.195.129.130:3000/user/login',
                data: {
                    us: login_Input[0].value,
                    ps: login_Input[1].value
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        loginBox.style.display = 'none';
                        window.location.href="manage.html";
                    } 
                },
                error: function (er) {
                    console.log('error');
                }
            })
        } else {
            ins.style.display = 'block';
            setTimeout(function() {
                ins.style.display = 'none';
            }, 1000)
        }
    }
    //注册
    let register_True = document.querySelector('.true');
    let tips = document.querySelector('#tips');
    let ret = document.querySelector('#ret')
    register_Btn.onclick = function () {
        let judge = true;
        for (let i = 1; i < register_Input.length; i++) {
            if (!reg[i - 1].test(register_Input[i].value)) {
                judge = false;
            }
        }
        if (register_Input[1].value != register_Input[2].value) {
            judge = false;
            register_Input[2].nextElementSibling.style.display = 'block';
        } else {
            register_Input[2].nextElementSibling.style.display = 'none';
        }
        if (judge) {
            $.ajax({
                type: 'post',
                url: 'http://118.195.129.130:3000/user/reg',
                data: {
                    us: register_Input[0].value,
                    ps: register_Input[1].value,
                    mail: register_Input[3].value,
                },
                success: function (res) {
                    if (res.code == 200) {
                        console.log(res);
                        register_True.style.display = 'block';
                        setTimeout(function(){
                            register_True.style.display = 'none';
                            loginBox.style.transform = 'translateX(-50%) rotate(360deg) ';
                            logon.style.display = 'none';
                            login.style.display = 'block';
                        }, 1000)
                        clear();
                    } else {
                        ret.style.display = 'block';
                        setTimeout(function() {
                            ret.style.display = 'none'
                        }, 1000)
                    }
                }
            })
        } else {
            tips.style.display = 'block';
            setTimeout(function(){
                tips.style.display = 'none'
            }, 1000)
        }
    }
}