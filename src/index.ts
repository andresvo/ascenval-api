import bodyParser from "body-parser";
import express from "express";

let nodemailer = require('nodemailer')

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
	const transporter = nodemailer.createTransport({
		port: 587,
		host: "smtp.sparkpostmail.com",
		auth: {
		  user: 'SMTP_Injection',
		  pass: process.env.SPARKPOST_API_KEY,
		},
		secure: true,
	})

	const mailData = {
		from: 'contacto@ascenval.cl',
		to: 'andresvalenzuelao@gmail.com',
		subject: `Message From Next.js`,
		text: 'prueba',
		html: '<div>prueba</div>'
	}

	transporter.sendMail(mailData, function (err: any, info: any) {
		if(err)
			console.log(err)
		else
			console.log(info)
	})
  res.json({ Hello: "World" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
