const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { text } = require('body-parser');
const dataSiswa = JSON.parse(fs.readFileSync("data.json", "utf8"))
// const obj = JSON.parse(text)


let data = []
// let i

// const dataBase = JSON.parse(fs.readFileSync("data.json", "utf8"))

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    // console.log(dataSiswa)
    // console.log(dataSiswa)
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
// app.get("/edit", (req, res) => {

//     const{string,integer,float,date,boolean} =dataSiswa[i]
//     data = dataSiswa[i]
//     res.render('list', { strEjs:string, integerEjs:integer,floatEjs:float, dateEjs:date, booleanEjs:boolean, index:i })
// })

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
    // dataSiswa.push((i), 1,req.body);
    // dataSiswa.splice((id),1,req.body)
    // dataSiswa.splice(req.params.id, 1)
    res.redirect("/")
})


app.listen(3000, () => {
    console.log(`web ini berjalan di port 3000!`)
})