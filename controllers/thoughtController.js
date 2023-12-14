const { User, Thought } = require('../models');

module.exports = {

    getAllTho(req,res) {
        Thought.find({ })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }, 

    getSingleTho(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No Thought found with this ID!" })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createTho(req,res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

    updateTho(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
          )
        .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(user)
        )
          .catch((err) => res.status(500).json(err));
    }, 
 
    deleteTho(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Thought deleted, but no user found'})
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => res.status(500).json(err));
    }, 

    createReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => {
            res.status(500).json(err)});
    },

    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
};