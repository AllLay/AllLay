
const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alllayisgood@gmail.com',
        pass: 'abblwetfxpnnxuga'
});

app.post('/send-order', (req, res) => {
    const { name, phone, email, address, cartItems, totalPrice, totalQuantity } = req.body;

    const emailContent = 
        `Order Details:
        Customer Name: ${name},
        Customer Phone: ${phone},
        Customer Email: ${email},
        Customer Address: ${address}
        Cart Items:
        ${cartItems.map(item => `${item.name} x${item.quantity}`).join('\n')}
        
        Total Quantity: ${totalQuantity}
        Total Price: $${totalPrice}
    `;

    const mailOptions = {
        from: email,
        to: 'alllayisgood@gmail.com',
        subject: `New Order from ${email}`,
        text: emailContent
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            res.json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
