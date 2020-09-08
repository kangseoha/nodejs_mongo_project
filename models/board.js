const mongoose = require("../config/mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose);

const boardSchma = mongoose.Schema({
  idx : {
    type :Number
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  password: {
    type: String,
  },
});

boardSchma.plugin(autoIncrement.plugin,{ model : 'Board', field : 'idx', startAt : 1 });

module.exports = mongoose.model("Board", boardSchma);

// 이 모델을 여러 파일에서도 사용할 수 있게 export
// index.js에서 require하여 경로지정, cont { Board }로 스키마를 감쌋던 Board를 사용 할 수 있다.
