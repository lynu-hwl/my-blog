const { User } = require("../admin/userModel");
const formidable = require("formidable");

const login = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields) => {
    if (err) return;
    try {
      /**用户名、密码为空时重定向登录页 */
      if (!fields.username || !fields.password) {
        return res.redirect("/login")
      }
      // console.log(fields, "fields");

      /**以用户名搜索，无结果  数据库保存密码与输入密码不符 */
      const userInfo = await User.findOne({ email: fields.username })
      if (userInfo.password !== fields.password) {
        return res.redirect("/login");
      }
      // console.log(val, "val");
      req.session.username = fields.username;
      req.app.locals.userInfo = userInfo;
      // console.log(userInfo, "userInfo");
      if (userInfo.role === 'normal') {
        return res.redirect("/customer")
      } else {
        return res.redirect("/admin/user")
      }

    } catch (error) {
      return res.redirect("/login")
    }
  });
}

module.exports = login
