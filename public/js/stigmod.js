/// DEBUG 用函数
function dump_obj(myObject) {  
  var s = "";  
  for (var property in myObject) {  
   s = s + "\n "+property +": " + myObject[property] ;  
  }  
  alert(s);  
}


/// 打开bootstrap的tool部分功能
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
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

/// 左侧导航栏点击激活
$(function() {
  var $lis = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .list-group-item');
  $lis.on('click', function() {
    $lis.removeClass('active');
    $(this).addClass('active');
  });
});

/// 右侧内容栏点击激活
$(function() {
  var $panels = $('#stigmod-pg-workspace #stigmod-cont-right .panel');
  $panels.on('click', function() {
    var $collapseToggle = $(this).find('.stigmod-attri-cont-middle-title');
    $collapseToggle.attr('data-toggle', 'none');  // 禁用其他panel的collapse触发器
    if ($(this).hasClass('panel-primary')) {  // 第一次点击本panel激活后，第二次点击时打开本panel的collapse触发器
      $collapseToggle.attr('data-toggle', 'collapse');
    }
    $panels.removeClass('panel-primary').addClass('panel-default');
    $(this).removeClass('panel-default').addClass('panel-primary');  // 激活本panel
  });
});



/// 一切“编辑”按钮的点击编辑功能
$(function() {

  // 编辑按钮使能
  function enableEdit(btn) {
    var tagName = btn[0].tagName;
    if ('BUTTON' === tagName) {
      btn.removeClass('disabled');
    } else if ('SPAN' === tagName) {
      btn.css({'display': 'inline'});
    }
  }
  function disableEdit(btn) {
    var tagName = btn[0].tagName;
    if ('BUTTON' === tagName) {
      btn.addClass('disabled');
    } else if ('SPAN' === tagName) {
      btn.css({'display': 'none'});
    }
  }

  // 编辑
  function editElem(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    var $buttonDisable = $(this);
    var originalText = $originalTextElem.text();  // 获取原始文字
    disableEdit($buttonDisable);
    switch (caseEdit) {
      case 'text' :
        $editComponent.find('input').attr({
          'placeholder': originalText
        }).val(originalText);
        break;
      case 'radio' :
        var radio = $editComponent.find('input');
        if ('True' === originalText) {
          radio.eq(0).attr({'checked': ''});
          radio.eq(1).removeAttr('checked');
        } else if ('False' === originalText) {
          radio.eq(1).attr({'checked': ''});
          radio.eq(0).removeAttr('checked');
        } else {
          radio.eq(1).removeAttr('checked');
          radio.eq(0).removeAttr('checked');
        }
        break;
    }
    $originalTextElem.css({'display': 'none'});
    $editComponent.css({'display': 'table'});
    event.preventDefault();
  }

  // 确认编辑
  function submitEdit(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    var $buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    var originalText = $originalTextElem.text();  // 获取原始文字
    var newText = '';
    enableEdit($buttonDisable);
    switch (caseEdit) {
      case 'text' :
        newText = $editComponent.find('input').val();
        break;
      case 'radio' :
        newText = $editComponent.find('input:checked').parent().text();
        break;
    }
    $originalTextElem.text(newText);
    $originalTextElem.css({'display': 'table'});
    $editComponent.css({'display': 'none'});
    event.preventDefault();
  }

  // 取消编辑
  function cancelEdit(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    var $buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    enableEdit($buttonDisable);
    $originalTextElem.css({'display': 'table'});
    $editComponent.css({'display': 'none'});
    event.preventDefault();
  }

  $(document).on('click', '.stigmod-clickedit-btn-edit', editElem); // “编辑”按钮的点击编辑功能
  $(document).on('click', '.stigmod-clickedit-btn-ok', submitEdit); // 编辑组件内的“提交”按钮功能
  $(document).on('click', '.stigmod-clickedit-btn-cancel', cancelEdit); // 编辑组件内的“取消”按钮功能
});

