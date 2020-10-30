const { User } = require("./userModel.js");
const url = require("url")
const formidable = require("formidable");

const userAddPage = (req, res) => {
  const { query } = url.parse(req.url, true);
  // console.log(query, "query");
  res.render("admin/user-add.art", {
    message: query.message
  })
}

const userAdd = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields) => {
    if (error) {
      return res.redirect(`/admin/user-add?message=${JSON.stringify(error)}`)
    };
    try {
      await User.create(fields);
      return res.redirect("/admin/user")
    } catch (error) {
      // console.log(JSON.stringify(error), "error");
      return res.redirect(`/admin/user-add?message=${JSON.stringify(error)}`)
    }
  });
}

module.exports = {
  userAddPage,
  userAdd
}