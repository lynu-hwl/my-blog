const { Article } = require("./articleModel")
const formidable = require("formidable");

const articleDelete = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fileds) => {
    // console.log(fileds, "fileds");
    await Article.findOneAndDelete({ _id: fileds.id })
    res.redirect("/admin/article")
  })
}

module.exports = {
  articleDelete
}