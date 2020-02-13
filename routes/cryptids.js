const express = require("express");
const router = express.Router();
const fs = require("fs");

//ROUTES

//index - display all cryptids
router.get("/", (req, res) => {
    let allCryps = fs.readFileSync("./cryptids.json");
    let crypData = JSON.parse(allCryps);
    res.render("cryptids/index", { cryps: crypData});
    // res.send("HOME");
})



//New -  creates an cryptid with the POST payload data
router.get("/new", (req, res) => {
    res.render("cryptids/new");
})



//Create - form for making a new cryptid
router.post("/", (req, res) => {
    let cryps = fs.readFileSync("./cryptids.json");
    let crypData = JSON.parse(cryps);
    crypData.push(req.body);
    let newCryps = JSON.stringify(crypData);
    fs.writeFileSync("./cryptids.json", newCryps);
    res.redirect(`/cryptids/${crypData.length -1}`);
}) 

//get - displays the type and photo of a particular cryptid (:id would be replaced by an actual number 1)
router.get("/:id", (req, res) => {
    let cryps = fs.readFileSync("./cryptids.json");
    let crypData = JSON.parse(cryps);
    let crypIndex = parseInt(req.params.id);
    console.log(crypIndex);
    let oneCryp = crypData[crypIndex];
    console.log(oneCryp)
    oneCryp.id = crypIndex;
    res.render("cryptids/show", {cryp: oneCryp});
})

//Edit - form for editing a specific cryptid
//edit - get
router.get("/edit/:id", (req, res) => {
    let cryps =fs.readFileSync("./cryptids.json");
    cryps = JSON.parse(cryps);
    let crypIndex = parseInt(req.params.id);
    let oneCryp = cryps[crypIndex];
    oneCryp.id = crypIndex;
    res.render("cryptids/edit", {cryp: oneCryp});
})

//update - put
router.put("/:id", (req, res) => {
    //read file
    let cryps = fs.readFileSync("./cryptids.json");
    //parse
    cryps = JSON.parse(cryps);
    //change the name and type of dino at index
    cryps[parseInt(req.params.id)] = req.body;


    fs.writeFileSync("./cryptids.json", JSON.stringify(cryps));
    res.redirect(`/cryptids/${req.params.id}`);
})

//destroy - delete
router.delete("/:id", (req, res) => {
    // console.log(`deleting dino at ${req.params.id}`);
    //read dinos
    let cryps = fs.readFileSync("./cryptids.json");
    //JSON parse dinos
    cryps = JSON.parse(cryps);
    //remove dino from array at index
    let noMoreCryps = cryps.splice(req.params.id, 1);
    //write JSON stringify version of dinos
    fs.writeFileSync("./cryptids.json", JSON.stringify(cryps));
    res.redirect("/cryptids");
})


module.exports = router;