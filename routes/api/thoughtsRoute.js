const router = require('express').Router();

const {
    getAllTho, 
    getSingleTho, 
    createTho, 
    updateTho, 
    deleteTho, 
    createReaction, 
    deleteReaction, 
} = require('../../controllers/thoughtController.js'); 

router.route('/').get(getAllTho)
.post(createTho);

router.route('/:thoughtId')
.get(getSingleTho)
.put(updateTho)
.delete(deleteTho);

router.route('/:thoughtId/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;