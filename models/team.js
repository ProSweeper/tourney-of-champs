const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = {
    content: {
        type: String,
        required: true,
    },
    sportmanship: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    }
};

const teamSchema = {
    teamName: {
        type: String,
        required: true,
    },
    skillLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
        required: true,
    },
    roster: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    reviews: [reviewSchema],
};



module.exports = mongoose.model('Team', teamSchema);