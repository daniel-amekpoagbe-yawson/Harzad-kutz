import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export const BookingConfirmation = ({
  customerName = "Valued Customer",
  barberName = "Your Barber",
  serviceName = "Service",
  appointmentDate = "Date",
  appointmentTime = "Time",
  paymentMethod = "pay_at_shop",
  paymentReference = null,
  paymentStatus = "Unpaid",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your HazardKutz Appointment is Confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>HAZARDKUTZ</Heading>
            <Text style={tagline}>Where Style Meets Precision</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Booking Confirmed! ✓</Heading>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Your appointment at HazardKutz has been successfully confirmed.
              We're looking forward to seeing you!
            </Text>

            <Hr style={divider} />

            {/* Appointment Details */}
            <Section style={detailsBox}>
              <Heading style={h3}>Appointment Details</Heading>

              <Section style={detailRow}>
                <Text style={detailLabel}>Service:</Text>
                <Text style={detailValue}>{serviceName}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Barber:</Text>
                <Text style={detailValue}>{barberName}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Date:</Text>
                <Text style={detailValue}>{appointmentDate}</Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Time:</Text>
                <Text style={detailValue}>{appointmentTime}</Text>
              </Section>

              <Hr style={divider} />

              <Section style={detailRow}>
                <Text style={detailLabel}>Payment Method:</Text>
                <Text style={detailValue}>
                  {paymentMethod === "online" ? "Paid Online" : "Pay at Shop"}
                </Text>
              </Section>

              <Section style={detailRow}>
                <Text style={detailLabel}>Payment Status:</Text>
                <Text style={detailValue}>{paymentStatus}</Text>
              </Section>

              {paymentReference && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Reference:</Text>
                  <Text style={detailValue}>{paymentReference}</Text>
                </Section>
              )}
            </Section>

            <Hr style={divider} />

            {/* Important Notes */}
            <Section style={notesBox}>
              <Heading style={h3}>Important Notes</Heading>
              <Text style={paragraph}>
                • Please arrive 5 minutes before your appointment time
              </Text>
              <Text style={paragraph}>
                • If you need to reschedule, please contact us at least 24 hours
                in advance
              </Text>
              <Text style={paragraph}>• Bring a valid ID for verification</Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Info */}
            <Section style={footer}>
              <Text style={footerText}>
                <strong>HazardKutz Barbershop</strong>
              </Text>
              <Text style={footerText}>📍 Accra, Ghana</Text>
              <Text style={footerText}>📞 +233 24 123 4567</Text>
              <Text style={footerText}>✉️ book@hazardkutz.com</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerSmall}>
              © 2024 HazardKutz. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#1f2937",
  padding: "32px 48px",
  textAlign: "center",
};

const h1 = {
  color: "#f59e0b",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
  letterSpacing: "2px",
};

const tagline = {
  color: "#d1d5db",
  fontSize: "16px",
  margin: "8px 0 0",
};

const content = {
  padding: "0 48px",
};

const h2 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "32px 0 16px",
};

const h3 = {
  color: "#374151",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const detailsBox = {
  backgroundColor: "#fef3c7",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
};

const detailRow = {
  marginBottom: "12px",
};

const detailLabel = {
  color: "#78350f",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
  display: "inline-block",
  width: "140px",
};

const detailValue = {
  color: "#1f2937",
  fontSize: "16px",
  margin: "0",
  display: "inline-block",
};

const notesBox = {
  backgroundColor: "#f3f4f6",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
};

const footer = {
  textAlign: "center",
  marginTop: "24px",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "4px 0",
};

const footerSection = {
  textAlign: "center",
  padding: "24px 48px",
};

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "0",
};

export default BookingConfirmation;
