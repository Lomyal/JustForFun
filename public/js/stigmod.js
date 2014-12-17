/// debug function
function dump_obj(myObject) {  
  var s = "";  
  for (var property in myObject) {  
   s = s + "\n "+property +": " + myObject[property] ;  
  }  
  alert(s);  
}

/// 填入数据
$(function() {
  var model = 
 [
  {
    "Course": [
      {
        "code": [
          {
            "name": "code",
            "type": "string"
          }
        ],
        "credit": [
          {
            "name": "credit",
            "type": "float"
          }
        ],
        "availability": [
          {
            "name": "availability",
            "type": "CourseAvailability",
            "readOnly": "True"
          }
        ]
      }
    ],
    "CourseActivity": [
      {
        "startTime": [
          {
            "name": "startTime",
            "type": "Time"
          }
        ],
        "endTime": [
          {
            "name": "endTime",
            "type": "Time"
          }
        ]
      }
    ]
  },
  {
    "Course-CourseActivity": [
      {
        "relation0": [
          {
            "type": "Composition",
            "name": "haha",
            "end0": [
              {
                "role": "whole",
                "class": "Course",
                "multiplicity": "1"
              }
            ],
            "end1": [
              {
                "role": "part",
                "class": "CourseActivity",
                "multiplicity": "*"
              }
            ]
          }
        ]
      }
    ]
  }
];

  // 模型访问示例
  // alert(model[0]["Course"][0]["code"][0]["type"]);


  // 左侧栏的类和关系组组件
  var componentLeftClass = '<a href="#" class="list-group-item"><span></span><span class="glyphicon glyphicon-chevron-right pull-right"></span></a>';
  var componentLeftRelationGroup = '<a href="#" class="list-group-item"><span></span><span class="glyphicon glyphicon-chevron-right pull-right"></span></a>';

  // 向左侧栏填入组件和数据
  for (var modelClass in model[0]) { // 类名
    var $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group').append(componentLeftClass);
    $compo.find('a:last-child > span:first-child').text(modelClass);
  }
  for (var modelRelationGroup in model[1]) { // 关系组名
    var $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group').append(componentLeftRelationGroup);
    $compo.find('a:last-child > span:first-child').text(modelRelationGroup);
  }

  // 中间栏的 attribute 组件
  var componentMiddleAttribute = 
          '<div class="panel panel-default"> \
              <div class="panel-heading stigmod-hovershow-trig"> \
                <div class="panel-title"> \
                  <div class="row"> \
                    <div class="col-xs-2 stigmod-attr-cont-left-title"><span class="fa fa-bookmark"></span></div> \
                    <div class="col-xs-6 stigmod-attr-cont-middle-title stigmod-cursor-pointer" data-toggle="none">date : Date</div> \
                    <div class="col-xs-4 stigmod-attr-cont-right-title"> \
                      <div class="stigmod-hovershow-cont"> \
                        <span data-toggle="dropdown"><span class="fa fa-plus-circle" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                        <ul class="dropdown-menu" role="menu"> \
                          <li class="stigmod-dropdown-type" role="presentation"><a role="menuitem" tabindex="-1" href="#">type</a></li> \
                          <li class="stigmod-dropdown-multiplicity" role="presentation"><a role="menuitem" tabindex="-1" href="#">multiplicity</a></li> \
                          <li class="stigmod-dropdown-visibility" role="presentation"><a role="menuitem" tabindex="-1" href="#">visibility</a></li> \
                          <li class="stigmod-dropdown-default" role="presentation"><a role="menuitem" tabindex="-1" href="#">default</a></li> \
                          <li class="stigmod-dropdown-constraint" role="presentation"><a role="menuitem" tabindex="-1" href="#">constraint</a></li> \
                          <li class="stigmod-dropdown-ordering" role="presentation"><a role="menuitem" tabindex="-1" href="#">ordering</a></li> \
                          <li class="stigmod-dropdown-uniqueness" role="presentation"><a role="menuitem" tabindex="-1" href="#">uniqueness</a></li> \
                          <li class="stigmod-dropdown-readOnly" role="presentation"><a role="menuitem" tabindex="-1" href="#">readOnly</a></li> \
                          <li class="stigmod-dropdown-union" role="presentation"><a role="menuitem" tabindex="-1" href="#">union</a></li> \
                          <li class="stigmod-dropdown-subsets" role="presentation"><a role="menuitem" tabindex="-1" href="#">subsets</a></li> \
                          <li class="stigmod-dropdown-redefines" role="presentation"><a role="menuitem" tabindex="-1" href="#">redefines</a></li> \
                          <li class="stigmod-dropdown-composite" role="presentation"><a role="menuitem" tabindex="-1" href="#">composite</a></li> \
                        </ul> \
                        <span>&nbsp;&nbsp;&nbsp;</span> \
                        <span data-toggle="modal" data-target="#stigmod-modal-addattribute"><span class="fa fa-chevron-up" data-toggle="tooltip" data-placement="top" data-original-title="Add a new attribute above"></span></span> \
                        <span data-toggle="modal" data-target="#stigmod-modal-addattribute"><span class="fa fa-chevron-down" data-toggle="tooltip" data-placement="top" data-original-title="Add a new attribute below"></span></span> \
                        <span><span class="fa fa-remove" data-toggle="tooltip" data-placement="top" data-original-title="Delete this attribute"></span></span><span>&nbsp;&nbsp;&nbsp;</span> \
                        <span><span class="fa fa-arrow-up" data-toggle="tooltip" data-placement="top" data-original-title="Move up"></span></span> \
                        <span><span class="fa fa-arrow-down" data-toggle="tooltip" data-placement="top" data-original-title="Move down"></span></span> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
              <div class="panel-collapse collapse"> \
                <table class="stigmod-table-attribute"> \
                  <tbody> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-name" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">name</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp">date</span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-type" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">type</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp">Date</span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-multiplicity" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">multiplicity</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-visibility" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">visibility</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-default" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">default</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-constraint" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">constraint</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-ordering" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">ordering</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-ordering" value="true">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-ordering" value="false">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-uniqueness" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">uniqueness</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-uniqueness" value="true">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-uniqueness" value="false">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-readOnly" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">readOnly</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-readOnly" value="true">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-readOnly" value="false">False</label> \
                          </span> \
                        </span> \
                      </td> \
                     <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-union" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">union</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-union" value="true">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-union" value="false">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-subsets" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">subsets</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-redefines" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">redefines</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span  class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-attr-prop-composite" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">composite</td> \
                      <td class="stigmod-attr-cont-middle"> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-composite" value="true">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="radio-composite" value="false">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"> \
                          <div class="stigmod-hovershow-cont"> \
                            <span class="glyphicon glyphicon-edit stigmod-clickedit-btn-edit"></span> \
                            <span class="glyphicon glyphicon-trash"></span> \
                          </div> \
                        </span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="btn-group"> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                            <button class="btn btn-sm btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                          </span> \
                        </span> \
                      </td> \
                    </tr> \
                  </tbody> \
                </table> \
              </div> \
            </div>';

  // 向中间栏填入组件和数据
  var i = 0;
  for (var modelAttribute in model[0]["Course"][0]) { // 属性
    
    var $compo = $('#stigmod-cont-right .list-group').before(componentMiddleAttribute).prev();
    // 设置collapse属性
    var $collapseTrigger = $compo.find('.stigmod-attr-cont-middle-title').attr({'data-target': '#collapse' + i});
    var $collapseContent = $compo.find('.panel-collapse').attr({'id': 'collapse' + i});
    // 设置标题栏
    $collapseTrigger.text(modelAttribute);
    // 设置 properties
    for (var modelProperty in model[0]["Course"][0][modelAttribute][0]) {
      // alert(modelProperty);
      var $propertyRow = $collapseContent.find('.stigmod-attr-prop-' + modelProperty).show();
      var $blank = $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[0]["Course"][0][modelAttribute][0][modelProperty]);
    }

    ++i;
  }

});






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
    var $collapseToggle = $(this).find('.stigmod-attr-cont-middle-title, .stigmod-rel-cont-middle-title');
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
  // function enableEdit(btn) {
  //   var tagName = btn[0].tagName;
  //   if ('BUTTON' === tagName) {
  //     btn.removeClass('disabled');
  //   } else if ('SPAN' === tagName) {
  //     btn.css({'display': 'inline'});
  //   }
  // }
  // function disableEdit(btn) {
  //   var tagName = btn[0].tagName;
  //   if ('BUTTON' === tagName) {
  //     btn.addClass('disabled');
  //   } else if ('SPAN' === tagName) {
  //     btn.css({'display': 'none'});
  //   }
  // }

  // 编辑
  function editElem(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    // var $buttonDisable = $(this);
    //disableEdit($buttonDisable);
    var num = $originalTextElem.length;
    for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
      var originalText = $originalTextElem.eq(i).text();  // 获取原始文字
      switch (caseEdit) {
        case 'text' : // 输入框
          $editComponent.eq(i).find('input').val(originalText);
          break;
        case 'radio' : // 单选框
          var radio = $editComponent.eq(i).find('input');
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
        case 'reltype': // relation 页面的 relation type
          if (0 === i) {
            $editComponent.eq(i).find('button').text(originalText); 
          } else if (1 === i) {
            $editComponent.eq(i).find('input').val(originalText);
          }
          // 联动编辑 role、class、multipliciy
          var $relrole = $(this).closest('.stigmod-clickedit-root').next();
          var $relclass = $relrole.next();
          var $relmultiplicity = $relclass.next();
          $relrole.find('.stigmod-clickedit-btn-edit').trigger('click');
          $relclass.find('.stigmod-clickedit-btn-edit').trigger('click');
          $relmultiplicity.find('.stigmod-clickedit-btn-edit').trigger('click');
          break;
      }
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
    // var $buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    var num = $originalTextElem.length;
    for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
      var originalText = $originalTextElem.eq(i).text();  // 获取原始文字
      var newText = '';
      //enableEdit($buttonDisable);
      switch (caseEdit) {
        case 'text' :
          newText = $editComponent.eq(i).find('input').val();
          break;
        case 'radio' :
          newText = $editComponent.eq(i).find('input:checked').parent().text();
          break;
        case 'reltype': // relation 页面的 relation type
          if (0 === i) {
            newText = $editComponent.eq(i).find('button').text(); 
          } else if (1 === i) {
            newText = $editComponent.eq(i).find('input').val();
          }
          // 联动编辑 role、class、multipliciy
          var $relrole = $(this).closest('.stigmod-clickedit-root').next();
          var $relclass = $relrole.next();
          var $relmultiplicity = $relclass.next();
          $relrole.find('.stigmod-clickedit-btn-ok').trigger('click');
          $relclass.find('.stigmod-clickedit-btn-ok').trigger('click');
          $relmultiplicity.find('.stigmod-clickedit-btn-ok').trigger('click');
          break;
      }
      $originalTextElem.eq(i).text(newText);
    }
    $originalTextElem.css({'display': 'table'});
    $editComponent.css({'display': 'none'});
    event.preventDefault();
  }

  // 取消编辑
  function cancelEdit(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    // var $buttonDisable = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit');
    //enableEdit($buttonDisable);
    switch (caseEdit) {
        case 'reltype': // relation 页面的 relation type
          // 联动编辑 role、class、multipliciy
          var $relrole = $(this).closest('.stigmod-clickedit-root').next();
          var $relclass = $relrole.next();
          var $relmultiplicity = $relclass.next();
          $relrole.find('.stigmod-clickedit-btn-cancel').trigger('click');
          $relclass.find('.stigmod-clickedit-btn-cancel').trigger('click');
          $relmultiplicity.find('.stigmod-clickedit-btn-cancel').trigger('click');
          break;
      }
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
  $('.stigmod-attr-cont-right-title .dropdown-menu a, .stigmod-rel-cont-right-title .dropdown-menu a').on('click', function(event) {
    var nameProp = $(this).text();
    var $propertyRow = $(this).closest('.panel').find('.stigmod-attr-prop-' + nameProp + ', .stigmod-rel-prop-' + nameProp);
    $propertyRow.show();
    $propertyRow.find('.stigmod-clickedit-btn-edit').trigger('click');
    event.preventDefault();
  });
});

