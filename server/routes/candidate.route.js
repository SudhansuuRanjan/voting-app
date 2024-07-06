const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    getCandidateByCampaignId,
    addCandidate,
    addMultipleCandidates,
    updateCandidate,
    deleteCandidate
} = require('../controllers/candidate.controller');


router.route("/:campaignId")
    .get(getCandidateByCampaignId)
    .post(protect, addCandidate)
    .put(protect, updateCandidate)
    .delete(protect, deleteCandidate);

router.route("/bulk/:campaignId")
    .post(protect, addMultipleCandidates);

module.exports = router;


