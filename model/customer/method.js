const { Article } = require("../admin/articleModel");
const { User } = require("../admin/userModel");
const { Customer } = require("./index")
const formidable = require("formidable");
const url = require("url");

const getCustomer = async (req, res) => {
  const query = url.parse(req.url, true)
  const page = query.page || 1;
  const pageSize = 6;
  const count = await Article.countDocuments();
  const list = await Article.find().skip((page - 1) * pageSize).limit(pageSize)
  for (let i = 0; i < list.length; i++) {
    list[i].author = await User.findOne({ _id: list[i].author })
  }
  // return res.send(list)
  res.render("customer/default.art", {
    list,
    page,
    count,
    total: Math.ceil(count / pageSize)
  })
}

const getArticlePage = async (req, res) => {
  const { query } = url.parse(req.url, true)
  const id = query.id;
  const details = await Article.findOne({ _id: id })
  // console.log(details, "details");
  details.author = await User.findOne({ _id: details.author })
  const customers = await Customer.find();
  for (let i = 0; i < customers.length; i++) {
    customers[i].aid = (async () => {
      const article = await Article.findOne({ _id: customers[i].aid })
      return await User.findOne({ _id: article.author })
    })()
    customers[i].uid = await User.findOne({ _id: customers[i].uid })
  }
  res.render("customer/article.art", {
    id,
    details,
    customers
  })
}

const getArticle = (req, res) => {
  // const id = query.id;
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fileds) => {
    console.log(fileds);
    await Customer.create(fileds)
    res.redirect(`/customer/article?id=${fileds.aid}`)
  })
}

module.exports = {
  getCustomer,
  getArticlePage,
  getArticle
}
