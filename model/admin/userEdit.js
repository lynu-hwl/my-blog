const url = require("url");
const formidable = require("formidable");
const { User } = require("./userModel");
const login = require("../login/login");

const userEditPage = async (req, res) => {
  const { query } = url.parse(req.url, true);
  const id = query.id;
  try {
    const val = await User.findOne({ "_id": id })
    // console.log(val, "val");
    res.render("admin/user-edit.art", {
      id,
      val
    })
  } catch (error) {
    res.render("admin/user-edit.art", {
      id,
      message: error
    })
  }
}

const userEdit = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fileds) => {
    if (error) {
      res.render("admin/user-edit.art", {
        id,
        message: error
      })
      return;
    }
    try {
      fileds.state = parseInt(fileds.state);
      console.log(fileds.id, "id");
      console.log(fileds, "fileds");
      await User.updateOne({ _id: fileds.id }, fileds)
      res.redirect("/admin/user")
    } catch (error) {
      res.render("admin/user-edit.art", {
        id: fileds.id,
        message: error,
        val: fileds
      })
    }
  })
}

module.exports = {
  userEditPage,
  userEdit
}