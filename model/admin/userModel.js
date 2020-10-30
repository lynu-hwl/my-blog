const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    message: "用户姓名不符合规则"
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (val) => {
        return /^[a-zA-Z0-9]+@{1,1}.+$/.test(val)
      },
      message: () => new Error("用户邮箱不符合规则")
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return /^[a-zA-Z0-9]{3,30}$/.test(val)
      },
      message: () => new Error("用户密码不符合规则")
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['normal', 'admin'],
    message: "角色是非法值"
  },
  state: {
    type: Number,
    default: 0,
    required: true,
    enum: [0, 1],
    message: "状态是非法值"
  }
})

const User = mongoose.model("User", userSchema);

// User.create([
//   {
//     username: "123",
//     email: "123@qq.com",
//     password: 123,
//     role: "normal",
//     state: 1
//   },
//   {
//     username: "234",
//     email: "234@qq.com",
//     password: 234,
//     role: "normal",
//     state: 1
//   },
//   {
//     username: "345",
//     email: "345@qq.com",
//     password: 345,
//     role: "normal",
//     state: 1
//   },
//   {
//     username: "456",
//     email: "456@qq.com",
//     password: 456,
//     role: "normal",
//     state: 1
//   },
//   {
//     username: "567",
//     email: "567@qq.com",
//     password: 567,
//     role: "normal",
//     state: 1
//   },
// ])

module.exports = {
  User
}

