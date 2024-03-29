import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.6.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio'
const refs = {
  form: document.querySelector('form.form'),
};

refs.form.addEventListener('submit', onSubmitForm);

function getFormData(formRef) {
  return [...formRef.elements]
    .filter(it => it.hasAttribute('name'))
    .reduce(
      (acc, it) => ({
        ...acc,
        [it.getAttribute('name')]: Number(it.value),
      }),
      {}
    );
}

function onSubmitForm(e) {
  e.preventDefault();
  const { delay, step, amount } = getFormData(refs.form);

  for (let i = 0; i < amount; i++) {
    const promise =
      i === 0
        ? createPromise(i + 1, delay)
        : createPromise(i + 1, delay + i * step);
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

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
