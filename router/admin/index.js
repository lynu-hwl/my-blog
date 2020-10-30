const express = require("express");

const admin = express.Router();

const { user } = require("../../model/admin/user");
const { userAddPage, userAdd } = require("../../model/admin/userAdd");
const { userEditPage, userEdit } = require("../../model/admin/userEdit");
const { userDelete } = require("../../model/admin/userDelete");
const { article } = require("../../model/admin/article");
const { articleAddPage, articleAdd } = require("../../model/admin/articleAdd")
const { articleEditPage, articleEdit } = require("../../model/admin/articleEdit")
const { articleDelete } = require("../../model/admin/articleDelete");

admin.get("/user", user)

admin.get("/user-add", userAddPage)

admin.post("/user-add", userAdd)

admin.get("/user-edit", userEditPage)

admin.post("/user-edit", userEdit)

admin.post("/user-delete", userDelete)

admin.get("/article", article)

admin.get("/article-add", articleAddPage)

admin.post("/article-add", articleAdd)

admin.get("/article-edit", articleEditPage)

admin.post("/article-edit", articleEdit)

admin.post("/article-delete", articleDelete)

module.exports = {
  admin
}