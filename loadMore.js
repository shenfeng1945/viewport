//预加载,让一定会显示的图片提前下载，例如菊花图
// let loadingImage = new Image()
// loadingImage.src = "https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif"
let button = document.querySelector('.button')
let olInsert = document.querySelector('.introduce > ol')
let n = 1
//标记作用，判断插入的data(JSON)是否为最后一张。
let hasNext = true
//标记作用，在一个请求未成功之前，不在发起另外一个请求。
let loadingImage = false
button.onclick = loadMore
 function loadMore() {
     if(! hasNext){return}
     if(loadingImage){return}
    let request = new XMLHttpRequest()
    request.open('GET', `./JSON/page-${n}.html`)
    //图片加载失败后。也会进行下一次请求。
    request.onerror = function(){loadingImage = false}
    request.onload = function () {
        loadingImage = false
        n += 1
        let response = request.responseText
        let data = window.JSON.parse(response)
        for (var i = 0; i < data.content.length; i++) {
            let liList = `
        <li><img src="https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif" data-src=${data.content[i].url}><h3>${data.content[i].h3}</h3><p>${data.content[i].p}</p></li>
       `
            olInsert.insertAdjacentHTML('beforeend', liList)
        }
        if (data.hasNext === false) {
            hasNext = false
            // button.disabled = true
            button.textContent = '没有更多了'
        }
    }
    loadingImage = true
    request.send()
}
window.onscroll = function () {
   if(toUp(button)){
       loadMore()
   }
    let images = document.querySelectorAll('img[data-src]')
    for(let i=0;i<images.length;i++){
        if(toUp(images[i])){
            //不能直接用images[i].data-src赋值。
            images[i].src = images[i].getAttribute('data-src')
            //图片加载成功后，删除属性data-src，使下一次的images少一张。起着优化作用。
            images[i].removeAttribute('data-src')
        }
    }
 }
//判断一个element是否出现在页面里。(element从下到上)
function toUp(element){
   let buttonTop = element.getBoundingClientRect().top
    let viewHeight = document.documentElement.clientHeight
    if (viewHeight > buttonTop + 60) {
        return true
    }else{
        return false
    }

}
