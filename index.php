<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">

    <script defer src="js/game.js"></script>
    <script defer src="js/score.js"></script>
    <script defer src="js/app.js"></script>

    <title>Memory</title>
</head>
<body>
    <h1>Memory game</h1>
    <main>
            <section class="score">
                <table>
                    <legend>Résultat des 5 dernières parties:</legend>
                    <tbody></tbody>
                </table>
            </section>
            <section class="container-game">
                <?php 
                require_once __DIR__ . "/php/Class/Cards.php";
                $newCard = new Card();
                $allImg = $newCard->getAllImgAndShuffled();
                
                foreach($allImg as $img):
                    ?>
                    
                    <div class="container-img">
                        <div class="front-face"></div>
                        <div class="back-face">
                            <img src="<?= "img/" . $img ?>" alt="Image du jeu memory">
                        </div>
                    </div>
                <?php endforeach; ?>
                <div class="win hidden display-none">
                    <p>Bravo vous avez gagné!</p>
                    <button>Restart</button>
                </div>
            </section>
        <section class="userMove">
            <p class="userMove">Nombre de coup : <span class="numberUserMove">0</span></p>
        </section>
    </main>

</body>
</html>

<?php

