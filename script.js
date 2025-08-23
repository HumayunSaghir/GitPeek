// Target your elements.
let form = document.querySelector('form')
let myInput = document.querySelector('.myInput')
let submitButton = document.querySelector('.submitButton')
let userName = document.querySelector('.userName')
let followers = document.querySelector('.followers')
let following = document.querySelector('.following')
let myImage = document.querySelector('.myImage')
let profileUrl = document.querySelector('.profileUrl')


let mainUrlChunk = "https://github.com/"
let findUrl = "https://github.com/"
let orignalUrlChunk = "https://api.github.com/users/"
let completeUrl = "https://api.github.com/users/"
let urlPart = undefined
let data = undefined

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    urlPart = myInput.value
    findUrl = findUrl + urlPart
    completeUrl = completeUrl + urlPart

    // Now send request to the API
    let xhr = new XMLHttpRequest()
    xhr.open('GET', completeUrl)
    
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState)
        // It means data has been recieved.
        if(xhr.readyState === 4){
            data = JSON.parse(this.responseText)
            return
        }
    }

    xhr.send()
    
    // Now inject your data into the html page.
    setTimeout(function(){
        
        if(xhr.status === 404 || xhr.status === 500 || xhr.status === 0){
            userName.innerText = "User Not Found!"
            followers.innerText = ""
            following.innerText = ""
            profileUrl.innerText = ""
            myInput.value = ""
            completeUrl = orignalUrlChunk
            findUrl = mainUrlChunk
            myImage.setAttribute("src", "https://images.icon-icons.com/1369/PNG/512/-account-circle_89831.png")
            return
        }

        else{
            myImage.setAttribute("src", data.avatar_url)
            userName.innerText = `Name: ${data.name}`
            followers.innerText = `Followers: ${data.followers}`
            following.innerText = `Following: ${data.following}`
            profileUrl.innerText = `Visit Profile: ${findUrl}`
            profileUrl.setAttribute('href',findUrl)
            myInput.value = ""
            completeUrl = orignalUrlChunk
            findUrl = mainUrlChunk
        }

    }, 2000)

})