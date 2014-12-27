var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "qqq@gmail.com",
        pass: "qqqq"
    }
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.methodOverride());



app.post('/send',function(req,res){
	mailOptions = {
    	from: "Грузоперевозки52.рф ✔ <gruzoperevozky52@gmail.com>", // sender address
    	to: "juhnowski@gmail.com, gruzoperevozky52@gmail.com"+", "+req.body.job_email_contacts,
    	subject: "Претензия ✔", // Subject line
    	text: "Спасибо, что связались с нами. Мы рассмотрим Вашу претензию в ближайшее время и результат сообщим Вам по указанной в заявке контактной информации.ООО Группа Компаний ГазРос",
    	html: "<h1>Данные по претензии</h1>"+
    	      "<h2>Email</h2><br><p>"+req.body.pret_email_contacts+"</p><br>"+
    	      "<h2>Телефон:</h2><br><p>"+req.body.pret_phone_contacts+"</p><br>"+
    	      "<h2>Суть претензии:</h2><br><p>"+req.body.pret_description+"</p><br>"+
    	      "<b>Спасибо, что связались с нами.</b><b>Мы рассмотрим Вашу претензию " +
    	      "в ближайшее время и результат сообщим Вам по указанной в заявке контактной информации."+
    	      "<br>ООО Группа Компаний ГазРос</br><br><br>"
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
    	if(error){
        	console.log(error);
    	}else{
        	console.log("Претензия принята."); //response.message
    	}

//    	smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.send('Претензия принята.');
});


app.use(function(err,req,res,next){
	console.error(err.stack);
	res.send(500,'У нас что-то сломалось. Ваша заявка важна для нас. Пожалуйста позвоните по телефону +7-908-154-20-43');
});

var server = app.listen(4002, function(){
	console.log("GazRos_Rabota: Listening on port %d", server.address().port);
});
