/// debug function
function dump_obj(myObject) {  
  var s = "";  
  for (var property in myObject) {  
   s = s + "\n "+property +": " + myObject[property] ;  
  }  
  alert(s);  
}

/// 前端模型
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
            "role": ["whole", "part"],
            "class": ["Course", "CourseActivity"],
            "multiplicity": ["1", "*"]
          }
        ]
      }
    ]
  }
]; 
// 模型访问示例
// alert(model[0]["Course"][0]["code"][0]["type"]);

// 记录 workspace 页面的状态
var stateOfPage = 
{
  "model": "",
  "flagCRG": 0, // 0: class, 1: relationGroup
  "flagDepth": 0, // for class: (0: class, 1: attribute, 2: propertyOfA) for relationGroup: (0: relationGroup, 1: relation, 2: propertyOfR)
  "class": "",  // relationGroup
  "attribute": "", // relation
  "property": "", // property
}

// Model 操作底层函数 addElemInModel removeElemInModel 
function addElemInModel(model, path, keyValue) { // 添加、修改元素 (addElemInModel 同时还有 modify value 的作用，但若想 modify key，则需要 modifyElemInModel)
  var len = path.length;
  var innerModel = model[path.pop()];
  while (0 != path.length) {
    // dump_obj(innerModel);
    innerModel = innerModel[path.pop()];
  }
  innerModel[keyValue[0]] = keyValue[1];
}
function modifyElemInModel(model, path, keyOld, KeyNew) {  // modify key
  var len = path.length;
  var innerModel = model[path.pop()];
  while (0 != path.length) {
    // dump_obj(innerModel);
    innerModel = innerModel[path.pop()];
  }
  innerModel[KeyNew] = innerModel[keyOld];
  delete innerModel[keyOld];
}
function removeElemInModel(model, path, key) { // 删除元素(keyvalue全部删除)
  var len = path.length;
  var innerModel = model[path.pop()];
  while (0 != path.length) {
    // dump_obj(innerModel);
    innerModel = innerModel[path.pop()];
  }
  delete innerModel[key];
}

// Model 操作高层函数
function addClass(model, className) {
  addElemInModel(model, [0], [className, [{}]]); // 最里边的大括号很重要……
}
function addAttribute(model, className, attributeName) {
  addElemInModel(model, [0, className, 0], [attributeName, [{}]]);
}
function addPropertyOfA(model, className, attributeName, propertyKeyValue) {
  addElemInModel(model, [0, attributeName, 0, className, 0], propertyKeyValue);
}
function addRelationGroup(model, relationGroupName) {
  addElemInModel(model, [1], [relationGroupName, [{}]]); // 最里边的大括号很重要……
}
function addRelation(model, relationGroupName, relationName) {
  addElemInModel(model, [0, relationGroupName, 1], [relationName, [{}]]);
}
function addPropertyOfR(model, relationGroupName, relationName, propertyKeyValue) {
  addElemInModel(model, [0, relationName, 0, relationGroupName, 1], propertyKeyValue);
}


function modifyClass(model, className, newName) {
  modifyElemInModel(model, [0], className, newName);
}
function modifyAttribute(model, className, attributeName, newName) {
  modifyElemInModel(model, [0, className, 0], attributeName, newName);
}
function modifyPropertyOfA(model, className, attributeName, propertyKey, newName) {
  modifyElemInModel(model, [0, attributeName, 0, className, 0], propertyKey, newName);
}


function removeClass(model, className) {
  removeElemInModel(model, [0], className);
}
function removeAttribute(model, className, attributeName) {
  removeElemInModel(model, [0, className, 0], attributeName);
}
function removePropertyOfA(model, className, attributeName, propertyKey) {
  removeElemInModel(model, [0, attributeName, 0, className, 0], propertyKey);
}



