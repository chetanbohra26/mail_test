const express = require('express');
const nodemailer = require('nodemailer');
const { error } = require('dotenv').config();

if (error && (!process.env.MAILER_MAIL || !process.env.MAILER_PASS || !process.env.MAILER_TO)) {
	console.log('Environment variables not set up..!')
	throw error;
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAILER_MAIL,
		pass: process.env.MAILER_PASS
	}
});

const mailOptions = {
	from: process.env.MAILER_MAIL,
	to: process.env.MAILER_TO,
	subject: 'Test mail',
	text: 'Success twice..!'
};

function sendMail(callback) {
	transporter.sendMail(mailOptions, (err, info) => {
		callback(err, info);
	});
}

const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to mail demo..!');
});

app.get('/mail', (req, res) => {
	sendMail((err, info) => {
		if (err) return res.send('Failed..!');
		res.send('Info:'+JSON.stringify(info));
	})
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening to port ${port}..`));