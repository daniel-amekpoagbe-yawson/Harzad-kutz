
// api/send-booking-email.js
import { render } from "@react-email/render";
import BookingConfirmation from "../emails/BookingConfirmation";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const emailData = req.body;

    // Validate required fields
    if (!emailData.customerEmail || !emailData.customerName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Render the email template to HTML
    const emailHtml = render(
      BookingConfirmation({
        customerName: emailData.customerName,
        barberName: emailData.barberName,
        serviceName: emailData.serviceName,
        appointmentDate: emailData.appointmentDate,
        appointmentTime: emailData.appointmentTime,
        paymentMethod: emailData.paymentMethod,
        paymentReference: emailData.paymentReference,
        paymentStatus: emailData.paymentStatus,
      })
    );

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HazardKutz <onboarding@resend.dev>",
        to: [emailData.customerEmail],
        subject: "✂️ Your HazardKutz Appointment is Confirmed!",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}