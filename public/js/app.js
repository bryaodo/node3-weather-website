console.log('client side js file loaded')


fetch('http://localhost:3000/weather?address=boston' ).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        }
        else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loadMessage = document.querySelector('#message-1')
const displayMessage = document.querySelector('#message-2') 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    loadMessage.textContent = 'loading...'
    displayMessage.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            loadMessage.textContent = data.location
            displayMessage.textContent = data.forecast
        }
    })
})

})