const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'katerinka.vysotskaya@gmail.com', // generated ethereal user
        pass: 'faqrsltmzaalrhbz', // generated ethereal password
    },
});

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.post('/sendMessage', async function(req, res) {

    let {message, contacts, name} = req.body

    const mailOptions = {
        from: 'My portfolio page',
        to: 'katerinka.vysotskaya@gmail.com',
        subject: 'HR wants me',
        html: `<b>Сообщение с моего <a href="https://katerinkavysotskaya.github.io/Portfolio/">портфолио</a> </b>
           <div>name: ${name}</div>
           <div>contacts: ${contacts}</div>
           <div>${message}</div>`
    };

    let info = await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('Letter has been send')
})

app.listen(3010, () => {
    // console.log(`Example app listening on port ${port}`)
})