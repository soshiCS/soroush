function askQuestion(question) {
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        const answerDisplay = document.getElementById('answer-display');
        answerDisplay.innerText = data.answer;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
