const DEFAULT_NUMBER_OF_ROUNDS = 10;
const highestNumber = 6;
const slimMode= true;

function generateRandomNumber() {
  const randomNumber = Math.random() * highestNumber
  //console.log('Random number is', randomNumber);
  return Math.ceil(randomNumber);
}

function markMinMaxNumber(currentNumber) {
  if (currentNumber === 1) {
    return slimMode ? '' : '#'
  } else if (currentNumber === 6) {
    return slimMode ? '' : '*'
  } else return ''
}

function getNumberOfRounds() {
  const rounds = document.getElementById("numberOfRounds");
  if (rounds && rounds.value) {
    return Number(rounds.value);
  } else return DEFAULT_NUMBER_OF_ROUNDS;
}


function getResults() {

  const numberOfRoundsToPlay = getNumberOfRounds();
  document.getElementById('result').innerHTML = ''

  const runningDateTime = new Date().toISOString()
  console.log(runningDateTime, 'Rolling the dice');

  let resultNumbers = '';
  let sum = 0;
  let currentNumber = 0;
  for (let counter = 0; counter < numberOfRoundsToPlay; counter++) {
    currentNumber = generateRandomNumber();
    resultNumbers += currentNumber + markMinMaxNumber(currentNumber) + (!slimMode && counter < numberOfRoundsToPlay - 1 ? '---' : ' ')
    //document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + resultNumbers
    sum += currentNumber
  }

  document.getElementById('result').innerHTML = 'Die gewürfelten Zahlen sind <br>' + resultNumbers + '<br>Die Summe der Zahlen ist: ' + sum;
  console.log(new Date().toISOString(), 'Finished Rolling the dice');

}

// Use this on JSFiddle to add click event listener
// document.getElementById('rollButton').addEventListener('click', getResults)