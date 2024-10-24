const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.listen(9000, () => {
    console.log('litsening on port 3000');
});

//EX1

app.get('/what', (req, res)=>{

    const name = req.query.name

    res.send(`<h1>"What a delight it is to see you once more, ${name}."</h1>`);
});

//EX2

app.get('/roll', (req, res)=>{

    const number = req.query.number

    if(number === Number){
        res.send('<h1>You rolled a ${number}.</h1>');
    }
    else {res.send('<h1>You must specify a number.</h1>');}
});

//EX3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:number', (req, res) => {

    const index = req.params.number
    const item = collectibles[index] 

    if (item){
    res.send(`<h1>You want the ${item.name}? For ${item.price}, it can be yours!</h1>`);
    }
    else {
        res.send('<h1>Sorry, we don\'t have that item.</h1>');
    }
});

//EX4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {

    const type = req.query.type
    const minPrice = req.query["min-price"]
    const maxPrice = req.query["max-price"]
    let filteredShoes = shoes;
    if (type){

        filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
    }
    if (minPrice){

        filteredShoes = filteredShoes.filter((shoe) => shoe.price > minPrice);

    }
    if (maxPrice){
        
        filteredShoes = filteredShoes.filter((shoe) => shoe.price < maxPrice);
    }
    res.send(filteredShoes)
})