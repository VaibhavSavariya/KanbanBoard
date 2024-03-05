import nodemailer from "nodemailer";

export const sendEmail = async ({ email, uniqueString }) => {
  try {
    //create hased Token

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "348d76872b80b7",
        pass: "e80875257cca79",
      },
    });
    const mailOptions = {
      from: "flowboard@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">KanBan Board</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing KanBan Board. Use the following OTP to complete your Sign Up procedures.</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${uniqueString}</h2>
        <p style="font-size:0.9em;">Regards,<br />KanBan Board</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Kanban Board Inc</p>
          <p>1600 Amphitheatre Parkway</p>
          <p>California</p>
        </div>
      </div>
    </div>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log("error:", error);
    throw new Error(error.message);
  }
};
