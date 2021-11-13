module.exports = {

cardsTransaction : [
    
    {id:generateID(),description:'Água', valor:'-300', date:'10-10-21'},
    {id:generateID(),description:'Salario', valor:'4000', date:'10-10-21'},
    {id:generateID(),description:'Luz', valor:'-500', date:'10-10-21'}

    
],

allCards(){
    return this.cardsTransaction;
},

NewCards(description, valor, date, generateId){
     this.cardsTransaction.push({id:generateID(),description, valor, date });
    

},





Entradas(){

let Entradas = this.cardsTransaction.filter(function (e){return e.valor > 0})

    return Entradas;
},



Saidas(){

    let Saidas = this.cardsTransaction.filter(function (s){return s.valor < 0})
    return Saidas;

},

Total(){
       let total = this.cardsTransaction.filter(function(t){return t})
       return total;
},


Del(id){
         for(let i = 0; i < this.cardsTransaction.length; i++){
            if(this.cardsTransaction[i].id === id){
                this.cardsTransaction.splice(i, 1)

            } 
         }
},

edit(id, description, valor, data){
      for(let i = 0; i < this.cardsTransaction.length; i++){
          if(id === this.cardsTransaction[i].id){
              this.cardsTransaction[i].description = description;
              this.cardsTransaction[i].valor = valor;
              this.cardsTransaction[i].date = data;
          }
      }
     
    
}


}

function generateID(){

    return "id" + Math.random().toString(36).substr(2,9);
    
    
    }

  