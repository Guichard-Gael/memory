const game = {
    allContainerImg : [],
    containerGame: {},
    winContainerELement: {},
    restartButtonElement: {},

    // Container of the first image returned
    firstCardTarget: {},

    // Container of the second image returned
    secondCardTarget:{},

    // "src" dof the first image returned
    srcFirstImgTarget: "",

    // "src" of the second image returned
    srcSecondImgTarget: "",

    // The user can select another card
    canSelect: true,

    // Number of games
    gameCounter: 1,

    init: function(){
        // Select all image containers
        game.allContainerImg = document.querySelectorAll('.container-img');
        // Select the game container
        game.containerGame = document.querySelector('.container-game');
        // Select the win div
        game.winContainerELement = document.querySelector('.win');
        // Select the restart button
        game.restartButtonElement = document.querySelector('.win button');
        
        // Add a listener on all image containers
        game.addHandlerCanSelect();
    },

    /**
     * Add a listener on each image container
     */
    addHandlerCanSelect : function () { 
        for(const containerImg of game.allContainerImg){
            containerImg.addEventListener('click', game.handlecanSelect);
        }
    },

    /**
     * If the user can return another card
     * @param {*} event The event on clicking on the image container
     */
    handlecanSelect: function(event){
        if (game.canSelect){
            game.revealImg(event);
        }
    },

    /**
     * Returns and stores the card selected by the user
     * @param {*} event The event on clicking on the image container
     */
    revealImg: function (event) {
        game.canSelect = false;

        // If no card is already turned over
        if (! game.srcFirstImgTarget) {

            game.firstCardTarget = game.stockCardTarget(event);
            game.srcFirstImgTarget = game.stockSrcImgTarget(game.firstCardTarget);
            game.canSelect = true; 
        }

        // If the selected card isn't already turned over
        if(!event.currentTarget.classList.contains('selected')){

            game.secondCardTarget = game.stockCardTarget(event);
            game.srcSecondImgTarget = game.stockSrcImgTarget(game.secondCardTarget);
            game.imgFound();
            game.resetChoiceAndTarget();  
            score.userMove++;
            score.refreshUserMove();
        }
        // If the selected card is already turned over
        else{
            game.canSelect = true;
        }
        
        if(game.isUserWin()){
            // The user win
            game.showWinElement();
        }
    },

    /**
     * Returns and return the image container selected by the user
     * @param {*} event The event on clicking on the image container
     * @returns The image container selected by the user
     */
    stockCardTarget: function(event){
        // Get the image container selected
        const cardTarget = event.currentTarget;

        // Returns the card selected
        cardTarget.classList.add('selected')

        // Return the image container selected
        return cardTarget;
    },

    /**
     * Returns the "src" of the image selected
     * @param {Node element} cardTarget The image container selected
     * @returns Returns the "src" of the image selected
     */
    stockSrcImgTarget: function(cardTarget){
        // Get the "src" of the image selected
        const srcCardImgTarget = cardTarget.querySelector('.back-face img').attributes.src.textContent;

        return srcCardImgTarget;
    },

    /**
     * Checks if the two images are identical
     */
     imgFound: function () { 
        // The two images are identical
        if(game.srcFirstImgTarget === game.srcSecondImgTarget){
            game.firstCardTarget.classList.add('found');
            game.secondCardTarget.classList.add('found');

            // Remove the listener
            game.firstCardTarget.removeEventListener("click", game.handlecanSelect);
            game.secondCardTarget.removeEventListener("click", game.handlecanSelect);
        }
    },

    /**
     * Hide the cards that are revealed
     */
    resetChoiceAndTarget: function () { 
        // Reset the choices
        game.srcFirstImgTarget = "";
        game.srcSecondImgTarget = "";   

        // Hide the cards that are revealed, after one second
        setTimeout(()=>{
            game.firstCardTarget.classList.remove('selected');       
            game.secondCardTarget.classList.remove('selected'); 
            game.canSelect = true;
        },1000);   
    },

    /**
     * Checks if all pairs are found
     * 
     * @returns boolean
     */
    isUserWin: function () { 
        // For each card in the game
        for(let index = 0 ; index < game.allContainerImg.length; index ++){
            console.log("test boucle for");
            // if the card has been found
            if(!game.allContainerImg[index].classList.contains('found')){
                // The game isn't over
                console.log("test jeu continu");
                return false;
            }
        }
        console.log("test victoire");
        // the game is over
        return true;
    },

    /**
     * Showing the victory div
     */
    showWinElement : function(){
        // Showing the victory div
        game.winContainerELement.classList.remove("hidden", "display-none");
        
        // Activates the restart button
        game.restartButtonElement.addEventListener('click',game.handleRestartGame);
    },

    /**
     * Hide and shuffle all cards
     */
    handleRestartGame: function () { 
        // Delete the event to avoid cumulating them
        game.restartButtonElement.removeEventListener('click', game.handleRestartGame);
        // Hide the div of victory
        game.winContainerELement.classList.add('hidden');

        // Turn over all cards
        for(let index = 0 ; index < game.allContainerImg.length; index ++){
            game.allContainerImg[index].classList.remove('found');
        }

        // After turn over all cards and hide the div of victory
        setTimeout(() => {
            // Shuffle all cards
            game.shuffleCard();
            // Remove the div of victory
            game.winContainerELement.classList.add('display-none')

            // Displays the user's result on the left of the screen
            score.showUserResult();

            // Reset the number of user's move
            score.userMove = 0;
            score.refreshUserMove();

            // Increases the number of games
            game.gameCounter++;
            game.canSelect = true

            // Add the listener on all image container
            game.addHandlerCanSelect();
        },1000); 
     },

     /**
      * Shuffle all cards
      */
     shuffleCard: function () { 
        for(let index = game.containerGame.children.length; index >=0; index--){
            game.containerGame.appendChild(game.containerGame.children[Math.floor(Math.random() *index)]);
        }
      }
}