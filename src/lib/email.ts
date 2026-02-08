import nodemailer from 'nodemailer';

// Create a transporter using SMTP
// For Gmail: use 'service: "gmail"' and App Password
// For others: use host, port, secure, auth
const transporter = nodemailer.createTransport({
    service: 'gmail', // Easy setup for Gmail. Change if using corporate SMTP.
    auth: {
        user: process.env.SMTP_USER, // e.g., 'your-email@gmail.com'
        pass: process.env.SMTP_PASS, // e.g., 'your-app-password'
    },
});

export interface EmailData {
    company: string;
    name: string;
    phone: string;
    email?: string;
    type: string;
    message: string;
}

export async function sendInquiryEmail(data: EmailData) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // Send TO yourself (the admin)
        subject: `[엔지니어링 플랫폼 견적 요청] ${data.company} - ${data.name}`,
        html: `
            <h2>새로운 견적/기술 지원 요청이 도착했습니다.</h2>
            <hr />
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">회사/기관명</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.company}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">담당자</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">연락처</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">이메일</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email || '-'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">문의 유형</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.type}</td>
                </tr>
            </table>
            <br />
            <h3>상세 내용</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${data.message}</div>
        `,
    };

    try {
        await transporter.verify(); // Verify connection configuration
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}
