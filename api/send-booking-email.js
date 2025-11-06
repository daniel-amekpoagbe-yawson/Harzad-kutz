// =====================================================
// FILE: api/send-booking-email.js
// LOCATION: Create this in your project root /api folder
// =====================================================

/**
 * Vercel Serverless Function to send booking confirmation emails
 * This function runs on Vercel's servers (not in the browser),
 * so it can safely use your Resend API key without CORS issues.
 */

export default async function handler(req, res) {
  // ============================================
  // 1. SECURITY: Only allow POST requests
  // ============================================
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    // ============================================
    // 2. EXTRACT booking data from request body
    // ============================================
    const {
      customer_name,
      customer_email,
      service_name,
      barber_name,
      appointment_date,
      appointment_time,
      payment_method
    } = req.body;

    // ============================================
    // 3. VALIDATE: Ensure required fields exist
    // ============================================
    if (!customer_email || !customer_name) {
      return res.status(400).json({ 
        error: 'Missing required fields: customer_email and customer_name' 
      });
    }

    // ============================================
    // 4. CALL RESEND API from server-side
    // The API key is stored in Vercel environment variables
    // and never exposed to the browser
    // ============================================
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        // Access secret API key from Vercel environment variables
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Sender email (must be verified in Resend dashboard)
        from: 'Hazard Kutz <onboarding@resend.dev>',
        
        // Recipient email from booking data
        to: customer_email,
        
        // Email subject line
        subject: 'Your Booking is Confirmed 💈',
        
        // HTML email template
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <h2 style="color: #d97706; margin-bottom: 20px;">
                Hey ${customer_name},
              </h2>
              
              <!-- Confirmation message -->
              <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
                Your booking has been confirmed! We're looking forward to seeing you.
              </p>
              
              <!-- Booking details table -->
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">Service:</td>
                  <td style="padding: 12px 0; color: #111827;">${service_name || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">Barber:</td>
                  <td style="padding: 12px 0; color: #111827;">${barber_name || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">Date:</td>
                  <td style="padding: 12px 0; color: #111827;">${appointment_date || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">Time:</td>
                  <td style="padding: 12px 0; color: #111827;">${appointment_time || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">Payment:</td>
                  <td style="padding: 12px 0; color: #111827;">${payment_method || 'N/A'}</td>
                </tr>
              </table>
              
              <!-- Footer message -->
              <p style="margin-top: 30px; font-size: 16px; color: #374151;">
                We'll be expecting you. Thank you for choosing <strong>Hazard Kutz</strong> ✂️
              </p>
              
              <!-- Contact info (optional) -->
              <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                If you need to reschedule or have any questions, please contact us.
              </p>
            </div>
          </div>
        `,
      }),
    });

    // ============================================
    // 5. HANDLE RESEND API RESPONSE
    // ============================================
    if (!resendResponse.ok) {
      // If Resend API returns an error, log it and send error response
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      
      return res.status(resendResponse.status).json({
        error: 'Failed to send email',
        details: errorData
      });
    }

    // Parse successful response from Resend
    const data = await resendResponse.json();
    
    // ============================================
    // 6. RETURN SUCCESS RESPONSE to frontend
    // ============================================
    console.log('✅ Email sent successfully:', data);
    return res.status(200).json({
      success: true,
      message: 'Booking confirmation email sent',
      emailId: data.id // Resend's email ID for tracking
    });

  } catch (error) {
    // ============================================
    // 7. ERROR HANDLING for unexpected errors
    // ============================================
    console.error('Serverless function error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}