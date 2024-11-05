//Make sure to run node app.js in the terminal to start the server.
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const router = express.Router();
const { parse } = require('node-html-parser');
const http = require('http');
const fs = require('fs');
const { isEmpty, isLength } = require('validator');
//isValidEmail is used to determine if the email the user has sent through the browser checks off on the requirements for validation
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector("div");
    
    errorDisplay.innerText = message;
    inputControl.classList.add("errors", "input");
    inputControl.classList.remove("success", "input");
}

app.use(express.static(__dirname + '/public'));

const field_validator = (contnet) => {
    //function_body will add the error css
contnet.getElementById('firstPar').classList.add('hliteerr');
    
    return contnet;
}

const feild_clear = (content) => {
content.getElementById('firstpar').classList.remove('hliteerr');
    return content;
}

app.get('/'), (req, res) => {
    fs.readFile(__dirname + '/contact.html', function(err, data) {
        const content = parse(data);
        var postContent = field_clear(content);
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(postContent.toString());
        return res.end();
    });
};

app.post('/', (req,res) => {
    fs.readFile(__dirname + '/contact.html', function(err, data) {
        const content = parse(data);
        var postContent = field_validator(content);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(postContent.toString());
        return res.end();
    });
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})


  router.use(timeLog)

  app.route('/')
  .get((req, res) => {
    res.sendFile(__dirname + '/index.html'); // send HTML file on GET request
  })

  app.route('/contact')
  .get((req, res) => {
    res.sendFile(__dirname + '/contact.html'); // send HTML file on GET request
  })
  .post((req, res) => {
    const { username, email, password } = req.body;
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    
//if statement for email to check if it is valid or not through the server-side terminal
    if(email === ''){
        console.log('emailBlank')
    } else if (!isValidEmail(email)) {
        console.log('Email invalid')
    } else { console.log('Email succsess')
    }
    
    res.send('Form submitted successfully!');
  });



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact.html'); // send HTML file on GET request
}); 

