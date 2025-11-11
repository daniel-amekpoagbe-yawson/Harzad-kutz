// Professional HazardKutz Booking Confirmation Email Template - Inspired by Clean Order Confirmation Design
export const createBookingEmailHTML = (emailData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - HazardKutz</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    
    <!-- Wrapper Table -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td style="padding: 0;">
                
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1f2937; padding: 24px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0; color: #fbbf24; font-size: 28px; font-weight: 700; letter-spacing: 2px;">
                                            HAZARDKUTZ
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Success Icon & Message -->
                    <tr>
                        <td style="padding: 60px 40px 40px; text-align: center;">
                            <!-- Checkmark Icon -->
                            <div style="margin-bottom: 30px;">
                                <svg width="120" height="120" viewBox="0 0 120 120" style="display: inline-block;">
                                    <circle cx="60" cy="60" r="55" fill="#e5e7eb" opacity="0.3"/>
                                    <path d="M35 60 L52 77 L85 44" stroke="#9ca3af" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            
                            <h2 style="margin: 0 0 16px; color: #0891b2; font-size: 32px; font-weight: 600;">
                                Thank You For Your Booking!
                            </h2>
                            
                            <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                                Hi ${emailData.customerName}, your appointment at HazardKutz has been successfully confirmed.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Booking Details Section -->
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            
                            <!-- Confirmation Number -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e0f2fe; margin-bottom: 2px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px; font-weight: 600;">
                                                    Booking Confirmation No.
                                                </td>
                                                <td style="text-align: right; color: #1f2937; font-size: 15px; font-weight: 700;">
                                                    #${Math.random().toString(36).substr(2, 9).toUpperCase()}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Service -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    Service
                                                </td>
                                                <td style="text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                                                    ${emailData.serviceName}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Barber -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    Barber
                                                </td>
                                                <td style="text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                                                    ${emailData.barberName}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Date & Time -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    Date & Time
                                                </td>
                                                <td style="text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                                                    ${emailData.appointmentDate} at ${emailData.appointmentTime}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Payment Method -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    Payment Method
                                                </td>
                                                <td style="text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                                                    ${emailData.paymentMethod === "online" ? "Paid Online" : "Pay at Shop"}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Payment Status -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-bottom: 2px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    Payment Status
                                                </td>
                                                <td style="text-align: right; color: ${emailData.paymentStatus === "Paid" ? "#10b981" : "#f59e0b"}; font-size: 15px; font-weight: 700;">
                                                    ${emailData.paymentStatus}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            ${
                              emailData.paymentReference
                                ? `
                            <!-- Payment Reference -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; margin-top: 2px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="color: #6b7280; font-size: 14px;">
                                                    Reference Number
                                                </td>
                                                <td style="text-align: right; color: #6b7280; font-size: 14px; font-family: monospace;">
                                                    ${emailData.paymentReference}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            `
                                : ""
                            }
                            
                        </td>
                    </tr>
                    
                    <!-- Address & Important Info -->
                    <tr>
                        <td style="padding: 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <!-- Shop Address -->
                                    <td style="vertical-align: top; width: 50%; padding-right: 20px;">
                                        <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 700;">
                                            Shop Location
                                        </h3>
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                        St Johns Dome kwabenya <br>
                                        Accra, Ghana <br>
                                        </p>
                                    </td>
                                    
                                    <!-- Important Notes -->
                                    <td style="vertical-align: top; width: 50%; padding-left: 20px;">
                                        <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 700;">
                                            Important Reminders
                                        </h3>
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                            Please arrive 5 minutes early<br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Section -->
                    <tr>
                        <td style="background-color: #011527; padding: 20px 15px; text-align: center;">
                            <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 600;">
                                Need to make changes?
                            </h3>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background-color: #0e7490; border-radius: 6px;">
                                        <a href="tel:+233241234567" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                                            Contact Us
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Copyright -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center;">
                            <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                © ${new Date().getFullYear()} HazardKutz Barbershop. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>
  `;
};

export default createBookingEmailHTML;
