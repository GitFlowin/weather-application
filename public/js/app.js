console.log('Client side javascript file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// })

// querySelector matches the first element it finds
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// To select a specific id, use #{id}
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (e) => {
    // Prevents the browser from refreshing when we submit the form
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading Weather...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((res) => {
        res.json().then(data => {
            if (data.err) {
                messageOne.textContent = data.err;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})