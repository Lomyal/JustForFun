/*
 *  ICM 模型
 */

var mongodb = require('./db');

function ICM(icm) {
  this.cm = icm.cm;
  this.class = icm.class;
  this.relation = icm.relation;
};
module.exports = ICM;

ICM.prototype.save = function save(callback) {
  // 存入 Mongodb 的文档
  var icm = {
    cm: this.cm,
    class: this.class,
    relation: this.relation,
  };
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 读取 icms 集合
    db.collection('icms', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 为 name 属性添加索引
      collection.ensureIndex('cm', {unique: true});
      // 写入 icm 文档
      collection.insert(icm, {safe: true}, function(err, icm) {
        mongodb.close();
        callback(err, icm);
      });
    });
  });
};

ICM.get = function get(conceptmodel, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 读取 icms 集合
    db.collection('icms', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找 cm 属性为 conceptmodel 的文档
      collection.findOne({cm: conceptmodel}, function(err, doc) {
        mongodb.close();
        if (doc) {
          // 封装文档为 User 对象
          var icm = new ICM(doc);
          callback(err, icm);
        } else {
          callback(err, null);
        }
      });
    });
  });
};