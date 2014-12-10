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

/// ajax 测试
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

/// add properties 的 modal 中 checkbox 的动作
$(function() {
  $('#stigmod-modal-addproperty input[type="checkbox"]').on('change', function() {
    var id = '#stigmod-addprop-' + $(this).attr('value');
    if ($(this).is(':checked')) {
      //alert($(id).attr('id'));
      $(id).css('display', 'table-row');
      $(id).css('color', '#428bca');
    } else {
      $(id).css('display', 'none');
    }
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
