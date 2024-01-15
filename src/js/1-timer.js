// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;

document.addEventListener("DOMContentLoaded", function () {
    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            userSelectedDate = selectedDates[0];

            const currentDate = new Date();
            if (userSelectedDate < currentDate) {
                iziToast.error({
                    title: "Error",
                    message: "Please choose a date in the future"
                });
                document.querySelector("button[data-start]").disabled = true;
            } else {
                document.querySelector("button[data-start]").disabled = false;
            }
        },
    };

    flatpickr("#datetime-picker", options);
    document.querySelector("button[data-start]").addEventListener("click", startTimer);
});

function startTimer() {
    this.disabled = true;

    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            displayTimerValues(0, 0, 0, 0);
            iziToast.success({
                title: "Success",
                message: "Countdown Timer Finished!",
            });
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            displayTimerValues(days, hours, minutes, seconds);
        }
    }

    function displayTimerValues(days, hours, minutes, seconds) {
        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    }

    function addLeadingZero(value) {
        return value < 10 ? `0${value}` : value;
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
