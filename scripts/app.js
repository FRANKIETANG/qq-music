(function(){

    let slider = new Slider({
        el: document.querySelector('#slider'),
        slides: [
            { link: '#1', image: './images/fangdan.jpg' },
            { link: '#2', image: './images/alin.jpg' },
            { link: '#3', image: './images/lrh.jpg' },
            { link: '#4', image: './images/luhan.jpg' },
            { link: '#5', image: './images/tong.jpg' }
        ]
    })

    window.slider = slider

})()