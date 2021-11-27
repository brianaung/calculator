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
    case '*':
      return multiply(x1, x2);
    case '/':
      return divide(x1, x2);
  }
}
