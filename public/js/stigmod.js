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
            "type": "string",
            "visibility": "public"
          }
        ],
        "credit": [
          {
            "name": "credit",
            "type": "float",
            "visibility": "private"
          }
        ],
        "availability": [
          {
            "name": "availability",
            "type": "CourseAvailability",
            "visibility": "protected",
            "readOnly": "True"
          }
        ]
      },
      {
        "order": ["code", "credit", "availability"]
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
      },
      {
        "order": ["startTime", "endTime"]
      }
    ],
    "Student": [
      {
        "code": [
          {
            "name": "code",
            "type": "string"
          }
        ],
        "enrollmentDate": [
          {
            "name": "enrollmentDate",
            "type": "Date"
          }
        ]
      },
      {
        "order": ["code", "enrollmentDate"]
      }
    ],
    "Teacher": [
      {
        "facultyCode": [
          {
            "name": "facultyCode",
            "type": "string"
          }
        ],
        "title": [
          {
            "name": "title",
            "type": "Title"
          }
        ]
      },
      {
        "order": ["facultyCode", "title"]
      }
    ],
    "User": [
      {
        "email": [
          {
            "name": "email",
            "type": "string"
          }
        ],
        "username": [
          {
            "name": "username",
            "type": "string"
          }
        ],
        "photo": [
          {
            "name": "photo",
            "type": "Image"
          }
        ],
        "password": [
          {
            "name": "password",
            "type": "string"
          }
        ],
        "birthDate": [
          {
            "name": "birthDate",
            "type": "Date"
          }
        ],
        "name": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "order": ["username", "password", "name", "birthDate", "email", "photo"]
      }
    ],
    "Department": [
      {
        "name": [
          {
            "name": "name",
            "type": "string"
          }
        ],
        "code": [
          {
            "name": "code",
            "type": "string"
          }
        ],
        "requiredCreditOfM": [
          {
            "name": "requiredCreditOfM",
            "type": "RequiredCredit"
          }
        ],
        "requiredCreditOfB": [
          {
            "name": "requiredCreditOfB",
            "type": "RequiredCredit"
          }
        ],
        "requiredCreditOfD": [
          {
            "name": "requiredCreditOfD",
            "type": "RequiredCredit"
          }
        ]
      },
      {
        "order": ["name", "code", "requiredCreditOfB", "requiredCreditOfM", "requiredCreditOfD"]
      }
    ]
  },
  {
    "Course-CourseActivity": [
      {
        "tempid1419265720151": [
          {
            "type": [
              "Composition",
              "haha"
            ],
            "role": [
              "whole",
              "part"
            ],
            "class": [
              "Course",
              "CourseActivity"
            ],
            "multiplicity": [
              "1",
              "*"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419265720151"]
      }
    ],
    "Course-Student": [
      {
        "tempid1419597303227": [
          {
            "type": [
              "Association",
              ""
            ],
            "role": [
              "",
              ""
            ],
            "class": [
              "Course",
              "Student"
            ],
            "multiplicity": [
              "0..*",
              "*"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597303227"]
      }
    ],
    "Course-Teacher": [
      {
        "tempid1419597378206": [
          {
            "type": [
              "Association",
              ""
            ],
            "role": [
              "",
              ""
            ],
            "class": [
              "Course",
              "Teacher"
            ],
            "multiplicity": [
              "0..*",
              "1..*"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597378206"]
      }
    ],
    "Student-User": [
      {
        "tempid1419597406622": [
          {
            "type": [
              "Generalization",
              ""
            ],
            "role": [
              "father",
              "child"
            ],
            "class": [
              "User",
              "Student"
            ],
            "multiplicity": [
              "1",
              "1"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597406622"]
      }
    ],
    "Teacher-User": [
      {
        "tempid1419597442832": [
          {
            "type": [
              "Generalization",
              ""
            ],
            "role": [
              "father",
              "child"
            ],
            "class": [
              "User",
              "Teacher"
            ],
            "multiplicity": [
              "1",
              "1"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597442832"]
      }
    ],
    "Course-Department": [
      {
        "tempid1419597640012": [
          {
            "type": [
              "Association",
              ""
            ],
            "role": [
              "",
              ""
            ],
            "class": [
              "Course",
              "Department"
            ],
            "multiplicity": [
              "*",
              "1"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597640012"]
      }
    ],
    "Department-Student": [
      {
        "tempid1419597702615": [
          {
            "type": [
              "Association",
              ""
            ],
            "role": [
              "",
              ""
            ],
            "class": [
              "Department",
              "Student"
            ],
            "multiplicity": [
              "1..*",
              "*"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597702615"]
      }
    ],
    "Department-Teacher": [
      {
        "tempid1419597718239": [
          {
            "type": [
              "Association",
              ""
            ],
            "role": [
              "",
              ""
            ],
            "class": [
              "Department",
              "Teacher"
            ],
            "multiplicity": [
              "1..*",
              "*"
            ]
          }
        ]
      },
      {
        "order": ["tempid1419597718239"]
      }
    ]
  }
];

// 模型访问示例
// alert(model[0]["Course"][0]["code"][0]["type"]);
// 模型中attribute的顺序记录：
// model[0]["Course"][1]["order"]

// 记录 workspace 页面的状态
var stateOfPage = 
{
  "model": "",
  "flagCRG": 0, // 0: class, 1: relationGroup
  "flagDepth": 0, // for class: (0: class, 1: attribute, 2: propertyOfA) for relationGroup: (0: relationGroup, 1: relation, 2: propertyOfR)
  "class": "",  // <-> relationGroup
  "attribute": "", // <-> relation
  "property": "", // <-> property
  "posAddAtt": "",  // 增加 attribute 或 relation 时 插入的位置  (attrel name 或 '@') ('@' 代表最下方的add按钮)
  "dirAddAtt": 0  // 增加 attribute 或 relation 时 插入的方向 （0: up, 1: down）
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
function getElemInModel(model, path) { // 读取元素（指定路径下的所有keyvalue）
  var len = path.length;
  var innerModel = model[path.pop()];
  while (0 != path.length) {
    // dump_obj(innerModel);
    innerModel = innerModel[path.pop()];
  }
  return innerModel;
}

// Model 操作高层函数
function addClass(model, className) {
  addElemInModel(model, [0], [className, [{}, {'order': []} ]]); // 最里边的大括号很重要……
}
function addAttribute(model, className, attributeName) {
  addElemInModel(model, [0, className, 0], [attributeName, [{}]]);
}
function addPropertyOfA(model, className, attributeName, propertyKeyValue) {
  addElemInModel(model, [0, attributeName, 0, className, 0], propertyKeyValue);
}
function addRelationGroup(model, relationGroupName) {
  addElemInModel(model, [1], [relationGroupName, [{}, {'order': []} ]]); // 最里边的大括号很重要……
}
function addRelation(model, relationGroupName, relationID) {
  addElemInModel(model, [0, relationGroupName, 1], [relationID, [{}]]);
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
function modifyPropertyOfA(model, className, attributeName, propertyKey, newValue) {
  modifyElemInModel(model, [0, attributeName, 0, className, 0], propertyKey, newValue);
}
function modifyRelationGroup(model, relationGroupName, newName) {
  modifyElemInModel(model, [1], relationGroupName, newName);
}
function modifyRelation(model, relationGroupName, relationName, newName) {
  modifyElemInModel(model, [0, relationGroupName, 1], relationName, newName);
}
function modifyPropertyOfR(model, relationGroupName, relationName, propertyKey, newValuePair) { // 这个函数并不好用，因为很多时候我们只想修改 Pair 中的一个
  modifyElemInModel(model, [0, relationName, 0, relationGroupName, 1], propertyKey, newValuePair);
}


function getProperty(model, attribute) {
  return getElemInModel(model, [0, attribute, 0, stateOfPage.class, stateOfPage.flagCRG]);
}

// function removeClass(model, className) {
//   removeElemInModel(model, [0], className);
// }
// function removeAttribute(model, className, attributeName) {
//   removeElemInModel(model, [0, className, 0], attributeName);
// }
// function removePropertyOfA(model, className, attributeName, propertyKey) {
//   removeElemInModel(model, [0, attributeName, 0, className, 0], propertyKey);
// }

/// 检查class、relation group、attribute 是否已存在
function elemExist(caseOfElem, name, additionalName) { // 当 case 不是 2 时，不需要传入第三个参数 additionalName 
  // case [ 0: class, 1: relation group, 2: attribute ]
  var elemSet = null;
  switch (caseOfElem) {
    case 0:
      elemSet = getElemInModel(model, [0]);
      break;
    case 1:
      elemSet = getElemInModel(model, [1]);
      break;
    case 2:
      elemSet = getElemInModel(model, [0, additionalName, 0]);
      break;
  }
  return (undefined !== elemSet[name]) ? true : false;
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
                <button type="button" class="btn btn-default stigmod-addattrel-trig stigmod-addattrel-last"> \
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
              <div class="list-group-item text-center stigmod-cursor-pointer stigmod-addattrel-trig stigmod-addattrel-last"> \
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
                  <div class="col-xs-1 stigmod-attr-cont-left-title"><span class="fa fa-bookmark"></span></div> \
                  <div class="col-xs-8 stigmod-attr-cont-middle-title stigmod-cursor-pointer" data-toggle="none"></div> \
                  <div class="col-xs-3 stigmod-attr-cont-right-title"> \
                    <div class="stigmod-hovershow-cont"> \
                      <span class="stigmod-dropdown-addprop"> \
                        <span data-toggle="dropdown"><span class="fa fa-plus-circle" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                        <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                          <li role="presentation" class="dropdown-header">Add a new Property :</li> \
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
                      </span> \
                      <span class="stigmod-dropdown-addattrel"> \
                        <span data-toggle="dropdown"><span class="fa fa-plus" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                        <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                          <li class="stigmod-addattrel-trig stigmod-addattrel-above" role="presentation"><a role="menuitem" tabindex="-1" href="#">Add a new Attribute above</a></li> \
                          <li class="stigmod-addattrel-trig stigmod-addattrel-below" role="presentation"><a role="menuitem" tabindex="-1" href="#">Add a new Attribute below</a></li> \
                        </ul> \
                      </span> \
                      <span>&nbsp;&nbsp;&nbsp;</span> \
                      <span><span class="fa fa-arrow-up" data-toggle="tooltip" data-placement="top" data-original-title="Move up"></span></span> \
                      <span><span class="fa fa-arrow-down" data-toggle="tooltip" data-placement="top" data-original-title="Move down"></span></span></span><span>&nbsp;&nbsp;&nbsp;</span> \
                      <span><span class="fa fa-remove" data-toggle="tooltip" data-placement="top" data-original-title="Remove this attribute"></span> \
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
              <span class="stigmod-clickedit-disp"></span> \
            </div> \
            <div class="col-xs-4"> \
              <div class="btn-group pull-right"> \
                <button type="button" class="btn btn-default stigmod-addattrel-trig stigmod-addattrel-last"> \
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
                    <li><a href="#" class="stigmod-remove-trig">Delete this relation group</a></li> \
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
              <div class="list-group-item text-center stigmod-cursor-pointer stigmod-addattrel-trig stigmod-addattrel-last"> \
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
                    <div class="col-xs-1 stigmod-rel-cont-left-title"><span class="fa fa-bookmark"></span></div> \
                    <div class="col-xs-8 stigmod-rel-cont-middle-title stigmod-cursor-pointer" data-toggle="none"></div> \
                    <div class="col-xs-3 stigmod-rel-cont-right-title"> \
                      <div class="stigmod-hovershow-cont"> \
                        <span class="stigmod-dropdown-addprop"> \
                          <span data-toggle="dropdown"><span class="fa fa-plus-circle" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                          <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                            <li role="presentation" class="dropdown-header">Add a new Property :</li> \
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
                        </span> \
                        <span class="stigmod-dropdown-addattrel"> \
                          <span data-toggle="dropdown"><span class="fa fa-plus" data-toggle="tooltip" data-placement="top" data-original-title="Add a new property"></span></span> \
                          <ul class="dropdown-menu dropdown-menu-right" role="menu"> \
                            <li class="stigmod-addattrel-trig stigmod-addattrel-above" role="presentation"><a role="menuitem" tabindex="-1" href="#">Add a new Relation above</a></li> \
                            <li class="stigmod-addattrel-trig stigmod-addattrel-below" role="presentation"><a role="menuitem" tabindex="-1" href="#">Add a new Relation below</a></li> \
                          </ul> \
                        </span> \
                        <span>&nbsp;&nbsp;&nbsp;</span> \
                        <span><span class="fa fa-arrow-up" data-toggle="tooltip" data-placement="top" data-original-title="Move up"></span></span> \
                        <span><span class="fa fa-arrow-down" data-toggle="tooltip" data-placement="top" data-original-title="Move down"></span></span></span><span>&nbsp;&nbsp;&nbsp;</span> \
                        <span><span class="fa fa-remove" data-toggle="tooltip" data-placement="top" data-original-title="Remove this relation"></span> \
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

/// 修改左侧栏并激活，并跳转
function modifyLeftAndJump(model, name) {
  // 暴力方式
  fillLeft(model);  // 填充左侧不会使滚动条移动，所以暴力方式可行
  // jump (激活并跳转)
  $(document).find('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel .list-group span[stigmod-nav-left-tag=' + name + ']').trigger('click');
  // 温柔方式
  //var $compo = null;
  //var componetAppend = null;
  //if (0 === flag) {  // 类
  //  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group');
  //  componetAppend = componentLeftClass;
  //} else {  // 关系组
  //  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
  //  componetAppend = componentLeftRelationGroup;
  //}
  //var pos = 0;  // 新插入组件的位置初始化
  //$compo.find('a > span:first-child').each(function() {
  //  var tag = $(this).attr('stigmod-nav-left-tag');
  //  if (tag < name) {  // 对字典序在 name 之前的 tag 计数
  //    ++pos;
  //  }
  //});
  //if (0 === pos) {  // $compo 中没有组件或者 name 的字典序是最小的，则插入到最前面
  //  $compo.prepend(componetAppend);
  //  $compo.find('a:first-child > span:first-child').text(name).attr('stigmod-nav-left-tag', name);
  //  $compo.find('a:first-child').trigger('click');
  //} else {  // 插入到比 name 字典序小的最大组件的后面
  //  var $new = $compo.find('a:nth-child(' + pos.toString(10) + ')').after(componetAppend).next();
  //  $new.find('span:first-child').text(name).attr('stigmod-nav-left-tag', name);
  //  $new.trigger('click');
  //}
}

/// 修改左侧栏并激活，不跳转
function modifyLeft(model, name) {
  // 刷新
  fillLeft(model);
  // 重新激活
  var $this = $(document).find('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel .list-group span[stigmod-nav-left-tag=' + name + ']').parent();
  $this.closest('#stigmod-nav-left-scroll').find('.list-group-item').removeClass('active');
  $this.addClass('active');

  //var $compo = null;
  //if (0 === flag) {
  //  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group');
  //  $compo.find('a > span[stigmod-nav-left-tag=' + oldName + ']').text(newName).attr('stigmod-nav-left-tag', newName);
  //} else {
  //  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group');
  //  $compo.find('a > span[stigmod-nav-left-tag=' + oldName + ']').text(newName).attr('stigmod-nav-left-tag', newName);
  //}
}

/// 刷新中间栏 .panel 组件的 title
function refreshMiddelPanelTitle(model) {
  var $panels = $('#stigmod-cont-right .panel');
  $panels.each(function(){
    // 对于每一个 attribute 或 relation
    var $title = $(this).find('.panel-title > div.row > div:nth-child(2)');
    var properties = getProperty(model, $(this).attr('stigmod-attrel-name'));
    var title = '';
    if (0 === stateOfPage.flagCRG) {
      // 逐个拼接 properties
      if (undefined !== properties.visibility) {
        var visSign = '';
        switch (properties.visibility) {
          case 'public':
            visSign = '+';
            break;
          case 'private':
            visSign = '-';
            break;
          case 'protected':
            visSign = '#';
            break;
          case 'package':
            visSign = '~';
            break;
        }
        title = title + visSign + ' ';
      }
      if (undefined !== properties.name) {
        title = title + properties.name + ' ';
      }
      if (undefined !== properties.type) {
        title = title + ': ' + properties.type + ' ';
      }
      if (undefined !== properties.multiplicity) {
        title = title + '[' + properties.multiplicity + '] ';
      }
      if (undefined !== properties.default) {
        title = title + '= ' + properties.default + ' ';
      }
      // // 以下的property需要放在大括号中
      // var hasFormerElem = 0;
      // if (undefined !== properties.constraint) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + properties.constraint + ' ';
      // }
      // if ('True' === properties.ordering) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + 'ordered ';
      // }
      // if ('True' === properties.uniqueness) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + 'unique ';
      // }
      // if ('True' === properties.readOnly) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + 'readOnly ';
      // }
      // if ('True' === properties.union) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + 'union ';
      // }
      // if (undefined !== properties.subsets) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + properties.subsets + ' ';
      // }
      // if (undefined !== properties.redefines) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + properties.redefines + ' ';
      // }
      // if ('True' === properties.composite) {
      //   if (!hasFormerElem) {
      //     title = title + '{ ';
      //     hasFormerElem = 1;
      //   } else {
      //     title = title + ', ';
      //   }
      //   title = title + 'composited ';
      // }
      // if (hasFormerElem) {
      //   title = title + '}';
      // }
      // 更新 title
      $title.text(title);
    } else {
      // function concatProp(properties) {
      //   var title = '';
      //   // 逐个拼接 properties
      //   if (undefined !== properties.visibility) {
      //     var visSign = '';
      //     switch (properties.visibility) {
      //       case 'public':
      //         visSign = '+';
      //         break;
      //       case 'private':
      //         visSign = '-';
      //         break;
      //       case 'protected':
      //         visSign = '#';
      //         break;
      //       case 'package':
      //         visSign = '~';
      //         break;
      //     }
      //     title = title + visSign + ' ';
      //   }
      //   if (undefined !== properties.name) {
      //     title = title + properties.name + ' ';
      //   }
      //   if (undefined !== properties.type) {
      //     title = title + ': ' + properties.type + ' ';
      //   }
      //   if (undefined !== properties.multiplicity) {
      //     title = title + '[' + properties.multiplicity + '] ';
      //   }
      //   // 以下的property需要放在大括号中
      //   var hasFormerElem = 0;
      //   if (undefined !== properties.constraint) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + properties.constraint + ' ';
      //   }
      //   if ('True' === properties.ordering) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + 'ordered ';
      //   }
      //   if ('True' === properties.uniqueness) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + 'unique ';
      //   }
      //   if ('True' === properties.readOnly) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + 'readOnly ';
      //   }
      //   if ('True' === properties.union) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + 'union ';
      //   }
      //   if (undefined !== properties.subsets) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + properties.subsets + ' ';
      //   }
      //   if (undefined !== properties.redefines) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + properties.redefines + ' ';
      //   }
      //   if ('True' === properties.composite) {
      //     if (!hasFormerElem) {
      //       title = title + '{ ';
      //       hasFormerElem = 1;
      //     } else {
      //       title = title + ', ';
      //     }
      //     title = title + 'composited ';
      //   }
      //   if (hasFormerElem) {
      //     title = title + '}';
      //   }
      //   return title;
      // }
      var left = properties.class[0];
      var right = properties.class[1];
      var middle;
      switch (properties.type[0]) {
        case 'Generalization':
          middle = ' ◁—— '
          break;
        case 'Composition':
          middle = ' ◆—— '
          break;
        case 'Aggregation':
          middle = ' ◇—— '
          break;
        case 'Association':
          middle = ' ——— '
          break;
      }
      if (undefined !== properties.multiplicity[0]) {
        left = left + ' [' + properties.multiplicity[0] + '] ';
      }
      if (undefined !== properties.multiplicity[1]) {
        right = ' [' + properties.multiplicity[1] + '] ' + right;
      }
      // 更新 title
      $title.empty();
      $title.append('<span>' + left + '</span>');
      $title.append('<span>' + middle + '</span>').find('span:last-child').css({'font-family': 'Lucida Console'});
      $title.append('<span>' + right + '</span>');
    }
  });
}

/// 局部添加中间栏组件
function insertMiddle(model, name, noUnfold) { // 若第三个参数 noUnfold 被传入且为真，则仅点击一次（变为蓝色）；否则点击两次（变蓝且展开）
  var $compo = null;
  var collapseIndex = null;
  // 计算新 .panel 的编号
  var $panelTitle = $('#stigmod-cont-right .panel ' + ((0 === stateOfPage.flagCRG) ? '.stigmod-attr-cont-middle-title' : '.stigmod-rel-cont-middle-title')); // 取出所有 .panel
  if (0 === $panelTitle.length) { // 还没有 .panel
    collapseIndex = 0;
  } else { // 已经有至少一个 .panel
    var indexMax = -1;
    $panelTitle.each(function() {
      var indexTmp = $(this).attr('data-target');
      indexTmp = parseInt(indexTmp.substr('#collapse'.length));
      if (indexTmp > indexMax) {
        indexMax = indexTmp;
      }
    });
    collapseIndex = indexMax + 1; // 由于上下移动 attrel 功能的加入，这里需要取所有现存编号中的最大值加一作为新的编号
  }
  // 找到正确的位置并插入新 .panel
  if ('@' === stateOfPage.posAddAtt) {
    $compo = $('#stigmod-cont-right .list-group').before(0 === stateOfPage.flagCRG ? componentMiddleAttribute : componentMiddleRelation).prev();
  } else {
    if (0 === stateOfPage.dirAddAtt) { // 上插
      $compo = $('#stigmod-cont-right .panel[stigmod-attrel-name=' + stateOfPage.posAddAtt + ']').before(0 === stateOfPage.flagCRG ? componentMiddleAttribute : componentMiddleRelation).prev();
    } else { // 下插
      $compo = $('#stigmod-cont-right .panel[stigmod-attrel-name=' + stateOfPage.posAddAtt + ']').after(0 === stateOfPage.flagCRG ? componentMiddleAttribute : componentMiddleRelation).next();
    }
  }
  // 在 .panel 中记录 attribute 或 relation 的名字，便于点击时更新 stateOfPage
  $compo.attr({'stigmod-attrel-name': name});
  // 设置collapse属性
  var $collapseTrigger = $compo.find(0 === stateOfPage.flagCRG ? '.stigmod-attr-cont-middle-title' : '.stigmod-rel-cont-middle-title').attr({'data-target': '#collapse' + collapseIndex});
  var $collapseContent = $compo.find('.panel-collapse').attr({'id': 'collapse' + collapseIndex});
  // // 设置标题栏
  // $collapseTrigger.text(name);
  // 设置 properties
  for (var modelProperty in model[stateOfPage.flagCRG][stateOfPage.class][0][name][0]) {
    // alert(modelProperty);
    if (0 === stateOfPage.flagCRG) {
      var $propertyRow = $collapseContent.find('.stigmod-attr-prop-' + modelProperty).show();
      var $blank = $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][name][0][modelProperty]);
    } else {
      var $propertyRow = $collapseContent.find('.stigmod-rel-prop-' + modelProperty).show();
      var $blank = $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][name][0][modelProperty][0]);
      var $blank = $propertyRow.find('td:nth-child(3) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][name][0][modelProperty][1]);
    }
  }
  // 刷新所有panel的标题
  refreshMiddelPanelTitle(model);
  // 激活本panel
  if (noUnfold) {
    $compo.trigger('click'); // 变蓝，不展开
  } else {
    $compo.trigger('click'); // 变蓝
    setTimeout(function() {  // 展开
      $compo.find(0 === stateOfPage.flagCRG ? '.stigmod-attr-cont-middle-title' : '.stigmod-rel-cont-middle-title').trigger('click');
    }, 10);
  }
}

/// 局部删除中间栏组件
function removeMiddle(model, name) {
  $('#stigmod-cont-right .panel[stigmod-attrel-name=' + name + ']').remove();
}

/// 填充左侧栏
function fillLeft(model) {
  // 向左侧栏填入 class 组件和数据
  var $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:first-child .list-group').empty(); // 清空
  var modelClassOrdered = [];
  for (var modelClass in model[0]) { // 类名读入数组
    modelClassOrdered.push(modelClass);
  }
  modelClassOrdered.sort(); // 排序
  for (var i in modelClassOrdered) { // 类名
    $compo.append(componentLeftClass);
    $compo.find('a:last-child > span:first-child').text(modelClassOrdered[i]).attr('stigmod-nav-left-tag', modelClassOrdered[i]); // 以名称作为标签写在组件上，便于查找
  }
  // 向左侧栏填入 relation group 组件和数据
  $compo = $('#stigmod-pg-workspace #stigmod-nav-left-scroll .panel:last-child .list-group').empty(); // 清空
  var modelRelationGroupOrdered = [];
  for (var modelRelationGroup in model[1]) { // 关系组名读入数组
    modelRelationGroupOrdered.push(modelRelationGroup);
  }
  modelRelationGroupOrdered.sort(); // 排序
  for (var i in modelRelationGroupOrdered) { // 关系组名
    $compo.append(componentLeftRelationGroup);
    $compo.find('a:last-child > span:first-child').text(modelRelationGroupOrdered[i]).attr('stigmod-nav-left-tag', modelRelationGroupOrdered[i]); // 以名称作为标签写在组件上，便于查找
  }
}

/// 刷新左侧栏的内容的排列顺序，同时保持 active 组件的 activated 状态


/// 填充中间栏为空白
function fillMiddleBlank() {
  $('#stigmod-cont-right-scroll').empty();
}

/// 填充中间栏的基本框架
function fillMiddleBasic() {
  var $frame = $('#stigmod-cont-right-scroll');
  $frame.empty();
  $frame.append(0 === stateOfPage.flagCRG ? componentMiddleAttributeBasic : componentMiddleRelationBasic);
}

/// 填充中间栏
function fillMiddle(model) { // flagCRG 标明是 Class(0) 还是 RelationGroup(1), nameCRG 是 Class 或 RelationGroup 的名字
  // 填入中间栏基本页面
  fillMiddleBasic();
  // 向中间栏填入组件和数据
  $('#stigmod-cont-right-scroll #stigmod-classname > span:nth-child(2)').text(stateOfPage.class);
  $('#stigmod-cont-right .panel').remove(); // 清空
  var modelAttribute = model[stateOfPage.flagCRG][stateOfPage.class][1]['order']; // 获取 attribute 或 relation 的顺序信息
  for (var i in modelAttribute) { // i 既是 attrel 的编号， 也是 collapse 的序号 
    var $compo = $('#stigmod-cont-right .list-group').before(0 === stateOfPage.flagCRG ? componentMiddleAttribute : componentMiddleRelation).prev();
    // 在 .panel 中记录 attribute 或 relation 的名字，便于点击时更新 stateOfPage
    $compo.attr({'stigmod-attrel-name': modelAttribute[i]});
    // 设置collapse属性
    var $collapseTrigger = $compo.find(0 === stateOfPage.flagCRG ? '.stigmod-attr-cont-middle-title' : '.stigmod-rel-cont-middle-title').attr({'data-target': '#collapse' + i});
    var $collapseContent = $compo.find('.panel-collapse').attr({'id': 'collapse' + i});
    // // 设置标题栏
    // $collapseTrigger.text(modelAttribute[i]);
    // 设置 properties
    for (var modelProperty in model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0]) {
      if (0 === stateOfPage.flagCRG) { // class
        var $propertyRow = $collapseContent.find('.stigmod-attr-prop-' + modelProperty).show();
        $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0][modelProperty]);
      } else { // relationGroup
        // if ('type' === modelProperty) {  // 对于type和name要特殊处理，放在一行
        //   var $propertyRow = $collapseContent.find('.stigmod-rel-prop-type').show();
        //   $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0][modelProperty][0]);
        //   $propertyRow.find('td:nth-child(3) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0][modelProperty][1]);
        // } else {
          var $propertyRow = $collapseContent.find('.stigmod-rel-prop-' + modelProperty).show();
          $propertyRow.find('td:nth-child(2) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0][modelProperty][0]);
          $propertyRow.find('td:nth-child(3) > .stigmod-clickedit-disp').text(model[stateOfPage.flagCRG][stateOfPage.class][0][modelAttribute[i]][0][modelProperty][1]);
        // }
      }
    }
  }
  // 刷新所有panel的标题
  refreshMiddelPanelTitle(model);
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
    var $it = $(this).find('span:nth-child(1)');
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
    // alert(JSON.stringify(model));
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
      var flagGeneralization = 0;
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
              if ('Generalization' === originalText) { // 当关系类型为Generalization时，不显示名字
                flagGeneralization = 1; // 置位
              }
            } else if (1 === i) {
              if (1 === flagGeneralization) { // 当关系类型为Generalization时，不显示名字
                $editComponent.eq(i).find('input').css({'display': 'none'}); 
                flagGeneralization = 0; // 复位
              } else {
                $editComponent.eq(i).find('input').val(originalText);
              }
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
      var originalTitle = $originalTextElem.text();
      // 更新 class 相关的模型和显示
      modifyClass(model, stateOfPage.class, newTitle);
      stateOfPage.class = newTitle;
      $originalTextElem.text(newTitle);
      // 更新 relation group 相关的模型和显示
      var relationGroups = getElemInModel(model, [1]); // 获取所有 relation group
      for (var nameRG in relationGroups) { // 遍历该 model 中的所有 relation group
        eval('var matchName = nameRG.match(/\\b' + originalTitle + '\\b/)');
        if (null !== matchName) { // 如果该 relation group 与被修改的 class 有关
          eval('var newNameRG = nameRG.replace(/\\b' + originalTitle + '\\b/g, "' + newTitle + '")'); // 生成新的 relation group 名称
          var nameOfBothEnds = newNameRG.split('-'); // 获得关系两端的类名
          if (nameOfBothEnds[0] > nameOfBothEnds[1]) {
            newNameRG = nameOfBothEnds[1] + '-' +  nameOfBothEnds[0]; // 若更改class名后relation group 名不在是字典序，则更正
          }
          for (var nameR in relationGroups[nameRG][0]) { // 遍历该 relation group 中的所有 relation
            // 修改 relation 中的 class name
            var nameClass = relationGroups[nameRG][0][nameR][0]['class']; // 获取该 relation 两端的 class 的名字的 引用
            if (originalTitle === nameClass[0]) { // 需要修改End0
              nameClass[0] = newTitle;
            } else {  // 需要修改End1
              nameClass[1] = newTitle;
            }
          }
          // 修改 relation group 的名字
          modifyRelationGroup(model, nameRG, newNameRG);
        }
      }
      // 更新左侧栏显示
      modifyLeft(model, newTitle);
      // 更新修改组件的显示
      $originalTextElem.css({'display': 'table-row'});
      $editComponent.css({'display': 'none'});
      $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-edit').removeClass('disabled');
    } else {
      var num = $originalTextElem.length;
      var propertyNameOfR = '';
      var propertyValueOfR = ['', ''];
      var flagGeneralization = 0;
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
              if ('Generalization' === newText) { // 当关系类型为Generalization时，将name置空
                flagGeneralization = 1; // 置位
              }
            } else if (1 === i) {
              if (1 === flagGeneralization) { // 当关系类型为Generalization时，将name置空
                newText = '';
                flagGeneralization = 0; // 复位
              } else {
                newText = $editComponent.eq(i).find('input').val();
              }
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
        if (0 === stateOfPage.flagCRG) {
          var propertyName = $(this).closest('.stigmod-clickedit-root').find('td:first-child').text();
          addPropertyOfA(model, stateOfPage.class, stateOfPage.attribute, [propertyName, newText]);
          if ('name' === propertyName) {  // 当property是name时，还要修改attribute的key
            modifyAttribute(model, stateOfPage.class, stateOfPage.attribute, newText);
            stateOfPage.attribute = newText; // 页面状态的更新
            $(this).closest('.panel').attr({'stigmod-attrel-name': newText}); // panel 标记的更新
          }
        } else { // 当处理relation的property时，记录两端的key和value，最后在循环外一次性更新到model中
          propertyNameOfR = $(this).closest('.stigmod-clickedit-root').find('td:first-child').text();
          propertyValueOfR[i] = newText;
        }
      }
      if (1 === stateOfPage.flagCRG) { // 当处理relation的property时，记录两端的key和value，最后在循环外一次性更新到model中
        addPropertyOfR(model, stateOfPage.class, stateOfPage.attribute, [propertyNameOfR, propertyValueOfR]);
      }
      $originalTextElem.css({'display': 'table'});
      $editComponent.css({'display': 'none'});
      // 刷新所有panel的标题
      refreshMiddelPanelTitle(model);
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
  $(document).on('click', '.stigmod-dropdown-addprop .dropdown-menu a', function(event) {
    var nameProp = $(this).text();
    // 更新模型 (在编辑确认前，模型也应该加入空值，以保证下拉菜单的显示正确)
    setTimeout(function() { // 延时是为了解决 stateOfPage 还没有更新就是用未更新的 stateOfPage.attribute 值的问题
      if (0 === stateOfPage.flagCRG) {
        addPropertyOfA(model, stateOfPage.class, stateOfPage.attribute, [nameProp, '']);
      } else {
        addPropertyOfR(model, stateOfPage.class, stateOfPage.attribute, [nameProp, ['', '']]);
      }
    }, 10);
    // 更新显示
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
        $roleModify.eq(0).val('father');
        $roleModify.eq(1).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('1');
        break;
      case 'Composition':
        $btn.text('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('whole');
        $roleModify.eq(1).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.text('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('owner');
        $roleModify.eq(1).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.text('Association');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('');
        $roleModify.eq(1).val('');
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
        $roleModify.eq(0).val('father');
        $roleModify.eq(1).val('child');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).attr({'disabled': ''}).val('1');
        break;
      case 'Composition':
        $btn.text('Composition');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('whole');
        $roleModify.eq(1).val('part');
        $multiplicityModify.eq(0).attr({'disabled': ''}).val('1');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Aggregation':
        $btn.text('Aggregation');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('owner');
        $roleModify.eq(1).val('ownee');
        $multiplicityModify.eq(0).removeAttr('disabled').val('');
        $multiplicityModify.eq(1).removeAttr('disabled').val('');
        break;
      case 'Association':
        $btn.text('Association');
        $nameModify.css({'display': 'block'});
        $roleModify.eq(0).val('');
        $roleModify.eq(1).val('');
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
    modifyLeftAndJump(model, className);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});

/// addrelationgroup 的处理函数
$(function() {
  function isValidRelationGroup(class1, class2) {
    if (elemExist(0, class1) && elemExist(0, class2)) {
      var relationGroupName = (class1 < class2) ? class1 + '-' + class2 : class2 + '-' + class1;
      if (!elemExist(1, relationGroupName)) {
        return true;
      } else {
        alert('Relation Group already exists!');
        return false;
      }
    } else {
      alert('Class does not exist!');
      return false;
    }
  }
  $(document).on('click', '#stigmod-btn-addrelationgroup', function() {
    var $input = $(this).closest('#stigmod-modal-addrelationgroup').find('input');
    var class1 = $input.eq(1).val(); // 使用 typeahead 组件后，input 的序号变为以前的 2n+1
    var class2 = $input.eq(3).val(); // 使用 typeahead 组件后，input 的序号变为以前的 2n+1
    if (isValidRelationGroup(class1, class2)) {
      var relationGroupName = (class1 < class2) ? class1 + '-' + class2 : class2 + '-' + class1; // 关系组的name是两端的类的拼合
      addRelationGroup(model, relationGroupName);
      stateOfPage.flagCRG = 1;
      stateOfPage.flagDepth = 0;
      stateOfPage.class = relationGroupName;
      modifyLeftAndJump(model, relationGroupName);
      $(this).next().trigger('click'); // 关闭当前 modal
    } else {
      // 格式非法之处已经在 isValidRelationGroup() 函数中输出，因此这里不需要代码
    }
  });
});

/// addattribute 和 addrelation 的入口
$(function() {
  $(document).on('click', '.stigmod-addattrel-trig', function(event) {
    var $this = $(this); // 为了在 setTimeout() 函数中仍能正却使用
    setTimeout(function() { // 延时是为了解决 stateOfPage 还没有更新 modal 就弹出的问题
      // 获取添加位置和方向信息（也可写在 setTimeout() 之外）
      if ($this.hasClass('stigmod-addattrel-last')) { // 在add大按钮的上方添加（即所有panel的末尾，可能还没有panel）
        stateOfPage.posAddAtt = '@';
        stateOfPage.dirAddAtt = 0;
      } else {
        stateOfPage.posAddAtt = $this.closest('.panel').attr('stigmod-attrel-name');
        if ($this.hasClass('stigmod-addattrel-above')) { // 向上添加
          stateOfPage.dirAddAtt = 0;
        } else { // 向下添加
          stateOfPage.dirAddAtt = 1;
        }
      }
      // 弹框
      if (0 === stateOfPage.flagCRG) {
        $('#stigmod-modal-addattribute').modal('show');
      } else {
        $('#stigmod-modal-addrelation').modal('show');
      }
    }, 10);
    // event.preventDefault();
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
      var caseName = $(this).attr('stigmod-addatt-case');
      var propertyName = $(this).find('td:first-child').text();
      var propertyValue = null;
      switch (caseName) {
        case 'text':
          propertyValue = $(this).find('input').val();
          break;
        case 'radio':
          propertyValue = $(this).find('input:checked').parent().text();
          break;
      }
      addPropertyOfA(model, stateOfPage.class, attributeName, [propertyName, propertyValue]);
    });
    // 在顺序列表中插入新的 attribute
    var order = model[stateOfPage.flagCRG][stateOfPage.class][1]['order'];
    if ('@' === stateOfPage.posAddAtt) { // 在尾部插入
      order.push(attributeName);
    } else { // 在中间插入
      order.splice(order.indexOf(stateOfPage.posAddAtt) + stateOfPage.dirAddAtt, 0, attributeName);
    }
    insertMiddle(model, attributeName);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});

/// addrelation 的处理函数
$(function() {
  $(document).on('click', '#stigmod-btn-addrelation', function() {
    // 生成 前端 relation id
    var idRelFront = 'tempid' + Date.now();
    // 添加 relation id 作为该relation在前端的Key
    addRelation(model, stateOfPage.class, idRelFront);
    // 添加 properties
    var $propertyNew = $(this).closest('#stigmod-modal-addrelation').find('tr:visible');
    $propertyNew.each(function() {
      var caseName = $(this).attr('stigmod-addrel-case');
      var propertyName = $(this).find('td:first-child').text();
      var propertyValue1 = null;
      var propertyValue2 = null;
      if ('type' === propertyName) {
        var type = $(this).find('button').text();
        var name = $(this).find('input').val();
        addPropertyOfR(model, stateOfPage.class, idRelFront, [propertyName, [type, name]]);
      } else {
        switch (caseName) {
          case 'text':
            propertyValue1 = $(this).find('input').first().val();
            propertyValue2 = $(this).find('input').last().val();
            break;
          case 'radio':
            propertyValue1 = $(this).find('input:checked').first().parent().text();
            propertyValue2 = $(this).find('input:checked').last().parent().text();
            break;
        }
        addPropertyOfR(model, stateOfPage.class, idRelFront, [propertyName, [propertyValue1, propertyValue2]]);
      }
    });
    // 在顺序列表中插入新的 attribute
    if ('@' === stateOfPage.posAddAtt) { // 在尾部插入
      model[stateOfPage.flagCRG][stateOfPage.class][1]['order'].push(idRelFront);
    } else { // 在中间插入
      model[stateOfPage.flagCRG][stateOfPage.class][1]['order'].splice(model[stateOfPage.flagCRG][stateOfPage.class][1]['order'].indexOf(stateOfPage.posAddAtt) + stateOfPage.dirAddAtt, 0, idRelFront);
    }
    insertMiddle(model, idRelFront);
    $(this).next().trigger('click'); // 关闭当前 modal
  });
});

/// att 或 rel 的 .panel 的上下移动
$(function() {
  $(document).on('click', '.fa-arrow-up', function() {
    var $thisPanel = $(this).closest('.panel');
    var $prevPanel = $thisPanel.prev();
    if ($prevPanel.hasClass('panel')) { // 上面还有 .panel
      var name = $thisPanel.attr('stigmod-attrel-name');
      var order = model[stateOfPage.flagCRG][stateOfPage.class][1]['order'];
      // 更新模型
      var index = order.indexOf(name);
      order.splice(index, 1); // 删除
      order.splice(index - 1, 0, name); // 前插
      // 更新显示
      stateOfPage.posAddAtt = $prevPanel.attr('stigmod-attrel-name');
      stateOfPage.dirAddAtt = 0;
      insertMiddle(model, name, true);  // 前插
      $thisPanel.remove(); // 删除
    } else {
      // 已经在最上，不必操作
    }
  });
  $(document).on('click', '.fa-arrow-down', function() {
    var $thisPanel = $(this).closest('.panel');
    var $nextPanel = $thisPanel.next();
    if ($nextPanel.hasClass('panel')) { // 下面还有 .panel
      var name = $thisPanel.attr('stigmod-attrel-name');
      var order = model[stateOfPage.flagCRG][stateOfPage.class][1]['order'];
      // 更新模型
      var index = order.indexOf(name);
      order.splice(index, 1); // 删除
      order.splice(index + 1, 0, name); // 后插
      // 更新显示
      stateOfPage.posAddAtt = $nextPanel.attr('stigmod-attrel-name');
      stateOfPage.dirAddAtt = 1;
      insertMiddle(model, name, true);  // 后插
      $thisPanel.remove(); // 删除
    } else {
      // 已经在最下，不必操作
    }
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

/// remove 操作的处理
$(function() {
  $(document).on('click', '#stigmod-btn-remove', function() {  // TODO: 删除后，stateOfPage的更新。
    switch (stateOfPage.flagDepth) {
      case 0:
        // 修改 model
        removeElemInModel(model, [stateOfPage.flagCRG], stateOfPage.class);
        if (0 === stateOfPage.flagCRG) { // 删除 class 时，还要删除与之相关的 relation group
          var relationGroups = getElemInModel(model, [1]); // 获取所有 relation group
          for (var nameRG in relationGroups) { // 遍历该 model 中的所有 relation group
            eval('var matchName = nameRG.match(/\\b' + stateOfPage.class + '\\b/)'); // TODO：这么写对吗？似乎没有处理substring误操作问题？
            if (null !== matchName) {
              removeElemInModel(model, [1], nameRG);
            }
          }
        }
        // 更新显示
        fillLeft(model);
        fillMiddleBlank();
        break;
      case 1:
        // 修改 model
        removeElemInModel(model, [0, stateOfPage.class, stateOfPage.flagCRG], stateOfPage.attribute);
        var order = model[stateOfPage.flagCRG][stateOfPage.class][1]['order']; // 获取顺序
        order.splice(order.indexOf(stateOfPage.attribute), 1); // 从顺序数组中删除对应的 attrel 项
        // 更新显示
        removeMiddle(model, stateOfPage.attribute);
        break;
      case 2:
        // 修改 model
        removeElemInModel(model, [0, stateOfPage.attribute, 0, stateOfPage.class, stateOfPage.flagCRG], stateOfPage.property);
        // 更新显示
        var prop = ['.stigmod-attr-prop-', '.stigmod-rel-prop-'];
        var $root = $('#stigmod-cont-right .panel[stigmod-attrel-name=' + stateOfPage.attribute + '] ' + prop[stateOfPage.flagCRG] + stateOfPage.property); 
        var $text = $root.find('.stigmod-clickedit-disp');
        var num = $text.length;
        for (var i = 0; i < num - 1; ++i) { // 同时适用于单列和多列的情况 (最后一个元素是按钮，不参与循环中的处理)
          $text.eq(i).text('');
        }
        $root.hide();
        // 刷新所有panel的标题
        refreshMiddelPanelTitle(model);
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
  $(document).on('show.bs.modal', '#stigmod-modal-addrelation', function() {
    $(this).find('input[type=text]').val('');
    $(this).find('input[type=radio]').removeAttr('checked');
    $(this).find('input[type=checkbox]').removeAttr('checked');
    $(this).find('tr').hide();
    $(this).find('tr:nth-child(1) button').text('');
    $(this).find('tr:nth-child(2) input').removeAttr('disabled');
    $(this).find('tr:nth-child(4) input').removeAttr('disabled');
    var nameOfBothEnds = stateOfPage.class.split('-'); // 获得关系两端的类名
    $(this).find('tr:nth-child(3) > td:nth-child(2) > input').val(nameOfBothEnds[0]); // 将类名填入
    $(this).find('tr:nth-child(3) > td:nth-child(3) > input').val(nameOfBothEnds[1]); // 将类名填入
    $(this).find('tr:nth-child(1)').css('display','table-row'); // 显示type项
    $(this).find('tr:nth-child(2)').css('display','table-row'); // 显示role项
    $(this).find('tr:nth-child(3)').css('display','table-row'); // 显示class项
    $(this).find('tr:nth-child(4)').css('display','table-row'); // 显示multiplicity项
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


/// 输入内容规则检查
$(function() {

});

// 输入框自动填充功能（基于typeahead.js）
$(function() {
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });

      cb(matches);
    };
  };

  var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ]; 

  $('.twitter-typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    // name: 'states',
    displayKey: 'value',
    source: substringMatcher(states)
  });


  // var engine = new Bloodhound({
  //   name: 'animals',
  //   local: [{ val: 'dog' }, { val: 'pig' }, { val: 'moose' }],
  //   // remote: 'http://example.com/animals?q=%QUERY',
  //   datumTokenizer: function(d) {
  //     return Bloodhound.tokenizers.whitespace(d.val);
  //   },
  //   queryTokenizer: Bloodhound.tokenizers.whitespace
  // });
  // engine.initialize();
  // $('.typeahead111').typeahead({
  //   minLength: 1,
  //   highlight: true,
  // },
  // {
  //   // name: 'animals',
  //   source: engine.ttAdapter()
  // });
  // // $('.typeahead').typeahead('open');
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
