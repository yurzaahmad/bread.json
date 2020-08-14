const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { text } = require('body-parser');
const dataSiswa = JSON.parse(fs.readFileSync("data.json", "utf8"))



let data = []

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

    res.render('list', { dataSiswa })
})

app.get('/add', (req, res) => res.render('add'))

app.post('/add', (req, res) => {

    dataSiswa.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(dataSiswa))
    res.redirect('/')
})
app.get('/delete/:id', (req, res) => {
    fs.writeFileSync("data.json", JSON.stringify(dataSiswa))
    dataSiswa.splice(req.params.id, 1)
    res.redirect('/')
})


app.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    res.render('edit', { item: { ...dataSiswa[id] }, id });
    console.log('edit', { item: { ...dataSiswa[id] }, id });

})
app.post("/edit/:id", (req, res) => {
    let id = req.params.id
    let edit = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    console.log(req.params.id)
    console.log(req.body)
    dataSiswa.splice(id, 1, edit)
    fs.writeFileSync("data.json", JSON.stringify(dataSiswa))

    res.redirect("/")
})

let port = 4000
app.listen(port, () => {
    console.log(`web ini berjalan di port ${port}!`)
})