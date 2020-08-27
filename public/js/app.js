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
const messageThree = document.querySelector('#message-three');
const messageFour = document.querySelector('#message-four');
const messageFive = document.querySelector('#message-five');


weatherForm.addEventListener('submit', (e) => {
    // Prevents the browser from refreshing when we submit the form
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading Weather...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';

    fetch('/weather?address=' + location).then((res) => {
        res.json().then(data => {
            if (data.err) {
                messageOne.textContent = data.err;
            } else {
                console.log(data)
                messageOne.textContent = data.location;
                messageTwo.textContent = data.temperature;
                messageThree.textContent = data.feels_like;
                messageFour.textContent = data.description;
                messageFive.textContent = data.humidity;
            }
        })
    })
})