"use strict";

const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const db = new sqlite3.Database('where.db');

const io = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    prompt: "Search $ ",
    completer: complete
});

function complete(line, callback) {
    const completions = Object.keys(actions);
    const hits = completions.filter((elem) => elem.startsWith(line));

    callback(null, [hits, line]);
}

/// Search for one or more 
function search(cmd) {
    if (cmd.length < 1) {
        console.log("error: Too few arguments.");
        return;
    }

    const stmt = db.prepare('select * from products where lower(name) like ?');
    console.log(`Searching for ${cmd[0]}`);

    stmt.all(`%${cmd[0]}%`, (err, rows) => {
        if (err === null) {
            if (rows.length == 0) {
                console.log(`No results found for ${cmd[0]}\n`);
            } else {
                for(const row of rows) {
                    console.log(`\t=> ${row.name}: Aisle ${row.aisle}, Section ${row.section}, Shelf ${row.shelf}`);
                }
            }
        } else {
            console.log(`An error occurred: ${err}`);
        }

        commandDone();
    })
}

function add(cmd) {
    commandDone();
}

function showHelp() {
    commandDone();
}

function commandDone() {
    io.prompt();
}

const actions = {
    help: showHelp,
    search: search,
    add: add,
    exit: () => {
        io.close();
    }
}

function handle(cmd) {
    const func = actions[cmd[0]];
    if (func !== undefined) {
        func(cmd.slice(1));
    } else {
        actions.search(cmd);
    }
}

io.prompt();

io.on('line', (line) => {
    handle(line.trim().split(' '));
}).on('close', () => {
    process.exit(0);
})