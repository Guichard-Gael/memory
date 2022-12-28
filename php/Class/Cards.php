<?php

class Card
{
    private $allImg;
    private $backgroundImg;
    private $extensionsAccepted;
    private $frontImg;
    private $pathImgFolder;

    public function __construct(string $pathImgFolder =__DIR__ . "../../../img")
    {
        $this->allImg = [];
        $this->extensionsAccepted = ['jpeg', 'jpg', 'png'];
        $this->backgroundImg = $pathImgFolder . "/background_image.jpg";
        $this->frontImg = $pathImgFolder . "/front_face.jpg";
        $this->pathImgFolder = $pathImgFolder;
    }

    /**
     * Get and return all images with an accepted
     *
     * @return array
     */
    public function getAllImgAndShuffled(): array
    {
        // If it's a folder
        if(is_dir($this->pathImgFolder)){
            $this->getImgByExtension();
        }
        // Randomly shuffle the images on the array
        shuffle($this->allImg);

        return $this->allImg;
    }

    /**
     * Retrieves the images with an accepted extension
     *
     * @return void
     */
    private function getImgByExtension(): void
    {
        // Get all images by extension
        foreach($this->extensionsAccepted as $extension){
    
            // if images are found
            if (!empty(glob($this->pathImgFolder . "/*." . $extension))) {
                // Get all images with this extension
                $imgByExtension = glob($this->pathImgFolder . "/*." . $extension);
                $this->storeImages($imgByExtension);
            }
        }
    }

    /**
     * From an array containing the path of the images, retrieve the file name of each image and store it twice in an array
     *
     * @param array $arrayImg The array containing the path of the images
     * 
     * @return void
     */
    private function storeImages(array $arrayImg): void
    {
        foreach($arrayImg as $pathImg){
            
            // If it is not the background image or the image of the card face
            if ($pathImg !== $this->frontImg && $pathImg !== $this->backgroundImg) {
                // The name of the image is found after the last "/"
                $arrayPathImg = explode('/', $pathImg);
                // Retrieves the name of the image
                $img = end($arrayPathImg);
                
                // Need each image 2 times
                for($count = 0; $count < 2; $count++){
                    // Store the image
                    $this->allImg[] = $img;   
                }
            }
        }
    }
}