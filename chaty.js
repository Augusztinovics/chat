const help = (process.argv.indexOf('-h') > -1 || process.argv.indexOf('--help') > -1 || process.argv.length < 3) ? true : false;

if (help) {
    console.log('');
    console.log('Welcome on chaty command!');
    console.log('');
    console.log('This command is for running migrations and seeders');
    console.log('');
    console.log('Available commands:');
    console.log('-m or --migrate  : to run migration files up function');
    console.log('-r or --rollback : to run migration files down function (from last up run)');
    console.log('-s or --seed     : to run the seeder file');
    console.log('');
    process.exit(1);
}

let rIndex = process.argv.indexOf('-r');
let rollIndex = process.argv.indexOf('--rollback');
const roll = (rIndex > -1 ||rollIndex > -1) ? true : false;

if (roll) {
    let fileIndex = (rIndex > -1) ? (rIndex + 1) : (rollIndex + 1);
    let file = null;
    if (process.argv.length >= fileIndex +1 ) {
        file = process.argv[fileIndex];
    }
    console.log('');
    if (file) {
        console.log('Rolling back ' + file + '...');
    } else {
        console.log('Rolling back...');
    }

    console.log('');

    const migrate = require('./database/migrate');

    if (file) {
        migrate(true, file);
    } else {
        migrate(true);
    }

}

let mIndex = process.argv.indexOf('-m');
let migrateIndex = process.argv.indexOf('--migrate');
const migrations = (mIndex > -1 || migrateIndex > -1) ? true : false;

if (migrations && !roll) {
    let fileIndex = (mIndex > -1) ? (mIndex + 1) : (migrateIndex + 1);
    let file = null;
    console.log('');
    if (file) {
        console.log('Migrating:  ' + file + '...');
    } else {
        console.log('Checking for available migrations...');
    }
    console.log('');

    const migrate = require('./database/migrate');

    if (file) {
        migrate(false, file);
    } else {
        migrate();
    }
}

const seed = (process.argv.indexOf('-s') > -1 || process.argv.indexOf('--seed') > -1) ? true : false;

if (seed && !roll && !migrations) {
    console.log('');
    console.log('Running the seeder...');
    console.log('');

    //Check for seeders, run if available, tell if done, or tell nothing to seed
}

const logs = (process.argv.indexOf('-l') > -1 || process.argv.indexOf('--logs') > -1) ? true : false;

if (logs && !roll && !migrations) {
    const Log = require('./models/Log.js');
    let result = Log.getAllLogs();
    console.log('Logs:');

    result.then((res) => {
        res.forEach(element => {
            console.log(element.created_at + ' - ' + element.level + ' - ' + element.log);
        });
    }).catch((e) => {
        console.log(e);
    })
}
