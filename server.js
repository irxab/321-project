const express = require("express");
const nunjucks = require("nunjucks");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = 5000;



const model = require("./models/project_model");
const { route } = require("./models/user_model.js");
app.use(express.urlencoded({ extended: true }));
nunjucks.configure("view", { express: app });
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(require('./models/user_model.js'));



app.get("/admin/home", async (req, res) => {
    res.render(path.join(__dirname + '/views/adminhome.html'));
});
app.get("/", async (req, res) => {
    res.render(path.join(__dirname + '/views/signin.html'));
});
app.get("/signin", async (req, res) => {
    res.render(path.join(__dirname + '/views/signin.html'));
});
app.get("/admin/addtournament", async (req, res) => {
    res.render(path.join(__dirname + '/views/addTournament.html'));
});
app.get("/admin/deletetournament", async (req, res) => {
    res.render(path.join(__dirname + '/views/deletetournament.html'));
});
app.post("/TournamentList", async (req, res) => {
    const row = await model.listTournaments();
    res.render(path.join(__dirname + '/views/deletetournament1.html'), { row });
});
app.post("/deletetour", async (req, res) => {
    model.deletetournament(
        req.body.tournament_id,
    );
    res.redirect("/admin/deletetournament");
});
app.get("/Guest/home", async (req, res) => {
    res.render(path.join(__dirname + '/views/Guesthome.html'));
});

app.post("/signin", async (req, res) => {
    const login = await model.login(
        // req.body.id,
        req.body.username,
        req.body.password,
    );

    if (login === 'Guest') {
        res.redirect("/guest/home");
    }
    else if (login === 'Admin') {
        res.redirect("/admin/home");
    }
    else {
        res.redirect("/signin");
    }

});
app.post("/addtournament", async (req, res) => {
    model.addtournament(
        req.body.tournament_id,
        req.body.tournament_name,
        req.body.start_date,
        req.body.end_date,
    );
    res.redirect("/admin/addtournament");
});

app.post("/signin", async (req, res) => {
    const login = await model.login(
        // req.body.id,
        req.body.username,
        req.body.password,
    );

    if (login === 'Guest') {
        res.redirect("/guest/home");
    }
    else if (login === 'Admin') {
        res.redirect("/admin/home");
    }
    else {
        res.redirect("/signin");
    }

});




app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});