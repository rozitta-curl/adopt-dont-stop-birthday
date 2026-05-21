import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { EmailTemplateData, OrderData } from "@/types";
import { adminTemplate, userTemplate } from "./email-templates";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY!,
    secretAccessKey: process.env.SES_SECRET_KEY!,
  },
});

const FROM_ADDRESS = process.env.SES_FROM_EMAIL!;

const createSendEmailCommand = (
  toAddress: string,
  subject: string,
  body: string,
) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: FROM_ADDRESS,
    ReplyToAddresses: [FROM_ADDRESS],
  });
};

export async function notifyAboutNew(data: OrderData, payload: unknown) {
  try {
    const adminMsg = {
      to: "info@adoptdontstop.com",
      from: FROM_ADDRESS,
      subject: "Нова пожертва на День народження Adopt Don't Stop!",
      html: adminTemplate(data, payload),
    };

    let userMsg;

    if (data.email) {
      userMsg = {
        to: data.email,
        from: FROM_ADDRESS,
        subject: `Твоє тепло вже в дорозі!`,
        html: userTemplate(),
      };
    }

    try {
      await sesClient.send(
        createSendEmailCommand(
          adminMsg.to,
          `${adminMsg.subject} (AWS SES)`,
          adminMsg.html,
        ),
      );

      if (userMsg) {
        await sesClient.send(
          createSendEmailCommand(userMsg.to, userMsg.subject, userMsg.html),
        );
      }
    } catch (error) {
      console.error("Error sending email via SES:", error);
    }
  } catch (error) {
    console.error("Error in notifyAboutNew:", error);
    throw new Error("Failed to send notification emails");
  }
}
