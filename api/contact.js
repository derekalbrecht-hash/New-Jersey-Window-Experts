const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, zip, service, message } = req.body;

  if (!name || !email || !phone || !zip) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
      <div style="background:#119548;padding:24px 30px;">
        <h2 style="color:#fff;margin:0;font-size:1.4rem;">New Quote Request — NJ Window Experts</h2>
      </div>
      <div style="padding:30px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;width:140px;"><strong>Name</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;"><strong>Phone</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;"><strong>Zip Code</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${zip}</td></tr>
          ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;"><strong>Service</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${service}</td></tr>` : ''}
          ${message ? `<tr><td style="padding:10px 0;color:#888;vertical-align:top;"><strong>Message</strong></td><td style="padding:10px 0;">${message}</td></tr>` : ''}
        </table>
      </div>
      <div style="background:#f9f9f9;padding:16px 30px;font-size:0.8rem;color:#999;text-align:center;">
        Submitted via njwindowexperts.com
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NJ Window Experts" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Quote Request — ${name}`,
      html
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
