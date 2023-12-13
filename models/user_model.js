var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db.js');


router.get('/SignUp', (req, res, next) => {
    res.render(path.join(__dirname, '../views/signup.html'));
});

let sql;

router.post('/saveuser', async (req, res, next) => {
    const formData = req.body;
    const lowercasedUsername = formData.username.toLowerCase();
    var role = "Guest";
    const sql = "SELECT * FROM Users WHERE username = ?";

    db.get(sql, [lowercasedUsername], (err, row) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json('Error retrieving data from the database.');
        }

        if (row) {
            console.log('row');
            return res.status(500).json('Username already exists.');
        }

        db.run(
            'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)',
            [lowercasedUsername, formData.password, role],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error inserting data into the database.');
                }
                console.log('data created');
                res.status(200).json('User created successfully.');
            }
        );
    });
})

router.get('/addteam', (req, res) => {
    sql = "select * from Tournaments";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/addTeam.html'), { row })
    }
    );
})

router.post('/addteams', (req, res) => {
    const form = req.body;
    const tournament_id = parseInt(form.tournament_id);

    db.run(
        'INSERT INTO Teams (team_name, tournament_id, player_count) VALUES (?, ?, ?)',
        [form.team_name, tournament_id, form.player_count],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error inserting data into the database.');
            }
            console.log('data created');
            res.status(200).json('Add Team successfully.');
        }
    );
})

router.get('/addplayer', (req, res) => {
    sql = "select * from Teams";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error inserting data into the database.');
        }
        res.render(path.join(__dirname, '../views/addplayer.html'), { row })
    }
    );
})

router.post('/addplayers', (req, res) => {
    const form = req.body;
    const team_id = parseInt(form.team_id);

    db.run(
        'INSERT INTO Players (player_name, team_id) VALUES (?, ?)',
        [form.player_name, team_id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Player successfully.');
        }
    );
})


router.get('/addcaptain', (req, res) => {
    sql = "select * from Teams";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        else {
            db.all('select * from players', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error in getting data.');
                }
                res.render(path.join(__dirname, '../views/addCaptain.html'), { row, rows });
            })
        }
    }
    );
});


router.post('/addcaptains', (req, res) => {
    const form = req.body;
    const team_id = parseInt(form.team_id);
    const player_id = parseInt(form.player_id);

    db.run(
        'INSERT INTO Captains (team_id, player_id) VALUES (?, ?)',
        [form.team_id, player_id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Captain successfully.');
        }
    );
})


router.get('/addapproval', (req, res) => {
    sql = "select * from Teams";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        else {
            db.all('select * from players', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error in getting data.');
                }
                res.render(path.join(__dirname, '../views/addApproval.html'), { row, rows });
            })
        }
    }
    );
});

router.post('/addapprovals', (req, res) => {
    const form = req.body;
    const team_id = parseInt(form.team_id);
    const player_id = parseInt(form.player_id);

    db.run(
        'INSERT INTO Approvals (team_id, player_id) VALUES (?, ?)',
        [form.team_id, player_id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Approval successfully.');
        }
    );
})


router.get('/addredcard', (req, res) => {
    sql = "select * from Teams";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        else {
            db.all('select * from players', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error in getting data.');
                }
                res.render(path.join(__dirname, '../views/addRedCards.html'), { row, rows });
            })
        }
    }
    );
});

router.post('/addredcards', (req, res) => {
    const form = req.body;
    const team_id = parseInt(form.team_id);
    const player_id = parseInt(form.player_id);

    db.run(
        'INSERT INTO Red_Cards (team_id, player_id) VALUES (?, ?)',
        [team_id, player_id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Red Cards successfully.');
        }
    );
});

router.get('/allredcard', (req, res) => {
    sql = `SELECT Red_Cards.red_card_id, Teams.team_name, Players.player_name
            FROM Red_Cards
            JOIN Teams ON Red_Cards.team_id = Teams.team_id
            JOIN Players ON Red_Cards.player_id = Players.player_id;`;

    db.all(sql, [], function (err, rows) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }

        res.render(path.join(__dirname, '../views/allredcards.html'), { rows });
    }
    );
});


router.get('/addmatchresult', (req, res, next) => {
    sql = "select * from Tournaments";

    db.all(sql, [], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        else {
            db.all('select * from Teams', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error in getting data.');
                }
                res.render(path.join(__dirname, '../views/addMatchResults.html'), { row, rows });
            })
        }
    }
    );
});

