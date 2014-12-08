/// DEBUG 用函数
function dump_obj(myObject) {  
  var s = "";  
  for (var property in myObject) {  
   s = s + "\n "+property +": " + myObject[property] ;  
  }  
  alert(s);  
}  


/// 打开工具提示功能
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/// 左侧、右侧栏目高度自适应
$(function() {
  $("#stigmod-pg-workspace #stigmod-nav-left-scroll").height($(window).height() - 167 - 10 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，45是project标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#stigmod-pg-workspace #stigmod-nav-left-scroll").height($(window).height() - 167 - 10 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
  });
});
$(function() {
  $("#stigmod-pg-workspace #stigmod-cont-right-scroll").height($(window).height() - 122 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，45是project标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#stigmod-pg-workspace #stigmod-cont-right-scroll").height($(window).height() - 122 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
  });
});
$(function() {
  $("#stigmod-pg-workspace #stigmod-rcmd-right-scroll").height($(window).height() - 122 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，45是project标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#stigmod-pg-workspace #stigmod-rcmd-right-scroll").height($(window).height() - 122 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
  });
});

// 左侧导航栏点击激活
$(function() {
  var $lis = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .list-group-item').click(function() {
    $lis.removeClass('active');
    $(this).addClass('active');
  });
});

// 右侧内容栏点击激活
$(function() {
  var $panels = $('#stigmod-pg-workspace #stigmod-cont-right .panel').click(function() {
    $panels.removeClass('panel-primary').addClass('panel-default');
    $(this).removeClass('panel-default').addClass('panel-primary');
  });
});



/// 一切“编辑”按钮的点击编辑功能
$(function() {
  function enableEdit(btn) {
    var tagName = btn[0].tagName;
    if ('BUTTON' === tagName) {
      btn.removeClass('disabled');
    } else if ('SPAN' === tagName) {
      btn.addClass('glyphicon-edit');
    }
  }
  function disableEdit(btn) {
    var tagName = btn[0].tagName;
    if ('BUTTON' === tagName) {
      btn.addClass('disabled');
    } else if ('SPAN' === tagName) {
      btn.removeClass('glyphicon-edit');
    }
  }
  // 编辑
  function editElem(event) {
    var originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-text');
    var originalText = originalTextElem.text();  // 获取原始文字
    var editComponent = 
      '<span class="input-group input-group-xs">' +
        '<input type="text" class="form-control" value="' + originalText + '" placeholder="' + originalText + '">' +
        '<span class="input-group-btn">' +
          '<button class="btn btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button>' +
          '<button class="btn btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button>' +
        '</span>' +
      '</span>';
    var buttonDisable = $(this);
    // 取消编辑按钮防止多次点击 (!! TODO: 必须加入一个全局的功能：一旦一个文本进入编辑，除非撤销或确认，否则不能进行其他操作。若不加入此功能，则点击.stigmod-clickedit-btn-ok的时候会恢复所有的edit按钮的功能。)
    disableEdit(buttonDisable);
    originalTextElem.html('');
    originalTextElem.append(editComponent);  // 用编辑组件取代原始文字，并将原始文字写入编辑框的placeholder
    event.preventDefault();
  }
  // 确认编辑
  function submitEdit(event) {
    var buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    var newText = $(this).parent().prev().val();  // 获取编辑框内的palceholder
    $(this).parent().parent().parent().html(newText);  // 用新文字取代编辑组件
    // 恢复编辑按钮
    enableEdit(buttonDisable);
    event.preventDefault();  // 取消链接默认动作
  }
  // 取消编辑
  function cancelEdit(event) {
    var buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    var originalText = $(this).parent().prev().attr('placeholder');  // 获取编辑框内的palceholder
    $(this).parent().parent().parent().html(originalText);  // 用原始文字取代编辑组件
    // 恢复编辑按钮
    enableEdit(buttonDisable);
    event.preventDefault();  // 取消链接默认动作
  }
  $('.stigmod-clickedit-root').on('click', '.stigmod-clickedit-btn-edit', editElem); // “编辑”按钮的点击编辑功能
  $('.stigmod-clickedit-root').on('click', '.stigmod-clickedit-btn-ok', submitEdit); // 编辑组件内的“提交”按钮功能
  $('.stigmod-clickedit-root').on('click', '.stigmod-clickedit-btn-cancel', cancelEdit); // 编辑组件内的“取消”按钮功能
});

// ajax 测试
$(function() {
  $('#btn-search').click(function(event) {
    $.get("/string", function(string) {
      alert(string);
    });
    event.preventDefault();
  })
});
// $(function() {
//   $.get("/template_icm", function(icm) {
//     alert(icm.cm);
//   });
// });


