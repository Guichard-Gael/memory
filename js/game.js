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
    init: function(){
        // Sélectionne tout les conteneurs d'img
        game.allContainerImg = document.querySelectorAll('.container-img');
        
        // Ajout d'un listener sur chaque conteneur d'image
        game.addEventCanSelect()
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

        // Le joueur à gagné
        if(game.isUserWin()){
            game.showWinElement();
        }
        // Le joueur n'a pas encore gagné
        else{
            
            // Aucune carte n'est retournée
            if (! game.firstChoice) {
                game.firstTarget = event.currentTarget;
                // Retourne l'élémenent
                game.firstTarget.classList.add('selected')

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
            }

        }
        
    },
    /**
     * Vide les variables et retourne les deux cartes révélées
     */
    resetChoiceAndTarget: function () { 
        // Deux cartes ont été retournées, on remet à zéro les choix et enlève les classes "selected"
        game.firstChoice = "";
        game.secondChoice = "";   
        // Attend une seconde avant de retourner les cartes révélés
        setTimeout(()=>{
            game.firstTarget.classList.remove('selected');       
            game.secondTarget.classList.remove('selected'); 
            game.canSelect = true
        },1000);

    },
    /**
     * Vérifie si les deux images sont identiques et leurs ajoute la classe "found" si c'est le cas
     */
     imgFound: function () { 
        // Les deux cartes sont identiques
        if(game.firstChoice === game.secondChoice){
            game.firstTarget.classList.add('found');
            game.secondTarget.classList.add('found');

            game.firstTarget.removeEventListener("click", game.handlecanSelect);
            game.secondTarget.removeEventListener("click", game.handlecanSelect);

        }
    },
    /**
     * Affiche la div de victoire
     */
    showWinElement : function(){
        const containerGame = document.querySelector('.container-game');
        const winContainerELement = document.querySelector('.win');
        // Affiche la div de victoire
        winContainerELement.classList.remove("hidden", "display-none");

        const restartButtonElement = document.querySelector('.win button');
        console.log(restartButtonElement);

        // Permet de recommencer le jeu
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

        // Retourne toutes les cartes
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
            game.canSelect = true
        },1000);
        
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
        // Toute les paires sont trouvée, l'utilisateur à gagné
        return true
    },
    /**
     * Ajoute un évènement sur chaque conteneur d'image
     */
    addEventCanSelect : function () { 
        for(const containerImg of game.allContainerImg){

            containerImg.addEventListener('click', game.handlecanSelect);
            
        }
    }


}
document.addEventListener('DOMContentLoaded',game.init());