/// ajax 测试
$(function() {
  $('#btn-search').click(function(event) {
    $.get('/string', function(string) {
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

/// add attribute 和 add relation 的 modal 中 checkbox 的动作
$(function() {
  $('#stigmod-modal-addattribute input[type="checkbox"]').on('change', function() {
    var id = '#stigmod-addatt-' + $(this).attr('value');
    if ($(this).is(':checked')) {
      $(id).css({'display': 'table-row'/*, 'color': '#428bca'*/});
    } else {
      $(id).css({'display': 'none'});
    }
  });
});
$(function() {
  $('#stigmod-modal-addrelation input[type="checkbox"]').on('change', function() {
    var id = '#stigmod-addrel-' + $(this).attr('value');
    if ($(this).is(':checked')) {
      $(id).css({'display': 'table-row'/*, 'color': '#428bca'*/});
    } else {
      $(id).css({'display': 'none'});
    }
  });
});

/// add property 下拉菜单的响应函数
$(function() {
  $('.stigmod-attri-cont-right-title .dropdown-menu a').on('click', function(event) {
    var nameProp = $(this).text();
    var $propertyRow = $(this).closest('.panel').find('.stigmod-attr-prop-' + nameProp);
    $propertyRow.show();
    $propertyRow.find('.stigmod-clickedit-btn-edit').trigger('click');
    // $it.css({'display': 'table-row'});
    event.preventDefault();
  });
});

/// 解决下拉菜单随按钮隐藏的问题（下拉菜单显示时，去掉该菜单父元素中的悬停显示的触发器）
$(function() {
  $('.stigmod-hovershow-trig').on('show.bs.dropdown', function () {
    $(this).removeClass('stigmod-hovershow-trig');
    // 顺带解决：下拉菜单展开时显示那些内容的问题
    var $propertyRowsHidden = $(this).closest('.panel').find('.stigmod-clickedit-root:hidden'); // TODO:这个尽在panel展开时有效，是当前的临时方案。以后应该通过全局变量记录状态，而不是从页面上分析。
    var $lis = $(this).find('.dropdown-menu li');
    $lis.hide();
    $propertyRowsHidden.each(function() {
      var nameProp = $(this).find('.stigmod-attri-cont-left').text();
      $(this).closest('.panel').find('.stigmod-dropdown-' + nameProp).show();
    });

  });
  $('.stigmod-hovershow-trig').on('hide.bs.dropdown', function () {
    $(this).addClass('stigmod-hovershow-trig');
  });
});

/// attribute页面删除property
$(function() {
  $(document).on('click', '.glyphicon-trash', function() {
    var $root = $(this).closest('.stigmod-clickedit-root');
    var $text = $root.find('.stigmod-clickedit-disp');
    $root.hide();
    $text.text('');
  });
});

/// addrelation 中的下拉菜单
$(function() {
  $('#stigmod-dropdown-reltype a').on('click', function(event) {
    var reltype = $(this).html();
    var $root = $(this).closest('.stigmod-table-addrelation');
    var $btn = $(this).closest('#stigmod-dropdown-reltype').find('button');
    var $nameModify = $root.find('#stigmod-addrel-type').find('.stigmod-modal-input');
    var $roleModify = $root.find('#stigmod-addrel-role').find('.stigmod-modal-input');
    var $multiplicityModify = $root.find('#stigmod-addrel-multiplicity').find('.stigmod-modal-input');
    switch (reltype) {
      case 'Generalization':
        $btn.html('Generalization');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'value': 'father', 'disabled': ''});
        $roleModify.eq(1).attr({'value': 'child', 'disabled': ''});
        $multiplicityModify.eq(0).attr({'value': '', 'disabled': ''});
        $multiplicityModify.eq(1).attr({'value': '', 'disabled': ''});
        break;
      case 'Composition':
        $btn.html('Composition');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'value': 'whole', 'disabled': ''});
        $roleModify.eq(1).attr({'value': 'part', 'disabled': ''});
        $multiplicityModify.eq(0).attr({'value': '1', 'disabled': ''});
        $multiplicityModify.eq(1).attr({'value': ''}).removeAttr('disabled');
        break;
      case 'Aggregation':
        $btn.html('Aggregation');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'value': 'owner', 'disabled': ''});
        $roleModify.eq(1).attr({'value': 'ownee', 'disabled': ''});
        $multiplicityModify.eq(0).attr({'value': ''}).removeAttr('disabled');
        $multiplicityModify.eq(1).attr({'value': ''}).removeAttr('disabled');
        break;
      case 'Association':
        $btn.html('Association');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'value': ''}).removeAttr('disabled');
        $roleModify.eq(1).attr({'value': ''}).removeAttr('disabled');
        $multiplicityModify.eq(0).attr({'value': ''}).removeAttr('disabled');
        $multiplicityModify.eq(1).attr({'value': ''}).removeAttr('disabled');
        break;
    }
    event.preventDefault();
  });
});
// addrelation 中点击交互 classname
$(function() {
  $('#stigmod-addrel-class .glyphicon-transfer').on('click', function(event) {
    var $classnames = $(this).closest('#stigmod-addrel-class').find('.stigmod-modal-input');
    var tmp = $classnames.first().attr('value');
    $classnames.first().attr('value', $classnames.last().attr('value'));
    $classnames.last().attr('value', tmp);
    event.preventDefault();
  });
});



