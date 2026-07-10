import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  const otpDigits = otp.split("");

  return (
    <Html>
      <Head>
        <title>Verify Your Email</title>

        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYwY.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iOtjEn8i0.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        Your MysteryMessage verification code is {otp} — expires in 10
        minutes
      </Preview>

      <Body
        style={{
          backgroundColor: "#f1f0fe",
          margin: 0,
          padding: "48px 16px",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        }}
      >
        {/* Preheader spacing / logo above card */}
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text
              style={{
                color: "#7c3aed",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              MysteryMessage
            </Text>
          </Section>
        </Container>

        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(124,58,237,0.15)",
          }}
        >
          {/* Header */}
          <Section
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)",
              padding: "48px 40px 44px",
              textAlign: "center",
            }}
          >
            <Section
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 20px",
                backgroundColor: "rgba(255,255,255,0.22)",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.45)",
                textAlign: "center",
                lineHeight: "64px",
              }}
            >
              <Text
                style={{
                  fontSize: "30px",
                  margin: 0,
                  lineHeight: "64px",
                }}
              >
                🔐
              </Text>
            </Section>

            <Heading
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 700,
                margin: 0,
                lineHeight: "36px",
              }}
            >
              Verify Your Email Address
            </Heading>

            <Text
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
                marginTop: "10px",
                marginBottom: 0,
              }}
            >
              One quick step to activate your account
            </Text>
          </Section>

          {/* Content */}
          <Section style={{ padding: "44px 40px 8px" }}>
            <Text
              style={{
                fontSize: "16px",
                color: "#1e293b",
                margin: "0 0 4px",
              }}
            >
              Hi <strong style={{ color: "#0f172a" }}>{username}</strong>,
            </Text>

            <Text
              style={{
                color: "#64748b",
                fontSize: "15px",
                lineHeight: "26px",
                margin: "12px 0 0",
              }}
            >
              Welcome to <strong style={{ color: "#7c3aed" }}>MysteryMessage</strong>{" "}
              — the safest way to send and receive honest, anonymous
              feedback. Please confirm it's really you by entering the
              verification code below.
            </Text>

            {/* OTP Block */}
            <Section
              style={{
                textAlign: "center",
                margin: "36px 0 8px",
              }}
            >
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                style={{ margin: "0 auto" }}
              >
                <tr>
                  {otpDigits.map((digit, i) => (
                    <td key={i} style={{ padding: "0 6px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "58px",
                          lineHeight: "58px",
                          backgroundColor: "#f3f0ff",
                          border: "1px solid #a78bfa",
                          borderRadius: "12px",
                          color: "#4f46e5",
                          fontSize: "26px",
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        {digit}
                      </div>
                    </td>
                  ))}
                </tr>
              </table>

              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginTop: "18px",
                  marginBottom: 0,
                }}
              >
                This code expires in <strong style={{ color: "#7c3aed" }}>10 minutes</strong>
              </Text>
            </Section>

            <Hr style={{ borderColor: "#e5e0fa", margin: "36px 0" }} />

            {/* Security note */}
            <Section
              style={{
                backgroundColor: "#f5f3ff",
                border: "1px solid #ddd6fe",
                borderRadius: "14px",
                padding: "18px 20px",
              }}
            >
              <Text
                style={{
                  color: "#475569",
                  fontSize: "14px",
                  lineHeight: "22px",
                  margin: 0,
                }}
              >
                <strong style={{ color: "#4f46e5" }}>🛡️ Security tip:</strong>{" "}
                Never share this code with anyone. Our team will never ask
                you for your verification code by phone, email, or chat.
              </Text>
            </Section>

            <Text
              style={{
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "13px",
                lineHeight: "22px",
                margin: "28px 0 0",
              }}
            >
              Didn't request this code? You can safely ignore this email —
              your account remains secure.
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              padding: "28px 40px 32px",
              borderTop: "1px solid #ede9fe",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#64748b",
                fontSize: "13px",
                margin: "0 0 4px",
                fontWeight: 600,
              }}
            >
              MysteryMessage
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                margin: 0,
                lineHeight: "20px",
              }}
            >
              © {new Date().getFullYear()} MysteryMessage. All rights
              reserved.
              <br />
              Built with ❤️ using Next.js
            </Text>
          </Section>
        </Container>

        {/* Bottom disclaimer outside card */}
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#a1a1c2",
              fontSize: "12px",
              marginTop: "24px",
            }}
          >
            This is an automated message, please do not reply directly to
            this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}