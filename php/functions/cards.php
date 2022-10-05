<?php
/**
 * Récupère les images dans le dossier "img", sauf "background_image" et "front_face", puis les mélanges
 *
 * @return array Tableau d'images mélangées
 */
function getImgAndShuffled(){

    $imgDir = "../img";
    $arrayExtensions = ['jpeg', 'jpg', 'png'];
    $allImg = [];
    // Si c'est un dossier
    if(is_dir($imgDir)){
        
        // Génère 2 fois chaque image
        for($count = 0; $count < 2; $count++){

            // Recherche toute les images par extension
            foreach($arrayExtensions as $extension){
                
                // S'il y a des images à récupérées
                if (!empty(glob($imgDir . "/*." . $extension))) {
    
                    $imgPerExtension = glob($imgDir . "/*." . $extension);
    
                    // Récupère toutes les images d'une extension
                    foreach($imgPerExtension as $img){
    
                        // Si ce n'est pas l'image qui cache les autres
                        if ($img !== $imgDir . "/front_face.jpg" &&
                            $img !== $imgDir . "/background_image.jpg") {
                            
                            // Stockage des images
                            $allImg[] = $img;
                        }
                    }
                }
            }
        }
    }
    // Mélange aléatoirement les images dans le tableau.
    shuffle($allImg);
    return $allImg;
}