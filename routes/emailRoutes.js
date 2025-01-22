import express from 'express';
import Email from '../models/Email.js';

const router = express.Router();

router.get('/emails/', async (req, res) => {
    try {
        const emails = await Email.find({}, { email: 1, _id: 0 });
        const emailList = emails.map(doc => doc.email);
        res.status(200).json(emailList);    
    } catch (error) {
        res.status(500).send({ message: "Server Error " + error.message });
    }
});

router.post("/emails", async (req, res) => {
    let email;
    email = new Email({
        email: req.body.email,
    });
    try {
        await email.save();
        return res.status(200).json({ email: email });
    } catch (error) {
        res.status(500).json(`Something went wrong: ${error.message}`);
    };
});

export default router;