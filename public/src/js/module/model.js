
/*  ---------------------------------- *
 *
 *  用于前端显示的个体模型（ICM）的构造函数
 *
 *  ---------------------------------- */

function Model(modelPassIn) {

    'use strict';

    // class
    this[0] = {};

    // relationGroup
    this[1] = {};

    // Debug 方法集合 (不能定义在原型中，否则print内的that就一直指向第一个实例化的 Model 对象)
    var that = this;
    this.debug = {
        print: function () {
            console.log('\n Class:\n');  // 第一个 \n 后边的空格可以使在 Chrome 下的显示更整齐
            console.log(that[0]);
            console.log('Relation Group:\n');
            console.log(that[1]);
        }
    };

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

            var subModel = this[path.pop()];

            while (0 !== path.length) {  // 顺路径前进
                subModel = subModel[path.pop()];

                if (undefined === subModel) {
                    throw new ReferenceError('Model.getSubModel(): Path does not exsit in model.');
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

        // 更改某路径的端点的 key
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

        // 删除某路径的端点元素
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
        Model.prototype.addAttr = function (className, attrName) {

            if (typeof className !== 'string') {
                throw new TypeError('Model.addAttr(): The first argument must be a string.');
            }
            if (typeof attrName !== 'string') {
                throw new TypeError('Model.addAttr(): The second argument must be a string.');
            }

            this.addNode([0, className, 0], [attrName, [{}]]);  // 空括号很重要
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

            this.addNode([0, attrName, 0, className, 0], propKV);
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

            this.addNode([0, relGrpName, 1], [relID, [{}]]);  // 空括号很重要
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

            this.addNode([0, relID, 0, relGrpName, 1], propKV);
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

            var order = this.getSubModel(['order', 1, className, 0]);

            this.modifyNodeName([0, className, 0], nameOld, nameNew);  // 修改 attribute 的 key
            order.splice(order.indexOf(nameOld), 1, nameNew);  // 修改 attribute 顺序数组中的 attribute name
        };




    }
}


// tests

var model = new Model();

model.addNode([0], ['Course', 'C++']);
console.log(model[0]);

model.addNode([0], ['Date', '2015']);
console.log(model[0]);

model.modifyNodeName([0], 'Course', 'Student');
console.log(model[0]);

model.removeSubModel([0], 'Student');
console.log(model[0]);

model.addNode([0], ['College', 'PKU']);
var subModel = model.getSubModel([0]);
console.log(subModel);

var model2 = new Model();
model2.addClass('Time');
console.log(model2[0]);

model2.addAttr('Time', 'hour');
model2.debug.print();

model2.addPropOfA('Time', 'hour', ['type', 'string']);
model2.debug.print();

model2.addRelGrp('Time-Date');
model2.debug.print();

model2.addRelation('Time-Date', 'ID43209432409');
model2.debug.print();

model2.addPropOfR('Time-Date', 'ID43209432409', ['type', 'string']);
model2.debug.print();

model2.modifyClassName('Time', 'NewYorkTimes');
model2.debug.print();

console.log('Done!');