const help = (process.argv.indexOf('-h') > -1 || process.argv.indexOf('--help') > -1 || process.argv.length < 3) ? true : false;

if (help) {
    console.log('');
    console.log('Welcome on chaty command!');
    console.log('');
    console.log('This command is for running migrations and seeders');
    console.log('');
    console.log('Available commands:');
    console.log('-m or --migrate   : to run migration files up function');
    console.log('-r or --rollback  : to run migration files down function (from last up run)');
    console.log('-s or --seed      : to run the seeder file');
    console.log('-l or --logs      : to see log entries');
    console.log('-u or --users     : to see users entries');
    console.log('-ms or --messages : to see messages entries');
    console.log('-au or --admins   : to see admin users');
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

const users = (process.argv.indexOf('-u') > -1 || process.argv.indexOf('--users') > -1) ? true : false;

if (users && !logs && !roll && !migrations) {
    const User = require('./models/User.js');
    let result = User.whereRaw('id>0');
    console.log('Users:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('Username: ' + element.username);
            console.log('Email: ' + element.email);
            console.log('Lg: ' + element.lg);
            console.log('Country: ' + element.country);
            console.log('City: ' + element.city);
            console.log('Description: ' + element.description);
            console.log('Has Image: ' + (element.profile_img ? 'Yes' : 'No'));
            console.log('Ip: ' + element.ip);
            console.log('Device data: ' + element.device_data);
            console.log('Remember token: ' + element.remember_token);
            console.log('Push token: ' + element.push_token);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}

const friends = (process.argv.indexOf('-f') > -1 || process.argv.indexOf('--friends') > -1) ? true : false;

if (friends && !users && !logs && !roll && !migrations) {
    const Friend = require('./models/Friend.js');
    let result = Friend.whereRaw('id>0');
    console.log('Friends:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('From user: ' + element.from_user);
            console.log('To user: ' + element.to_user);
            console.log('Message: ' + element.message);
            console.log('Accepted at: ' + element.accepted_at);
            console.log('Denided at: ' + element.denided_at);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}

const group = (process.argv.indexOf('-g') > -1 || process.argv.indexOf('--group') > -1) ? true : false;

if (group && !friends && !users && !logs && !roll && !migrations) {
    const Group = require('./models/Group.js');
    let result = Group.whereRaw('id>0');
    console.log('Groups:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('Main User: ' + element.main_user);
            console.log('Group Name: ' + element.group_name);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}

const groupUser = (process.argv.indexOf('-gu') > -1 || process.argv.indexOf('--groupUser') > -1) ? true : false;

if (groupUser && !group && !friends && !users && !logs && !roll && !migrations) {
    const GroupUser = require('./models/GroupUser.js');
    let result = GroupUser.whereRaw('id>0');
    console.log('GroupUsers:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('Group Id: ' + element.group_id);
            console.log('User Id: ' + element.user_id);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}

const message = (process.argv.indexOf('-ms') > -1 || process.argv.indexOf('--messages') > -1) ? true : false;

if (message && !groupUser && !group && !friends && !users && !logs && !roll && !migrations) {
    const ChatMessage = require('./models/ChatMessage.js');
    let result = ChatMessage.getAll();
    console.log('Chat Messages:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('Group Id: ' + element.group_id);
            console.log('Sender Id: ' + element.from_id);
            console.log('Sender Name: ' + element.sender);
            console.log('Send Time: ' + element.send_time);
            console.log('Message: ' + element.msg);
            console.log('Reaction: ' + element.reaction);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}

const admin = (process.argv.indexOf('-au') > -1 || process.argv.indexOf('--admins') > -1) ? true : false;

if (admin && !message && !groupUser && !group && !friends && !users && !logs && !roll && !migrations) {
    const AdminUser = require('./models/AdminUser.js');
    let result = AdminUser.whereRaw('id>0');
    console.log('Admin Users:');

    result.then((res) => {
        res.forEach(element => {
            console.log('Id: ' + element.id);
            console.log('User Id: ' + element.user_id);
            console.log('Role Id: ' + element.role_id);
            console.log('Created at: ' + element.created_at);
            console.log(' ');
        });
       
    }).catch((e) => {
        console.log(e);
    })
}
