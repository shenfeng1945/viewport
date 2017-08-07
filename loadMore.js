let button = document.querySelector('.button')
let olInsert = document.querySelector('.introduce > ol')
let n = 1
button.onclick = function () {
    let request = new XMLHttpRequest()
    request.open('GET', `./JSON/page-${n}.html`)
    request.onload = function () {
        n +=1
        let response = request.responseText
        let data = window.JSON.parse(response)
        console.log(data)
        console.log(response)
        for (var i = 0; i<data.content.length; i++) {
            let liList = `
        <li><img src=${data.content[i].url}><h3>${data.content[i].h3}</h3><p>${data.content[i].p}</p></li>
       `
            olInsert.insertAdjacentHTML('beforeend', liList)
        }
        if (data.hasNext === false) {
            button.disabled = true
            button.textContent = '没有更多了'
        }
    }
    request.send()
}
window.onscroll = function(){
    let buttonTop = button.getBoundingClientRect().top
    let viewHeight = document.documentElement.clientHeight
    if(viewHeight > buttonTop + 60){
        button.click()
    }
}