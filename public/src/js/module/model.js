
/*  ---------------------------------- *
 *
 *  用于前端显示的个体模型（ICM）的构造函数
 *
 *  ---------------------------------- */

function Model(modelPassIn) {

    /*  --------------------------------------------------------------- *
     *
     *  模型是一个树状结构，使用 JSON 格式存储。树中的节点有三种类型：
     *
     *  1、数组元素的序号（分类：类、属性、属性顺序、关系组、关系、关系顺序、特性）
     *  2、对象名值对的名（枚举：类名、属性名、关系组ID、关系ID）
     *  3、对象名值对（端点枚举：{特性名：特性值}、{顺序：顺序数组}）
     *
     *  model
     *    |
     *    |-- 0(class)
     *    |     |
     *    |     |-- class1 :
     *    |     |     |
     *    |     |     |-- 0(attribute)
     *    |     |     |     |
     *    |     |     |     |-- attribute1 :
     *    |     |     |     |     |
     *    |     |     |     |      -- 0(property)
     *    |     |     |     |           |
     *    |     |     |     |           |-- { property1 : value1 }
     *    |     |     |     |            -- { property2 : value2 }
     *    |     |     |     |
     *    |     |     |      -- attribute2 :
     *    |     |     |           |
     *    |     |     |            -- 0(property)
     *    |     |     |                 |
     *    |     |     |                 |-- { property3 : value3 }
     *    |     |     |                  -- { property4 : value4 }
     *    |     |     |
     *    |     |      -- 1(order)
     *    |     |           |
     *    |     |            -- { order : [attribute1, attribute2] }
     *    |     |
     *    |      -- class2 :
     *    |           |
     *    |           |-- 0(attribute)
     *    |           |     |
     *    |           |     |-- attribute3 :
     *    |           |     |     |
     *    |           |     |      -- 0(property)
     *    |           |     |           |
     *    |           |     |           |-- { property5 : value5 }
     *    |           |     |            -- { property6 : value6 }
     *    |           |     |
     *    |           |      -- attribute4 :
     *    |           |           |
     *    |           |            -- 0(property)
     *    |           |                 |
     *    |           |                 |-- { property7 : value7 }
     *    |           |                  -- { property8 : value8 }
     *    |           |
     *    |            -- 1(order)
     *    |                 |
     *    |                  -- { order : [attribute3, attribute4] }
     *    |
     *    |-- 1(relation group)
     *          |
     *          |-- relationGroup1 :
     *          |     |
     *          |     |-- 0(relation)
     *          |     |     |
     *          |     |     |-- relation1 :
     *          |     |     |     |
     *          |     |     |      -- 0(property)
     *          |     |     |           |
     *          |     |     |           |-- { property1 : value1 }
     *          |     |     |            -- { property2 : value2 }
     *          |     |     |
     *          |     |      -- relation2 :
     *          |     |           |
     *          |     |            -- 0(property)
     *          |     |                 |
     *          |     |                 |-- { property3 : value3 }
     *          |     |                  -- { property4 : value4 }
     *          |     |
     *          |      -- 1(order)
     *          |           |
     *          |            -- { order : [relation1, relation2] }
     *          |
     *           -- relationGroup2 :
     *                |
     *                |-- 0(relation)
     *                |     |
     *                |     |-- relation3 :
     *                |     |     |
     *                |     |      -- 0(property)
     *                |     |           |
     *                |     |           |-- { property5 : value5 }
     *                |     |            -- { property6 : value6 }
     *                |     |
     *                |      -- relation4 :
     *                |           |
     *                |            -- 0(property)
     *                |                 |
     *                |                 |-- { property7 : value7 }
     *                |                  -- { property8 : value8 }
     *                |
     *                 -- 1(order)
     *                      |
     *                       -- { order : [relation3, relation4] }
     *
     *
     *  --------------------------------------------------------------- */

    'use strict';

    // class
    this[0] = {};

    // relationGroup
    this[1] = {};

    // 使用动态原型模式，在构造函数内部定义原型方法
    if (!(this.getSubModel instanceof Function)) {

        /*  ------- *
         *  底层方法
         *  ------- */

        // 行走到模型中指定 path 的端点，返回从这个点开始生长的子模型
        Model.prototype.getSubModel = function (path) {

            if (!(path instanceof Array)) {
                throw new TypeError('Model.getSubModel(): The first argument must be an array.');
            }

            var subModel = this[path.shift()];

            while (0 !== path.length) {  // 顺路径前进
                subModel = subModel[path.shift()];

                if (undefined === subModel) {
                    throw new ReferenceError('Model.getSubModel(): Path does not exist in model.');
                }
            }

            return subModel;
        };

        // 在某路径的端点之下增加一个端点
        Model.prototype.addNode = function (path, pairsKV) {

            if (!(path instanceof Array)) {
                throw new TypeError('Model.addNode(): The first argument must be an array.');
            }
            if (!(pairsKV instanceof Array) || (2 !== pairsKV.length)) {
                throw new TypeError('Model.addNode(): The second argument must be an array with two elements.');
            }

            var subModel = this.getSubModel(path);

            subModel[pairsKV[0]] = pairsKV[1];
        };

        // 修改某路径的端点的 key
        Model.prototype.modifyNodeName = function (path, keyOld, keyNew) {

            if (!(path instanceof Array)) {
                throw new TypeError('Model.modifyNodeName(): The first argument must be an array.');
            }
            if (typeof keyOld !== 'string') {
                throw new TypeError('Model.modifyNodeName(): The second argument must be a string.');
            }
            if (typeof keyNew !== 'string') {
                throw new TypeError('Model.modifyNodeName(): The third argument must be a string.');
            }

            if (keyOld !== keyNew) {  // 仅在新旧两 key 不同时才执行下面的替换操作
                var subModel = this.getSubModel(path);

                subModel[keyNew] = subModel[keyOld];
                delete subModel[keyOld];
            }
        };

        // 修改某路径的端点的 value （一般用于树叶节点）
        Model.prototype.modifyNodeValue = function (path, key, valueNew) {

            if (!(path instanceof Array)) {
                throw new TypeError('Model.modifyNodeValue(): The first argument must be an array.');
            }
            if (typeof key !== 'string') {
                throw new TypeError('Model.modifyNodeValue(): The second argument must be a string.');
            }
            // 第三个参数 valueNew 可以是任意类型

            var subModel = this.getSubModel(path);

            subModel[key] = valueNew;
        };

        // 删除某路径端点的子模型
        Model.prototype.removeSubModel = function (path, key) {

            if (!(path instanceof Array)) {
                throw new TypeError('Model.removeSubModel(): The first argument must be an array.');
            }
            if (typeof key !== 'string') {
                throw new TypeError('Model.removeSubModel(): The second argument must be a string.');
            }

            var subModel = this.getSubModel(path);

            delete subModel[key];
        };

        // 在顺序数组中某位置插入新元素
        Model.prototype.insertOrderElem = function (flagCRG, classRelGrpName, attrRelName, position, direction) {

            if (0 !== flagCRG && 1 !== flagCRG) {
                throw new TypeError('Model.insertOrderElem(): The first argument must be 0 or 1.');
            }
            if (typeof classRelGrpName !== 'string') {
                throw new TypeError('Model.insertOrderElem(): The second argument must be a string.');
            }
            if (typeof attrRelName !== 'string') {
                throw new TypeError('Model.insertOrderElem(): The third argument must be a string.');
            }
            if (typeof position !== 'string') {
                throw new TypeError('Model.insertOrderElem(): The forth argument must be a string.');
            }
            if (0 !== direction && 1 !== direction) {  // direction: 0,前插 1,后插
                throw new TypeError('Model.insertOrderElem(): The fifth argument must be 0 or 1.');
            }

            var order = this.getSubModel([flagCRG, classRelGrpName, 1, 'order']);

            if ('@' === position) {  // 在尾部插入
                order.push(attrRelName);
            } else {  // 在中间插入
                order.splice(order.indexOf(position) + direction, 0, attrRelName);
            }
        };

        // 在顺序数组中删除某元素
        Model.prototype.removeOrderElem = function (flagCRG, classRelGrpName, attrRelName) {

            if (0 !== flagCRG && 1 !== flagCRG) {
                throw new TypeError('Model.removeOrderElem(): The first argument must be 0 or 1.');
            }
            if (typeof classRelGrpName !== 'string') {
                throw new TypeError('Model.removeOrderElem(): The second argument must be a string.');
            }
            if (typeof attrRelName !== 'string') {
                throw new TypeError('Model.removeOrderElem(): The third argument must be a string.');
            }

            var order = this.getSubModel([flagCRG, classRelGrpName, 1, 'order']);

            order.splice(order.indexOf(attrRelName), 1);  // 删除
        };

        // 在顺序数组中某元素前移或后移
        Model.prototype.moveOrderElem = function (flagCRG, classRelGrpName, attrRelName, direction) {

            if (0 !== flagCRG && 1 !== flagCRG) {
                throw new TypeError('Model.insertOrderElem(): The first argument must be 0 or 1.');
            }
            if (typeof classRelGrpName !== 'string') {
                throw new TypeError('Model.insertOrderElem(): The second argument must be a string.');
            }
            if (typeof attrRelName !== 'string') {
                throw new TypeError('Model.insertOrderElem(): The third argument must be a string.');
            }
            if (typeof direction !== 'number') {  // direction: -n，前移n个位置  +n，后移n个位置
                throw new TypeError('Model.insertOrderElem(): The forth argument must be a number');
            }

            var order = this.getSubModel([flagCRG, classRelGrpName, 1, 'order']);
            var index = order.indexOf(attrRelName);

            order.splice(index, 1); // 删除
            order.splice(index + direction, 0, attrRelName); // 插入
        };

        // 向控制台输出模型
        Model.prototype.print = function () {

            console.log('\n Class:\n');  // 第一个 \n 后边的空格可以使在 Chrome 下的显示更整齐
            console.log(this[0]);
            console.log('Relation Group:\n');
            console.log(this[1]);
        };

        /*  ------- *
         *  高层方法
         *  ------- */

        // 增加类
        Model.prototype.addClass = function (className) {

            if (typeof className !== 'string') {
                throw new TypeError('Model.addClass(): The first argument must be a string.');
            }

            this.addNode([0], [className, [{}, {'order': []}]]);  // 空括号很重要
        };

        // 增加类的属性
        Model.prototype.addAttr = function (className, attrName, pos) {

            if (typeof className !== 'string') {
                throw new TypeError('Model.addAttr(): The first argument must be a string.');
            }
            if (typeof attrName !== 'string') {
                throw new TypeError('Model.addAttr(): The second argument must be a string.');
            }
            if (pos instanceof Object) {
                throw new TypeError('Model.addAttr(): The third argument must be an object.');
            }

            this.addNode([0, className, 0], [attrName, [{}]]);  // 空括号很重要
            this.insertOrderElem(0, className, attrName, pos.position, pos.direction);  // 将 attribute 插入到指定位置
        };

        // 增加类的属性的特性
        Model.prototype.addPropOfA = function (className, attrName, propKV) {

            if (typeof className !== 'string') {
                throw new TypeError('Model.addPropOfA(): The first argument must be a string.');
            }
            if (typeof attrName !== 'string') {
                throw new TypeError('Model.addPropOfA(): The second argument must be a string.');
            }
            if (!(propKV instanceof Array)) {
                throw new TypeError('Model.addPropOfA(): The third argument must be an array.');
            }

            this.addNode([0, className, 0, attrName, 0], propKV);
        };

        // 增加关系组
        Model.prototype.addRelGrp = function (relGrpName) {

            if (typeof relGrpName !== 'string') {
                throw new TypeError('Model.addRelGrp(): The first argument must be a string.');
            }

            this.addNode([1], [relGrpName, [{}, {'order': []}]]);  // 空括号很重要
        };

        // 增加关系组中的关系
        Model.prototype.addRelation = function (relGrpName, relID) {

            if (typeof relGrpName !== 'string') {
                throw new TypeError('Model.addRelation(): The first argument must be a string.');
            }
            if (typeof relID !== 'string') {
                throw new TypeError('Model.addRelation(): The second argument must be a string.');
            }

            this.addNode([1, relGrpName, 0], [relID, [{}]]);  // 空括号很重要
        };

        // 增加关系的特性
        Model.prototype.addPropOfR = function (relGrpName, relID, propKV) {

            if (typeof relGrpName !== 'string') {
                throw new TypeError('Model.addPropOfR(): The first argument must be a string.');
            }
            if (typeof relID !== 'string') {
                throw new TypeError('Model.addPropOfR(): The second argument must be a string.');
            }
            if (!(propKV instanceof Array)) {
                throw new TypeError('Model.addPropOfR(): The third argument must be an array.');
            }

            this.addNode([1, relGrpName, 0, relID, 0], propKV);
        };

        // 修改类名
        Model.prototype.modifyClassName = function (nameOld, nameNew) {

            if (typeof nameOld !== 'string') {
                throw new TypeError('Model.modifyClassName(): The first argument must be a string.');
            }
            if (typeof nameNew !== 'string') {
                throw new TypeError('Model.modifyClassName(): The second argument must be a string.');
            }

            this.modifyNodeName([0], nameOld, nameNew);
        };

        // 修改类的属性
        Model.prototype.modifyAttrName = function (className, nameOld, nameNew) {

            if (typeof className !== 'string') {
                throw new TypeError('Model.modifyAttrName(): The first argument must be a string.');
            }
            if (typeof nameOld !== 'string') {
                throw new TypeError('Model.modifyAttrName(): The second argument must be a string.');
            }
            if (typeof nameNew !== 'string') {
                throw new TypeError('Model.modifyAttrName(): The third argument must be a string.');
            }

            var order = this.getSubModel([0, className, 1, 'order']);

            this.modifyNodeName([0, className, 0], nameOld, nameNew);  // 修改 attribute 的 key
            order.splice(order.indexOf(nameOld), 1, nameNew);  // 修改 attribute 顺序数组中的 attribute name
        };




    }
}


