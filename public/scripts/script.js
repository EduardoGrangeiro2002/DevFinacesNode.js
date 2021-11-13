
document.addEventListener('DOMContentLoaded', ()=>{
   Calcs.updateCards();


})

const transaçoes = {

     modal(){
        let modal = document.getElementById('modalOverlay');
        modal.classList.remove("d-none")
     },
     closeModal(){
      let modal = document.getElementById('modalOverlay');
        modal.classList.add("d-none")
     },

     alterar(){
           let modalEdit = document.getElementById('modalOverEdit');
           modalEdit.classList.remove('d-none')
     },
     closeModalEdit(){
      let modalEdit = document.getElementById('modalOverEdit');
          modalEdit.classList.add('d-none');

     }

}

const Calcs = {

 updateEntrada(){
   fetch('http://192.168.0.4:3000/api/Saldo').then(res =>{
           return res.json()
   }).then(json =>{
      let saldoElements = 0;

      let Saldos = JSON.parse(json);
     
      Saldos.forEach((Saldo) =>{
      
         let SaldoElement = Saldo.valor;
         saldoElements += Number(SaldoElement);

      })  

         document.getElementById('Entrada').innerHTML = 'R$' + saldoElements;
         return saldoElements;
                
   })},

    updateSaida(){
      fetch('http://192.168.0.4:3000/api/Saida').then(res =>{
           return res.json()
   }).then(json =>{
      let saidaElements = 0;

      let saidas = JSON.parse(json);
      saidas.forEach((saida) =>{

         let saidaElement = saida.valor;
         saidaElements += Number(saidaElement);
      })  

         document.getElementById('Saida').innerHTML = 'R$' +  saidaElements;
         return saidaElements;
          
   })},



 updateCards(){
   fetch('http://192.168.0.4:3000/api/all').then(res =>{
     
      return res.json()
   }).then(json =>{
      let cardsElements = "";
 
      let cards = JSON.parse(json);
      
      this.editCard(cards)

       
      cards.forEach((card) =>{
         let cardElement = `<tr class="text" id="${card.id}">
                               <td>${card.description}</td>
                               <td class ="Valor">${card.valor}</td>
                               <td>${card.date} <img class="img-tr" onclick='cardTarget(${card.id})' src="./assets/minus.svg"></td>  
                            </tr>`
                            
      cardsElements += cardElement;
                        
      })
      document.getElementById('Table-transaction').innerHTML = cardsElements;
      styleTransation()
      this.updateEntrada();
      this.updateSaida();
      this.updateTotal();
  
   })},
     editCard(elements){
        let cardsElements = `<option value="1">---Nenhuma Transação--- </option>`;
          elements.forEach((c) =>{
            let cardElement = `<option value="${c.id}">${c.description}</option>`; 
            cardsElements += cardElement;
          })
          document.getElementById('transac').innerHTML = cardsElements;
     },
 


   updateTotal(){
      fetch('http://192.168.0.4:3000/api/Total').then((res =>{
         return res.json()
      })).then(json =>{
         let totalElements = 0;
      let totalElement = JSON.parse(json)
      totalElement.forEach((total) =>{
         let totalSaldo = total.valor
         totalElements += Number(totalSaldo);


      })
      document.getElementById('Total').innerHTML = 'R$' + totalElements ;     
      })
   }

   }

function createCard(){
   let description = document.getElementById('description').value;
   let valor = document.getElementById('value').value;
   let data = document.getElementById('date').value;

   let card = {description, valor, data};

   const options = {
      method: 'POST',
      headers: new Headers({'Content-type': 'application/json'}),
      body: JSON.stringify(card)
   }

   fetch('http://192.168.0.4:3000/api/new', options).then(res =>{
      console.log(options.body)
      Calcs.updateCards();
      transaçoes.closeModal();
      document.getElementById('description').value = "";
      document.getElementById('value').value = "";
      document.getElementById('date').value = "";
            
   })


}



function cardTarget(Target){
   let id = Target.id;
   let cardId = {id};
   const options = {
      method: 'DELETE',
      headers: new Headers({'Content-type': 'application/json'}),
      body: JSON.stringify(cardId)
   }
 
   fetch('http://192.168.0.4:3000/api/del', options).then(res =>{
      Calcs.updateCards();
      styleTransation();
   })

      
}


function editarTransacao(){

   let id = document.getElementById('transac').value
   let newDescription = document.getElementById('newDescription').value;
   let newValue = document.getElementById('newValue').value;
   let newDate = document.getElementById('newDate').value;

   let newCard = {id, newDescription, newValue, newDate}

   
   const options = { 
          
          method: 'PUT',
          headers: new Headers({'Content-type': 'application/json'}),
          body: JSON.stringify(newCard)
       }




   fetch('http://192.168.0.4:3000/api/put', options).then(res =>{
      Calcs.updateCards();
      transaçoes.closeModalEdit();
    newDescription = document.getElementById('newDescription').value = "";
    newValue = document.getElementById('newValue').value = "";
    newDate = document.getElementById('newDate').value = "";

   })
}



function styleTransation(){
   let inputStyle = document.querySelectorAll(".Valor");
   
   for(let i = 0; i < inputStyle.length; i++){

      if(Number(inputStyle[i].innerText) < 0){

    inputStyle[i].classList.add('text-danger')
   }
   }
}
   
