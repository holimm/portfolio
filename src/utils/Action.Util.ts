'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { rateLimit } from './RateLimiter.Util';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  fullname,
  email,
  message,
}: {
  fullname: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message?: string }> {
  const ip = (await headers()).get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(ip);
  const myEmail = process.env.MY_EMAIL || 'kahn12345678@gmail.com';

  if (!limit.success) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.',
    };
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: myEmail,
      subject: `New message from ${fullname}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 24px;">
            <h2 style="color: #333; margin-bottom: 16px;">📬 New Portfolio Message</h2>
            <table style="width: 100%; margin-bottom: 24px;">
              <tr>
                <td style="font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="color: #222;">${fullname}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; color: #555;">Email:</td>
                <td style="color: #222;">${email}</td>
              </tr>
            </table>
            <div style="margin-bottom: 8px; font-weight: bold; color: #555;">Message:</div>
            <div style="background: #f4f6fa; border-radius: 6px; padding: 16px; color: #222; font-size: 16px;">
              ${message}
            </div>
          </div>
          <div style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">
            This email was sent from your portfolio contact form.
          </div>
        </div>
      `,
    });

    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
    };
  }
}