// 左侧栏的类和关系组组件
var componentLeftClass = '<a href="#" class="list-group-item"><span class="stigmod-nav-left-class"></span><span class="glyphicon glyphicon-chevron-right pull-right"></span></a>';
var componentLeftRelationGroup = '<a href="#" class="list-group-item"><span class="stigmod-nav-left-relationgroup"></span><span class="glyphicon glyphicon-chevron-right pull-right"></span></a>';
// 中间栏的 attribute Basic 组件
var componentMiddleAttributeBasic = 
          '<div class="row stigmod-clickedit-root" stigmod-clickedit-case="title"> \
            <div class="col-xs-8" id="stigmod-classname"> \
              <span class="stigmod-keepinline"> \
                <span class="glyphicon glyphicon-th-large" id="stigmod-classname-icon"></span> \
                <span id="stigmod-classname-title">CLASS</span> \
                <span> |&nbsp;</span> \
              </span> \
              <span class="stigmod-clickedit-disp"></span> \
              <span class="input-group input-group-xs stigmod-clickedit-edit"> \
                <input type="text" class="form-control" value="" placeholder=""> \
                <span class="input-group-btn"> \
                  <button class="btn btn-default stigmod-clickedit-btn-ok" type="button"><span class="glyphicon glyphicon-ok"></span></button> \
                  <button class="btn btn-default stigmod-clickedit-btn-cancel" type="button"><span class="glyphicon glyphicon-remove"></span></button> \
                </span> \
              </span> \
            </div> \
            <div class="col-xs-4"> \
              <div class="btn-group pull-right"> \
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#stigmod-modal-addattribute"> \
                  <span class="glyphicon glyphicon-plus" data-toggle="tooltip" data-placement="left" data-original-title="Add a new attribute"></span> \
                </button> \
                <button type="button" class="btn btn-default stigmod-clickedit-btn-edit"> \
                  <span class="glyphicon glyphicon-edit" data-toggle="tooltip" data-placement="left" data-original-title="Edit class name"></span> \
                </button> \
                <div class="btn-group"> \
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> \
                    <span class="glyphicon glyphicon-cog" data-toggle="tooltip" data-placement="left" data-original-title="Configurations"></span> \
                  </button> \
                  <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                    <li><a href="#" class="stigmod-remove-trig">Delete this class</a></li> \
                  </ul> \
                </div> \
              </div> \
            </div> \
          </div> \
          <hr class="stigmod-hr-narrow"/> \
          <div id="stigmod-cont-right"> \
            <!-- 属性 --> \
            <div class="panel-heading"> \
              <p id="stigmod-attr-title"><span class="fa fa-book"></span>&nbsp; ATTRIBUTE</p> \
            </div> \
            <!-- template Middle --> \
            <div class="list-group"> \
              <div class="list-group-item text-center stigmod-cursor-pointer" data-toggle="modal" data-target="#stigmod-modal-addattribute"> \
                <a>Add a New Attribute</a> \
              </div> \
            </div> \
          </div>';
// 中间栏的 attribute 组件
var componentMiddleAttribute = 
        '<div class="panel panel-default"> \
            <div class="panel-heading stigmod-hovershow-trig"> \
              <div class="panel-title"> \
                <div class="row"> \
                  <div class="col-xs-2 stigmod-attr-cont-left-title"><span class="fa fa-bookmark"></span></div> \
                  <div class="col-xs-6 stigmod-attr-cont-middle-title stigmod-cursor-pointer" data-toggle="none"></div> \
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
                      <span><span class="fa fa-remove" data-toggle="tooltip" data-placement="top" data-original-title="Remove this attribute"></span></span><span>&nbsp;&nbsp;&nbsp;</span> \
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
// 中间栏的 relation Basic 组件
var componentMiddleRelationBasic = 
          '<div class="row stigmod-clickedit-root"> \
            <div class="col-xs-8" id="stigmod-classname"> \
              <span class="stigmod-keepinline"> \
                <span class="glyphicon glyphicon-random" id="stigmod-classname-icon"></span> \
                <span id="stigmod-classname-title"> RELATION GROUP</span> \
                <span> |&nbsp;</span> \
              </span> \
              <span class="stigmod-clickedit-text"></span> \
            </div> \
            <div class="col-xs-4"> \
              <div class="btn-group pull-right"> \
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#stigmod-modal-addrelation"> \
                  <span class="glyphicon glyphicon-plus" data-toggle="tooltip" data-placement="left" data-original-title="Add a new relation"></span> \
                </button> \
                <button type="button" class="btn btn-default stigmod-clickedit-btn-edit" disabled> \
                  <span class="glyphicon glyphicon-edit"></span> \
                </button> \
                <div class="btn-group"> \
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> \
                    <span class="glyphicon glyphicon-cog" data-toggle="tooltip" data-placement="left" data-original-title="Configurations"></span> \
                  </button> \
                  <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                    <li><a href="#">Delete this relation group</a></li> \
                  </ul> \
                </div> \
              </div> \
            </div> \
          </div> \
          <hr class="stigmod-hr-narrow"/> \
          <div id="stigmod-cont-right"> \
            <!-- 属性 --> \
            <div class="panel-heading"> \
              <p id="stigmod-rel-title"><span class="fa fa-book"></span>&nbsp; RELATION</p> \
            </div> \
            <!-- relation template here --> \
            <div class="list-group"> \
              <div class="list-group-item text-center stigmod-cursor-pointer" data-toggle="modal" data-target="#stigmod-modal-addrelation"> \
                <a>Add a New Relation</a> \
              </div> \
            </div> \
          </div>';