/// 用d3实现model可视化
+function d3view() {

  var w = 500;
  var h = 400;

  var dataset = {
    nodes: [
      { name: "Student" , 
        property: [
          { name: "StudentName"},
          { name: "StudentID"},
          { name: "Password"}
        ]
      },
      { name: "Course" ,
        property: [
          { name: "CourseName"},
          { name: "CourseID"},
          { name: "CourseCategory"},
          { name: "Credit"},
          { name: "Place"},
          { name: "Time"},
          { name: "Teacher"}
        ]
      },
      { name: "CourseList" ,
        property: [
          { name: "StudentID"},
          { name: "CourseID"}
        ]
      },
      { name: "SelectedCourses" ,
        property: [
          { name: "Major"},
          { name: "SpecialDate"},
          { name: "Calendar"}
        ]
      },
      { name: "CourseChart" ,
        property: [
          { name: "CourseID"},
          { name: "CourseName"},
          { name: "Teacher"},
          { name: "StudentType"},
          { name: "CourseType"},
          { name: "ClassNumber"}
        ]
      },
      { name: "CourseManager" ,
        property: [
          { name: "ManagerName"},
          { name: "WorkID"},
          { name: "Password"}
        ]
      }
    ],
    edges: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 1, target: 3 },
      { source: 2, target: 3 },
      { source: 2, target: 5 },
      { source: 3, target: 5 },
      { source: 4, target: 5 }
    ]
  };

  var svg = d3.select("#stigmod-d3view-left").append("svg")
    .attr("width", w)  
    .attr("height", h); 
        
  //Initialize a default force layout, using the nodes and edges in dataset
  var force = d3.layout.force()
    .nodes(dataset.nodes)
    .links(dataset.edges)
    .size([w, h])
    .linkDistance(100)
    .charge([-400])
    .start();

  var colors = d3.scale.category10();

  var link = svg.selectAll(".link")  
    .data(dataset.edges)  
    .enter().append("g")  
    .attr("class", "link");  

  link.append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

  /*link.append("text")
      .attr("dy", ".35em") // vertical-align: middle 标签垂直居中
      .attr("text-anchor", "middle") 
      .text("0");*/
      //.text(function(d) { return d.name; });

  function radiusover (d) {   
    if(!d.weight){//节点weight属性没有值初始化为1（一般就是叶子了）  
      d.weight = 1;  
    }                                                
    return d.weight * 3 + 5;                                     
  }                                                                     

  function radiuson (d) {   
    if(!d.weight){//节点weight属性没有值初始化为1（一般就是叶子了）  
      d.weight = 1;  
    }                                                
    return d.weight * 3 + 10;                                     
  }

  var node = svg.selectAll(".node")  
    .data(dataset.nodes) 
    .enter().append("g")  
    .attr("class", "node")
    .on("mouseover", mouseover)  
    .on("mouseout", mouseout)  
    .on("click", function(d){
      d3.select(".property")
        .remove();
      d3.select("#stigmod-d3view-right")
        .append("div")
        .attr("class","property");
      d3.select(".property")
        .append("br");
      d3.select(".property")
        .append("p")
        .attr("style","padding-left:10%;font-weight:bold")
        .text("Class:");
      d3.select(".property")
        .append("p")
        .attr("style","padding-left:20%")
        .text(d.name);
      d3.select(".property")
        .append("br");
      d3.select(".property")
        .append("p")
        .attr("style","padding-left:10%;font-weight:bold")
        .text("Properties:");
      d.property.forEach(function(property){
        d3.select(".property")
        .append("p")
        .attr("style","padding-left:20%")
        .text(property.name);
      });
      /*d3.select(".property")
        .append("table")
        .attr("class", "details")
        .attr("align", "center")
        .attr("border","1");
      d3.select(".details")
        .append("tr")
        .attr("style","text-align:center;font-weight:bold")
        .text(d.name);
      d.property.forEach(function(property){
        d3.select(".details")
        .append("tr")
        .text(property.name);
      });*/
    }) 
    .call(force.drag);

  node.append("circle")  
    //.attr("r", 10)  
    .attr("r",function(d){  //设置圆点半径                        
      return radiusover (d);                            
    })
    .style("fill", function(d,i) {
      return colors(i);
    });

  node.append("title")
    .text(function(d) { return d.name; });  

  node.append("text")  
    .text(function(d) { return d.name; });

  //Every time the simulation "ticks", this will be called

  force.on("tick", function() {

    link.selectAll("line")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

    link.selectAll("text")
      .attr("x", function(d) { return (d.source.x + d.target.x)/2; })
      .attr("y", function(d) { return (d.source.y + d.target.y)/2; });

    node.selectAll("text")
      .attr("x", function(d) { return d.x + 17; })
      .attr("y", function(d) { return d.y + 5; });
  });

  function mouseover() {  
    d3.select(this).select("circle").transition()  
      .duration(500)
      .ease("bounce")
      //.attr("r", 15)
      .attr("r",function(d){  //设置圆点半径                        
        return radiuson (d);                            
      })
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2.5);
      /*d3.select(this)
      .append("text")
      .transition()  
      .duration(100)
      .text(function(d) { return d.name; });*/
  }  

  function mouseout() {  
    d3.select(this).select("circle").transition()  
      .duration(500)  
      //.attr("r", 10)
      .attr("r",function(d){  //设置圆点半径                        
        return radiusover (d);                            
      })
      .attr("stroke-width", 0);
      /*d3.select(this)
      .select("text")
      .remove();*/
  }

}();
