const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

message1.textContent = ""
message2.textContent = ""

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    const url = `/weather?address=${location}`

    message1.textContent = "Fetching ..."

    fetch(url).then((response)=>{
        response.json().then((data = {})=>{
            if(data.error){
                return message1.textContent = data.error
            }
            console.log(data)
            message1.textContent = data.location
            message2.textContent = `Condition: ${data.condition}`
            message3.textContent = `Temperature  ${data.temp_c} deg. C, Min Temperaure ${data.temp_lo}, Max Temperaure ${data.temp_hi}.`
        })
    })

})  

