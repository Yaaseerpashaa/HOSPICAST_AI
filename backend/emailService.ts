import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

export const sendConsultationEmail = async (
  patientEmail: string,
  doctorName: string,
  date: string,
  time: string,
  meetingLink: string
) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: patientEmail,
    subject: 'Virtual Consultation Appointment Confirmation',
    html: `
      <h2>Virtual Consultation Appointment Confirmation</h2>
      <p>Your appointment has been scheduled successfully!</p>
      <p><strong>Doctor:</strong> ${doctorName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
      <p>Please join the meeting 5 minutes before your scheduled time.</p>
      <p>If you need to reschedule, please contact us at least 24 hours before your appointment.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};