  
//question database
const STORE = [
    {
      question: "What led to the movie, TOP DOG, being criticized at release",
      answers: [
        "Reno, the dog, was not the same as the promotional canine",
        "Time and budget concerns led to obvious outtakes being left in for time",
        "The movie was delayed 8 month after original release date",
        "It was released just 9 days after the Oklahoma City Bombing"
      ],
      correctAnswer: "It was released just 9 days after the Oklahoma City Bombing",
      answerExplaination: "This movie about a KungFu Cop and his loveable Dog was supposed to be the next Turner and Hooch"
    },
    {
      question: 'What "E.T. ripoff", according to critics was released in 1988?',
      answers: [
        "They Live",
        "Mac and Me",
        "Critters",
        "My Little Green Friend"
      ],
      correctAnswer: "Mac and Me",
      answerExplaination: "The movie was also criticized for its choice of alien due to it being creepy to its target audience"
    },
    {
      question: "D.J. Pooh directed one of the lowest-rated comedies on Rotten Tomatoes:",
      answers: [
        "3 Strikes",
        "Mallrats",
        "The Pacifier",
        "The Crypt Keeper"
      ],
      correctAnswer: "3 Strikes",
      answerExplaination: "Pooh was famously credited with co-writing the cult classic movie, Friday"
    },
    {
      question: `"You're Tearing Me Apart Lisa!" is just one of the iconic quotes from this seriously spoofed cult classic by Tommy Wiseau`,
      answers: [
        "Cold Moon",
        "Best F(r)iends",
        "The Room",
        "Big Shark"
      ],
      correctAnswer: "The Room",
      answerExplaination: "oh Hai Mark"
    },
    {
      question:
      "Which is a real Jaws the movie Sequel?",
      answers: [
        "Jaws: Stay out of the Water",
        "Jaws: The Last Wake",
        "Jaws: Amity Island",
        "Jaws: The Revenge"
      ],
      correctAnswer:
        "Jaws: The Revenge",
      answerExplaination: `The New York Times explained Jaws 3-D as "It's like watching someone make regular raids on a refrigerator in search of midnight snacks"`
    },
    {
      question:
      `Who is the Goblin King in the movie Labyrinth?`,
      answers: [
        "Jared Leto",
        "Elton John",
        "David Bowie",
        "Robert Redford"
      ],
      correctAnswer:
        "David Bowie",
      answerExplaination: "Where is Toby Now!?"
    },
     
  ];
  
  //variables for score and question number data
  let score = 0;
  let questionNumber = 0;
  
  //render a question
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();      
      finalScore();
      $('.questionNumber').text(6);
    }
  }
  
  //increases the score value in increments of 1
  function updateScore() {
    score++;
    $('.score').text(score);
  }
  
  //increases the question number value in increments of 1
  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  
  //a reset for score and question number (triggered on restart)
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  
  //quiz ignition function
  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.hideMe').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //function handleds submitted answer and checks against STORE //correctAnswer 
  function submitAnswer() {
    $('.movieBox').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //creates the html for question (as a form)
  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" type="radio" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span><br>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  
  //results from a correct answer
  function correctAnswer() {
    $('.response').html(
      `<h2>Correct!</h2>
      <input type="image" class="images" src="images/correctAnswer.jpg" alt="smiling popcorn box character">
        <p class="resultText">Nice one!</p>
        <p class="extraText">${STORE[questionNumber].answerExplaination}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //results from an incorrect answer
  function wrongAnswer() {
    $('.response').html(
      `<h2>Oops sorry</h2>
      <input type="image" class="images" src="images/wrongAnswer.jpg" alt="frowning potato cartoon character">
      <p class="resultText">The correct answer is:
      <br>${STORE[questionNumber].correctAnswer}</br></p>
      <p class="extraText">${STORE[questionNumber].answerExplaination}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //function allows for next question to be generated in quiz
  function nextQuestion() {
    $('.movieBox').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //handles final results (score), and generates a selection of feedback
  function finalScore() {
    $('.results').show();
    $('.hideMe').hide();
  
    const great = [
      'Wait What!?',
      'You are a true Movie Guru'
      ];
  
    const good = [
      "As Expected!!!",
      "Brush up and try again"
    ];
  
    const bad = [
      "Have you ever heard of VHS?",
      'You can have a do over, I wont tell'
    ];
  
    if (score >= 6) {
      array = great;
    } else if (score <=5 && score >= 3) {
      array = good;
    } else {
      array = bad;
    }
    return $('.results').html(
      `<h2>${array[0]}</h2>
      <input type="image" class="images" src="images/ResultsGood.png" alt="smiling movie candy characters marching">
          <h3>Your score is ${score} /6</h3>
          <p class="resultText">${array[1]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  
  //function allows users to restart the quiz 
  function restartQuiz() {
    $('.movieBox').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //This runs each of the functions of the quiz
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);