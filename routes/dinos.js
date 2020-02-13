const express = require("express");
const router = express.Router();
const fs = require("fs");

//index - get
router.get("/", (req, res) => {
    //Get all dinos, pass to page
    let allDinos = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(allDinos);
    // console.log(dinoData);
    res.render("dinos/index", { dinos: dinoData });
})

//new  - get
router.get("/new", (req, res) => {
    res.render("dinos/new");
})

//create - get
router.post("/", (req, res) => {
    console.log(req.body);
    //read dinos
    let dinos = fs.readFileSync("./dinosaurs.json");
    //JSON parsse dinos
    let dinoData = JSON.parse(dinos);
    //add req.body to the end of dinos
    dinoData.push(req.body);
    //JSON stringify dinos
    let newDinos = JSON.stringify(dinoData);
    //write dinos
    fs.writeFileSync("./dinosaurs.json", newDinos);
    //Redirect to show age for new dino
    res.redirect(`/dinos/${dinoData.length -1}`);
})

//show - get
router.get("/:id", (req, res) => {
    //TODO get actual dino at id of req.params.id
    let dinos = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;
    res.render("dinos/show", {dino: oneDino});
})

//edit - get
router.get("/edit/:id", (req, res) => {
    //TODO get dino info and pass it in
    let dinos =fs.readFileSync("./dinosaurs.json");
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;
    res.render("dinos/edit", {dino: oneDino});
})

//update - put
router.put("/:id", (req, res) => {
    //read file
    let dinos = fs.readFileSync("./dinosaurs.json");
    //parse
    dinos = JSON.parse(dinos);
    //change the name and type of dino at index
    dinos[parseInt(req.params.id)] = req.body;

    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
    res.redirect(`/dinos/${req.params.id}`);
})


//destroy - delete
router.delete("/:id", (req, res) => {
    // console.log(`deleting dino at ${req.params.id}`);
    //read dinos
    let dinos = fs.readFileSync("./dinosaurs.json");
    //JSON parse dinos
    dinos = JSON.parse(dinos);
    //remove dino from array at index
    let deadDino = dinos.splice(req.params.id, 1);
    //write JSON stringify version of dinos
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
    res.redirect("/dinos");
})


module.exports = router;