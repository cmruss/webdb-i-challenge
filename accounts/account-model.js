const db = require("../data/dbConfig.js");

module.exports = {
    get,
    insert,
    update,
    remove,
};

function get(id) {
    let query = db("accounts");

    if (id) {
        return query
            .where("id", id)
            .first()
    } else {
        return null;
    };
};

function insert(account) {
    return db("accounts")
        .insert(account)
        .then(([id]) => this.get(id));
};

function update(id, changes) {
    return db("accounts")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
};

function remove(id) {
    return db("accounts")
        .where("id", id)
        .del();
};