const game = {
    allContainerImg : [],

    // Contient le conteneur de la première image retournée
    firstTarget: {},

    // Contient le conteneur de la deuxième image retournée
    secondTarget:{},

    // Content la "src" de la première image retournée
    firstChoice: "",

    // Content la "src" de la deuxième image retournée
    secondChoice: "",

    // Permet à l'utilisateur de cliquer sur un autre élément
    canSelect: true,

    // Nombre de coup de l'utilisateur
    userMove : 0,

    // Compteur de partie
    gameCounter: 1,

    // Résultat des 5 dernières parties
    lastFiveGames : {},
    init: function(){
        // Sélectionne tout les conteneurs d'img
        game.allContainerImg = document.querySelectorAll('.container-img');
        
        // Ajout d'un listener sur chaque conteneur d'image
        game.addEventCanSelect()
    },
    /**
     * Ajoute un évènement sur chaque conteneur d'image
     */
    addEventCanSelect : function () { 
        for(const containerImg of game.allContainerImg){

            containerImg.addEventListener('click', game.handlecanSelect);
            
        }
    },
    /**
     * Savoir si l'utilisateur à le droit de retourner une carte
     * @param {*} event 
     */
    handlecanSelect: function(event){
        if (game.canSelect){
            game.revealImg(event);
        }
    },
    /**
     * Retourne une carte et stock des informations sur l'élément retourné
     * @param {*} event 
     */
    revealImg: function (event) {
        game.canSelect = false;

        // Aucune carte n'est retournée
        if (! game.firstChoice) {

            // Stock le conteneur de l'image sélectionnée
            game.firstTarget = event.currentTarget;

            // Retourne l'élément face visible
            game.firstTarget.classList.add('selected')
            
            // Récupère le "src" de l'image
            game.firstChoice = game.firstTarget.querySelector('.back-face img').attributes.src.textContent;
            
            game.canSelect = true; 
        }
        console.log(game.canSelect);

        // Si la carte sélectionnée n'est pas déjà retournée
        if(!event.currentTarget.classList.contains('selected')){
            game.secondTarget = event.currentTarget;
            game.secondChoice = game.secondTarget.querySelector('.back-face img').attributes.src.textContent;
            game.secondTarget.classList.add('selected')
            
            game.imgFound();
            
            game.resetChoiceAndTarget();  
            
            game.userMove++;
            game.refreshUserMove();
        }
        // Si la carte sélectionnée est déjà retournée
        else{
            game.canSelect = true;
        }
        
        if(game.isUserWin()){
            // Le joueur à gagné
            game.showWinElement();
        }
    
        
    },
    /**
     * Vérifie si les deux images sont identiques et leurs ajoute la classe "found" si c'est le cas
     */
     imgFound: function () { 
        // Les deux cartes sont identiques
        if(game.firstChoice === game.secondChoice){
            game.firstTarget.classList.add('found');
            game.secondTarget.classList.add('found');

            // Suppression de l'évènement pour que les images ne soit plus cliquable
            game.firstTarget.removeEventListener("click", game.handlecanSelect);
            game.secondTarget.removeEventListener("click", game.handlecanSelect);

        }
    },
    /**
     * Vide les variables et retourne les deux cartes révélées
     */
    resetChoiceAndTarget: function () { 
        // Deux cartes ont été retournées, on remet à zéro les choix et enlève les classes "selected"
        game.firstChoice = "";
        game.secondChoice = "";   

        // Retourne les cartes révélées après une seconde
        setTimeout(()=>{
            game.firstTarget.classList.remove('selected');       
            game.secondTarget.classList.remove('selected'); 
            game.canSelect = true
        },1000);
        
    },
    /**
     * Actualise l'affichage du nombre de coup de l'utilisateur
     */
    refreshUserMove: function () { 
        const numberUserMoveElement = document.querySelector('.numberUserMove');
        numberUserMoveElement.textContent = game.userMove;
    },
    //  Vérifie si toutes les paires sont trouvées
    isUserWin: function () { 
        
        for(let index = 0 ; index < game.allContainerImg.length; index ++){

            // Si l'élément de ne contient pas la classe "found"
            if(!game.allContainerImg[index].classList.contains('found')){
                // Le jeu n'est pas encore fini
                return false
            }
        }
        // Toutes les paires sont trouvées, l'utilisateur à gagné
        return true
    },
    /**
     * Affiche la div de victoire
     */
    showWinElement : function(){
        const containerGame = document.querySelector('.container-game');
        const winContainerELement = document.querySelector('.win');
        // Affiche la div de victoire
        winContainerELement.classList.remove("hidden", "display-none");
        console.log("victoire");
        
        const restartButtonElement = document.querySelector('.win button');
        console.log(restartButtonElement);
        
        // Permet de recommencer le jeu
        console.log("test de repeat");
        restartButtonElement.addEventListener('click',() => game.handleRestartGame(containerGame, winContainerELement));
        
    },
    /**
     * Retourne toutes les cartes, mélange les cartes et cache la div de victoire
     * @param {node element} containerGame Conteneur du jeu
     * @param {node element} winContainer Div de victoire
     */
    handleRestartGame: function (containerGame, winContainer) { 
        // Active l'animation de fermeture de la div victoire
        winContainer.classList.add('hidden');

        // Retourne toutes les cartes face cachée
        for(let index = 0 ; index < game.allContainerImg.length; index ++){
            game.allContainerImg[index].classList.remove('found');
        }

        // Après l'animation de retournement des cartes et de la fermeture de la div victoire
        setTimeout(() => {
            // Mélange les cartes
            for(let index = containerGame.children.length; index >=0; index--){
                containerGame.appendChild(containerGame.children[Math.floor(Math.random() *index)]);
            }
            // Enlève la div victoire cachée
            winContainer.classList.add('display-none')
            console.log("repeat");
            game.addUserResult();
            game.userMove = 0;
            game.refreshUserMove();
            game.gameCounter++;
            game.canSelect = true

            // Rajoute l'évènement sur toutes les cartes
            game.addEventCanSelect();
        },1000); 
     },
     addUserResult: function(){
         const theadRowElement = document.querySelector('thead tr');
         const tbodyRowElement = document.querySelector('tbody tr');
         const allCellsElement = document.querySelectorAll('tr>*');
         if(game.lastFiveGames.length > 5){
             game.lastFiveGames.splice(0, 1);
             game.lastFiveGames.push(result);
             console.log("test");
            }
        game.lastFiveGames[`${game.gameCounter}`] = game.userMove;
        console.log(game.userMove);
        console.log(game.lastFiveGames[1]);
        
        
        if(allCellsElement.length > 0){
            for (let index = 0; index < allCellsElement.length; index++) {
                allCellsElement[index].remove();  
            }
        }
        for (let value in game.lastFiveGames) {

            const newHeadCell = document.createElement('th');
            const newBodyCell = document.createElement('td');

            newHeadCell.textContent = `Partie ${value}`;
            newBodyCell.textContent = game.lastFiveGames[value];

            theadRowElement.appendChild(newHeadCell);
            tbodyRowElement.appendChild(newBodyCell);

        }
     }    

}
document.addEventListener('DOMContentLoaded',game.init());