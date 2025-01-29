const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alllayisgood@gmail.com',
        pass: 'abblwetfxpnnxuga'
    }
});

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Email content
    const mailOptions = {
        from: email,
        to: 'alllayisgood@gmail.com', // your recipient email
        subject: `Message from ${name}`,
        text: `Message: ${message}\n\nFrom: ${name}\nEmail: ${email}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send message');
        }
        res.status(200).send('Message sent successfully');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});