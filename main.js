let array = {}
$('.banner .controls').on('click','li',function (e) {
    let li = e.currentTarget
    let $li = $(li)
    let index = $li.index()
    go(index)
    array = {"index":index}
})
let current = 0
setInterval(function () {
   let nextcurrent = current + 1
   if(array.index !== undefined){nextcurrent = array.index + 1} 
   if(nextcurrent === 4){nextcurrent = 0}
    go(nextcurrent)
    current = nextcurrent
    array.index = undefined
},3000)

function go(index) {
    $('.banner .controls li').eq(index).addClass('active').siblings('.active').removeClass('active')
    let width = $('.banner .window').width()
    $('.banner .window ol').css({
        transform: 'translateX('+(-width*index)+'px)'
    })
}