// 中间栏的 relation 组件
var componentMiddleRelation = 
            '<div class="panel panel-default"> \
              <div class="panel-heading stigmod-hovershow-trig"> \
                <div class="panel-title"> \
                  <div class="row"> \
                    <div class="col-xs-2 stigmod-rel-cont-left-title"><span class="fa fa-bookmark"></span></div> \
                    <div class="col-xs-6 stigmod-rel-cont-middle-title stigmod-cursor-pointer" data-toggle="none"></div> \
                    <div class="col-xs-4 stigmod-rel-cont-right-title"> \
                      <div class="stigmod-hovershow-cont"> \
                        <span data-toggle="dropdown"><span class="fa fa-plus-circle" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                        <ul class="dropdown-menu" role="menu"> \
                          <li class="stigmod-dropdown-type" role="presentation"><a role="menuitem" tabindex="-1" href="#">type</a></li> \
                          <li class="stigmod-dropdown-role" role="presentation"><a role="menuitem" tabindex="-1" href="#">role</a></li> \
                          <li class="stigmod-dropdown-class" role="presentation"><a role="menuitem" tabindex="-1" href="#">class</a></li> \
                          <li class="stigmod-dropdown-multiplicity" role="presentation"><a role="menuitem" tabindex="-1" href="#">multiplicity</a></li> \
                          <li class="stigmod-dropdown-ordering" role="presentation"><a role="menuitem" tabindex="-1" href="#">ordering</a></li> \
                          <li class="stigmod-dropdown-uniqueness" role="presentation"><a role="menuitem" tabindex="-1" href="#">uniqueness</a></li> \
                          <li class="stigmod-dropdown-readOnly" role="presentation"><a role="menuitem" tabindex="-1" href="#">readOnly</a></li> \
                          <li class="stigmod-dropdown-union" role="presentation"><a role="menuitem" tabindex="-1" href="#">union</a></li> \
                          <li class="stigmod-dropdown-subsets" role="presentation"><a role="menuitem" tabindex="-1" href="#">subsets</a></li> \
                          <li class="stigmod-dropdown-redefines" role="presentation"><a role="menuitem" tabindex="-1" href="#">redefines</a></li> \
                          <li class="stigmod-dropdown-composite" role="presentation"><a role="menuitem" tabindex="-1" href="#">composite</a></li> \
                        </ul> \
                        <span>&nbsp;&nbsp;&nbsp;</span> \
                        <span><span class="fa fa-remove" data-toggle="tooltip" data-placement="top" data-original-title="Remove this relation"></span></span> \
                      </div> \
                    </div> \
                  </div> \
                </div> \
              </div> \
              <div class="panel-collapse collapse"> \
                <table class="table stigmod-table-relation"> \
                  <tbody> \
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-type" stigmod-clickedit-case="reltype"> \
                      <td class="stigmod-attr-cont-left">type</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <div class="dropdown" id="stigmod-dropdown-reltype"> \
                            <button class="btn btn-default" type="button" data-toggle="dropdown"></button> \
                            <ul class="dropdown-menu" role="menu"> \
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="">Generalization</a></li> \
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="">Composition</a></li> \
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="">Aggregation</a></li> \
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="">Association</a></li> \
                            </ul> \
                          </div> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value="" placeholder="name"> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-role" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">role</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-class" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">class</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value="" disabled> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="glyphicon glyphicon-transfer stigmod-cursor-pointer"></span> \
                          <input type="text" class="stigmod-input" value="" disabled> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-multiplicity" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">multiplicity</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-ordering" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">ordering</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="ordering1" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="ordering1" value="False">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="ordering2" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="ordering2" value="False">False</label> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-uniqueness" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">uniqueness</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="uniqueness1" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="uniqueness1" value="False">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="uniqueness2" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="uniqueness2" value="False">False</label> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-readOnly" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">readOnly</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="readOnly1" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="readOnly1" value="False">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="readOnly2" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="readOnly2" value="False">False</label> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-union" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">union</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="union1" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="union1" value="False">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="union2" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="union2" value="False">False</label> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-subsets" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">subsets</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-redefines" stigmod-clickedit-case="text"> \
                      <td class="stigmod-attr-cont-left">redefines</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <input type="text" class="stigmod-input" value=""> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
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
                    <tr class="stigmod-clickedit-root stigmod-hovershow-trig stigmod-rel-prop-composite" stigmod-clickedit-case="radio"> \
                      <td class="stigmod-attr-cont-left">composite</td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="composite1" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="composite1" value="False">False</label> \
                          </span> \
                        </span> \
                      </td> \
                      <td> \
                        <span class="stigmod-clickedit-disp"></span> \
                        <span class="stigmod-clickedit-edit"> \
                          <span class="radio">&nbsp;&nbsp; \
                            <label><input type="radio" name="composite2" value="True">True</label>&nbsp;&nbsp;&nbsp; \
                            <label><input type="radio" name="composite2" value="False">False</label> \
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