// tests

var model = new Model();

model.addNode([0], ['Course', 'C++']);
//console.log(model[0]);

model.addNode([0], ['Date', '2015']);
//console.log(model[0]);

model.modifyNodeName([0], 'Course', 'Student');
//console.log(model[0]);

model.modifyNodeValue([0], 'Student', 'LiLei');
//model.print();

model.removeSubModel([0], 'Student');
//console.log(model[0]);

model.addNode([0], ['College', 'PKU']);
var subModel = model.getSubModel([0]);
//console.log(subModel);

var model2 = new Model();
model2.addClass('Time');
//model2.print();

model2.addAttr('Time', 'hour', {position: '@', direction: 0});
model2.addAttr('Time', 'second', {position: 'hour', direction: 0});
model2.print();

//model2.addPropOfA('Time', 'hour', ['type', 'string']);
////model2.print();
//
//model2.insertOrderElem(0, 'Time', 'hour', '@', 0);
//model2.insertOrderElem(0, 'Time', 'minute', 'hour', 0);
//model2.insertOrderElem(0, 'Time', 'second', 'hour', 1);
////model2.print();
//
//model2.removeOrderElem(0, 'Time', 'hour');
////model2.print();
//
//model2.moveOrderElem(0, 'Time', 'second', -2);
//model2.moveOrderElem(0, 'Time', 'second', 1);
////model2.print();
//
//model2.addRelGrp('Time-Date');
////model2.print();
//
//model2.addRelation('Time-Date', 'ID43209432409');
////model2.print();
//
//model2.addPropOfR('Time-Date', 'ID43209432409', ['type', 'string']);
////model2.print();
//
//model2.modifyClassName('Time', 'NewYorkTimes');
////model2.print();

console.log('Done!');