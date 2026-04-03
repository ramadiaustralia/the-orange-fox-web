import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PAYPAL_API = 'https://api-m.paypal.com';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const SECRET = process.env.PAYPAL_CLIENT_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
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

/* ── Beautiful Invoice Email (HTML) ─────────────────────────── */
function buildInvoiceEmail(order: {
  orderNumber: string;
  buyerName: string;
  productName: string;
  price: string;
  currency: string;
  paypalOrderId: string;
  date: string;
}) {
  const year = new Date().getFullYear();
  const firstName = order.buyerName.split(' ')[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${order.orderNumber}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background-color:#1a1a1a;padding:36px 40px;text-align:center;">
              <img src="https://the-orange-fox-web.vercel.app/images/logo-fox.png" alt="🦊" width="56" height="56" style="display:block;margin:0 auto 14px;border-radius:12px;" />
              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;letter-spacing:2px;">THE ORANGE FOX</h1>
              <p style="color:#888888;font-size:12px;margin:6px 0 0;letter-spacing:1px;">Web · App · Digital System</p>
            </td>
          </tr>

          <!-- ═══ THANK YOU ═══ -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <h2 style="color:#1a1a1a;font-size:24px;font-weight:700;margin:0 0 10px;">Thank You, ${firstName}! 🦊</h2>
              <p style="color:#666666;font-size:14px;line-height:1.7;margin:0;">
                We're truly grateful you chose <strong style="color:#D4692A;">The Orange Fox</strong>. Your payment has been confirmed and we're excited to bring your vision to life!
              </p>
            </td>
          </tr>

          <!-- ═══ INVOICE BADGE ═══ -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f5;border:1px solid #f0ebe6;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Invoice Number</p>
                          <p style="color:#1a1a1a;font-size:16px;font-weight:700;margin:0;font-family:'Courier New',monospace;">${order.orderNumber}</p>
                        </td>
                        <td style="text-align:right;">
                          <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Status</p>
                          <span style="display:inline-block;background-color:#dcfce7;color:#16a34a;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">✅ PAID</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top:12px;">
                          <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Date</p>
                          <p style="color:#555;font-size:13px;margin:0;">${order.date}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ ORDER SUMMARY ═══ -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;font-weight:600;">Order Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;">
                <tr>
                  <td style="padding:14px 0;color:#333;font-size:14px;border-bottom:1px solid #eee;">${order.productName}</td>
                  <td style="padding:14px 0;color:#333;font-size:14px;text-align:right;border-bottom:1px solid #eee;">${order.price} ${order.currency}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;color:#1a1a1a;font-size:16px;font-weight:700;">Total Paid</td>
                  <td style="padding:14px 0;color:#D4692A;font-size:18px;font-weight:700;text-align:right;">${order.price} ${order.currency}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ PAYMENT DETAILS ═══ -->
          <tr>
            <td style="padding:0 40px 28px;">
              <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;font-weight:600;">Payment Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f9;border-radius:10px;">
                <tr>
                  <td style="padding:12px 16px;color:#888;font-size:12px;border-bottom:1px solid #eee;">Method</td>
                  <td style="padding:12px 16px;color:#333;font-size:13px;text-align:right;border-bottom:1px solid #eee;font-weight:600;">PayPal</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;color:#888;font-size:12px;">Transaction ID</td>
                  <td style="padding:12px 16px;color:#333;font-size:11px;text-align:right;font-family:'Courier New',monospace;">${order.paypalOrderId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ WHAT'S NEXT ═══ -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff8f3;border-left:4px solid #D4692A;border-radius:0 10px 10px 0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="color:#D4692A;font-size:14px;font-weight:700;margin:0 0 6px;">🚀 What's Next?</p>
                    <p style="color:#666;font-size:13px;line-height:1.6;margin:0;">
                      Our team will reach out to you within <strong>24 hours</strong> to discuss your project requirements, timeline, and kick things off. We build everything from scratch — no templates, no shortcuts!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ INSTAGRAM CTA ═══ -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="color:#999;font-size:12px;margin:0 0 14px;">Stay connected with us!</p>
              <a href="https://instagram.com/theorgfox" target="_blank" style="display:inline-block;background-color:#E4405F;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                📸 Follow @theorgfox on Instagram
              </a>
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background-color:#1a1a1a;padding:28px 40px;text-align:center;">
              <p style="color:#D4692A;font-size:11px;margin:0 0 6px;letter-spacing:1px;font-weight:600;">BUILT SMART. BUILT SHARP. BUILT TO LAST.</p>
              <p style="color:#888;font-size:12px;margin:0 0 4px;">
                📧 <a href="mailto:theorgfox@gmail.com" style="color:#D4692A;text-decoration:none;">theorgfox@gmail.com</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                🌐 <a href="https://the-orange-fox-web.vercel.app" style="color:#D4692A;text-decoration:none;">the-orange-fox-web.vercel.app</a>
              </p>
              <p style="color:#555;font-size:11px;margin:12px 0 0;">© ${year} The Orange Fox — Melbourne, Australia 🦊</p>
              <p style="color:#444;font-size:10px;margin:8px 0 0;">This is an automated invoice. Please save this email for your records.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Notification Email (HTML) ──────────────────────────────── */
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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order ${order.orderNumber}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background-color:#D4692A;padding:30px 40px;text-align:center;">
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0;">🎉 New Order Received!</h1>
              <p style="color:#fff8f3;font-size:14px;margin:8px 0 0;font-family:'Courier New',monospace;font-weight:600;">${order.orderNumber}</p>
            </td>
          </tr>

          <!-- ═══ ORDER DETAILS ═══ -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;font-weight:600;">Order Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;width:120px;">Customer</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-size:14px;font-weight:600;border-bottom:1px solid #f0f0f0;">${order.buyerName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <a href="mailto:${order.buyerEmail}" style="color:#D4692A;text-decoration:none;font-size:14px;">${order.buyerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;">Product</td>
                  <td style="padding:10px 0;color:#333;font-size:14px;border-bottom:1px solid #f0f0f0;">${order.productName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;">Amount</td>
                  <td style="padding:10px 0;color:#1a1a1a;font-size:18px;font-weight:700;border-bottom:1px solid #f0f0f0;">${order.price} <span style="font-size:12px;color:#888;font-weight:400;">${order.currency}</span></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;">PayPal Ref</td>
                  <td style="padding:10px 0;color:#555;font-size:12px;font-family:'Courier New',monospace;border-bottom:1px solid #f0f0f0;">${order.paypalOrderId}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#888;font-size:13px;">Date</td>
                  <td style="padding:10px 0;color:#555;font-size:13px;">${order.date}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ CTA ═══ -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <a href="https://the-orange-fox-api.vercel.app/dashboard/orders" target="_blank" style="display:inline-block;background-color:#1a1a1a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:0.5px;">
                View in Dashboard →
              </a>
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background-color:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
              <p style="color:#16a34a;font-size:13px;font-weight:600;margin:0 0 4px;">Payment verified via PayPal ✅</p>
              <p style="color:#999;font-size:11px;margin:0;">The Orange Fox 🦊 — Automated Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── API Route ──────────────────────────────────────────────── */
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

    // 3. Send invoice email to buyer (from theorgfox@gmail.com)
    try {
      await transporter.sendMail({
        from: '"The Orange Fox 🦊" <theorgfox@gmail.com>',
        to: buyerEmail,
        subject: `🧾 Invoice ${orderNumber} — The Orange Fox`,
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
