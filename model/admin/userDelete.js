const { User } = require("./userModel")
const formidable = require("formidable");
const querystring = require("querystring");

const userDelete = (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (error, fields) => {
    await User.findOneAndDelete({ _id: fields.id })
    res.redirect('/admin/user')
  })
}

module.exports = {
  userDelete
}