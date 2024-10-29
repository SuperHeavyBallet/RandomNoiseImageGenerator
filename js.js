
    const canvasContainer = document.getElementById("canvas-container");



    let blackFrequency = 0;
    let whiteFrequency = 0;
    let type = "grayscale";
    let canvas;
    let ctx;
    let imageData;
    let canvasDimensionX = 720;
    let canvasDimensionY = 720;
    let previousFrameData;

    const blackFrequencyInput = document.getElementById("black-frequency");
    const whiteFrequencyInput = document.getElementById("white-frequency");
    const canvasDimensionXInput = document.getElementById("image-dimensions-x");
    const canvasDimensionYInput = document.getElementById("image-dimensions-y");
    

    // Access the generate button and on click create an image on the canvas
    document.getElementById('generate').addEventListener('click', (e) => {
        e.preventDefault();

        blackFrequency = blackFrequencyInput.value;
        whiteFrequency = whiteFrequencyInput.value;

        if (canvasDimensionXInput.value)
        {
            canvasDimensionX = canvasDimensionXInput.value;
        }
        if (canvasDimensionYInput.value)
        {
            canvasDimensionY = canvasDimensionYInput.value;
        }

        window.alert("Black: " + blackFrequency + " White: " + whiteFrequency + " X: " + canvasDimensionX + " Y: " + canvasDimensionY);

        getImageDimensions();
        //generateNoise("grayscale");

        startNoiseAnimation();

    })

    function getImageDimensions()
    {

        while(canvasContainer.firstChild)
        {
            canvasContainer.removeChild(canvasContainer.lastChild);
        }
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id" , "noiseCanvas");
        canvas.setAttribute("width", `${canvasDimensionX}`);
        canvas.setAttribute("height", `${canvasDimensionY}`);

        canvasContainer.appendChild(canvas);

        previousFrameData = new Uint8ClampedArray(canvasDimensionX * canvasDimensionY);
    }


    function generateNoise( type ){

        

            // First access the Canvas element in HTML to reference
            canvas = document.getElementById('noiseCanvas');

            // Create a drawing context on the Canvas, in this case we are drawing in 2d
            ctx = canvas.getContext('2d');



        // Create a new image data object, with the dimensions of the canvas
        imageData = ctx.createImageData(canvasDimensionX, canvasDimensionY);

        // For each pixel in the imageData object, assign a colour value (in this case grayscale)
        // The imageData.data is an array, with each pixel's color data being stored in 4 sequential indexes
        // As example, [0] would be Red, [1] would be Green, [2] would be Blue and [3] would be Alpha(transparancy)
        // In this case we are only using grayscale, so the RGB values are all given the same value, and alpha
        // is set to fully opaque

        for(let i = 0; i < imageData.data.length; i += 4){

            if (type === "grayscale")
            {
                /*
                const grayscale = Math.floor(Math.random() * 256); // Random grayscale value
                imageData.data[i] = grayscale; // Red
                imageData.data[i + 1] = grayscale; // Green
                imageData.data[i + 2] = grayscale; // Blue
                imageData.data[i + 3] = 255;
                */

                const randomValue = Math.random() * 100;

                let grayscale;
                if (randomValue < blackFrequency) {
                    grayscale = 0;
                } else if (randomValue < blackFrequency + whiteFrequency) {
                    grayscale = 255;
                } else {
                    grayscale = Math.floor(Math.random() * 256); // Else, random gray value
                }

                imageData.data[i] = grayscale; // Red
                imageData.data[i + 1] = grayscale; // Green
                imageData.data[i + 2] = grayscale; // Blue
                imageData.data[i + 3] = 255;

            }
            else if (type === "color")
            {
                const red = Math.floor(Math.random() * 256);   // Random red value (0-255)
                const green = Math.floor(Math.random() * 256); // Random green value (0-255)
                const blue = Math.floor(Math.random() * 256);  // Random blue value (0-255)


                imageData.data[i] = red; // Red
                imageData.data[i + 1] = green; // Green
                imageData.data[i + 2] = blue; // Blue
                imageData.data[i + 3] = 255;
            }
            
            
        }

        // After the image data is built, display it on the canvas element, at the starting coordinates
        ctx.putImageData(imageData, 0, 0);

     
    }

    function startNoiseAnimation()
    {

         // First access the Canvas element in HTML to reference
         canvas = document.getElementById('noiseCanvas');

         // Create a drawing context on the Canvas, in this case we are drawing in 2d
         ctx = canvas.getContext('2d');

        // Create a new image data object, with the dimensions of the canvas
        imageData = ctx.createImageData(canvasDimensionX, canvasDimensionY);

        for (let i = 0; i < imageData.data.length; i += 4)
        {
            const index = i / 4;

            //let grayscale = previousFrameData[index] || Math.floor(Math.random() * 256);
            let red = previousFrameData[index] || Math.floor(Math.random() * 256);
            let green = previousFrameData[index + 1] || Math.floor(Math.random() * 256);
            let blue = previousFrameData[index + 2] || Math.floor(Math.random() * 256);

            // Add a small random change to the grayscale value
            const change = Math.floor(Math.random() * 5) -5; // Change between -2 and +2
            //grayscale = Math.max(0, Math.min(225, grayscale + change)); // Clamp to 0-255
            red = Math.max(0, Math.min(225, red + change));
            green = Math.max(0, Math.min(225, green + change));
            blue = Math.max(0, Math.min(225, blue + change));

            

            // Store the new grayscale value for use in the next frame
            previousFrameData[index] = red;
            previousFrameData[index + 1] = green;
            previousFrameData[index + 2] = blue;

            imageData.data[i] = red; // Red
            imageData.data[i + 1] = green; // Green
            imageData.data[i + 2] = blue; // Blue
            imageData.data[i + 3] = 225;


        }

        

         ctx.putImageData(imageData, 0, 0);

         


         setTimeout(() => {
            startNoiseAnimation();
         }, 0.005);


    }

