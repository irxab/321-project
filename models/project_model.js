const sqlite3 = require("sqlite3");
const sqlite = require('sqlite');

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
};

async function login(username, password) {

    const db = await getDbConnection();
    const currentTime = new Date().toISOString();
    const sql = "select role,user_id from Users where username=? and password=?";
    try {
        const row = await db.all(sql, [username, password], function (err) {
            if (err) {
                console.log(err)
            }
        });
        if (row.length === 1) {
            if (row[0].role === "Admin") {
                const db1 = await getDbConnection();
                db.open();
                db1.run(
                    'INSERT INTO UserSessions (user_id, login_time, logout_time) VALUES (?, ?, ?)',
                    [row[0].user_id, currentTime, ""],
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).json('Error inserting data into the database.');
                        }
                        console.log('data created');
                        res.status(200).json('User created successfully.');
                    }
                );
                return "Admin";
            }
            else if (row[0].role === "Guest") {
                const db1 = await getDbConnection();
                db.open();
                db1.run(
                    'INSERT INTO UserSessions (user_id, login_time, logout_time) VALUES (?, ?, ?)',
                    [row[0].user_id, currentTime, ""],
                    function (err) {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).json('Error inserting data into the database.');
                        }
                        console.log('data created');
                        res.status(200).json('User created successfully.');
                    }
                );
                return "Guest";
            }
        }
        else {
            return "none";
        }

    }
    catch (err) {
        console.log(err)
    }
};
async function addtournament(tournament_id, tournament_name, start_date, end_date) {

    const db = await getDbConnection();
    const sql = await db.prepare(`insert into Tournaments('tournament_id','tournament_name', 'start_date', 'end_date') values (?,?,?,?)`);
    try {
        const meta = await sql.run([tournament_id, tournament_name, start_date, end_date], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err);
    }
};
async function deletetournament(tournament_id) {

    const db = await getDbConnection();
    const sql = "delete from Tournaments where tournament_id=?";
    try {
        const rows = await db.all(sql, [tournament_id], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function listTournaments(customerNo) {
    const db = await getDbConnection();
    const sql = "SELECT * FROM Tournaments";
    try {
        const rows = await db.all(sql, [], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};

async function listTournaments(customerNo) {
    const db = await getDbConnection();
    const sql = "SELECT * FROM Tournaments";
    try {
        const rows = await db.all(sql, [], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};

module.exports = {
    login,
    addtournament,
    deletetournament,
    listTournaments
};