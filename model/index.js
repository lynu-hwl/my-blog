const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(
  () => {
    console.log("连接成功");
  },
  () => {
    console.log("连接失败");
  }
)
