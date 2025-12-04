import express from 'express';
const router = express.Router();
import { connectRabbitMQ  } from './init.js';
let chachedChannel1;
router.post('/send', async (req, res) => {
    try{
        if(!chachedChannel1) {
            console.log("not cached , creating new")
            const { channel1 } = await connectRabbitMQ();
            chachedChannel1 = channel1;
        }
        else {
            console.log("using cached channel")
        }
        const {queue, message} = req.body;
        if(!queue || !message) {
            res.status(400).json({ error: 'Queue and message are required' });
            return;
        }
        await chachedChannel1.sendToQueue(queue, Buffer.from(message), { persistent: true });
        res.status(200).json({ status: 'Message sent to ' + queue  });
    }
    catch(error) {
        
        res.status(500).json({ error: 'Failed to send message' + error.message});
    }
});

export default router;