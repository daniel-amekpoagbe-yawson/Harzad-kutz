import createBookingEmailHTML from "../emails/BookingConfirmation";

export const sendBookingEmail = async (emailData) => {
  try {
    // Generate professional HTML email
    const emailHtml = createBookingEmailHTML(emailData);

    // Send email via Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": import.meta.env.VITE_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "HazardKutz Barbershop",
          email: "booking@hazardkutzbarbershop.com",
        },
        to: [
          {
            email: emailData.customerEmail,
            name: emailData.customerName,
          },
        ],
        subject: "✂️ Your HazardKutz Appointment is Confirmed!",
        htmlContent: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      throw new Error(
        `Failed to send email: ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};
