import createBookingEmailHTML from "../emails/BookingConfirmation.jsx";
import createAdminNotificationHTML from "../emails/createAdminNotificationHTML.jsx";

// Existing customer email function
export const sendBookingEmail = async (emailData) => {
  try {
    const emailHtml = createBookingEmailHTML(emailData);

    console.log("Sending customer email to:", emailData.customerEmail);

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
    console.log("Customer email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Customer email error:", error);
    return { success: false, error: error.message };
  }
};

// NEW: Admin notification email function
export const sendAdminNotification = async (emailData) => {
  try {
    const emailHtml = createAdminNotificationHTML({
      ...emailData,
      customerPhone: emailData.customerPhone || "Not provided",
    });

    console.log("Sending admin notification...");

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": import.meta.env.VITE_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "HazardKutz Booking System",
          email: "booking@hazardkutzbarbershop.com",
        },
        to: [
          {
            email: "admin@hazardkutzbarbershop.com", // ✅ Change to your admin email
            name: "HazardKutz Admin",
          },
        ],
        subject: "🔔 New Booking Alert - HazardKutz",
        htmlContent: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Admin notification error:", errorData);
      throw new Error(
        `Failed to send admin notification: ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    console.log("Admin notification sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Admin notification error:", error);
    return { success: false, error: error.message };
  }
};
