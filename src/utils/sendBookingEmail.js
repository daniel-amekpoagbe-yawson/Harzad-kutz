// src/utils/sendBookingEmail.js
export async function sendBookingEmail(booking) {
  try {
    const response = await fetch("https://resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hazard Kutz <Resend <onboarding@resend.dev>",
        to: booking.customer_email,
        subject: "Your Booking is Confirmed 💈",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#d97706;">Hey ${booking.customer_name},</h2>
            <p>Your booking has been confirmed!</p>
            <table style="margin-top: 10px;">
              <tr><td><strong>Service:</strong></td><td>${booking.service_name}</td></tr>
              <tr><td><strong>Barber:</strong></td><td>${booking.barber_name}</td></tr>
              <tr><td><strong>Date:</strong></td><td>${booking.appointment_date}</td></tr>
              <tr><td><strong>Time:</strong></td><td>${booking.appointment_time}</td></tr>
              <tr><td><strong>Payment:</strong></td><td>${booking.payment_method}</td></tr>
            </table>
            <p style="margin-top:20px;">We’ll be expecting you. Thank you for choosing <b>Hazard Kutz</b> ✂️</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email send failed:", errorText);
      throw new Error("Failed to send booking email");
    }

    console.log("📧 Email sent successfully");
  } catch (err) {
    console.error("Resend email error:", err);
  }
}
