import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def handler(event: dict, context) -> dict:
    """Принимает заявку на кейс The Chancellery и отправляет её на email владельца."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    city = body.get('city', '').strip()

    if not name or not phone or not email:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Заполните обязательные поля: имя, телефон, email'})
        }

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ['SMTP_PORT'])
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    notify_email = os.environ['NOTIFY_EMAIL']

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
      <p style="font-size: 11px; letter-spacing: 4px; color: #888; text-transform: uppercase; margin-bottom: 32px;">Regent · The Mandate</p>
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">Новая заявка</h1>
      <h2 style="font-size: 16px; color: #aaa; font-weight: normal; margin-bottom: 40px;">The Chancellery — €4 200</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-top: 1px solid #333;">
          <td style="padding: 14px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; width: 40%;">Имя</td>
          <td style="padding: 14px 0; color: #fff; font-size: 15px;">{name}</td>
        </tr>
        <tr style="border-top: 1px solid #333;">
          <td style="padding: 14px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Телефон</td>
          <td style="padding: 14px 0; color: #fff; font-size: 15px;">{phone}</td>
        </tr>
        <tr style="border-top: 1px solid #333;">
          <td style="padding: 14px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Email</td>
          <td style="padding: 14px 0; color: #fff; font-size: 15px;">{email}</td>
        </tr>
        <tr style="border-top: 1px solid #333; border-bottom: 1px solid #333;">
          <td style="padding: 14px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Город гравировки</td>
          <td style="padding: 14px 0; color: #fff; font-size: 15px;">{city if city else '—'}</td>
        </tr>
      </table>
      <p style="margin-top: 40px; font-size: 11px; color: #555; letter-spacing: 2px; text-transform: uppercase;">Regent · {os.environ.get('NOTIFY_EMAIL', '')}</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка на The Chancellery — {name}'
    msg['From'] = smtp_user
    msg['To'] = notify_email
    msg['Reply-To'] = email
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, notify_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }
