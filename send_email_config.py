"""
Gmail SMTP Configuration for Trainee Form Portal
Usage: Run this script to test email sending
"""

import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from pathlib import Path

# ============================================================
# CONFIGURATION - UPDATE THESE VALUES
# ============================================================

# Your Gmail credentials
GMAIL_EMAIL = "minjaruli36@gmail.com"
GMAIL_APP_PASSWORD = "YOUR_16_CHAR_APP_PASSWORD_HERE"  # Get from Google Account → App Passwords

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def send_trainee_email(
    trainee_email,
    trainee_name,
    form_data=None,
    attachment_path=None
):
    """
    Send confirmation email to trainee with form summary.
    
    Args:
        trainee_email: Recipient email address
        trainee_name: Trainee's full name
        form_data: Dictionary of form field data (optional)
        attachment_path: Path to PDF/DOC attachment (optional)
    """
    
    if not GMAIL_APP_PASSWORD or GMAIL_APP_PASSWORD == "YOUR_16_CHAR_APP_PASSWORD_HERE":
        return {
            "success": False,
            "message": "❌ Gmail App Password not configured! Please update GMAIL_APP_PASSWORD in send_email_config.py"
        }
    
    subject = f"Trainee Registration Confirmed - {trainee_name}"
    
    # Build HTML email body
    body_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px; }}
            .details {{ background: white; padding: 20px; border-radius: 5px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px; }}
            h1 {{ margin: 0; font-size: 24px; }}
            h2 {{ color: #2c3e50; margin-top: 0; }}
            .info-row {{ display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }}
            .info-row:last-child {{ border-bottom: none; }}
            .info-label {{ font-weight: bold; color: #666; }}
            .info-value {{ color: #333; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>✅ Registration Confirmed</h1>
        </div>
        <div class="content">
            <p>Dear <strong>{trainee_name}</strong>,</p>
            <p>Thank you for registering! Your application has been received successfully.</p>
            
            <div class="details">
                <h2>Registration Summary</h2>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">{trainee_name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">{trainee_email}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date:</span>
                    <span class="info-value">{__import__('datetime').datetime.now().strftime('%B %d, %Y')}</span>
                </div>
            </div>
            
            <p>Your registration form has been saved in our system. Our team will review your application and contact you within 3-5 business days.</p>
            
            <p>If you have any questions, please reply to this email or contact us at support@example.com.</p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="text-align: center; color: #666;">
                📧 This is an automated confirmation email. Please do not reply.
            </p>
        </div>
        <div class="footer">
            <p>ISISC-ASSET Project | Trainee Registration System</p>
        </div>
    </body>
    </html>
    """
    
    # Create email message
    msg = MIMEMultipart("alternative")
    msg["From"] = GMAIL_EMAIL
    msg["To"] = trainee_email
    msg["Subject"] = subject
    
    # Attach HTML body
    msg.attach(MIMEText(body_html, "html", "utf-8"))
    
    # Attach file if provided
    if attachment_path and Path(attachment_path).exists():
        filename = Path(attachment_path).name
        with open(attachment_path, "rb") as f:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename= {filename}")
        msg.attach(part)
    
    try:
        # Send via Gmail SMTP
        context = ssl.create_default_context()
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls(context=context)
        server.login(GMAIL_EMAIL, GMAIL_APP_PASSWORD)
        server.sendmail(GMAIL_EMAIL, [trainee_email], msg.as_string())
        server.quit()
        
        return {
            "success": True,
            "message": f"✅ Email sent successfully to {trainee_email}"
        }
    except smtplib.SMTPAuthenticationError:
        return {
            "success": False,
            "message": "❌ Authentication failed. Check your Gmail App Password."
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"❌ Error: {e}"
        }


if __name__ == "__main__":
    import sys
    print("=" * 50)
    print("Gmail SMTP Configuration Test")
    print("=" * 50)
    print(f"\n📧 From: {GMAIL_EMAIL}")
    print(f"🔐 App Password: {'*' * len(GMAIL_APP_PASSWORD) if GMAIL_APP_PASSWORD != 'YOUR_16_CHAR_APP_PASSWORD_HERE' else 'NOT SET'}")
    
    if GMAIL_APP_PASSWORD == "YOUR_16_CHAR_APP_PASSWORD_HERE":
        print("\n⚠️  Please update GMAIL_APP_PASSWORD in this file!")
        print("\n📋 How to get App Password:")
        print("   1. Go to: https://myaccount.google.com/apppasswords")
        print("   2. Enable 2FA if not already enabled")
        print("   3. Create app password for 'Mail'")
        print("   4. Copy the 16-character password")
        print("   5. Replace 'YOUR_16_CHAR_APP_PASSWORD_HERE' with your password")
        sys.exit(1)
    
    # Test send
    print("\n🧪 Sending test email...")
    result = send_trainee_email(
        trainee_email=GMAIL_EMAIL,
        trainee_name="Test User",
        form_data={"email": GMAIL_EMAIL}
    )
    
    print(f"\n{result['message']}")
    if result['success']:
        print("\n🎉 Success! Check your inbox (and spam folder).")
    else:
        print("\n❌ Failed. Check the error message above.")
