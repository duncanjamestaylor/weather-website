const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = ""
message2.textContent = ""

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    const url = `http://localhost:3000/weather?address=${location}`

    message1.textContent = "Fetching ..."

    fetch(url).then((response)=>{
        response.json().then((data = {})=>{
            if(data.error){
                return message1.textContent = data.error
            }
            message1.textContent = data.location
            message2.textContent = `${data.condition}, ${data.temp_c} deg. C`
        })
    })

})  

