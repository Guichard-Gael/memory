const game = {
    allContainerImg : [],
    containerGame: {},
    winContainerELement: {},
    restartButtonElement: {},

    // Conteneur de la première image retournée
    firstCardTarget: {},

    // Conteneur de la deuxième image retournée
    secondCardTarget:{},

    // "src" de la première image retournée
    srcFirstImgTarget: "",

    // "src" de la deuxième image retournée
    srcSecondImgTarget: "",

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
        // Sélectionne le conteneur du jeu
        game.containerGame = document.querySelector('.container-game');
        // Sélectionne la div victoire
        game.winContainerELement = document.querySelector('.win');
        // Sélectionne le boutton 
        game.restartButtonElement = document.querySelector('.win button');
        
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
        if (! game.srcFirstImgTarget) {

            game.firstCardTarget = game.stockCardTarget(event);
            game.srcFirstImgTarget = game.stockSrcImgTarget(game.firstCardTarget);
            console.log(game.firstCardTarget);
            console.log(game.srcFirstImgTarget);
            game.canSelect = true; 
        }


        // Si la carte sélectionnée n'est pas déjà retournée
        if(!event.currentTarget.classList.contains('selected')){

            game.secondCardTarget = game.stockCardTarget(event);
            game.srcSecondImgTarget = game.stockSrcImgTarget(game.secondCardTarget);
            console.log(game.secondCardTarget);
            console.log(game.srcSecondImgTarget);
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
     * Renvoie le conteneur de la carte qui a été retournée.
     * @param {*} event 
     * @returns Conteneur de la carte retournée.
     */
    stockCardTarget: function(event){
        // Stock le conteneur de l'image sélectionnée
        const cardTarget = event.currentTarget;

        // Retourne l'élément face visible
        cardTarget.classList.add('selected')
        return cardTarget;
    },
    /**
     * Renvoie la "src" de l'image retournée
     * @param {Node element} cardTarget Conteneur de l'image retournée
     * @returns Renvoie la "src" de l'image retournée
     */
    stockSrcImgTarget: function(cardTarget){
        // Récupère le "src" de l'image
        const srcCardImgTarget = cardTarget.querySelector('.back-face img').attributes.src.textContent;
        return srcCardImgTarget;
    },
    /**
     * Vérifie si les deux images sont identiques et leurs ajoute la classe "found" si c'est le cas
     */
     imgFound: function () { 
        // Les deux cartes sont identiques
        if(game.srcFirstImgTarget === game.srcSecondImgTarget){
            game.firstCardTarget.classList.add('found');
            game.secondCardTarget.classList.add('found');

            // Suppression de l'évènement pour que les images ne soit plus cliquable
            game.firstCardTarget.removeEventListener("click", game.handlecanSelect);
            game.secondCardTarget.removeEventListener("click", game.handlecanSelect);

        }
    },
    /**
     * Vide les variables et retourne les deux cartes révélées
     */
    resetChoiceAndTarget: function () { 
        // Deux cartes ont été retournées, on remet à zéro les choix et enlève les classes "selected"
        game.srcFirstImgTarget = "";
        game.srcSecondImgTarget = "";   

        // Retourne les cartes révélées après une seconde
        setTimeout(()=>{
            game.firstCardTarget.classList.remove('selected');       
            game.secondCardTarget.classList.remove('selected'); 
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
        
        // Affiche la div de victoire
        game.winContainerELement.classList.remove("hidden", "display-none");
        
        // Permet de recommencer le jeu
        game.restartButtonElement.addEventListener('click',game.handleRestartGame);
        
    },
    /**
     * Retourne toutes les cartes, mélange les cartes et cache la div de victoire
     */
    handleRestartGame: function () { 

        // Suppression de l'évènement pour ne pas les accumuler
        game.restartButtonElement.removeEventListener('click', game.handleRestartGame);
        // Active l'animation de fermeture de la div victoire
        game.winContainerELement.classList.add('hidden');

        // Retourne toutes les cartes face cachée
        for(let index = 0 ; index < game.allContainerImg.length; index ++){
            game.allContainerImg[index].classList.remove('found');
        }

        // Après l'animation de retournement des cartes et de la fermeture de la div victoire
        setTimeout(() => {
            // Mélange les cartes
            game.shuffleCard();
            // Enlève la div victoire cachée
            game.winContainerELement.classList.add('display-none')

            // affiche le résultat de l'utilisateur
            game.showUserResult();

            // Réinitialisation du nombre de coup et actualise l'affichage
            game.userMove = 0;
            game.refreshUserMove();

            // Incremente le nombre de partie et autorise le joueur à cliquer
            game.gameCounter++;
            game.canSelect = true

            // Rajoute l'évènement sur toutes les cartes
            game.addEventCanSelect();
        },1000); 
     },
     /**
      * Mélange les cartes
      */
     shuffleCard: function () { 

        for(let index = game.containerGame.children.length; index >=0; index--){
            game.containerGame.appendChild(game.containerGame.children[Math.floor(Math.random() *index)]);
        }
      },
    /**
     * Structure et affiche le tableau des scores
     */
     showUserResult: function(){

        const tbodyElement = document.querySelector('tbody');
        game.deleteUserScore();

        // Ajoute "partie n°" : "nombre de coups" à l'objet
        game.lastFiveGames[`${game.gameCounter}`] = game.userMove;
    
        game.deleteAllRow();

        // Pour chaque valeur dans l'objet
        for (let value in game.lastFiveGames) {
            const trElement = document.createElement('tr');
            const newGameCell = document.createElement('td');
            const newScoreCell = document.createElement('td');

            newGameCell.textContent = `Partie ${value}`;
            newScoreCell.textContent = game.lastFiveGames[value];

            // Ajoute le numéro de la partie puis le nombre de coups sur la même ligne
            trElement.appendChild(newGameCell);
            trElement.appendChild(newScoreCell);
            // Ajoute la ligne au tbody
            tbodyElement.appendChild(trElement);

        }
    },
    /**
     * Supprime la premère valeur d'un objet si celui-ci en à 5 ou plus
     */
    deleteUserScore: function(){ 

        // Si l'objet contient 5 valeurs ou plus
        if(Object.keys(game.lastFiveGames).length >= 5){

            // Supprime la première valeur
            delete game.lastFiveGames[game.gameCounter - 5];
        }
    },
    /**
     * Supprime les lignes dans le tableau des scores
     */
    deleteAllRow: function(){

        const allTrElement = document.querySelectorAll('tr');

        // S'il y a des "tr" dans la table des scores
        if(allTrElement.length > 0){

            // Supprime toutes les lignes déjà présentes
            for (let index = 0; index < allTrElement.length; index++) {
                allTrElement[index].remove();  
            }
        }
    }

}
document.addEventListener('DOMContentLoaded',game.init());