function lazyload(images) {
    let imgs = [].slice.call(images)

    if('IntersectionObserver' in window){
        let observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry=>{
                if(entry.intersectionRatio>0){
                    loadImage(entry.target,()=>{
                        observer.unobserve(entry.target)
                    })
                }
            })
        },{threshold:0.01})
        imgs.forEach(img=>observer.observe(img))
    }else{
        let onscroll=throttle(function onscroll() {
            console.log(new Date)
            if (imgs.length === 0) {
                return window.removeEventListener('scroll', onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains('lazyload'))
            imgs.forEach(img => {
                if (inViewport(img)) {
                    loadImage(img)
                }
            })
        },300)   
    
        window.addEventListener('scroll', onscroll)
        window.dispatchEvent(new Event('scroll'))
    }



    //节流
    function throttle(func,wait){
        let prev, timer
        return function fn(){
            let curr = Date.now()
            let diff = curr - prev
            if(!prev||diff>=wait){
                func()
                prev = curr
            }else if(diff<wait){
                clearTimeout(timer)
                timer=setTimeout(fn,wait-diff)
            }
        }
    }

    function inViewport(img) {
        let { top, right, left, bottom } = img.getBoundingClientRect()
        let vpWidth = document.documentElement.clientWidth
        let vpHeight = document.documentElement.clientHeight
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight)
            &&
            (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }

    function loadImage(img,callback) {
        let images = new Image()
        images.src = img.dataset.src
        images.onload = function () {
            img.src = images.src
            img.classList.remove('lazyload')
            if(typeof callback === 'function') callback()
        }
    }
}