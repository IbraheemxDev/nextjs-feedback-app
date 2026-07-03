import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Column,
  Section,
  Text,
  Container,
  Body,
  Hr,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  const digits = otp.split('');

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>True Feedback</Text>
          </Section>

          <Section style={card}>
            <Heading style={heading}>Verify your email</Heading>
            <Text style={paragraph}>Hi {username},</Text>
            <Text style={paragraph}>
              Thanks for signing up. Enter the code below to complete your
              registration. This code expires in 10 minutes.
            </Text>

            {/* OTP Digit Boxes */}
            <Section style={{ margin: '28px 0' }}>
              <Row>
                {digits.map((digit, i) => (
                  <Column key={i} style={otpColumn}>
                    <Text style={otpBox}>{digit}</Text>
                  </Column>
                ))}
              </Row>
            </Section>

            <Text style={paragraph}>
              If you didn&apos;t request this code, you can safely ignore
              this email.
            </Text>

            <Hr style={hr} />

            <Text style={footerNote}>
              Need help? Contact us at{' '}
              <span style={{ color: '#4f46e5' }}>support@yourapp.com</span>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} YourApp. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ---- Styles ----

const main = {
  backgroundColor: '#f4f4f7',
  fontFamily: 'Roboto, Verdana, sans-serif',
  padding: '40px 0',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '16px',
};

const logo = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#4f46e5',
  letterSpacing: '0.5px',
};

const card = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const heading = {
  fontSize: '22px',
  fontWeight: 600,
  color: '#111827',
  marginBottom: '16px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#4b5563',
  margin: '8px 0',
};

const otpColumn = {
  padding: '0 5px',
};

const otpBox = {
  width: '40px',
  height: '48px',
  lineHeight: '48px',
  textAlign: 'center' as const,
  fontSize: '22px',
  fontWeight: 700,
  color: '#4f46e5',
  backgroundColor: '#eef2ff',
  border: '1px solid #c7d2fe',
  borderRadius: '8px',
  margin: 0,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0 16px',
};

const footerNote = {
  fontSize: '12px',
  color: '#9ca3af',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '20px',
};

const footerText = {
  fontSize: '12px',
  color: '#9ca3af',
};