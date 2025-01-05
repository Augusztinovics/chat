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

const roll = (process.argv.indexOf('-r') > -1 || process.argv.indexOf('--rollback') > -1) ? true : false;

if (roll) {
    console.log('');
    console.log('Rolling back...');
    console.log('');

    //Do the rollback somehow...

}

const migrations = (process.argv.indexOf('-m') > -1 || process.argv.indexOf('--migrate') > -1) ? true : false;

if (migrations && !roll) {
    console.log('');
    console.log('Checking for available migrations...');
    console.log('');

    //Check for not runned migration files, and run it or tell nothing to run
    const migrate = require('./database/migrate');

    migrate();
}

const seed = (process.argv.indexOf('-s') > -1 || process.argv.indexOf('--seed') > -1) ? true : false;

if (seed && !roll && !migrations) {
    console.log('');
    console.log('Running the seeder...');
    console.log('');

    //Check for seeders, run if available, tell if done, or tell nothing to seed
}
