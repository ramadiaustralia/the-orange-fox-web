import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PAYPAL_API = 'https://api-m.paypal.com';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const SECRET = process.env.PAYPAL_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function getAccessToken() {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TOF-${y}${m}${d}-${rand}`;
}

function buildInvoiceEmail(order: {
  orderNumber: string;
  buyerName: string;
  productName: string;
  price: string;
  currency: string;
  paypalOrderId: string;
  date: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f6f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:32px">
    <div style="display:inline-block;background:#1a1a1a;border-radius:16px;padding:20px 40px">
      <span style="font-size:28px;font-weight:800;color:#d4692a;letter-spacing:-0.5px">The Orange Fox</span>
      <span style="display:block;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:3px;text-transform:uppercase;margin-top:4px">INVOICE</span>
    </div>
  </div>

  <!-- Card -->
  <div style="background:#ffffff;border-radius:20px;padding:40px;box-shadow:0 2px 40px rgba(0,0,0,0.06)">

    <!-- Greeting -->
    <p style="font-size:16px;color:#1a1a1a;margin:0 0 4px">Hi <strong>${order.buyerName}</strong>,</p>
    <p style="font-size:14px;color:#666;margin:0 0 28px;line-height:1.6">Thank you for your purchase! Here are your order details:</p>

    <!-- Order Info Box -->
    <div style="background:#faf7f4;border-radius:14px;padding:24px;margin-bottom:28px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:6px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Order Number</td>
          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;text-align:right;font-weight:600">${order.orderNumber}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Date</td>
          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;text-align:right">${order.date}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">PayPal Ref</td>
          <td style="padding:6px 0;font-size:13px;color:#666;text-align:right;font-family:monospace">${order.paypalOrderId}</td>
        </tr>
      </table>
    </div>

    <!-- Line Items -->
    <div style="border-top:2px solid #f0ede8;padding-top:20px;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:12px 0;font-size:15px;color:#1a1a1a;font-weight:500">${order.productName}</td>
          <td style="padding:12px 0;font-size:15px;color:#1a1a1a;text-align:right;font-weight:600">${order.price} <span style="font-size:12px;color:#999">${order.currency}</span></td>
        </tr>
      </table>
    </div>

    <!-- Total -->
    <div style="background:linear-gradient(135deg,#1a1a1a,#2a2a2a);border-radius:14px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="font-size:14px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px">Total Paid</td>
          <td style="text-align:right;font-size:24px;font-weight:800;color:#d4692a">${order.price} <span style="font-size:14px;color:rgba(255,255,255,0.5)">${order.currency}</span></td>
        </tr>
      </table>
    </div>

    <!-- Divider -->
    <div style="border-top:1px solid #f0ede8;margin:28px 0"></div>

    <!-- Footer Message -->
    <p style="font-size:13px;color:#999;line-height:1.7;margin:0;text-align:center">
      We'll be in touch shortly to get started on your project.<br>
      If you have any questions, reply to this email or reach us at<br>
      <a href="mailto:theorgfox@gmail.com" style="color:#d4692a;text-decoration:none;font-weight:500">theorgfox@gmail.com</a>
    </p>
  </div>

  <!-- Bottom Footer -->
  <div style="text-align:center;margin-top:32px">
    <p style="font-size:11px;color:#bbb;margin:0">© ${new Date().getFullYear()} The Orange Fox — Web Development Studio</p>
    <p style="font-size:11px;color:#ccc;margin:4px 0 0">Melbourne, Australia 🦊</p>
  </div>

</div>
</body>
</html>`;
}

function buildNotificationEmail(order: {
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  productName: string;
  price: string;
  currency: string;
  paypalOrderId: string;
  date: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8f6f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 20px">
  <div style="background:#ffffff;border-radius:20px;padding:40px;box-shadow:0 2px 40px rgba(0,0,0,0.06)">

    <div style="text-align:center;margin-bottom:24px">
      <span style="display:inline-block;background:#d4692a;color:white;font-size:13px;font-weight:700;padding:8px 20px;border-radius:100px;text-transform:uppercase;letter-spacing:2px">🎉 New Order!</span>
    </div>

    <h2 style="font-size:20px;color:#1a1a1a;text-align:center;margin:0 0 24px">Order ${order.orderNumber}</h2>

    <div style="background:#faf7f4;border-radius:14px;padding:24px;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Customer</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;text-align:right;font-weight:600">${order.buyerName}</td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Email</td><td style="padding:8px 0;font-size:14px;text-align:right"><a href="mailto:${order.buyerEmail}" style="color:#d4692a;text-decoration:none">${order.buyerEmail}</a></td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Product</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;text-align:right">${order.productName}</td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Amount</td><td style="padding:8px 0;font-size:18px;color:#d4692a;text-align:right;font-weight:800">${order.price} ${order.currency}</td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">PayPal Ref</td><td style="padding:8px 0;font-size:13px;color:#666;text-align:right;font-family:monospace">${order.paypalOrderId}</td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px">Date</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;text-align:right">${order.date}</td></tr>
      </table>
    </div>

    <p style="font-size:13px;color:#999;text-align:center;margin:0">Payment verified via PayPal ✅</p>
  </div>
</div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { orderID, buyerName, buyerEmail, productName, price, currency } = await req.json();

    if (!orderID || !buyerName || !buyerEmail || !productName || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Capture PayPal payment
    const accessToken = await getAccessToken();
    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const captureData = await captureRes.json();

    if (captureData.status !== 'COMPLETED') {
      console.error('PayPal capture failed:', captureData);
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // 2. Save order to Supabase
    const orderNumber = generateOrderNumber();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const { error: dbError } = await supabase.from('orders').insert({
      order_number: orderNumber,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      product_name: productName,
      product_price: parseFloat(price),
      currency: currency || 'USD',
      paypal_order_id: orderID,
      paypal_status: 'COMPLETED',
      status: 'paid',
    });

    if (dbError) {
      console.error('DB insert error:', dbError);
    }

    const orderInfo = {
      orderNumber,
      buyerName,
      buyerEmail,
      productName,
      price: `$${price}`,
      currency: currency || 'USD',
      paypalOrderId: orderID,
      date: dateStr,
    };

    // 3. Send invoice email to buyer
    try {
      await transporter.sendMail({
        from: '"The Orange Fox 🦊" <theorgfox@gmail.com>',
        to: buyerEmail,
        subject: `Invoice ${orderNumber} — The Orange Fox`,
        html: buildInvoiceEmail(orderInfo),
      });
    } catch (emailErr) {
      console.error('Invoice email error:', emailErr);
    }

    // 4. Send notification email to owner
    try {
      await transporter.sendMail({
        from: '"The Orange Fox 🦊" <theorgfox@gmail.com>',
        to: 'theorgfox@gmail.com',
        subject: `🎉 New Order ${orderNumber} — ${buyerName} — $${price}`,
        html: buildNotificationEmail(orderInfo),
      });
    } catch (emailErr) {
      console.error('Notification email error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      message: 'Payment captured and order created',
    });
  } catch (err) {
    console.error('Capture order error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
