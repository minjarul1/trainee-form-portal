"""
Gmail SMTP Email Sender for Trainee Form
Backend implementation using Python smtplib
"""

import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime


class TraineeEmailSender:
    """Send confirmation emails with PDF attachments using Gmail SMTP"""
    
    def __init__(self, gmail_email, gmail_app_password):
        self.gmail_email = gmail_email
        self.gmail_app_password = gmail_app_password
        self.smtp_host = 'smtp.gmail.com'
        self.smtp_port = 587
        
    def send_confirmation_email(self, recipient_email, recipient_name, trainee_data, pdf_attachment=None):
        """
        Send confirmation email to trainee
        
        Args:
            recipient_email: Trainee's email address
            recipient_name: Trainee's name
            trainee_data: Dictionary with trainee information
            pdf_attachment: Optional PDF file path or bytes
            
        Returns:
            dict: {'success': bool, 'message': str}
        """
        try:
            # Create email message
            msg = MIMEMultipart()
            msg['From'] = self.gmail_email
            msg['To'] = recipient_email
            msg['Subject'] = f'Trainee Registration Confirmation - {recipient_name}'
            
            # Build email body
            body = self._build_email_body(recipient_name, trainee_data)
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # Attach PDF if provided
            if pdf_attachment:
                self._attach_pdf(msg, pdf_attachment)
            
            # Send email
            context = ssl.create_default_context()
            server = smtplib.SMTP(self.smtp_host, self.smtp_port)
            server.starttls(context=context)
            server.login(self.gmail_email, self.gmail_app_password)
            server.send_message(msg)
            server.quit()
            
            return {
                'success': True,
                'message': f'✅ Email sent to {recipient_email}',
                'timestamp': datetime.now().isoformat()
            }
            
        except smtplib.SMTPAuthenticationError:
            return {
                'success': False,
                'message': '❌ Authentication failed. Check your Gmail App Password.'
            }
        except smtplib.SMTPRecipientsRefused:
            return {
                'success': False,
                'message': f'❌ Recipient email refused: {recipient_email}'
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'❌ Error: {str(e)}'
            }
    
    def _build_email_body(self, name, data):
        """Build HTML email body with trainee information"""
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .info-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                .info-table td {{ padding: 10px; border-bottom: 1px solid #ddd; }}
                .info-table td:first-child {{ font-weight: bold; width: 40%; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Registration Confirmed!</h1>
                    <p>Thank you for registering, {name}!</p>
                </div>
                <div class="content">
                    <h2>Registration Details</h2>
                    <table class="info-table">
                        <tr><td>Full Name (EN)</td><td>{data.get('full-name-en', '—')}</td></tr>
                        <tr><td>Full Name (BN)</td><td>{data.get('full-name-bn', '—')}</td></tr>
                        <tr><td>Date of Birth</td><td>{data.get('dob', '—')}</td></tr>
                        <tr><td>Gender</td><td>{data.get('gender', '—')}</td></tr>
                        <tr><td>Email</td><td>{data.get('email', '—')}</td></tr>
                        <tr><td>Phone</td><td>{data.get('contact', '—')}</td></tr>
                        <tr><td>District</td><td>{data.get('perm-district', '—')}</td></tr>
                        <tr><td>Training Program</td><td>{data.get('training-program', '—')}</td></tr>
                        <tr><td>Training Start Date</td><td>{data.get('training-start-date', '—')}</td></tr>
                    </table>
                    <p style="margin-top: 30px;">
                        ✅ Your registration has been received successfully!<br>
                        We will review your application and contact you within 3-5 business days.
                    </p>
                </div>
                <div class="footer">
                    <p>© 2026 Trainee Registration System | ISISIC-ASSET Project</p>
                </div>
            </div>
        </body>
        </html>
        """
        return html
    
    def _attach_pdf(self, msg, pdf_path):
        """Attach PDF file to email"""
        with open(pdf_path, 'rb') as f:
            attachment = MIMEBase('application', 'octet-stream')
            attachment.set_payload(f.read())
            encoders.encode_base64(attachment)
            attachment.add_header(
                'Content-Disposition',
                f'attachment; filename="{os.path.basename(pdf_path)}"'
            )
            msg.attach(attachment)


def main():
    """Test the email sender"""
    # Load configuration from environment variables
    gmail_email = os.getenv('GMAIL_EMAIL', 'minjaruli36@gmail.com')
    gmail_password = os.getenv('GMAIL_APP_PASSWORD', '')
    
    if not gmail_password:
        print('❌ Please set GMAIL_APP_PASSWORD environment variable')
        print('   Example: export GMAIL_APP_PASSWORD="your_16_char_password"')
        return
    
    # Create sender
    sender = TraineeEmailSender(gmail_email, gmail_password)
    
    # Test data
    test_data = {
        'full-name-en': 'John Doe',
        'full-name-bn': 'জন ডো',
        'dob': '1990-01-01',
        'gender': 'Male',
        'email': 'test@example.com',
        'contact': '+880 1711-104318',
        'perm-district': 'Dhaka',
        'training-program': 'Python Development',
        'training-start-date': '2026-10-01'
    }
    
    # Send test email
    print('📧 Sending test email...')
    result = sender.send_confirmation_email(
        recipient_email='minjaruli36@gmail.com',
        recipient_name='Minjarul Islam',
        trainee_data=test_data,
        pdf_attachment=None  # Add PDF path if you want to attach
    )
    
    print(result['message'])


if __name__ == '__main__':
    main()
