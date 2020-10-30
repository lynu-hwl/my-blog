module.exports = (req, res, next) => {
  // console.log(req.session, "req.session");
  if (req.session.username) {
    if (req.app.locals.userInfo.role === "normal") {
      return res.redirect("/customer")
    }
    next()
  } else {
    res.redirect("/login")
  }
}