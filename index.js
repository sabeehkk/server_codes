const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.post('/contact', async (req, res) => {
    const { name, email, phoneno, message } = req.body;
    
    // Check if the incoming data is captured correctly
    console.log(req.body, 'Incoming data');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mail@defencehousingsociety.com',
            pass: 'goya wito mhbf awpc',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: `New Contact Request from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">New Contact Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phoneno}</p>
                <h3 style="color: #555;">Message:</h3>
                <p style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">${message}</p>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        // res.status(200).send('Message sent successfully!');
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
