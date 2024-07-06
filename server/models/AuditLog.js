const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: [true, 'Please provide an action']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entity: {
        type: String,
        required: [true, 'Please provide an entity']
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide an entity id']
    },
}, {
    collection: 'audit_logs',
    timestamps: true
})