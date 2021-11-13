
const express = require('express');
const router = express.Router()
const cards = require("../model/transaction")
const cors = require('cors'); 


const options = {
    origin: 'http://localhost:3000'
}

router.use('/Saldo', (req, res) =>{
    res.json(JSON.stringify(cards.Entradas()))
})

router.use('/Saida', (req, res) =>{
     res.json(JSON.stringify(cards.Saidas()))
})

router.use('/Total', (req, res) => {
    res.json(JSON.stringify(cards.Total()));
})

router.use(cors(options))

router.get('/all', (req, res,) =>{
      
    res.json(JSON.stringify(cards.allCards()))
})


router.post('/new', express.json(), (req, res) =>{
    let description = req.body.description;
    let valor = req.body.valor;
    let data = req.body.data;

    cards.NewCards(description, valor, data)
    res.send('Transação adicionada com sucesso')
})

router.delete('/del', express.json(), (req, res)=>{
      let id = req.body.id;
      cards.Del(id);    
      res.send('Transação deletada com sucesso')
})

router.put('/put', express.json(), (req, res)=>{
    let description = req.body.newDescription;
    let valor = req.body.newValue;
    let data = req.body.newDate;
    let id = req.body.id


    cards.edit(id, description, valor, data)

    res.send('Transação editada com sucesso')
})



module.exports = router;

