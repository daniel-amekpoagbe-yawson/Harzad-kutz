import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, date, time, service, paymentMethod } = req.body;

  try {
    await resend.emails.send({
      from: 'Barbershop <onboarding@resend.dev>',
      to: email,
      subject: 'Booking Confirmation',
      html: `
        <h2>Hi ${name},</h2>
        <p>Your appointment has been successfully booked!</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <br/>
        <p>Thank you for booking with us!</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
