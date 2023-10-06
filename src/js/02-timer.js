import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countingDown = 1000;
const markers = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  timer: {
    container: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};
let isBtnDisabled = null; //button niekatywny
let intervalId = null;
let currentTime = null;

const options = {
  //FLATPICKR
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFlatPicker(selectedDates);
    console.log(selectedDates[0]);
  },
};

setBtnDisabled(true);
flatpickr(markers.input, options); // wstawia aktualną datę i czas
markers.btn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  setBtnDisabled(true);
  startTimer(currentTime);
}
function onCloseFlatPicker(selectedDates) {
  const diffTime = selectedDates[0].getTime() - Date.now();
  const isFuture = diffTime > 0;

  if (isFuture) {
    currentTime = diffTime;
    setBtnDisabled(false);
  } else {
    currentTime = 0;
    setBtnDisabled(true);
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
      clickToClose: true,
      timeout: 10000,
    });
  }
}

function startTimer(ms) {
  currentTime = ms;
  updateTimer(ms);
  intervalId = setInterval(() => {
    const isFinish = ticTimer();

    if (isFinish) clearInterval(intervalId);
  }, countingDown);
}

function ticTimer() {
  currentTime -= countingDown;
  if (currentTime <= 0) return true;
  updateTimer(currentTime);
  return false;
}

function updateTimer(ms) {
  currentTime = ms;
  updateTimerElements(convertMs(ms));
}

function updateTimerElements({ days, hours, minutes, seconds }) {
  markers.timer.days.textContent = addLeadingZero(days);
  markers.timer.hours.textContent = addLeadingZero(hours);
  markers.timer.minutes.textContent = addLeadingZero(minutes);
  markers.timer.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setBtnDisabled(flag) {
  isBtnDisabled = flag;
  markers.btn.disabled = flag;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
