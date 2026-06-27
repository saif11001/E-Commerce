// ============================================================
// Shared styles
// ============================================================
const base = {
  body: `margin:0;padding:0;background:#0f0a1e;font-family:Arial,sans-serif;`,
  wrapper: `width:100%;background:#0f0a1e;padding:40px 0;`,
  container: `width:600px;margin:0 auto;background:#1a1035;border-radius:12px;overflow:hidden;border:1px solid #2d1f5e;`,
  header: `background:linear-gradient(135deg,#4c1d95,#6d28d9);padding:28px 20px;text-align:center;`,
  headerTitle: `margin:0;color:#ffffff;font-size:24px;letter-spacing:1px;`,
  headerSubtitle: `margin:6px 0 0;color:#ddd6fe;font-size:13px;`,
  body_td: `padding:36px 40px;`,
  greeting: `margin:0 0 16px;color:#f1f5f9;font-size:22px;`,
  text: `color:#94a3b8;line-height:1.7;font-size:15px;margin:0 0 14px;`,
  footer_td: `padding:20px;text-align:center;font-size:12px;color:#475569;border-top:1px solid #2d1f5e;`,
  divider: `border:none;border-top:1px solid #2d1f5e;margin:24px 0;`,
};

// ============================================================
// 1. Verify Email
// ============================================================
export const verifyEmailTemplate = (name = "User", code = "000000") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Verify Your Email - E-Commerce</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">🛍️ E-Commerce</h2>
          <p style="${base.headerSubtitle}">Your Fashion Destination</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">Thanks for signing up! To complete your registration, please verify your email address using the code below.</p>

          <!-- Code Box -->
          <div style="
            text-align:center;
            font-size:36px;
            font-weight:bold;
            letter-spacing:10px;
            margin:28px 0;
            padding:20px;
            background:#0f0a1e;
            border-radius:10px;
            color:#a78bfa;
            border:2px dashed #4c1d95;
          ">
            ${code}
          </div>

          <p style="${base.text}">This code will expire in <span style="color:#a78bfa;font-weight:bold;">15 minutes</span>.</p>

          <hr style="${base.divider}" />

          <p style="color:#475569;font-size:13px;margin:0;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 E-Commerce. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 2. Welcome Email
// ============================================================
export const welcomeEmailTemplate = (name = "User") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome - E-Commerce</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">🛍️ E-Commerce</h2>
          <p style="${base.headerSubtitle}">Your Fashion Destination</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Welcome aboard, ${name} 🎉</h2>
          <p style="${base.text}">Your email has been successfully verified. You now have full access to your account.</p>

          <!-- Success Box -->
          <div style="
            margin:24px 0;
            padding:18px 20px;
            background:#0f0a1e;
            border-radius:10px;
            border-left:4px solid #a78bfa;
          ">
            <p style="margin:0;color:#a78bfa;font-size:15px;font-weight:bold;">✅ Email Verified Successfully</p>
            <p style="margin:6px 0 0;color:#64748b;font-size:13px;">You can now log in and enjoy all features.</p>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#475569;font-size:13px;margin:0;">
            This is an automated message. Please do not reply to this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 E-Commerce. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 3. Reset Password Email
// ============================================================
export const resetPasswordTemplate = (name = "User", resetLink = "#") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reset Password - E-Commerce</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">🛍️ E-Commerce</h2>
          <p style="${base.headerSubtitle}">Your Fashion Destination</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">We received a request to reset your password. Click the button below to set a new password.</p>

          <!-- Button -->
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetLink}" style="
              display:inline-block;
              padding:14px 32px;
              background:linear-gradient(135deg,#4c1d95,#6d28d9);
              color:#ffffff;
              text-decoration:none;
              border-radius:50px;
              font-weight:bold;
              font-size:15px;
              letter-spacing:0.5px;
            ">
              Reset My Password →
            </a>
          </div>

          <p style="${base.text}">This link will expire in <span style="color:#a78bfa;font-weight:bold;">15 minutes</span>.</p>

          <!-- Warning Box -->
          <div style="
            margin:24px 0;
            padding:16px 20px;
            background:#0f0a1e;
            border-radius:10px;
            border-left:4px solid #f59e0b;
          ">
            <p style="margin:0;color:#f59e0b;font-size:13px;">
              ⚠️ If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#475569;font-size:13px;margin:0;">
            This is an automated security email. Please do not reply.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 E-Commerce. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};


// ============================================================
// 4. Password Changed Email
// ============================================================
export const passwordChangedTemplate = (name = "User") => {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Password Changed - E-Commerce</title>
</head>
<body style="${base.body}">
  <div style="${base.wrapper}">
    <table width="600" cellpadding="0" cellspacing="0" style="${base.container}" align="center">

      <!-- Header -->
      <tr>
        <td style="${base.header}">
          <h2 style="${base.headerTitle}">🛍️ E-Commerce</h2>
          <p style="${base.headerSubtitle}">Your Fashion Destination</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="${base.body_td}">
          <h2 style="${base.greeting}">Hey ${name} 👋</h2>
          <p style="${base.text}">Your password has been successfully changed.</p>

          <!-- Success Box -->
          <div style="
            margin:24px 0;
            padding:18px 20px;
            background:#0f0a1e;
            border-radius:10px;
            border-left:4px solid #a78bfa;
          ">
            <p style="margin:0;color:#a78bfa;font-size:15px;font-weight:bold;">✅ Password Updated Successfully</p>
            <p style="margin:6px 0 0;color:#64748b;font-size:13px;">Your account is now secured with the new password.</p>
          </div>

          <!-- Warning Box -->
          <div style="
            margin:24px 0;
            padding:16px 20px;
            background:#0f0a1e;
            border-radius:10px;
            border-left:4px solid #818cf8;
          ">
            <p style="margin:0;color:#818cf8;font-size:13px;font-weight:bold;">🚨 Wasn't you?</p>
            <p style="margin:6px 0 0;color:#64748b;font-size:13px;">
              If you did not make this change, please reset your password immediately and contact support.
            </p>
          </div>

          <hr style="${base.divider}" />

          <p style="color:#475569;font-size:13px;margin:0;">
            ⚠️ Security Tip: Never share your password with anyone.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="${base.footer_td}">
          © 2026 E-Commerce. All rights reserved.
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
  `;
};