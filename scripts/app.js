(function(){

    fetch('../json/rec.json')
        .then(res => res.json())
        .then(render)

    function render(json){
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        renderHotlists(json.data.songList)
    }

    function renderSlider(slides) {
        slides = slides.map(slide => {
            return { link: slide.linkUrl, image: slide.picUrl }
        })
        new Slider({
            el: document.querySelector('#slider'),
            slides
        })        
    }

    function renderRadios(radios) {
        document.querySelector('.radios .list').innerHTML = radios.map(radio => `
            <div class="list-item">
                <div class="list-madia">
                    <img src="${radio.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${radio.Ftitle}</div>
            </div>        
        `).join('')
    }

    function renderHotlists(hotlists) {
        document.querySelector('.hotlists .list').innerHTML = hotlists.map(list => `
            <div class="list-item">
                <div class="list-madia">
                    <img src="${list.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${list.songListDesc}</div>
            </div>        
        `).join('')        
    }

})()