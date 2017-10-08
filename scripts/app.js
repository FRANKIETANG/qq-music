(function () {

    fetch('https://qq-music-api-krplcorlls.now.sh') //https://qq-music-api-krplcorlls.now.sh/
        .then(res => res.json())
        .then(render)

    fetch('https://qq-music-api-krplcorlls.now.sh/top')
        .then(res => res.json())
        .then(json => json.data.topList)
        .then(renderTopList)

    fetch('https://qq-music-api-krplcorlls.now.sh/hotkey')
        .then(res => res.json())
        .then(json => json.data)
        .then(renderHotKeys)

    function render(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        renderHotlists(json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))
    }

    let search = new Search(document.querySelector('.search-view'))

    let player = new MusicPlayer(document.querySelector('.player'))

    document.querySelector('.show-player').addEventListener('click', () => {
        player.show()
    })

    function onHashChange() {
        let hash = location.hash
        console.log(hash)
        if (/^#player\?.+/.test(hash)) {
            let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
            let options = matches && matches.reduce((res, cur) => {
                let arr = cur.split('=')
                res[arr[0]] = arr[1]
                return res
            }, {})
            player.play(options)
        } else {
            player.hide()
        }
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)

    window.player = player

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
                    <img class="lazyload" data-src="${radio.picUrl}">
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
                    <img class="lazyload" data-src="${list.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${list.songListDesc}</div>
            </div>        
        `).join('')
    }

    function renderTopList(list) {
        console.log(list)
        document.querySelector('.rank-view .toplist').innerHTML = list.map(item => `
            <li class="top-item">
                <div class="top-item-media">
                    <a href="#">
                        <img class="lazyload" data-src="${item.picUrl}">
                    </a>
                </div>
                <div class="top-item-info">
                    <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                    <ul class="top-item-list">
                        ${songList(item.songList)}  
                    </ul>
                </div>
            </li>         
        `).join('')

        lazyload(document.querySelectorAll('.rank-view .toplist .lazyload'))

        function songList(songs) {
            return songs.map((song, index) => `
                <li class="top-item-song">
                    <i class="song-index">${index + 1}</i>
                    <span class="song-name">${song.songname}</span>- ${song.singername}
                </li>             
            `).join('')
        }
    }

    function renderHotKeys(data) {
        let keys = data.hotkey
        let hotKeys = shuffle(keys, 6).map(hotKey => `
            <a href="#" class="tag tag-keyword">${hotKey.k}</a>
        `).join('')

        document.querySelector('.result-tags').innerHTML = `<a href="${data.special_url}" class="tag tag-hot">${data.special_key}</a>` + hotKeys
    }

    function shuffle(array, count) {
        let re = []
        let len = Math.min(count, array.length)
        for (let i = 0; i < len; i++) {
            (function (i) {
                var temp = array
                var m = Math.floor(Math.random() * temp.length)
                re[i] = temp[m]
                array.splice(m, 1)
            })(i)
        }
        return re
    }
})()