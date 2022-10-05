const game = {
    allContainerImg : [],
    containerGame: {},
    winContainerELement: {},
    restartButtonElement: {},

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
        if (! game.firstChoice) {

            // Stock le conteneur de l'image sélectionnée
            game.firstTarget = event.currentTarget;

            // Retourne l'élément face visible
            game.firstTarget.classList.add('selected')
            
            // Récupère le "src" de l'image
            game.firstChoice = game.firstTarget.querySelector('.back-face img').attributes.src.textContent;
            
            game.canSelect = true; 
        }


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
            for(let index = game.containerGame.children.length; index >=0; index--){
                game.containerGame.appendChild(game.containerGame.children[Math.floor(Math.random() *index)]);
            }
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
     * Structure et affiche le tableau des scores
     */
     showUserResult: function(){

        const tbodyElement = document.querySelector('tbody');
        const allTrElement = document.querySelectorAll('tr');

        // Si l'objet contient 5 valeurs ou plus
        if(Object.keys(game.lastFiveGames).length >= 5){

            // Supprime la première valeur
            delete game.lastFiveGames[game.gameCounter - 5];
        }

        // Ajoute "partie n°" : "nombre de coups" à l'objet
        game.lastFiveGames[`${game.gameCounter}`] = game.userMove;
        
        // S'il y a des "tr" dans la table des scores
        if(allTrElement.length > 0){

            // Supprime toutes les lignes déjà présentes
            for (let index = 0; index < allTrElement.length; index++) {
                allTrElement[index].remove();  
            }
        }

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
     }  

}
document.addEventListener('DOMContentLoaded',game.init());