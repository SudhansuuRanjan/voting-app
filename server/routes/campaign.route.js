const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaign.controller');

router.route('/')
    .get(getCampaigns)
    .post(protect, createCampaign);

router.route('/:id')
    .get(getCampaignById)
    .put(protect, updateCampaign)
    .delete(protect, deleteCampaign);


module.exports = router;
