import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (name, email) => {
    try {

        const data = await resend.emails.send({
            from: "Forever <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to Forever 🎉",

            html: `
                <h1>Welcome ${name}</h1>

                <p>Thank you for joining Forever.</p>

                <p>We're happy to have you with us.</p>
            `
        });

        console.log(data);

    } catch (error) {
        console.log(error);
    }
};