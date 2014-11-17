/// 打开工具提示功能
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/// 左侧、右侧栏目高度自适应
$(function() {
  $("#navLeftScroll").height($(window).height() - 167 - 10 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，45是project标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#navLeftScroll").height($(window).height() - 167 - 10 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
  });
});
$(function() {
  $("#contRightScroll").height($(window).height() - 122 - 80);  // 页面加载后，调整左侧导航栏高度以适应窗口大小，167为经验值，45是project标题栏高度，80是底部footer的高度
  $(window).resize(function(){
    $("#contRightScroll").height($(window).height() - 122 - 80);  // 每次调整窗口大小后，调整左侧导航栏高度以适应窗口大小，167为经验值
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

// // 一切“编辑”按钮的点击编辑功能
// $(function() {
//   $('.glyphicon-edit').click(function(event) {  // jQuery1.11中推荐的写法
//     var originalText = $(this).parent().parent().prev().html();  // 获取原始文字
//     $(this).parent().parent().prev().html(  // 用编辑组件取代原始文字，并将原始文字写入编辑框的placeholder
//       '<div class="input-group input-group-xs">' +
//         '<input type="text" class="form-control" value="' + originalText + '" placeholder="' + originalText + '">' +
//         '<span class="input-group-btn">' +
//           '<button class="btn btn-default buttonOk" type="button"><span class="glyphicon glyphicon-ok"></span></button>' +
//           '<button class="btn btn-default buttonCancel" type="button"><span class="glyphicon glyphicon-remove"></span></button>' +
//         '</span>' +
//       '</div>'
//     );
//     // 编辑组件内的“提交”按钮功能
//     $('.buttonOk').click(function(event) {
//       var newText = $(this).parent().prev().val();  // 获取编辑框内的palceholder
//       $(this).parent().parent().parent().html(newText);  // 用原始文字取代编辑组件
//       event.preventDefault();  // 取消链接默认动作
//     });
//     // 编辑组件内的“取消”按钮功能
//     $('.buttonCancel').click(function(event) {
//       var originalText = $(this).parent().prev().attr('placeholder');  // 获取编辑框内的palceholder
//       $(this).parent().parent().parent().html(originalText);  // 用原始文字取代编辑组件
//       event.preventDefault();  // 取消链接默认动作
//     });
//     event.preventDefault();  // 取消链接默认动作 jQuery1.11中推荐的写法
//   });
// });

// 一切“编辑”按钮的点击编辑功能
$(function() {
  $('.buttonEdit').click(function(event) {  // jQuery1.11中推荐的写法
    // var originalText = $(this).parent().parent().prev().html();  // 获取原始文字
    var originalTextElem = $(this).closest('.rootClickEdit').find('.textEdit');
    var originalText = originalTextElem.text()  // 获取原始文字
    var editConponent = 
      '<span class="input-group input-group-xs">' +
        '<input type="text" class="form-control" value="' + originalText + '" placeholder="' + originalText + '">' +
        '<span class="input-group-btn">' +
          '<button class="btn btn-default buttonOk" type="button"><span class="glyphicon glyphicon-ok"></span></button>' +
          '<button class="btn btn-default buttonCancel" type="button"><span class="glyphicon glyphicon-remove"></span></button>' +
        '</span>' +
      '</span>';
    // 取消编辑功能防止多次点击 (!! TODO: 必须加入一个全局的功能：一旦一个文本进入编辑，除非撤销或确认，否则不能进行其他操作。若不加入此功能，则点击.buttonOk的时候会恢复所有的edit按钮的功能。)
    var buttonDisable = $(this);
    var tagName = buttonDisable[0].tagName;
    if ('BUTTON' === tagName) {
      buttonDisable.addClass('disabled');
    } else if ('SPAN' === tagName) {
      buttonDisable.removeClass('glyphicon-edit');
    }
    originalTextElem.html(editConponent);  // 用编辑组件取代原始文字，并将原始文字写入编辑框的placeholder
    // 编辑组件内的“提交”按钮功能
    $('.buttonOk').click(function(event) {
      var newText = $(this).parent().prev().val();  // 获取编辑框内的palceholder
      $(this).parent().parent().parent().html(newText);  // 用新文字取代编辑组件
      // 恢复编辑功能
      if ('BUTTON' === tagName) {
        buttonDisable.removeClass('disabled');
      } else if ('SPAN' === tagName) {
        buttonDisable.addClass('glyphicon-edit');
      }
      event.preventDefault();  // 取消链接默认动作
    });
    // 编辑组件内的“取消”按钮功能
    $('.buttonCancel').click(function(event) {
      var originalText = $(this).parent().prev().attr('placeholder');  // 获取编辑框内的palceholder
      $(this).parent().parent().parent().html(originalText);  // 用原始文字取代编辑组件
      // 恢复编辑功能
      if ('BUTTON' === tagName) {
        buttonDisable.removeClass('disabled');
      } else if ('SPAN' === tagName) {
        buttonDisable.addClass('glyphicon-edit');
      }
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

