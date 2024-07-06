const asyncHandler = require('express-async-handler');
const AuditLog = require('../models/auditlog');


// get latest 15 audit logs by user id
const getAuditLogs = asyncHandler(async (req, res) => {
    try {
        const auditLogs = await AuditLog.find({
            user: req.user._id
        }).sort({ createdAt: -1 }).limit(15);
        res.json(auditLogs);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})


// get audit logs by user id paginated and sorted by createdAt
const getAuditLogsPaginated = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    try {
        const auditLogs = await AuditLog.find({
            user: req.user._id
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex);
        res.json(auditLogs);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
})


// function to log audit logs
const logAudit = async (user, action, entity, entityId) => {
    try {
        const auditLog = new AuditLog({
            user,
            action,
            entity,
            entityId
        });

        await auditLog.save();
    } catch (error) {
        throw new Error('Server Error');
    }
}



module.exports = { getAuditLogs, getAuditLogsPaginated, logAudit };