const url = require("url");
const { Article } = require("./articleModel");
const formidable = require("formidable");
const path = require("path")

const articleEditPage = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const id = query.id;
  const val = await Article.findOne({ _id: id });
  res.render("admin/article-edit.art", {
    val
  })
}

const articleEdit = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../../public/upload")
  form.keepExtensions = true;
  form.parse(req, async (error, fileds, files) => {
    if (error) {
      const message = JSON.stringify(error);
      res.redirect(`/admin/article-edit?message=${message}`)
    }
    try {
      await Article.updateOne(
        { _id: fileds.id },
        {
          title: fileds.title,
          author: fileds.author,
          cover: files.cover.path.split("public")[1],
          time: fileds.time,
          content: fileds.content
        }
      )
      // return res.send(files.cover.path.split("public")[1])
      res.redirect("/admin/article")
    } catch (error) {
      const message = JSON.stringify(error);
      res.redirect(`/admin/article-edit?message=${message}`)
    }
  })
}

module.exports = {
  articleEditPage,
  articleEdit
}