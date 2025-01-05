const migrations = require('./migrations');

let index = 0;
let files = [];

Object.keys(migrations).forEach(k => {
    files.push(k);
})

let filesLength = files.length;

async function migrateFile(file) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('File to migrate!');
            console.log(file)
            console.log(migrations[file].default);
            if (file == '0001_other') {
                index = filesLength;
                reject('Testing');
            } else {
                index++;
                resolve(file);
            }
        }, 1000);
    });
}

function migrate() {
    if (index < filesLength) {
        migrateFile(files[index])
        .then(() => {
            migrate();
        })
        .catch((e) => {
            console.log('Migrate Function Catch!!!!');
            console.log(e);
        })
    }
}

module.exports = migrate;
