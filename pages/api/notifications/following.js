import mongoConnect from '../../../db/mongoDb';
import Notification from '../../../schemas/Notfications';
mongoConnect();
export default async function handler(req, res) {
  // console.log(req.body);
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const notification = await Notification.create(req.body);
        res.status(200).json({ success: true, notification: notification });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
  }
}
