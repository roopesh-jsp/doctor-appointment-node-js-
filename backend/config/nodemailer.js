import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "testingwork42@gmail.com",
    pass: "ownvlncrecvyqaey",
  },
});

export const sendGMail = async ({ to, subject, text }) => {
  transporter.sendMail({
    from: "testingwork42@gmail.com",
    to,
    subject,
    text,
  });
};
