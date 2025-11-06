// =====================================================
// FILE: src/utils/sendBookingEmail.js
// PURPOSE: Frontend utility to call Vercel serverless function
// =====================================================

/**
 * Sends a booking confirmation email by calling our Vercel serverless function
 * This runs in the browser but doesn't expose any API keys (they're on the server)
 * 
 * @param {Object} booking - Booking details object
 * @param {string} booking.customer_name - Customer's full name
 * @param {string} booking.customer_email - Customer's email address
 * @param {string} booking.service_name - Name of booked service
 * @param {string} booking.barber_name - Assigned barber's name
 * @param {string} booking.appointment_date - Appointment date
 * @param {string} booking.appointment_time - Appointment time
 * @param {string} booking.payment_method - Payment method used
 * @returns {Promise<Object>} Response object with success status
 */
export async function sendBookingEmail(booking) {
  try {
    // ============================================
    // 1. CALL our Vercel serverless function
    // /api/send-booking-email is automatically routed by Vercel
    // ============================================
    const response = await fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send booking data to our serverless function
      body: JSON.stringify({
        customer_name: booking.customer_name,
        customer_email: booking.customer_email,
        service_name: booking.service_name,
        barber_name: booking.barber_name,
        appointment_date: booking.appointment_date,
        appointment_time: booking.appointment_time,
        payment_method: booking.payment_method,
      }),
    });

    // ============================================
    // 2. PARSE the response from our serverless function
    // ============================================
    const data = await response.json();

    // ============================================
    // 3. HANDLE errors from our serverless function
    // ============================================
    if (!response.ok) {
      console.error('❌ Email send failed:', data.error);
      throw new Error(data.error || 'Failed to send booking email');
    }

    // ============================================
    // 4. SUCCESS - Email was sent
    // ============================================
    console.log('✅ Email sent successfully:', data.message);
    return {
      success: true,
      message: data.message,
      emailId: data.emailId // Can be used for tracking/debugging
    };

  } catch (error) {
    // ============================================
    // 5. CATCH any network or unexpected errors
    // ============================================
    console.error('📧 Resend email error:', error.message);
    
    // Don't throw - let the calling code decide how to handle
    // This prevents booking from failing if email fails
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * import { sendBookingEmail } from './utils/sendBookingEmail';
 * 
 * // After successful booking creation
 * const emailResult = await sendBookingEmail({
 *   customer_name: 'John Doe',
 *   customer_email: 'john@example.com',
 *   service_name: 'Fade Haircut',
 *   barber_name: 'Mike',
 *   appointment_date: '2025-11-10',
 *   appointment_time: '2:00 PM',
 *   payment_method: 'Card'
 * });
 * 
 * if (emailResult.success) {
 *   console.log('Confirmation email sent!');
 * } else {
 *   console.log('Booking saved but email failed:', emailResult.error);
 * }
 */