const Campaign = require('../models/campaign');
const Candidate = require('../models/candidate');
const asyncHandler = require('express-async-handler');

/**
 * @desc Get paginated campaigns
 * @route GET /api/campaigns
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getCampaigns = asyncHandler(async (req, res) => {
    // Function implementation here
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    try {

        const count = await Campaign.countDocuments({ ...keyword });

        const campaigns = await Campaign.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('createdBy');

        res.json({ campaigns, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


/**
 * @desc Get single campaign
 * @route GET /api/campaigns/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getCampaignById = asyncHandler(async (req, res) => {
    // Function implementation here
    const campaign = await Campaign.findById(req.params.id).populate('candidates');
    if (campaign) {
        res.json(campaign);
    } else {
        res.status(404).json({ message: 'Campaign not found' });
    }
});


/**
 * @desc Create a campaign
 * @route POST /api/campaigns
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createCampaign = asyncHandler(async (req, res) => {
    const { name, description, start_date, end_date, status } = req.body;

    const campaign = new Campaign({
        name,
        description,
        start_date,
        end_date,
        createdBy: req.user._id,
        status,
        candidates: [],
        total_votes: 0
    });

    try {
        const createdCampaign = await campaign.save();
        res.status(201).json(createdCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


/**
 * @desc Update a campaign
 * @route PUT /api/campaigns/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateCampaign = asyncHandler(async (req, res) => {
    // Function implementation here
    const { name, description, start_date, end_date, status } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
        campaign.name = name;
        campaign.description = description;
        campaign.start_date = start_date;
        campaign.end_date = end_date;
        campaign.status = status;

        const updatedCampaign = await campaign.save();
        res.json(updatedCampaign);
    } else {
        res.status(404).json({ message: 'Campaign not found' });
    }
});


/**
 * @desc Delete a campaign
 * @route DELETE /api/campaigns/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteCampaign = asyncHandler(async (req, res) => {
    try {
        // delete campaign candidates first
        await Candidate.deleteMany({ campaign: req.params.id });

        const campaign = await Campaign.findById(req.params.id);

        if (campaign) {
            await campaign.remove();
            res.json({ message: 'Campaign removed' });
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


module.exports = { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign };