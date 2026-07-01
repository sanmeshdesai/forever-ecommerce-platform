import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (name, email) => {
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("sendWelcomeEmail called");

    try {

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Forever 🎉",
            html: `
                <h1>Welcome ${name}</h1>
                <p>Thank you for joining Forever.</p>
                <p>We are happy to have you with us.</p>
            `,
        });

        console.log("Email sent successfully");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}