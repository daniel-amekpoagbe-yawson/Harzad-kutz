// Admin Booking Notification Email Template
export const createAdminNotificationHTML = (emailData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Alert - HazardKutz</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
            <td style="padding: 0;">
                
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #dc2626; padding: 24px 40px;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                                🔔 NEW BOOKING ALERT
                            </h1>
                            <p style="margin: 8px 0 0; color: #fecaca; font-size: 14px;">
                                HazardKutz Admin Dashboard
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Alert Message -->
                    <tr>
                        <td style="padding: 40px; background-color: #fef2f2; border-left: 4px solid #dc2626;">
                            <p style="margin: 0; color: #991b1b; font-size: 16px; font-weight: 600;">
                                ⚡ A new booking has been made!
                            </p>
                            <p style="margin: 8px 0 0; color: #7f1d1d; font-size: 14px;">
                                ${new Date().toLocaleString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Customer Details -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                                👤 Customer Information
                            </h2>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 40%; color: #6b7280; font-size: 14px; font-weight: 600;">Name:</td>
                                                <td style="color: #1f2937; font-size: 15px; font-weight: 600;">${emailData.customerName}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 40%; color: #6b7280; font-size: 14px; font-weight: 600;">Email:</td>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    <a href="mailto:${emailData.customerEmail}" style="color: #0891b2; text-decoration: none;">
                                                        ${emailData.customerEmail}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 40%; color: #6b7280; font-size: 14px; font-weight: 600;">Phone:</td>
                                                <td style="color: #1f2937; font-size: 15px;">
                                                    <a href="tel:${emailData.customerPhone}" style="color: #0891b2; text-decoration: none;">
                                                        ${emailData.customerPhone}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Booking Details -->
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                                📋 Booking Details
                            </h2>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border-radius: 8px; border: 2px solid #fbbf24;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">✂️ Service:</td>
                                                            <td style="color: #1f2937; font-size: 15px; font-weight: 600;">${emailData.serviceName}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">👨‍💼 Barber:</td>
                                                            <td style="color: #1f2937; font-size: 15px; font-weight: 600;">${emailData.barberName}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">📅 Date:</td>
                                                            <td style="color: #1f2937; font-size: 15px; font-weight: 600;">${emailData.appointmentDate}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">🕐 Time:</td>
                                                            <td style="color: #1f2937; font-size: 15px; font-weight: 600;">${emailData.appointmentTime}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0; border-top: 2px solid #fbbf24;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">💳 Payment:</td>
                                                            <td style="color: #1f2937; font-size: 15px; font-weight: 600;">
                                                                ${emailData.paymentMethod === "online" ? "✅ Paid Online" : "💵 Pay at Shop"}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">📊 Status:</td>
                                                            <td style="color: ${emailData.paymentStatus === "Paid" ? "#10b981" : "#f59e0b"}; font-size: 15px; font-weight: 700;">
                                                                ${emailData.paymentStatus}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            ${
                                              emailData.paymentReference
                                                ? `
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="width: 40%; color: #78350f; font-size: 14px; font-weight: 700;">🔖 Reference:</td>
                                                            <td style="color: #6b7280; font-size: 13px; font-family: monospace;">${emailData.paymentReference}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            `
                                                : ""
                                            }
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background-color: #0891b2; border-radius: 6px;">
                                        <a https://www.hazardkutzbarbershop.com/admin/dashboard" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                                            View in Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px;">
                                This is an automated notification from HazardKutz Booking System
                            </p>
                            <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
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

export default createAdminNotificationHTML;
