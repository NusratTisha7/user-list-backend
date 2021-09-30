const router = require('express').Router();
const {
    addUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.route('/')
    .post(addUser)
    .get(getUser)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;