/// 局部添加左侧栏组件
function appendLeft(model, name) {
  var $compo = undefined;
  if (0 === stateOfPage.flagCRG) {
    $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group');
    $compo.append(componentLeftClass);
    $compo.find('a:last-child > span:first-child').text(name);
    $compo.find('a:last-child').trigger('click');
  } else {
    $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
    $compo.append(componentLeftRelationGroup);
    $compo.find('a:last-child > span:first-child').text(name);
    $compo.find('a:last-child').trigger('click');
  }
}

/// 局部修改左侧栏组件
function modifyLeft(model, name) {
  var $compo = undefined;
  if (0 === stateOfPage.flagCRG) {
    $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group');
    $compo.find('a.active > span:first-child').text(name);
  } else {
    // $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
    // $compo.append(componentLeftRelationGroup);
    // $compo.find('a:last-child > span:first-child').text(name);
    // $compo.find('a:last-child').trigger('click');
  }
}

/// 局部添加中间栏组件
function insertMiddle(model, name) {
  var $compo = undefined;
  if (0 === stateOfPage.flagCRG) {
    var collapseIndex = $('#stigmod-cont-right .list-group').prev().find('.stigmod-attr-cont-middle-title').attr('data-target');
    if (undefined === collapseIndex) {
      collapseIndex = 0;
    } else {
      collapseIndex = parseInt(collapseIndex.substr('#collapse'.length)) + 1;
    }
    var $compo = $('#stigmod-cont-right .list-group').before(componentMiddleAttribute).prev();
    // 在 .panel 中记录 attribute 或 relation 的名字，便于点击时更新 stateOfPage
    $compo.attr({'stigmod-attrel-name': name});
    // 设置collapse属性
    var $collapseTrigger = $compo.find('.stigmod-attr-cont-middle-title').attr({'data-target': '#collapse' + collapseIndex});
    var $collapseContent = $compo.find('.panel-collapse').attr({'id': 'collapse' + collapseIndex});
    // 设置标题栏
    $collapseTrigger.text(name);
    // 设置 properties
    for (var modelProperty in model[stateOfPage.flagCRG][stateOfPage.class][0][name][0]) {
      // alert(modelProperty);
      var $propertyRow = $collapseContent.find('.stigmod-attr-prop-' + modelProperty).show();
      var $blank = $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][name][0][modelProperty]);
    }
    $compo.trigger('click');
    setTimeout(function() {
      $compo.find('.stigmod-attr-cont-middle-title').trigger('click');
    }, 10);
  } else {
    // $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
    // $compo.append(componentLeftRelationGroup);
    // $compo.find('a:last-child > span:first-child').text(name);
    // $compo.find('a:last-child').trigger('click');
  }
}

/// 局部删除中间栏组件
function removeMiddle(model, name) {
  var $compo = undefined;
  if (0 === stateOfPage.flagCRG) {
    $('#stigmod-cont-right .panel[stigmod-attrel-name=' + name + ']').remove();
  } else {
    // $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
    // $compo.append(componentLeftRelationGroup);
    // $compo.find('a:last-child > span:first-child').text(name);
    // $compo.find('a:last-child').trigger('click');
  }
}

/// 刷新左侧栏
function fillLeft(model) {
  // 向左侧栏填入组件和数据
  var $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group').empty(); // 清空
  for (var modelClass in model[0]) { // 类名
    $compo.append(componentLeftClass);
    $compo.find('a:last-child > span:first-child').text(modelClass);
  }
  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group').empty(); // 清空
  for (var modelRelationGroup in model[1]) { // 关系组名
    $compo.append(componentLeftRelationGroup);
    $compo.find('a:last-child > span:first-child').text(modelRelationGroup);
  }
}

/// 刷新中间栏为空白
function fillMiddleBlank() {
  $('#stigmod-cont-right-scroll').empty();
}

/// 刷新中间栏的基本框架
function fillMiddleBasic() {
  var $frame = $('#stigmod-cont-right-scroll');
  $frame.empty();
  if (0 === stateOfPage.flagCRG) {
    $frame.append(componentMiddleAttributeBasic);
  } else {
    $frame.append(componentMiddleRelationBasic);
  }
}

