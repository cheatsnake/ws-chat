const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/chat", (req, res) => {
    const { username } = req.body || `user${Date.now()}`;
    res.render("chat", { username, layout: "app" });
});

router.all("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;
