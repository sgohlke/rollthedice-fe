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

async function getRandomNumbers(numberOfRoundsToPlay) {
    const numbersResponse = await fetch(`https://rollthedice-api.deno.dev/random/${numberOfRoundsToPlay}`)
    const numbersAsJSON = await numbersResponse.json()
    return numbersAsJSON.numbers
}


async function getResults() {

  const numberOfRoundsToPlay = getNumberOfRounds();
  document.getElementById('result').innerHTML = ''

  const runningDateTime = new Date().toISOString()
  console.log(runningDateTime, 'Rolling the dice');

  let resultNumbers = '';
  let sum = 0;
  let currentNumber = 0;

  const randomNumbers = await getRandomNumbers(numberOfRoundsToPlay)
  for (let counter = 0; counter < randomNumbers.length; counter++) {
    currentNumber = randomNumbers[counter];
    resultNumbers += currentNumber + markMinMaxNumber(currentNumber) + (!slimMode && counter < randomNumbers.length - 1 ? '---' : ' ')
    //document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + resultNumbers
    sum += currentNumber
  }

  document.getElementById('result').innerHTML = 'Die gewürfelten Zahlen sind <br>' + resultNumbers + '<br>Die Summe der Zahlen ist: ' + sum;
  console.log(new Date().toISOString(), 'Finished Rolling the dice');

}

// Use this on JSFiddle to add click event listener
// document.getElementById('rollButton').addEventListener('click', getResults)