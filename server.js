app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'alllayisgood@gmail.com',
        subject: `Message from ${name}`,
        text: `
            Message: ${message}
            
            ---

            Additional Information:
            Name: ${name}
            Email: ${email}
            Date Submitted: ${new Date().toLocaleString()}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send message');
        }
        res.status(200).send('Message sent successfully');
    });
});
