// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const snackbar = document.querySelector(".form")
console.log(snackbar);

snackbar.addEventListener("submit", function (event) {
    event.preventDefault();

    const delay = parseInt(this.elements.delay.value);
    const state = document.querySelector('[name="state"]:checked').value

    const snackbarPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === "fulfilled") {
        resolve(delay);
        } else {
        reject(delay);
        }
    }, delay);
    });


    snackbarPromise.then((delay) => {
    iziToast.success({
        title: 'Fulfilled promise',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
    });
    }).catch((delay) => {
    iziToast.error({
        title: 'Rejected promise',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
    });
    });
});