/// 解决下拉菜单随按钮隐藏的问题（下拉菜单显示时，去掉该菜单父元素中的悬停显示的触发器）
$(function() {
  $('.stigmod-hovershow-trig').on('show.bs.dropdown', function () {
    $(this).removeClass('stigmod-hovershow-trig');
    // 顺带解决：下拉菜单展开时显示哪些内容的问题
    var $propertyRowsHidden = $(this).closest('.panel').find('.stigmod-clickedit-root:hidden'); // TODO:这个尽在panel展开时有效，是当前的临时方案。以后应该通过全局变量记录状态，而不是从页面上分析。
    var $lis = $(this).find('.panel-title .dropdown-menu li');
    $lis.hide();
    $propertyRowsHidden.each(function() {
      var nameProp = $(this).find('.stigmod-attr-cont-left').text();
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
    var num = $text.length;
    for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
      $text.eq(i).text('');
    }
    $root.hide();
  });
});

/// addrelation 中的下拉菜单
$(function() {
  $('#stigmod-dropdown-reltype-modal a').on('click', function(event) {
    var reltype = $(this).html();
    var $root = $(this).closest('.stigmod-table-addrelation');
    var $btn = $(this).closest('#stigmod-dropdown-reltype-modal').find('button');
    var $nameModify = $root.find('#stigmod-addrel-type').find('.stigmod-input');
    var $roleModify = $root.find('#stigmod-addrel-role').find('.stigmod-input');
    var $multiplicityModify = $root.find('#stigmod-addrel-multiplicity').find('.stigmod-input');
    switch (reltype) {
      case 'Generalization':
        $btn.html('Generalization');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'disabled': ''}).val('father');
        $roleModify.eq(1).attr({'disabled': ''}).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('');
        break;
      case 'Composition':
        $btn.html('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('whole');
        $roleModify.eq(1).attr({'disabled': ''}).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.html('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('owner');
        $roleModify.eq(1).attr({'disabled': ''}).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.html('Association');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).removeAttr('disabled').val('');
        $roleModify.eq(1).removeAttr('disabled').val('');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
    }
    event.preventDefault();
  });
});
// addrelation 中点击交互 classname
$(function() {
  $('#stigmod-addrel-class .glyphicon-transfer').on('click', function(event) {
    var $classnames = $(this).closest('#stigmod-addrel-class').find('.stigmod-input');
    var tmp = $classnames.first().val();
    $classnames.first().val($classnames.last().val());
    $classnames.last().val(tmp);
    event.preventDefault();
  });
});

