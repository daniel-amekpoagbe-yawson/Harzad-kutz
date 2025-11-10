import { render } from "@react-email/render";
import BookingConfirmation from "../emails/BookingConfirmation";

export const sendBookingEmails = async (emailData) => {
  try {
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
        Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HazardKutz <onboarding@resend.dev>",
        to: [emailData.customerEmail],
        subject: "✂️ Your HazardKutz Appointment is Confirmed!",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};
