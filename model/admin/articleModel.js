const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, "请填写标题"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: [true, "请传递作者"]
  },
  time: {
    type: Date,
    require: true,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
})

const Article = mongoose.model("Article", articleSchema);

module.exports = {
  Article
}