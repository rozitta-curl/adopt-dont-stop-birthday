/**
 * Email Sending Placeholder
 *
 * Architecture:
 * - Email templates are authored in MJML by a dev, then compiled to HTML.
 * - The compiled HTML string is inserted as a template literal here.
 * - Placeholders like {{recipientName}}, {{donationAmount}}, {{orderId}}
 *   are replaced at send time.
 *
 * To connect a real email provider:
 * 1. Choose a provider (e.g., Resend, SendGrid, Nodemailer+SMTP).
 * 2. Add credentials to .env.local:
 *    EMAIL_FROM=noreply@adoptdontstop.org
 *    EMAIL_PROVIDER_API_KEY=your_api_key
 * 3. Implement sendEmail() below using the provider SDK.
 * 4. Insert the compiled MJML→HTML template in DONATION_THANK_YOU_TEMPLATE.
 *
 * See: https://mjml.io/ for MJML documentation.
 */

import type { EmailTemplateData } from "@/types";

/**
 * Donation thank-you email HTML template.
 *
 * TODO: Dev inserts the compiled MJML→HTML string here.
 * Placeholders in the template:
 *   {{recipientName}}   – donor's name (optional)
 *   {{donationAmount}}  – donation amount in UAH
 *   {{orderId}}         – payment order ID
 */
const DONATION_THANK_YOU_TEMPLATE = `
<!-- TODO: Insert compiled MJML→HTML template here -->
<html>
  <body>
    <h1>Дякуємо за ваш донат!</h1>
    <p>Дякуємо{{#if recipientName}}, {{recipientName}}{{/if}}!</p>
    <p>Ваш донат на суму <strong>{{donationAmount}} грн</strong> отримано.</p>
    <p>Номер замовлення: {{orderId}}</p>
    <p>З любов'ю, Adopt Don't Stop</p>
  </body>
</html>
`;

function renderTemplate(template: string, data: EmailTemplateData): string {
  return template
    .replace(/{{recipientName}}/g, data.recipientName ?? "")
    .replace(/{{donationAmount}}/g, String(data.donationAmount))
    .replace(/{{orderId}}/g, data.orderId);
}

/**
 * Sends the donation confirmation email to the user.
 * Currently a placeholder — implement with your email provider.
 */
export async function sendDonationThankYouEmail(
  data: EmailTemplateData
): Promise<void> {
  const html = renderTemplate(DONATION_THANK_YOU_TEMPLATE, data);

  // TODO: Replace with real email provider
  // Example using Resend:
  // const resend = new Resend(process.env.EMAIL_PROVIDER_API_KEY);
  // await resend.emails.send({
  //   from: process.env.EMAIL_FROM!,
  //   to: data.recipientEmail,
  //   subject: "Дякуємо за підтримку Adopt Don't Stop!",
  //   html,
  // });

  console.log(
    `[EMAIL PLACEHOLDER] Would send thank-you email to: ${data.recipientEmail}`,
    { orderId: data.orderId, amount: data.donationAmount, htmlLength: html.length }
  );
}
