import mongoose from 'mongoose';
const { Schema } = mongoose;

const notificationsSchema = new Schema(
  {
    senderDocId: { type: String, required: true },
    receiverDocId: { type: String, required: true },
    senderUserName: { type: String, required: true },
    senderPhotoURL: { type: String, required: true },
  },
  { timestamps: true, collection: 'notifications' }
);

const model = mongoose.model('Notifications', notificationsSchema);

module.exports = model;