/// revise relation 中的下拉菜单
$(function() {
  $('#stigmod-dropdown-reltype a').on('click', function(event) {
    var reltype = $(this).html();
    var $root = $(this).closest('.stigmod-table-relation');
    var $btn = $(this).closest('#stigmod-dropdown-reltype').find('button');
    var $nameModify = $root.find('.stigmod-rel-prop-type').find('.stigmod-input');
    var $roleModify = $root.find('.stigmod-rel-prop-role').find('.stigmod-input');
    var $multiplicityModify = $root.find('.stigmod-rel-prop-multiplicity').find('.stigmod-input');
    switch (reltype) {
      case 'Generalization':
        $btn.html('Generalization');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'disabled': ''}).val('father');
        $roleModify.eq(1).attr({'disabled': ''}).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('');
        break;
      case 'Composition':
        $btn.html('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('whole');
        $roleModify.eq(1).attr({'disabled': ''}).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.html('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('owner');
        $roleModify.eq(1).attr({'disabled': ''}).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.html('Association');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).removeAttr('disabled').val('');
        $roleModify.eq(1).removeAttr('disabled').val('');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
    }
    event.preventDefault();
  });
});
// addrelation 中点击交互 classname
$(function() {
  $('.stigmod-rel-prop-class .glyphicon-transfer').on('click', function(event) {
    var $classnames = $(this).closest('.stigmod-rel-prop-class').find('.stigmod-input');
    var tmp = $classnames.first().val();
    $classnames.first().val($classnames.last().val());
    $classnames.last().val(tmp);
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
