const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname,'build')));
app.use('/images',express.static(path.join(__dirname,'src','public','images')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/login',(req,res) => {

    let body = req.body;
    let url = path.join(__dirname,'src','public','data','users.json');

    fs.readFile(url,(err, data) => {
        if(err) throw err

        let arr = JSON.parse(data);
        let name = arr.map(el => el.username);
        let tokens = arr.map(el => el.api_key);
        let index = name.indexOf(body.username); 

        if(index !== -1 && arr[index].password == body.password)
        {
            res.send({
                action: true,
                token: tokens[index],
                fullname: arr[index].fullname,
                username: arr[index].username,
                msg: 'Bienvenido ' + body.username
            });
        }
        else
        {
            res.send({
                action: false,
                msg: 'Usuario/contraseña invalidos'
            });
        }
    })

})

app.post('/signup',(req,res) => {

    let body = req.body;
        body['api_key'] = Buffer.from(body.email).toString('base64');
    let url = path.join(__dirname,'src','public','data','users.json');

    fs.readFile(url,(err, data) => {
        if(err) throw err

        let arr = JSON.parse(data);
        let name = arr.map(el => el.username);
        
        if(name.indexOf(body.username) !== -1)
        {
            res.send({
                action: false,
                msg: 'lo sentimos, ya existe un usuario como este llamado ' + body.username
            });
        }
        else
        {
            arr.push(body);
            
            fs.writeFile(url,JSON.stringify(arr),err => {

                if(err)
                {
                    res.send({
                        action: false,
                        msg: 'Lo sentimos, no se pudo registrar el usuario'
                    });    
                }
                
                res.send({
                    action: true,
                    msg: 'Usuario registrado!'
                });

            });

        }
    })

})

app.get('/get-notifications',(req,res) => {

    fs.readFile(path.join(__dirname,'src','public','data','notifications.json'),(err,data) => {
        if(err)
        {
            res.send({
                action: false,
                data: []
            });    
        }

        let _data = JSON.parse(data.toString());

        let arr = _data.map(row => {
            if(row.username == req.query.user)
            {
                return row;
            }
        }).filter(n => n)

        res.send({
            action: true,
            data: arr
        });
    });

})

app.get('/*', (req,res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname,'build')
    })
})

app.listen(PORT, () => {
    console.log('server listen in port:',PORT);
})