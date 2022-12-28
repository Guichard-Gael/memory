const score = {
    // Result of the last five games
    lastFiveGames : {},
    // Number of the user's move
    userMove : 0,

    /**
     * Create and display the results table
     */
        showUserResult: function(){

            const tbodyElement = document.querySelector('tbody');
            score.deleteUserScore();
    
            // Add the user's score in the array
            score.lastFiveGames[`${game.gameCounter}`] = score.userMove;
        
            score.deleteAllRow();
    
            // Create all the rows of the table
            for (let value in score.lastFiveGames) {
                const trElement = document.createElement('tr');
                const newGameCell = document.createElement('td');
                const newScoreCell = document.createElement('td');
    
                newGameCell.textContent = `Partie ${value}`;
                newScoreCell.textContent = score.lastFiveGames[value];
    
                trElement.appendChild(newGameCell);
                trElement.appendChild(newScoreCell);
    
                tbodyElement.appendChild(trElement);
            }
        },
        
        /**
         * Refreshes the number of user's moves
         */
        refreshUserMove: function () { 
            const numberUserMoveElement = document.querySelector('.numberUserMove');
            numberUserMoveElement.textContent = score.userMove;
        },
    
        /**
         * Remove the first value from the score array if it has five or more values
         */
        deleteUserScore: function(){ 
    
            // If the array has five or more values
            if(Object.keys(score.lastFiveGames).length >= 5){
    
                // Remove the first value
                delete score.lastFiveGames[game.gameCounter - 5];
            }
        },
    
        /**
         * Delete all rows in the table
         */
        deleteAllRow: function(){
    
            const allTrElement = document.querySelectorAll('tr');
    
            // If the table isn't empty
            if(allTrElement.length > 0){
    
                // Remove all rows
                for (let index = 0; index < allTrElement.length; index++) {
                    allTrElement[index].remove();  
                }
            }
        }
}