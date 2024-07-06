const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name'],
        minlength: [2, 'Name cannot be less than 2 characters']
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
}, {
    collection: 'candidates',
    timestamps: true
})

const CandidateModel = mongoose.model('Candidate', CandidateSchema);

module.exports = CandidateModel;