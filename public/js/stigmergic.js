/// 打开工具提示功能
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/// 左侧导航栏高度自适应
$(function() {
  $("#navLeftScroll").height($(window).height() - 167 - 40 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，40是左侧标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#navLeftScroll").height($(window).height() - 167 - 40 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
  });
});

// 左侧导航栏点击激活
$(function() {
  var $lis = $('#navLeftScroll .list-group-item').click(function() {
    $lis.removeClass('active');
    $(this).addClass('active');
  });
});

// 右侧内容栏点击激活
$(function() {
  var $panels = $('#contRight .panel').click(function() {
    $panels.removeClass('panel-primary').addClass('panel-default');
    $(this).removeClass('panel-default').addClass('panel-primary');
    // $panels.switchClass('panel-primary', 'panel-default');  // 新功能？jQuery1.11.1不支持
    // $(this).switchClass('panel-default', 'panel-primary');
  });
});

// 一切“编辑”按钮的点击编辑功能（要求）
$(function() {
  $('.glyphicon-edit').click(function(event) {  // jQuery1.11中推荐的写法
    var originalText = $(this).parent().parent().prev().html();  // 获取原始文字
    $(this).parent().parent().prev().html(  // 用编辑组件取代原始文字，并将原始文字写入编辑框的placeholder
      '<div class="input-group input-group-xs">' +
        '<input type="text" class="form-control" value="' + originalText + '" placeholder="' + originalText + '">' +
        '<span class="input-group-btn">' +
          '<button class="btn btn-default buttonOk" type="button"><span class="glyphicon glyphicon-ok"></span></button>' +
          '<button class="btn btn-default buttonCancel" type="button"><span class="glyphicon glyphicon-remove"></span></button>' +
        '</span>' +
      '</div>'
    );
    // 编辑组件内的“提交”按钮功能
    $('.buttonOk').click(function(event) {
      var newText = $(this).parent().prev().val();  // 获取编辑框内的palceholder
      $(this).parent().parent().parent().html(newText);  // 用原始文字取代编辑组件
      event.preventDefault();  // 取消链接默认动作
    });
    // 编辑组件内的“取消”按钮功能
    $('.buttonCancel').click(function(event) {
      var originalText = $(this).parent().prev().attr('placeholder');  // 获取编辑框内的palceholder
      $(this).parent().parent().parent().html(originalText);  // 用原始文字取代编辑组件
      event.preventDefault();  // 取消链接默认动作
    });
    event.preventDefault();  // 取消链接默认动作 jQuery1.11中推荐的写法
  });
});


// $(function() {
//   $('.glyphicon-remove').on('click', function() {
//     // get
//     var originalText = $(this).parent().parent().prev().attr('placeholder');
//     // replace
//     $(this).parent().parent().parent().parent().html(originalText);
//     // cancel the default action of the link by returning false
//     return false;
//   });
// });