router.post('/addmatchresults', (req, res) => {
    const form = req.body;
    const tournament_id = parseInt(form.tournament_id);
    const match_date = form.match_date;
    const team1_id = parseInt(form.team1_id);
    const team2_id = parseInt(form.team2_id);
    const team1_score = parseInt(form.team1_score);
    const team2_score = parseInt(form.team2_score);

    db.run(
        'INSERT INTO Match_Results (tournament_id, match_date, team1_id, team2_id, team1_score,team2_score) VALUES (?, ?, ?, ?, ?, ?)',
        [tournament_id, match_date, team1_id, team2_id, team1_score, team2_score],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Match_Results successfully.');
        }
    );
});

router.get('/allmatches', (req, res, next) => {
    sql = `SELECT MR.result_id, MR.match_date, MR.team1_score, MR.team2_score, T1.team_name AS team1_name, T2.team_name AS team2_name, T.tournament_name
    FROM Match_Results MR
    JOIN Teams T1 ON MR.team1_id = T1.team_id
    JOIN Teams T2 ON MR.team2_id = T2.team_id
    JOIN Tournaments T ON MR.tournament_id = T.tournament_id
    ORDER BY MR.match_date ASC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/allmatchresults.html'), { rows })
    });
});


router.get('/addhighestscore', (req, res, next) => {
    sql = `SELECT DISTINCT P.player_id, P.player_name, T.team_name
            FROM Players P
            JOIN Teams T ON P.team_id = T.team_id
            WHERE T.team_id IN (
                SELECT team1_id FROM Match_Results
                UNION
                SELECT team2_id FROM Match_Results
            )`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/addhighestscore.html'), { rows })
    });

});

router.post('/addhighestscores', (req, res) => {
    const form = req.body;
    const player_id = parseInt(form.player_id);
    const goal_score = parseInt(form.goal_score);


    db.run(
        'INSERT INTO Highest_Scores (player_id, goal_score) VALUES (?, ?)',
        [player_id, goal_score],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Highest_Scores successfully.');
        }
    );
});

router.get('/highestscore', (req, res) => {
    sql = `SELECT HS.goal_score, P.player_name, T.team_name
    FROM Players P
    JOIN Highest_Scores HS ON P.player_id = HS.player_id
    JOIN Teams T ON P.team_id = T.team_id
    WHERE HS.goal_score = (
        SELECT MAX(goal_score)
        FROM Highest_Scores
    )`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/highestscore.html'), { rows })
    });
});


router.get('/addmembers', (req, res) => {

    sql = `select * from teams`
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/addmembers.html'), { rows })
    });
});

router.post('/addmember', (req, res) => {
    const form = req.body;
    const team_id = parseInt(form.team_id);


    db.run(
        'INSERT INTO Members (team_id, coach_name,manager_name) VALUES (?, ?, ?)',
        [team_id, form.coach_name, form.manager_name],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            console.log('data created');
            res.status(200).json('Add Members successfully.');
        }
    );
});

router.get('/allteammembers', (req, res) => {
    sql = `select * from teams`
    db.all(sql, [], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        res.render(path.join(__dirname, '../views/allteamsmembers.html'), { row })
    });
})

router.get('/allteamsmember/:team_id', (req, res) => {

    let sql1 = `SELECT Captains.captain_id, Players.player_name
    FROM Captains
    INNER JOIN Players ON Captains.player_id = Players.player_id
    WHERE Captains.team_id = ${req.params.team_id}`;
    let sql2 = `select * from Members where team_id = ${req.params.team_id}`;
    let sql3 = `select * from Players where team_id = ${req.params.team_id}`;


    db.all(sql1, [], (err, row1) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json('Error in getting data.');
        }
        db.all(sql2, [], (err, row2) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error in getting data.');
            }
            db.all(sql3, [], (err, row3) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json('Error in getting data.');
                }
                res.render(path.join(__dirname, '../views/allteamsmembersrender.html'), { row1, row2, row3 })
            });
        });
    });
});

router.get('/logout/:id',(req,res) => {
    const user_id = req.params.id;
    db1.run(
        'INSERT INTO UserSessions (user_id, login_time, logout_time) VALUES (?, ?, ?)',
        [user_id, "", currentTime],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json('Error inserting data into the database.');
            }
            res.render(path.join(__dirname,'..views/signin.html'))
        }
    );
})

module.exports = router;