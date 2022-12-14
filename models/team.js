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
        ref: 'User',
        required: true,
    }
};

const playerSchema = {
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        enum: ['Forward', 'Defence', 'Goalie'],
        required: true,
    },
    jerseyNum: {
        type: Number,
        min: 1,
        max: 99,
        default: randomNum()
    }
}

const teamSchema = {
    roster: [playerSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userAvatar: String,
    userName: String,
    teamName: {
        type: String,
        required: true,
    },
    skillLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Professional'],
        required: true,
    },
    reviews: [reviewSchema],
};

module.exports = mongoose.model('Team', teamSchema);

function randomNum() {
    return (Math.floor(Math.random() * 99) + 1);
}