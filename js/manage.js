//获取数据
function chagePage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/getInfoByPage',
        data:{
            page:1,
            per_page:10
        },
        success:function(res){
            ul1.innerHTML="";
            let data=res.data;
            for(let i =0;i<data.length;i++){
            var newTr = $(`<tr>
            <td>
              <input type="checkbox" value = ` +data[i].id+ ` \/>
            </td>
            <td>
            ` + data[i].name + `
          </td>
            <td>
              ` + data[i].price + `
            </td>
            <td>
              ` + data[i].desc + `
            </td>
            <td>
              ` + data[i].typename + `
            </td>
            <td>
              ` + data[i].typeid + `
            </td>
            <td>
               <button class="toEdit" id="${data[i]}">修改</button>
               <button class="toDelete" id="${data[i]._id}">删除</button>
            </td>
          </tr>`)
          $('tbody').append(newTr);
            }
            console.log(res);
        },
        error:function(err){
            console.log(err);
        }
    })
}
chagePage()	
// 给修改按钮绑定事件
$('table tbody').on('click', '.toEdit', function () {
    $('.dialog').fadeIn();
    food = $(this).attr('id');
    console.log(food);
    $('input[name=name]').val(food.name);
    $('input[name=price]').val(food.price);
    $('textarea[name=description]').val(food.description);
    $('input[name=typeid]').val(food.price);
    $('.dialog_header').html('修改产品信息');
})
$('table tbody').on('click', '.toDelete', function () {
    del($(this).attr('id'));
})
//给删除按钮绑定事件
function del(id) {
    var result = confirm('确定删除吗?');
    if (result) {
        $.ajax({
            type:'post',
            url:'http://118.195.129.130:3000/food/del',
            data: { _id: id },
            success(res) {
                alert(res.msg);
                chagePage();	
            },
            error(err) {
            }
        })
    } else {
        $('confirm').fadeOut();
    }
}
//新增
//给新增按钮绑定事件
$('#updata').click(function () {
    $('.dialog').fadeIn();
    $('.dialog_header').html('新增菜名信息');
    //清空表单数据
    var name = $('input[name = name]').val('');
    var price = $('input[name = price]').val('');
    var description = $('textarea[name=description]').val('');
    var typeid = $('input[name = typeid]').val('');
})
//给确定按钮绑定事件
$('.submit').click(function () {
    var name = $('input[name = name]').val();
    var price = $('input[name = price]').val();
    var description = $('textarea[name=description]').val();
    var typeid = $('input[name = typeid]').val();
    //发送保存请求
    $.ajax({
        url:'http://118.195.129.130:3000/food/add',
        method: 'post',
        data: {
            name:name,
            price:price,
            desc:description,
            typeid:typeid
        },
        success(res) {
            console.log(res);
            $('.dialog').fadeOut();
            alert(res);
            chagePage()	;
        },
        error(error) {
        }
    })
})
//给取消按钮绑定事件
$('.cancel').click(function () {
    $('.dialog').fadeOut();
})
$('.Search').click(function () {
    $('tbody').empty();
    let temp = {
        name: $('input:first').val(),
        description: $('input:first').val()
    };
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/getInfoByKw',
        data:{
            kw:temp
        },
        success:function(res){
            ul1.innerHTML="";
            let data=res.data;
            for(let i =0;i<data.length;i++){
            var newTr = $(`<tr>
            <td>
              <input type="checkbox" value = ` +data[i].id+ ` \/>
            </td>
            <td>
            ` + data[i].name + `
          </td>
            <td>
              ` + data[i].price + `
            </td>
            <td>
              ` + data[i].desc + `
            </td>
            <td>
              ` + data[i].typename + `
            </td>
            <td>
              ` + data[i].typeid + `
            </td>
            <td>
               <button class="toEdit" id="${data[i]}">修改</button>
               <button class="toDelete" id="${data[i].id}">删除</button>
            </td>
          </tr>`)
          $('tbody').append(newTr);
            }
            console.log(res);
        },
        error:function(err){
            console.log(err);
        }
    })
})
