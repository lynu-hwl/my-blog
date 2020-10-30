const { User } = require("./userModel")
const url = require("url");

const user = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const page = query.page || 1;

  const pageSize = 5;
  const count = await User.countDocuments();
  const list = await User.find().skip((page - 1) * pageSize).limit(pageSize);
  req.app.locals.aside = "user";
  res.render("admin/user.art", {
    list,
    count,
    page,
    total: Math.ceil(count / pageSize)
  })
}

module.exports = {
  user
}
