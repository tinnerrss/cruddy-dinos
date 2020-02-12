const express = require("express");
const router = express.Router();

//index - get
router.get("/", (req, res) => {
    //TODO get all dinos, pass to page
    res.render("dinos/index", { dinos: [] });
})

//new  - get
router.get("/new", (req, res) => {
    res.render("dinos/new")
})

//create - get


//show - get
router.get("/:id", (req, res) => {
    //TODO get actual dino at id of req.params.id
    res.render("dinos/show", {dinos: { id: req.params.id }});
})

//edit - get
router.get("/edit/:id", (req, res) => {
    //TODO get dino info and pass it in
    res.render("dinos/edit", {dino: { id: req.params.id }});
})

//update - put


//destroy - delete


module.exports = router;