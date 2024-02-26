

        // Define an array of text to display
        const text = "Highly motivated and talented Software Developer and recent graduate with a strong foundation in computer science. Skilled in multiple programming languages, including Java, OCaml, and JavaScript, and experienced in developing cloud-based software, RESTful APIs, and IoT projects. Adept at collaborating with cross-functional teams to deliver high-quality results. Holds a Bachelor of Science in Computer Science from the University of Massachusetts, Boston.";

        // Split the text into words using space as the delimiter
        const texts = text.split(' ');

        const textElement = document.getElementById('text');

        // Function to display and erase text
        function displayTexts(index) {
            let displayedText = '';

            // Display texts one by one, appending each subsequent text
            for (let i = 0; i <= index; i++) {
                displayedText += texts[i] + " ";
            }

            // Display the accumulated text
            textElement.innerHTML = displayedText;

            // Calculate the timeout duration based on whether it's the last word
            const timeoutDuration = (index === texts.length - 1) ? 10000 : 300;

            // Wait for the specified duration, then erase the text and repeat the process
            setTimeout(() => {
                textElement.innerHTML = '';

                // Calculate the index of the next text, wrapping around to the beginning if necessary
                const nextIndex = (index + 1) % texts.length;
                displayTexts(nextIndex);
            }, timeoutDuration);
        }

        // Start displaying text
        displayTexts(0);