const sqlite3 = require('sqlite3').verbose()
let jsonData = require("./jsonData");

let self = module.exports = {
    db: new sqlite3.Database(':memory:'),
    result: [],
    initData: async () => {
        await jsonData.initData();
        self.db.run('CREATE TABLE users (id PRIMARY KEY, name, email, role)');
        self.db.run('CREATE TABLE policies (id PRIMARY KEY, amountInsured, email, inceptionDate, installmentPayment, clientId)');

        self.db.serialize(() => {
            let stmt = self.db.prepare('INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)');
            jsonData.users.forEach((o) => {
                stmt.run(o.id, o.name.toLowerCase(), o.email, o.role);
            });

            stmt = self.db.prepare('INSERT INTO policies (id, amountInsured, email, inceptionDate, installmentPayment, clientId) VALUES (?, ?, ?, ?, ?, ?)');
            jsonData.policies.forEach((o) => {
                stmt.run(o.id, o.amountInsured, o.email, o.inceptionDate, o.installmentPayment, o.clientId);
            });
        });
    },
    getUser: async (userId) => {
        return await new Promise((resolve, reject) => {
            self.db.get(`Select * from users where id = "${userId}"`, [], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
    getUserByProperty: async (field, value) => {
        return await new Promise((resolve, reject) => {
            self.db.get(`Select * from users where ${field} = "${value.toLowerCase()}"`, [], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
    getPolicy: async (policyId) => {
        return await new Promise((resolve, reject) => {
            self.db.get(`Select * from policies where id = "${policyId}"`, [], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
    getUserPolicies: async (user) => {
        return await new Promise((resolve, reject) => {
            self.db.all(`Select * from policies where clientId = "${user.id}"`, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}