const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name'],
        minlength: [2, 'Name cannot be less than 2 characters']
    },
    description: {
        type: String,
        trim: true,
    },
    start_date: {
        type: Date,
        required: [true, 'Please provide a start date']
    },
    end_date: {
        type: Date,
        required: [true, 'Please provide an end date']
    },
    total_votes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive','completed','upcoming'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }]
}, {
    collection: 'campaigns',
    timestamps: true,
})

const CampaignModel = mongoose.model('Campaign', CampaignSchema);

module.exports = CampaignModel;