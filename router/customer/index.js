const express = require("express");
const { getCustomer, getArticlePage, getArticle } = require("../../model/customer/method")
const customer = express.Router();

customer.get("/", getCustomer)

customer.get("/article", getArticlePage)

customer.post("/article", getArticle)

module.exports = {
  customer
}