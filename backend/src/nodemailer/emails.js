import { sendEmail } from "./nodemailer.config.js";
import { verifyEmailTemplate, welcomeEmailTemplate, resetPasswordTemplate, passwordChangedTemplate } from "./emailTemplates.js";

export const sendVerificationEmail = async ({ email, name, token }) => {
  const link = `${token}`;

  const html = verifyEmailTemplate(name, link);

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html
  });
};


export const sendWelcomeEmail = async ({ email, name }) => {
  const html = welcomeEmailTemplate(name);

  await sendEmail({
    to: email,
    subject: "Welcome to E-Commerce Store",
    html,
  });
};


export const sendResetPasswordEmail = async ({ email, name, resetLink }) => {
  const html = resetPasswordTemplate(name, resetLink);

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html,
  });
};


export const sendPasswordChangedEmail = async ({ email, name }) => {
  const html = passwordChangedTemplate(name);

  await sendEmail({
    to: email,
    subject: "Your Password Has Been Changed",
    html,
  });
};