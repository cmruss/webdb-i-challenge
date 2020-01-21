const Accounts = require('./account-model');

module.exports = {
    validateId,
    validateContent
};

function validateId (req, res, next) {
    if (req.params.id) {
        Accounts.get(req.params.id)
        .then(account => {
            if (account === null){
                res.status(400).json({ message: "Invalid account ID."})
            } else {
                req.account = account;
                next();
            }
        });
    };
};

function validateContent(req, res, next) {
    if (Object.keys(req.body).length < 1) {
        res.status(400).json({ message: "Please provide account information." })
    } else if (!req.body.name || req.body.name.length < 1){
        res.status(400).json({ message: "Please provide account name." })
    } else if  (!req.body.budget || req.body.budget.length < 1){
        res.status(400).json({ message: "Please provide account budget." })
    } else {
        next();
    };
};