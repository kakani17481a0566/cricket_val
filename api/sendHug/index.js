const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    const { count } = req.body || { count: 1 };

    // Email configuration
    // IMPORTANT: In a production environment, use Environment Variables (Application Settings)
    // accessible via process.env.EMAIL_USER and process.env.EMAIL_PASS
    // For this quick implementation with the provided app password:
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohithk80@gmail.com', // Sending from your email
            pass: 'bjan jkyd npgd zlgk'  // Your App Password
        }
    });

    const mailOptions = {
        from: '"Virtual Hugs ❤️" <mohithk80@gmail.com>',
        to: 'kakanimohithkrishnasai@gmail.com', // Updated recipient
        subject: `🫂 You received a Virtual Hug! (Count: ${count})`,
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; background-color: #fff0f5; padding: 40px; border-radius: 20px;">
                <h1 style="color: #e11d48;">Virtual Hug Received! 🫂</h1>
                <p style="font-size: 18px; color: #4b5563;">Someone is thinking of you right now and sent a warm hug.</p>
                <div style="font-size: 60px; margin: 20px 0;">💖</div>
                <p style="color: #db2777; font-weight: bold;">"Sent across the miles, straight to your heart."</p>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 30px;">Sent from your Valentine's Website</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        context.res = {
            status: 200,
            body: { message: "Hug sent successfully!" }
        };
    } catch (error) {
        context.log.error("Error sending email:", error);
        context.res = {
            status: 500,
            body: { message: "Error sending hug.", error: error.message }
        };
    }
};
