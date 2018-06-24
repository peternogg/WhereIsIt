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

/// Autocomplete function
function complete(line, callback) {
    const completions = Object.keys(actions);
    const hits = completions.filter((elem) => elem.startsWith(line));

    callback(null, [hits, line]);
}

/// Search for one or more products
function search(cmd) {
    if (cmd.length < 1) {
        console.log("error: Too few arguments.");
        return;
    }

    const stmt = db.prepare('select * from products where lower(name) like ?');

    for (const param of cmd) {
        stmt.all(`%${param}%`, (err, rows) => {
            console.log(`Searching for ${param}`);
            if (err === null) {
                if (rows.length == 0) {
                    console.log(`No results found for ${param}\n`);
                } else {
                    for(const row of rows) {
                        console.log(`\t=> ${row.name}: Aisle ${row.aisle}, Section ${row.section}, Shelf ${row.shelf}`);
                    }
                }
            } else {
                console.log(`error: ${err}`);
            }
        })
    }

    // Don't print a prompt until everything in the queue is finished.
    stmt.finalize(() => commandDone());
}

/// Add a new product
function add(cmd) {
    if (cmd.length < 4) {
        console.log("error: Too few arguments.");
        commandDone();
    } else {
        const stmt = db.prepare('insert into products(name, aisle, section, shelf) values (?, ?, ?, ?)');
        stmt.run(cmd, (err) => {
            if (err !== null) {
                console.log(`error: ${err}`);
            } else {
                console.log("ok");
            }
            commandDone();
        });
    }
}

/// Show the help dialog
function showHelp() {
    commandDone();
}

/// Called by a command when it finishes
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

/// Handle a command from the user
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