const asyncHandler = require('express-async-handler');
const Vote = require("../models/Votes");
const Campaign = require("../models/campaign");
const Candidates = require("../models/candidate");


const CastVote = asyncHandler(async (req, res) => {
    const { campaignId, candidateId } = req.body;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
        res.status(404);
        throw new Error('Campaign not found');
    }

    if (campaign.createdBy.toString() === req.user._id) {
        res.status(301);
        throw new Error('Campaign owner cannot vote in the campaign.')
    }

    let candidate = await Candidates.findById(candidateId);

    if (!candidate) {
        res.status(404);
        throw new Error('Campaign not found');
    }

    try {
        const newVote = new Vote({
            campaign: campaignId,
            candidate: candidateId,
            user: req.user_id
        })

        candidate.votes++;
        campaign.total_votes++;

        await Promise.all([newVote.save(), candidate.save(), campaign.save()]);

        res.status(200).send({
            message: "Vote Casted Successfully!"
        });
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }

})

module.exports = { CastVote };