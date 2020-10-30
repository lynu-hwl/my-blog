const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const template = require("art-template");
const dateFormat = require("dateformat");
require("./model/index");

app.use(session({
  secret: 'my-blog',
  cookie: { maxAge: 1000 * 60 * 60 * 60 },
  // resave: false,
  saveUninitialized: false
}))

const { admin } = require("./router/admin");
const { customer } = require("./router/customer");
// console.log(t, "tt");

app.set("views", path.join(__dirname, "views"));

app.set("views engine", "art");

app.engine("art", require("express-art-template"));
template.defaults.imports.dateFormat = dateFormat;

app.use(express.static("public"));

app.get("/login", require("./model/login/loginPage"))
app.post("/login", require("./model/login/login"))
app.get("/loginout", require("./model/login/loginout"))
app.use("/admin", require("./model/login/index"))
app.use("/admin", admin)
app.use("/customer", customer)

app.use((req, res, next) => {
  res.redirect("/login")
})
// app.use((err, req, res, next) => {
// 	// 将字符串对象转换为对象类型
// 	// JSON.parse() 
// 	const result = JSON.parse(err);
// 	res.redirect(`${result.path}?message=${result.message}`);
// })

app.listen(9000);
console.log("服务运行在9000端口");