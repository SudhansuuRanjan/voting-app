const asyncHandler = require('express-async-handler');
const Candidate = require('../models/candidate');
const Campaign = require('../models/campaign');


const getCandidateByCampaignId = asyncHandler(async (req, res) => {
    const campaignId = req.params.id;
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
        res.status(404);
        throw new Error('Campaign not found');
    }

    try {
        const candidates = await Candidate.find({ campaign: campaignId });
        res.json(candidates);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})

const addCandidate = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    const campaignId = req.params.id;

    const campaign = await findCampaignById(campaignId);

    if (!campaign) {
        res.status(404);
        throw new Error('Campaign not found');
    }

    if (!name || !image) {
        res.status(400);
        throw new Error('Name and image are required');
    }

    if (campaign.createdBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to add candidate to this campaign');
    }

    try {
        const candidate = new Candidate({
            name,
            image,
            campaign: campaignId,
            votes: 0
        });

        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})


const addMultipleCandidates = asyncHandler(async (req, res) => {
    const candidates = req.body;
    const campaignId = req.params.id;

    const campaign = await findCampaignById(campaignId);

    if (!campaign) {
        res.status(404);
        throw new Error('Campaign not found');
    }

    if (campaign.createdBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to add candidate to this campaign');
    }

    try {
        const createdCandidates = await Candidate.insertMany(candidates.map(candidate => ({
            ...candidate,
            campaign: campaignId,
            votes: 0
        })));

        res.status(201).json(createdCandidates);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})

const updateCandidate = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    const candidateId = req.params.id;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const campaign = await findCampaignById(candidate.campaign);

    if (campaign.createdBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to update candidate in this campaign');
    }

    try {
        candidate.name = name;
        candidate.image = image;

        await candidate.save();
        res.json(candidate);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})

const deleteCandidate = asyncHandler(async (req, res) => {
    const candidateId = req.params.id;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const campaign = await findCampaignById(candidate.campaign);

    if (campaign.createdBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to delete candidate in this campaign');
    }

    try {
        await candidate.remove();
        res.json({ message: 'Candidate removed' });
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }

});


module.exports = {
    getCandidateByCampaignId,
    addCandidate,
    addMultipleCandidates,
    updateCandidate,
    deleteCandidate
}