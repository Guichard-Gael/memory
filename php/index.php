<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <title>Memory</title>
</head>
<body>
    <h1>Memory game</h1>
    <div class="container-game">
        <?php 
            require "functions/cards.php";
            $allImg = getImgShuffled();
            foreach($allImg as $img):
        ?>
        <div class="container-img">
            <div class="front-face"></div>
            <div class="back-face">
                <img src="<?= $img ?>" alt="Image du jeu memory">
            </div>
        </div>
        <?php endforeach; ?>
        <div class="win hidden display-none">
            <p>Bravo vous avez gagné!</p>
            <button>Restart</button>
        </div>
    </div>
    <p class="userMove">Nombre de coup : <span class="numberUserMove">0</span></p>
    <table>
        <legend>Résultat des 5 dernières parties</legend>
        <thead>
                <tr>
                    
                </tr>
        </thead>
        <tbody>
            <tr>
                
            </tr>
        </tbody>
    </table>
  <script src="../js/game.js"></script>
      <!-- <script src="js/app.js"></script> -->
</body>
</html>

<?php

