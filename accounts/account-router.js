const express = require('express');

const knex = require('../data/dbConfig');
const mw = require('./account-middleware');

const router = express.Router();

router.get('/', (req, res) => {

    knex
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "Error retrieving accounts." })
        });
});

router.get('/:id', mw.validateId, (req, res) => {

    knex
        .select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "Error obtaining account." })
        });
});

router.post('/', mw.validateContent, (req, res) => {
    
    knex('accounts')
        .insert(req.body, 'id')
        .then(ids => {
            const id = ids[0]
            return knex('accounts')
            .where({ id })
            .first()
            .then(post => {
                res.status(201).json(post)
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "Error adding account."})
        });
});

router.put('/:id', mw.validateId, mw.validateContent, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        if (count > 0)
        res.status(201).json({ message: `${count} account updated.` })
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({ errorMessage: "Error modifying account."})
    });
});

router.delete('/:id', mw.validateId, (req, res) => {
    const { id } = req.params;
    knex('accounts')
        .where({ id })
        .delete()
        .then(count => {
            res.status(200).json({ message: `${count} account deleted.`})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Unable to delete post."})
        })
})

module.exports = router;