const game = {
    firstTarget: {},
    secondTarget:{},
    firstChoice: "",
    secondChoice: "",
    canSelect: true,
    init: function(){
        console.log("Initialisation de l'objet game");
        // Sélectionne tout les conteneurs d'img
        const allContainerImg = document.querySelectorAll('.container-img');

        for(const containerImg of allContainerImg){

            containerImg.addEventListener('click', game.handlecanSelect);
            
        }
    },
    handlecanSelect: function(event){
        if (game.canSelect){
            game.revealImg(event);
        }
    },
    revealImg: function (event) {
        let test = event.currentTarget;
        let test2 = test.querySelector('.back-face img').attributes.src.textContent;
        console.log(test2);
        // Aucune carte n'est retournée
        if (! game.firstChoice) {
            game.firstTarget = event.currentTarget;
            game.firstChoice = game.firstTarget.querySelector('.back-face img').attributes.src.textContent;
            game.firstTarget.classList.add('selected')
        }
        // Si la carte sélectionnée n'est pas déjà retournée
        if(!event.currentTarget.classList.contains('selected')){
            game.canSelect = false;
            game.secondTarget = event.currentTarget;
            game.secondChoice = game.secondTarget.querySelector('.back-face img').attributes.src.textContent;
            game.secondTarget.classList.add('selected')

            game.imgFound();
            console.log(game.canSelect);

            game.resetChoiceAndTarget();   
            console.log("dans le if");
        }
        
    },
    resetChoiceAndTarget: function () { 
        // Deux cartes ont été retournées, on remet à zéro les choix et enlève les classes "selected"
        console.log(game.firstTarget);
        console.log(game.secondTarget);
        game.firstChoice = "";
        game.secondChoice = "";   
        setTimeout(()=>{
            game.firstTarget.classList.remove('selected');       
            game.secondTarget.classList.remove('selected'); 
            game.canSelect = true
        },1000);

     },
     imgFound: function () { 
        // Les deux cartes sont identiques
        if(game.firstChoice === game.secondChoice){
            game.firstTarget.classList.add('found');
            game.secondTarget.classList.add('found');
        }
      }

}
document.addEventListener('DOMContentLoaded',game.init());
