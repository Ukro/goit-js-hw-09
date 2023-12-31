import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('[type="submit"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  let firstDelay = Number(inputDelay.value);
  let delayStep = Number(stepDelay.value);
  let amountNumber = Number(amount.value);

  if (firstDelay<0 || delayStep<0 || amountNumber<=0) 
  {
    alert ("Введіть дотатні значення");
    inputDelay.value="";
    stepDelay.value="";
    amount.value="";
    breack;
  }
  submitBtn.disabled = 'true';
  console.log(firstDelay, delayStep, amountNumber);

  for (let position = 1; position <= amountNumber; position++) {
    console.log(position, firstDelay);
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}