/// 刷新中间栏
function fillMiddle(model) { // flagCRG 标明是 Class(0) 还是 RelationGroup(1), nameCRG 是 Class 或 RelationGroup 的名字
  // 填入中间栏基本页面
  fillMiddleBasic();
  // 向中间栏填入组件和数据
  // if (0 === stateOfPage.flagCRG) {
  $('#stigmod-cont-right-scroll #stigmod-classname > span:nth-child(2)').text(stateOfPage.class);
  var i = 0; // 初始化 collapse 的序号 
  $('#stigmod-cont-right .panel').remove(); // 清空
  for (var modelAttribute in model[stateOfPage.flagCRG][stateOfPage.class][0]) { // 属性
    var $compo = $('#stigmod-cont-right .list-group').before(0 === stateOfPage.flagCRG ? componentMiddleAttribute : componentMiddleRelation).prev();
    // 在 .panel 中记录 attribute 或 relation 的名字，便于点击时更新 stateOfPage
    $compo.attr({'stigmod-attrel-name': modelAttribute});
    // 设置collapse属性
    var $collapseTrigger = $compo.find(0 === stateOfPage.flagCRG ? '.stigmod-attr-cont-middle-title' : '.stigmod-rel-cont-middle-title').attr({'data-target': '#collapse' + i});
    var $collapseContent = $compo.find('.panel-collapse').attr({'id': 'collapse' + i});
    // 设置标题栏
    $collapseTrigger.text(modelAttribute);
    // 设置 properties
    for (var modelProperty in model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0]) {
      if (0 === stateOfPage.flagCRG) { // class
        var $propertyRow = $collapseContent.find('.stigmod-attr-prop-' + modelProperty).show();
        $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0][modelProperty]);
      } else { // relationGroup
        if ('type' === modelProperty) {  // 对于type和name要特殊处理，放在一行
          var $propertyRow = $collapseContent.find('.stigmod-rel-prop-type').show();
          $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0][modelProperty]);
        } else if ('name' === modelProperty) {
          var $propertyRow = $collapseContent.find('.stigmod-rel-prop-type').show();
          $propertyRow.find('td:nth-child(3) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0][modelProperty]);
        } else {
          var $propertyRow = $collapseContent.find('.stigmod-rel-prop-' + modelProperty).show();
          $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0][modelProperty][0]);
          $propertyRow.find('td:nth-child(3) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute][0][modelProperty][1]);
        }
      }
    }
    ++i;
  }
}

