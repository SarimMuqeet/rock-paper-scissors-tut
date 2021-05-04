let userScore = 0;
let computerScore = 0;

/* caching the DOM 
    storing variables for future use instead of running the document.getElementById
    or querySelector process every single time (simply store it in a variable once and use it)
*/

//from html file - id was user-score and computer-score
//these are DOM variables: (denoted by _span)
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");


//since we gave it a class of score-board in html file
const scoreBoard_div = document.querySelector(".score-board");
//since this was stored in a <p> tag within the result class
const result_p = document.querySelector(".result > p");

// rock, paper, and scissor buttons use _div as it was stored in a div
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");






//randomize computer choice function
function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    ///to get a random object in the array:
    /* *3 wil take a number between 0 and 3 (will not ever reach 3) and 
    then need to round down to whole number (put inside floor method */
    return choices[(Math.floor(Math.random() * 3))];
}






function convert(letter) {
    if(letter === "r") 
        return "Rock";
    if(letter === "p")
        return "Paper";
    else
        return "Scissors";
}







//functions that handle win, lose, and draw scoring and result messages
function win(user, computer) {
    //need to increase the user's score by 1
    userScore++;
    /* need to update on page as well - use DOM variable
        changes the HTML text for the tag with id user-score (see line 11) to be the userScore we just updated
        (was originally 0 but text (innerHTML) of that tag will increase by 1 and be displayed 
        also - use const as userScore_span itself is not changing, but the innerHTML of it is */
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;

    //small user and computer words as subscripts 
    const userWord = "user".fontsize(3).sub();
    const compWord = "cpu".fontsize(3).sub();

    //want to show updated text on page: change innerHTML of result_p
    result_p.innerHTML = `${convert(user)}${userWord} beats ${convert(computer)}${compWord}. You win! 🔥`; 

    /*  when user wins, we want to add a class of green glow to the div the user clicked on (r, p, or s)
        - use user variable since user will be passed as either an r, p, or s depending on what you clicked
        - classList is a method that exists in the DOM - returns an array of all classes
        on the specified element (in this case, user)
        NOTE: - do not add . in front of the class as it is already assumed
    */
    document.getElementById(user).classList.add('green-glow');
    //want to remove green-flow after 1 second once it is displayed
    setTimeout(function () { document.getElementById(user).classList.remove('green-glow') }, 300);
}

function lose(user, computer) {
    //need to increase computer score by 1 - follow win function format
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const userWord = "user".fontsize(3).sub();
    const compWord = "cpu".fontsize(3).sub();
    result_p.innerHTML = `${convert(user)}${userWord} loses to ${convert(computer)}${compWord}. You lost 😢`; 

    // add red glow since user has lost
    document.getElementById(user).classList.add('red-glow');
    setTimeout(function () { document.getElementById(user).classList.remove('red-glow') }, 300);
}

function draw(user, computer) {
    // do not increase anybody's score
    const userWord = "user".fontsize(3).sub();
    const compWord = "cpu".fontsize(3).sub();
    result_p.innerHTML = `${convert(user)}${userWord} draws to ${convert(computer)}${compWord}. It's a tie.`; 

    // add gray glow for tie
    document.getElementById(user).classList.add('gray-glow');
    setTimeout(function () { document.getElementById(user).classList.remove('gray-glow') }, 300);
}








//comparing user choice to cpu generated choice
function game(userChoice) {
    const computerChoice = getComputerChoice();

    // similar to if and else if statements but more efficient for branching
    switch(userChoice + computerChoice) {
        /* cases where user wins */
        case "rs":
        case "pr":
        case "sp":
            ///give choices as parameters so user can see what they and the comp selected
            win(userChoice, computerChoice);
            //always need a break to escape the loop
            break;
        
        /* cases where user loses */
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;

        /* cases with ties between user and cpu */
        case "rr":
        case "pp":
        case "ss":
            draw (userChoice, computerChoice);
            break;


    }

}





//main function which waits for user click and then calls on game function accordingly
function main() {    
    //arrow function versions (for fun) and space
    rock_div.addEventListener('click', () => game("r"));
    
    paper_div.addEventListener('click', () => game("p"));
    
    scissors_div.addEventListener('click', () => game("s"));    

}



main();




