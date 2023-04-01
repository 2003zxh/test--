//显示菜单元素
var tableData = document.getElementById("tableData");
function getPageData(page, per_page) {
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/food/getInfoByPage",
    data: {
      page,
      per_page,
    },
    success: function (data) {
      let res = data.data;
      let foodType;
      //清空页面数据
      tableData.innerHTML = null;
      //获取数据
      for (let i = 0; i < res.length; i++) {
        if (res[i].typeid == 0) foodType = "面";
        else if (res[i].typeid == 1) foodType = "米";
        else if (res[i].typeid == 2) foodType = "饮品";
        else if (res[i].typeid == 3) foodType = "水果";

        tableData.innerHTML +=
          "<tr>" +
          "<td ><input type='checkbox'value ='+res[i]._id +'/> </td>" +
          "<td>" +
          res[i].name +
          "</td>" +
          "<td>" +
          res[i].price +
          "</td>" +
          "<td>" +
          res[i].desc +
          "</td>" +
          "<td>" +
          res[i].typename +
          "</td>" +
          "<td>" +
          foodType +
          "</td>" +
          "<td>" +
          "<button class='toEdit' onclick='Modify(\"" +
          res[i].name +
          '","' +
          res[i].price +
          '","' +
          res[i].desc +
          '","' +
          res[i].typename +
          '","' +
          res[i].typeid +
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
//显示菜品
getPageData(1, 10);
//查询菜品总数
var length;
let sumPages = document.getElementById("sumPages");
function sum() {
  $.ajax({
    type: "get",
    url: "http://118.195.129.130:3000/food/allpage",
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
      url: "http://118.195.129.130:3000/food/del",
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
var nameMod = document.querySelector("#nameMod");
var priceMod = document.querySelector("#priceMod");
var descMod = document.querySelector("#descMod");
var typeNameMod = document.querySelector("#typeNameMod");
var typeidMod = document.querySelector("#typeidMod");
var _idMod = document.querySelector("#_idMod");
function Modify(name, price, desc, typename, typeid, _id) {
  //显示表单数据
  modify.style.display = "block";
  (nameMod.value = name),
    (priceMod.value = price),
    (descMod.value = desc),
    (typeNameMod.value = typename),
    (typeidMod.value = typeid),
    (_idMod.value = _id);
}
function confirmMod() {
  if(priceMod.value<0)alert("价格不能小于零")
  else{
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/food/update",
    data: {
      name: nameMod.value,
      price: priceMod.value,
      desc: descMod.value,
      typename: typeNameMod.value,
      typeid: typeidMod.value,
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
//在HTML中为新建绑定了一个函数，点击新建时，显示addData的弹窗
function addShow() {
  add.style.display = "block";
}
//获取添加数据
var nameAdd = document.querySelector("#nameAdd");
var priceAdd = document.querySelector("#priceAdd");
var descAdd = document.querySelector("#descAdd");
var typenameAdd = document.querySelector("#typenameAdd");
var typeidAdd = document.querySelector("#typeidAdd");
function confirmAdd() {
  if(priceAdd.value<0)alert("价格不能小于零")
  else{
  $.ajax({
    type: "post",
    url: "http://118.195.129.130:3000/food/add",
    data: {
      name: nameAdd.value,
      price: priceAdd.value,
      desc: descAdd.value,
      typename: typenameAdd.value,
      typeid: typeidAdd.value,
    },
    success: function (data) {
      alert(data.msg);
      sum();
      getPageData(1, 10);
      nameAdd.value = "";
      priceAdd.value = "";
      descAdd.value = "";
      typenameAdd.value = "";
      typeidAdd.value = "";
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
    url: "http://118.195.129.130:3000/food/getInfoByKw",
    data: {
      kw: searchKw.value,
    },
    success: function (data) {
      let res = data.data;
      tableData.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        if (res[i].typeid == 0) foodType = "面";
        else if (res[i].typeid == 1) foodType = "米";
        else if (res[i].typeid == 2) foodType = "饮品";
        else if (res[i].typeid == 3) foodType = "水果";
        tableData.innerHTML +=
          "<tr>" +
          "<td ><input type='checkbox'value ='+res[i]._id +'/> </td>" +
          "<td>" +
          res[i].name +
          "</td>" +
          "<td>" +
          res[i].price +
          "</td>" +
          "<td>" +
          res[i].desc +
          "</td>" +
          "<td>" +
          res[i].typename +
          "</td>" +
          "<td>" +
          foodType +
          "</td>" +
          "<td>" +
          "<button class='toEdit' href='javascript:void(0)' onclick='Modify(\"" +
          res[i].name +
          '","' +
          res[i].price +
          '","' +
          res[i].desc +
          '","' +
          res[i].typename +
          '","' +
          res[i].typeid +
          '","' +
          res[i]._id +
          "\")' >修改<tton>" +
          "<button class='toDelete' href='javascript:void(0)' onclick='Delete(\"" +
          res[i]._id +
          "\")' >删除<tton>" +
          "</td>" +
          "</tr>";
      }
    },
  });
}
function reset(){
  getPageData(1, 10)
}