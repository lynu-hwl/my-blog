const { Article } = require("./articleModel");
const { User } = require("./userModel");
const pagination = require("mongoose-sex-page");
const url = require("url");

const article = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const page = query.page || 1;
  const pageSize = 5;
  const count = await Article.countDocuments()
  let arr = await Article.find().skip((page - 1) * pageSize).limit(pageSize);
  const list = []
  for (let i = 0; i < arr.length; i++) {
    arr[i].author = await User.findOne({ _id: arr[i].author })
    list.push(arr[i])
  }
  req.app.locals.aside = "article";
  res.render("admin/article.art", {
    list,
    page,
    count,
    totalr: Math.ceil(count / pageSize)
  })
}

module.exports = {
  article
}