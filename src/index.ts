import bodyParser from "body-parser";
import express from "express";

let nodemailer = require('nodemailer')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.post("/", async (req, res) => {
	if(req.body.name && req.body.email && req.body.city && req.body.action) {
		const transporter = nodemailer.createTransport({
			port: 587,
			host: "smtp.sparkpostmail.com",
			auth: {
			  user: 'SMTP_Injection',
			  pass: process.env.SPARKPOST_API_KEY,
			},
			tls: {
				ciphers:'SSLv3'
			},
			secure: false,
		})
	
		const mailData = {
			from: 'web@sp.garage71.cl',
			to: process.env.MAIL_TO,
			subject: `Solicitud súmate a Ascenval`,
			text: `Nombre: ${req.body.name}\nEmail: ${req.body.email}\nCiudad: ${req.body.city}\nSolicitud: ${req.body.action}\n`,
			// html: '<div>prueba<br>dos</div>'
		}
	
		transporter.sendMail(mailData, function (err: any, info: any) {
			if(err) {
				console.log(err)
				res.json(err);
			}
			else {
				console.log(info)
				res.json(info);
			}
		})
	} else {
		res.status(400).json({error: 'Bad request'})
	}
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
