var sqlite3 = require('sqlite3').verbose();

const storeEmployee = (employee) => {
    var db = new sqlite3.Database('./dev.db');

    var stmt = db.prepare("INSERT INTO employees VALUES (?,?,?,?)");
    stmt.run("fname " + employee.fname, "lname " + employee.lname, "dname " + employee.dname, "email " + employee.email);
    stmt.finalize();
    
    db.close();
}

const retrieveEmployees = async () => {
    var promise = new Promise(function(resolve, reject) {
        var db = new sqlite3.Database('./dev.db');

        db.all('SELECT * FROM employees', 
            (err, rows) => {
                db.close();
                if(err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });

    var results = await promise().then(rows => rows).catch(err => err);
    return results;
}

module.exports = { retrieveEmployees, storeEmployee }