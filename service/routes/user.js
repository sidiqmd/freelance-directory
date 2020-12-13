const express = require('express');
const db = require('../config/db.config.js');

const saltRounds = 8;
const User = db.user;
const router = express.Router();

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(users => {
        res.json(users);
    }).catch(error => res.status(400).send(error));
});

router.get('/exists', (req, res) => {
    const username = req.query.username;

    User.count({
        where: {
            username: username
        }
    }).then(count => {
        return res.status(200).json(count == 1)
    }
    ).catch(error => res.status(400).send(error));
});

router.put('/:uid/password', (req, res) => {
    const payload = req.body;
    const uid = req.params.uid;
    const hash = bcrypt.hashSync(payload.password, saltRounds);

    User.findOne({
        where: {
            uid: uid
        }
    }).then(
        user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User Not Found',
                });
            }
            user.update({
                password: hash
            }).then(() => res.status(200).json({ message: 'Successfully update password!' }))
                .catch((error) => res.status(400).send(error));
        }
    )
        .catch((error) => res.status(400).send(error));
});

router.get('/:uid', (req, res) => {
    const uid = req.params.uid;

    User.findOne({
        where: {
            uid: uid
        },
        attributes: { exclude: ['password'] }
    }).then(user => {
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }
        return res.status(200).json(user)
    }
    ).catch(error => res.status(400).send(error));
});

router.post('/', (req, res) => {
    const payload = req.body;
    const hash = "";//bcrypt.hashSync(payload.password, saltRounds);

    User.create({
        username: payload.username,
        password: hash,
        name: payload.name,
        age: payload.age,
        email: payload.email,
        phone_number: payload.phone_number,
        skill_sets: payload.skill_set,
        hobbies: payload.hobby
    }, {
        attributes: { exclude: ['password'] },
    }).then(user => {
        res.json(user);
    }).catch(error => res.status(400).send(error))
});

router.put('/:uid', (req, res) => {
    const payload = req.body;
    const uid = req.params.uid;

    User.findOne({
        where: {
            uid: uid
        },
        attributes: { exclude: ['password'] },
    }).then(
        async user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User Not Found',
                });
            }
            await user.update({
                name: payload.name,
                age: payload.age,
                email: payload.email,
                phone_number: payload.phone_number,
                skill_sets: payload.skill_set,
                hobbies: payload.hobby
            }, {
                attributes: { exclude: ['password'] },
            }).then(() => res.status(200).json({ message: 'Successfully update user!' }))
                .catch((error) => res.status(400).send(error));
        }
    )
        .catch((error) => res.status(400).send(error));
});

router.delete('/:uid', (req, res) => {
    const uid = req.params.uid;

    User.findOne({
        where: {
            uid: uid
        }
    }).then(user => {
        if (!user) {
            return res.status(400).send({
                message: 'User Not Found',
            });
        }

        return user.destroy()
            .then(() => res.status(200).json({ message: 'Delete successful!' }))
            .catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
});

module.exports = router;