const { Article } = require("./articleModel");
// console.log(Article, "Article");
const formidable = require("formidable");
const path = require("path");

const articleAddPage = (req, res) => {
  res.render("admin/article-add.art")
}

const articleAdd = (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../../public/upload");
  form.keepExtensions = true;
  form.parse(req, async (error, fileds, files) => {
    if (error) {
      const message = JSON.stringify(error);
      res.redirect(`/admin/article-add?message=${message}`)
    }
    try {
      await Article.create({
        title: fileds.title,
        author: fileds.author,
        cover: files.cover.path.split("public")[1],
        time: fileds.time,
        content: fileds.content
      })
      res.redirect("/admin/article")
    } catch (error) {
      const message = JSON.stringify(error);
      res.redirect(`/admin/article-add?message=${message}`)
    }

  })
}

module.exports = {
  articleAdd,
  articleAddPage
}