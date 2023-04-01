//显示菜单元素
var tableData = document.getElementById("tableData");
function getPageData(page, per_page) {
  $.ajax({
    type: "post",
    url:"http://118.195.129.130:3000/users/getInfoByPage_users",
    data: {
      page,
      per_page,
    },
    success: function (data) {
      let res = data.data;
      let sexType;
      //清空页面数据
      tableData.innerHTML = null;
      //获取数据
      for (let i = 0; i < res.length; i++) {
        if (res[i].sex == 0) sexType = "男";
        else if (res[i].sex == 1) sexType = "女";
        tableData.innerHTML +=
          "<tr>" +
          "<td ><input type='checkbox'value ='+res[i]._id +'/> </td>" +
          "<td>" +
          res[i].us +
          "</td>" +
          "<td>" +
          res[i].age +
          "</td>" +
          "<td>" +
          sexType +
          "</td>" +
          "<td>" +
           res[i].integral+
          "</td>" +
          "<td>" +
          "<button class='toEdit' onclick='Modify(\"" +
          res[i].us +
          '","' +
          res[i].age +
          '","' +
          res[i].sex +
          '","' +
          res[i]._id +
          "\")' >修改</button>" +
          "<button class='toDelete' onclick='del(\"" +
          res[i]._id +
          "\")' >删除</button>" +
          "</td>" +
          "</tr>";
      }
    },
  });
}
//显示用户
getPageData(1, 10);
//查询用户总数
var length;
let sumPages = document.getElementById("sumPages");
function sum() {
  $.ajax({
    type: "get",
    url: "http://118.195.129.130:3000/users/allpage_users",
    success: function (data) {
      length = data.pages;
      //总页数
      sumPages.innerHTML = Math.ceil(length / 10);
    },
  });
}
//显示总页数
sum();
//显示当前页数
var out = document.getElementById("out");
//要跳转的页数
var input = document.getElementById("in");
//向左跳转
document.getElementById("toLeftBtn").onclick = function () {
  let num = Number(input.value);
  num--;
  if (num < 1) {
    toLeftBtn.style.cursor = "auto";
  } else {
    getPageData(num, 10);
    input.value = num;
    out.value = num;
  }
};
//向右跳转
document.getElementById("toRightBtn").onclick = function () {
  let num = Number(input.value);
  num++;
  if (num > Math.ceil(length/ 10)) {
    toRightBtn.style.cursor = "auto";
  } else {
    getPageData(num, 10);
    input.value = num;
    out.value = num;
  }
};
//跳转页数
function go() {
  getPageData(input.value, 10);
  out.value = input.value;
}
//删除
var toDelete = document.querySelector(".toDelete");
function del(id) {
  if (confirm("你确定要删除吗？") == true) {
    $.ajax({
      type: "post",
      url: "http://118.195.129.130:3000/users/del_users",
      data: {
        _id: id,
      },
      success: function (data) {
        alert(data.msg);
        sum();
        getPageData(1, 10);
      },
    });
  }
}
//
//获取修改弹窗
var modify = document.querySelector(".modify");
function confirmCancel() {
  modify.style.display = "none";
  add.style.display = "none";
}
//修改
//获取表单数据
var usMod = document.querySelector("#usMod");
var ageMod = document.querySelector("#ageMod");
var sexMod = document.querySelector("#sexMod");
var _idMod = document.querySelector("#_idMod");
function Modify(us, age, sex, _id) {
  //显示表单数据
  modify.style.display = "block";
  (usMod.value = us),
    (ageMod.value = age),
    (sexMod.value = sex),
    (_idMod.value = _id);
}
function confirmMod() {
  if(ageMod.value<0)alert("添加积分不能小于零")
  else{
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/users/update_users",
    data: {
      us: usMod.value,
      age: ageMod.value,
      sex: sexMod.value,
      _id: _idMod.value,
    },
    success: function (data) {
      getPageData(1, 10);
      console.log("修改成功");
    },
  });
}
  modify.style.display = "none";
}
var add = document.querySelector(".add");
function addShow() {
  add.style.display = "block";
}
//获取添加数据
var usAdd = document.querySelector("#usAdd");
var ageMod = document.querySelector("#ageMod");
var sexMod = document.querySelector("#sexMod");
var integralAdd = document.querySelector("#integralAdd");
function confirmAdd() {
  if(ageMod.value<0)alert("添加积分不能小于零")
  else{
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/users/integral",
    data: {
      us: usAdd.value,
      age: ageMod.value,
      sex: sexMod.value,
      integral: integralAdd.value,
    },
    success: function (data) {
      alert(data.msg);
      sum();
      getPageData(1, 10);
      usAdd.value = "";
      ageMod.value = "";
      sexMod.value = "";
      integralAdd.value = "";
      console.log("添加成功");
    },
  });
}
  add.style.display = "none";
}
//模糊查询
var searchKw = document.querySelector("#searchKw");
function search() {
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/users/getInfoByKw_users",
    data: {
      kw: searchKw.value,
    },
    success: function (data) {
      let res = data.data;
      tableData.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        if (res[i].sex == 0) sexType = "男";
        else if (res[i].sex == 1) sexType = "女";
        tableData.innerHTML +=
          "<tr>" +
          "<td ><input type='checkbox'value ='+res[i]._id +'/> </td>" +
          "<td>" +
          res[i].us +
          "</td>" +
          "<td>" +
          res[i].age +
          "</td>" +
          "<td>" +
          sexType +
          "</td>" +
          "<td>" +
           res[i].integral+
          "</td>" +
          "<td>" +
          "<button class='toEdit' onclick='Modify(\"" +
          res[i].us +
          '","' +
          res[i].age +
          '","' +
          res[i].sex +
          '","' +
          res[i]._id +
          "\")' >修改</button>" +
          "<button class='toDelete' onclick='del(\"" +
          res[i]._id +
          "\")' >删除</button>" +
          "</td>" +
          "</tr>";
      }
    },
  });
}
function reset(){
  getPageData(1, 10)
}