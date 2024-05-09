async function answerQuestion() {
    // Get user input for context and question
    const context = document.getElementById('context').value;
    const question = document.getElementById('question').value;

    // Check if context and question are provided
    if (context.trim() === '' || question.trim() === '') {
        alert("Please provide both context and question.");
        return;
    }

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    // Load the Q&A model
    const model = await qna.load();

    // Get the answer
    const answers = await model.findAnswers(question, context);

    // Hide loading spinner
    document.getElementById('loading').style.display = 'none';

    // Display the answer
    const answersElement = document.getElementById('answers');
    if (answers.length > 0) {
        const answerElement = document.createElement('div');
        answerElement.classList.add('alert', 'alert-success', 'mt-3', 'd-flex', 'justify-content-between', 'align-items-center');
        answerElement.innerHTML = `
            <div>${answers[0].text}</div>
            <button type="button" class="btn-close" aria-label="Close" onclick="deleteAnswer(this)"></button>
        `;
        answersElement.appendChild(answerElement);
    } else {
        const noAnswerElement = document.createElement('div');
        noAnswerElement.classList.add('alert', 'alert-danger', 'mt-3');
        noAnswerElement.innerText = "Sorry, I couldn't find an answer.";
        answersElement.appendChild(noAnswerElement);
    }
}

function deleteAnswer(button) {
    button.parentNode.remove();
}
