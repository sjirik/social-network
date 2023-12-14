const router = require('express').Router();

const {
    getAllUse, 
    getOneUse,
    createUse, 
    updateUse, 
    deleteUse, 
    addFriend,
    deleteFriend
} = require ('../../controllers/userController'); 

router.route('/').get(getAllUse)
.post(createUse);

router.route('/:userId')
.get(getOneUse)
.put(updateUse)
.delete(deleteUse);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router