/// 页面初始化后，填入左侧栏的数据
$(function() {
  fillLeft(model);
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

/// 左侧导航栏点击激活 并跳转
$(function() {
  $(document).on('click', '#stigmod-pg-workspace #stigmod-nav-left-scroll .list-group-item', function() {
    // 激活
    $(this).closest('#stigmod-nav-left-scroll').find('.list-group-item').removeClass('active');
    $(this).addClass('active');
    // 跳转
    $it = $(this).find('span:nth-child(1)');
    stateOfPage.class = $it.text();
    stateOfPage.flagCRG = ("stigmod-nav-left-class" === $it.attr('class')) ? 0 : 1; // 0: class, 1: relationgroup
    stateOfPage.flagDepth = 0;
    fillMiddle(model);
  });
});

/// 中间内容栏点击激活
$(function() {
  $(document).on('click', '#stigmod-pg-workspace #stigmod-cont-right .panel', function() {
    var $collapseToggle = $(this).siblings('.panel').find('.stigmod-attr-cont-middle-title, .stigmod-rel-cont-middle-title');
    var $collapseToggleThis = $(this).find('.stigmod-attr-cont-middle-title, .stigmod-rel-cont-middle-title');
    $collapseToggle.attr('data-toggle', 'none');  // 禁用其他panel的collapse触发器
    $collapseToggleThis.attr('data-toggle', 'collapse'); // 打开本panel的collapse触发器(下次点击即可触发)
    $(this).siblings('.panel').removeClass('panel-primary').addClass('panel-default');
    $(this).removeClass('panel-default').addClass('panel-primary');  // 激活本panel
  });
});

/// 中间栏class状态捕获
$(function() {
  $(document).on('click', '#stigmod-pg-workspace #stigmod-cont-right-scroll > .row:first-child', function() {
    stateOfPage.class = $(this).find('.stigmod-clickedit-disp').text();
    stateOfPage.flagDepth = 0;
    // dump_obj(stateOfPage);
  });
});

/// 中间栏attribute状态捕获
$(function() {
  $(document).on('click', '#stigmod-pg-workspace #stigmod-cont-right .panel .panel-heading', function() {
    stateOfPage.attribute = $(this).parent().attr('stigmod-attrel-name');
    stateOfPage.flagDepth = 1;
    // dump_obj(stateOfPage);
  });
});

/// 中间栏子内容（property）点击
$(function() {
  $(document).on('click', '#stigmod-pg-workspace #stigmod-cont-right .panel tr', function() {
    stateOfPage.property = $(this).find('td:first-child').text();
    stateOfPage.flagDepth = 2;
    // dump_obj(stateOfPage);
  });
});

// 打印stageOfPage
$(function() {
  $(document).on('click', '#stigmod-model-sync', function(event) {
    dump_obj(stateOfPage);
    // dump_obj(model[0]);
    // event.preventDefault();
  });
});

/// 一切“编辑”按钮的点击编辑功能
$(function() {

  // 编辑
  function editElem(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    if ('title' === caseEdit) { // 中间栏标题的特别处理
      var originalTitle = $originalTextElem.text();
      $editComponent.find('input').val(originalTitle);
      $originalTextElem.css({'display': 'none'});
      $editComponent.css({'display': 'table-row'});
      $(this).addClass('disabled');
    } else {
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
    }
    event.preventDefault();
  }

  // 确认编辑
  function submitEdit(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    if ('title' === caseEdit) {
      var newTitle = $editComponent.find('input').val();
      // 更新模型
      modifyClass(model, stateOfPage.class, newTitle);  // TODO: 当修改relation时的model变动
      stateOfPage.class = newTitle;
      // 更新显示
      $originalTextElem.text(newTitle);
      modifyLeft(model, newTitle);
      $originalTextElem.css({'display': 'table-row'});
      $editComponent.css({'display': 'none'});
      $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit').removeClass('disabled');
    } else {
      var num = $originalTextElem.length;
      for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
        var originalText = $originalTextElem.eq(i).text();  // 获取原始文字
        var newText = '';
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
        // 更新显示
        $originalTextElem.eq(i).text(newText);
        // 更新模型
        var propertyName = $(this).closest('.stigmod-clickedit-root').find('td:first-child').text(); // TODO: 当修改relation时的model变动
        addPropertyOfA(model, stateOfPage.class, stateOfPage.attribute, [propertyName, newText]);  // TODO: 当修改relation时的model变动
        if ('name' === propertyName) {  // 当property是name时，还要修改attribute的key
          modifyAttribute(model, stateOfPage.class, stateOfPage.attribute, newText);
          stateOfPage.attribute = newText;
          // fillMiddle(model);
        }
      }
      $originalTextElem.css({'display': 'table'});
      $editComponent.css({'display': 'none'});
    }
    event.preventDefault();
  }

  // 取消编辑
  function cancelEdit(event) {
    var caseEdit = $(this).closest('.stigmod-clickedit-root').attr('stigmod-clickedit-case');
    var $originalTextElem = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-disp');
    var $editComponent = $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-edit');
    if ('title' === caseEdit) {
      $originalTextElem.css({'display': 'table-row'});
      $editComponent.css({'display': 'none'});
      $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit').removeClass('disabled');
    } else {
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
    }
    event.preventDefault();
  }

  $(document).on('click', '.stigmod-clickedit-btn-edit', editElem); // “编辑”按钮的点击编辑功能
  $(document).on('click', '.stigmod-clickedit-btn-ok', submitEdit); // 编辑组件内的“提交”按钮功能
  $(document).on('click', '.stigmod-clickedit-btn-cancel', cancelEdit); // 编辑组件内的“取消”按钮功能
});

/// ajax 测试
$(function() {
  $(document).on('click', '#btn-search', function(event) {
    $.get('/string', function(string) {
      alert(string);
    });
    event.preventDefault();
  })
});

/// add attribute 和 add relation 的 modal 中 checkbox 的动作
$(function() {
  $(document).on('change', '#stigmod-modal-addattribute input[type="checkbox"]', function() {
    var id = '#stigmod-addatt-' + $(this).val();
    if ($(this).is(':checked')) {
      $(id).css({'display': 'table-row'});
    } else {
      $(id).css({'display': 'none'});
    }
  });
});
$(function() {
  $(document).on('change', '#stigmod-modal-addrelation input[type="checkbox"]', function() {
    var id = '#stigmod-addrel-' + $(this).val();
    if ($(this).is(':checked')) {
      $(id).css({'display': 'table-row'});
    } else {
      $(id).css({'display': 'none'});
    }
  });
});



/// 解决panel的标题栏中addproperty下拉菜单随按钮隐藏的问题（下拉菜单显示时，去掉该菜单父元素中的悬停显示的触发器）
$(function() {
  $(document).on('show.bs.dropdown', '.stigmod-hovershow-trig', function () {
    $(this).removeClass('stigmod-hovershow-trig');
    // 顺带解决：下拉菜单展开时显示哪些内容的问题
    $(this).find('.panel-title .dropdown-menu li').show();
    var attributeName = $(this).closest('.panel').attr('stigmod-attrel-name'); // 不从stateOfPage获取attribute的原因是bootstrap的dropdown不好设置timeout，而没有timeout就不能保证stateOfPage的状态是最新的。 
    for (var nameProp in model[stateOfPage.flagCRG][stateOfPage.class][0][attributeName][0]) {
      $(this).closest('.panel').find('.stigmod-dropdown-' + nameProp).hide();
    }
    $(this).on('hide.bs.dropdown', function () { // 菜单消失时还原触发器
      $(this).addClass('stigmod-hovershow-trig');
    });
  });
});

/// add property 下拉菜单的响应函数
$(function() {
  $(document).on('click', '.stigmod-attr-cont-right-title .dropdown-menu a, .stigmod-rel-cont-right-title .dropdown-menu a', function(event) {
    var nameProp = $(this).text();
    var $propertyRow = $(this).closest('.panel').find('.stigmod-attr-prop-' + nameProp + ', .stigmod-rel-prop-' + nameProp);
    $propertyRow.show(); // 展示该property行
    $propertyRow.find('.stigmod-clickedit-btn-edit').trigger('click'); // 进入编辑状态
    $(this).closest('.panel').find('.panel-collapse').collapse('show'); // 展开panel，应对没有展开panel就添加property的情况
    event.preventDefault();
  });
});


/// addrelation 中的下拉菜单
$(function() {
  $(document).on('click', '#stigmod-dropdown-reltype-modal a', function(event) {
    var reltype = $(this).text();
    var $root = $(this).closest('.stigmod-table-addrelation');
    var $btn = $(this).closest('#stigmod-dropdown-reltype-modal').find('button');
    var $nameModify = $root.find('#stigmod-addrel-type').find('.stigmod-input');
    var $roleModify = $root.find('#stigmod-addrel-role').find('.stigmod-input');
    var $multiplicityModify = $root.find('#stigmod-addrel-multiplicity').find('.stigmod-input');
    switch (reltype) {
      case 'Generalization':
        $btn.text('Generalization');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'disabled': ''}).val('father');
        $roleModify.eq(1).attr({'disabled': ''}).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('');
        break;
      case 'Composition':
        $btn.text('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('whole');
        $roleModify.eq(1).attr({'disabled': ''}).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.text('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('owner');
        $roleModify.eq(1).attr({'disabled': ''}).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.text('Association');
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
// addrelation 中点击交换 classname
$(function() {
  $(document).on('click', '#stigmod-addrel-class .glyphicon-transfer', function(event) {
    var $classnames = $(this).closest('#stigmod-addrel-class').find('.stigmod-input');
    var tmp = $classnames.first().val();
    $classnames.first().val($classnames.last().val());
    $classnames.last().val(tmp);
    event.preventDefault();
  });
});

/// revise relation 中的下拉菜单
$(function() {
  $(document).on('click', '#stigmod-dropdown-reltype a', function(event) {
    var reltype = $(this).text();
    var $root = $(this).closest('.stigmod-table-relation');
    var $btn = $(this).closest('#stigmod-dropdown-reltype').find('button');
    var $nameModify = $root.find('.stigmod-rel-prop-type').find('.stigmod-input');
    var $roleModify = $root.find('.stigmod-rel-prop-role').find('.stigmod-input');
    var $multiplicityModify = $root.find('.stigmod-rel-prop-multiplicity').find('.stigmod-input');
    switch (reltype) {
      case 'Generalization':
        $btn.text('Generalization');
        $nameModify.css({'display': 'none'});
        $roleModify.eq(0).attr({'disabled': ''}).val('father');
        $roleModify.eq(1).attr({'disabled': ''}).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('');
        break;
      case 'Composition':
        $btn.text('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('whole');
        $roleModify.eq(1).attr({'disabled': ''}).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.text('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).attr({'disabled': ''}).val('owner');
        $roleModify.eq(1).attr({'disabled': ''}).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.text('Association');
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
// addrelation 中点击交换 classname
$(function() {
  $(document).on('click', '.stigmod-rel-prop-class .glyphicon-transfer', function(event) {
    var $classnames = $(this).closest('.stigmod-rel-prop-class').find('.stigmod-input');
    var tmp = $classnames.first().val();
    $classnames.first().val($classnames.last().val());
    $classnames.last().val(tmp);
    event.preventDefault();
  });
});


/// addclass 的处理函数
$(function() {
  $(document).on('click', '#stigmod-btn-addclass', function() {
    var className = $(this).closest('#stigmod-modal-addclass').find('input').val();
    addClass(model, className);
    stateOfPage.flagCRG = 0;
    stateOfPage.flagDepth = 0;
    stateOfPage.class = className;
    appendLeft(model, className);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});

/// addrelationgroup 的处理函数
$(function() {
  $(document).on('click', '#stigmod-btn-addrelationgroup', function() {
    var $input = $(this).closest('#stigmod-modal-addrelationgroup').find('input');
    var relationGroupName = $input.eq(0).val() + '-' + $input.eq(1).val(); // 关系组的name是两端的类的拼合
    addRelationGroup(model, relationGroupName);
    stateOfPage.flagCRG = 1;
    stateOfPage.flagDepth = 0;
    stateOfPage.class = relationGroupName;
    appendLeft(model, relationGroupName);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});

/// addattribute 的处理函数
$(function() {
  $(document).on('click', '#stigmod-btn-addattribute', function() {
    // 添加 attribute 名  
    var attributeName = $(this).closest('#stigmod-modal-addattribute').find('#stigmod-addatt-name input').val();
    addAttribute(model, stateOfPage.class, attributeName);
    // 添加 properties
    var $propertyNew = $(this).closest('#stigmod-modal-addattribute').find('tr:visible');
    $propertyNew.each(function() {
      // dump_obj($(this));
      var caseName = $(this).attr('stigmod-addatt-case');
      var propertyName = $(this).find('td:first-child').text();
      var propertyValue = undefined;
      switch (caseName) {
        case 'text':
          propertyValue = $(this).find('input').val();
          break;
        case 'radio':
          propertyValue = $(this).find('input:checked').parent().text();
          break;
      }
      // alert(propertyName);
      // alert(propertyValue);
      addPropertyOfA(model, stateOfPage.class, attributeName, [propertyName, propertyValue]);
    });
    insertMiddle(model, attributeName);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});


/// 所有删除按钮的入口
$(function() {
  $(document).on('click', '.fa-remove, .glyphicon-trash, .stigmod-remove-trig', function() {  // TODO：直接写图标类不是长久之计
    setTimeout(function() { // 延时是为了解决 stateOfPage 还没有更新 modal 就弹出的问题
      $('#stigmod-modal-remove').modal('show');
    }, 10);
  });
});

/// removeattribute 的处理
$(function() {
  $(document).on('click', '#stigmod-btn-remove', function() {  // TODO: remove都改成高层函数。删除后，stateOfPage的更新。
    switch (stateOfPage.flagDepth) {
      case 0:
        // 修改 model
        removeElemInModel(model, [0], stateOfPage.class);
        // 更新显示
        fillLeft(model);
        fillMiddleBlank();
        break;
      case 1:
        // 修改 model
        removeElemInModel(model, [0, stateOfPage.class, 0], stateOfPage.attribute);
        // 更新显示
        removeMiddle(model, stateOfPage.attribute);
        break;
      case 2:
        // 修改 model
        removeElemInModel(model, [0, stateOfPage.attribute, 0, stateOfPage.class, 0], stateOfPage.property);
        // 更新显示
        var prop = ['.stigmod-attr-prop-', '.stigmod-rel-prop-'];
        var $root = $('#stigmod-cont-right .panel[stigmod-attrel-name=' + stateOfPage.attribute + '] ' + prop[stateOfPage.flagCRG] + stateOfPage.property); 
        var $text = $root.find('.stigmod-clickedit-disp');
        var num = $text.length;
        for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
          $text.eq(i).text('');
        }
        $root.hide();
        break;
    }
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});


/// modal 显示时复位
$(function() {
  $(document).on('show.bs.modal', '#stigmod-modal-addclass', function() {
    $(this).find('input').val('');
  });
  $(document).on('show.bs.modal', '#stigmod-modal-addrelationgroup', function() {
    $(this).find('input').val('');
  });
  $(document).on('show.bs.modal', '#stigmod-modal-addattribute', function() {
    $(this).find('input[type=text]').val('');
    $(this).find('input[type=radio]').removeAttr('checked');
    $(this).find('input[type=checkbox]').removeAttr('checked');
    $(this).find('input[value=type]').prop('checked', true); // 保留type项的选中状态
    $(this).find('tr').hide();
    $(this).find('tr:nth-child(1)').css('display','table-row'); // 显示name项
    $(this).find('tr:nth-child(2)').css('display','table-row'); // 显示type项
  });
  $(document).on('show.bs.modal', '#stigmod-modal-remove', function() {
    var type = new Array();
    type[0] = new Array('CLASS', 'ATTRIBUTE', 'PROPERTY');
    type[1] = new Array('RELATION GROUP', 'RELATION', 'PROPERTY');
    var name = [stateOfPage.class, stateOfPage.attribute, stateOfPage.property];
    $(this).find('.stigmod-modal-remove-type').text(type[stateOfPage.flagCRG][stateOfPage.flagDepth]);
    $(this).find('.stigmod-modal-remove-name').text(name[stateOfPage.flagDepth]);
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
