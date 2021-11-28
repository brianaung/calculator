// TODO: 
// add keyboard support
// limit the number entry so display does not break
// fix formatting of some decimal answers (do not round, format when answer too long)
// add error messages for performing illegal operations such as dividing by zero
// fix delete button behavior - not clearing history when performed right after operation
// fix equal button behaviro - updating numbers when no entry

let numArr = new Array(2).fill('0');
let currIndex = 0; // store as first num
let operator = '';

const displayCurr = document.querySelector('.display-current');
const displayHis = document.querySelector('.display-history');

const numBtns = document.querySelectorAll('.number');
const opBtns = document.querySelectorAll('.operator');
const eqBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.delete-all');
const delBtn = document.querySelector('.delete-one');

/* add event listeners for all the buttons */
numBtns.forEach(nBtn => { nBtn.addEventListener('click', getNum) });
opBtns.forEach(oBtn => { oBtn.addEventListener('click', getOp) });
clearBtn.addEventListener('click', clearDisplay);
delBtn.addEventListener('click', deleteDisplay);
eqBtn.addEventListener('click', showResult);


let consecutiveOp = false;
/* store and display the number that user is pressing. */
function getNum(e) {
  if (numArr[currIndex] === '0') {
      numArr[currIndex] = e.target.textContent;
  } else {
    numArr[currIndex] += e.target.textContent;
  }
  displayCurrent(numArr[currIndex]);
  consecutiveOp = false;
}

/* store the operator. new number entry after this should be stored as second number */
function getOp(e) {
  operator = e.target.textContent;

  if (!consecutiveOp) {
    /* already have 2 numbers, perform operation on them and update the num array */
    if (currIndex === 1) {
      numArr[0] = operate(operator, parseInt(numArr[0]), parseInt(numArr[1]));
      numArr[currIndex] = '0';
      currIndex = 0;
    }
    displayCurrent(numArr[currIndex]);
    currIndex++;
  }   
  /* when spamming another/same operator without entering new num,
     only update operator not the num arr */
  displayHistory(numArr[currIndex - 1] + operator);
  consecutiveOp = true;
}

/* perform operation on the existing numbers using the operator,
   then update the num array */
function showResult() {
  let res = operate(operator, parseInt(numArr[0]), parseInt(numArr[1]))

  /* updating the display screen */
  displayCurrent(res);
  displayHistory(numArr[0] + operator + numArr[1]);

  /* update the num array to store result as the first num */
  numArr[0] = res.toString();
  numArr[1] = '0';
 
  /* reset the index of the num array */
  currIndex = 0;
}

function displayCurrent(content) {
  displayCurr.textContent = content;  
}

function displayHistory(content) {
  displayHis.textContent = content;
}

function clearDisplay() {
  displayCurr.textContent = '0';
  displayHis.textContent = '';
  numArr.fill('0');
  currIndex = 0;
}

function deleteDisplay() {
  displayCurr.textContent = displayCurr.textContent.slice(0, -1);
  if (displayCurr.textContent === '') {
    displayCurr.textContent = '0';
  }
  numArr.fill('0');
}

function add(x1, x2) {
  return x1 + x2;
}

function subtract(x1, x2) {
  return x1 - x2;
}

function multiply(x1, x2) {
  return x1 * x2;
}

function divide(x1, x2) {
  return x1 / x2;
}

function operate(operator, x1, x2) {
  switch (operator) {
    case '+':
      return add(x1, x2);
    case '-':
      return subtract(x1, x2);
    case '×':
      return multiply(x1, x2);
    case '÷':
      return divide(x1, x2);
    case '':
      return x1;
  }
}
