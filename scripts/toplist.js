import { TOPLIST_URL } from './contants.js'
import { lazyload } from './lazyload.js'

export class TopList {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(TOPLIST_URL)
            .then(res => res.json())
            .then(json => this.render(json.data.topList))
        return this
    }

    render(list) {
        this.$el.querySelector('.rank-view .toplist').innerHTML = list.map(item => `
            <li class="top-item">
                <div class="top-item-media">
                    <a href="#">
                        <img class="lazyload" data-src="${item.picUrl}">
                    </a>
                </div>
                <div class="top-item-info">
                    <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                    <ul class="top-item-list">
                        ${this.songList(item.songList)}  
                    </ul>
                </div>
            </li>         
        `).join('')

        lazyload(this.$el.querySelectorAll('.lazyload'))
    }

    songList(songs) {
        return songs.map((song, index) => `
            <li class="top-item-song">
                <i class="song-index">${index + 1}</i>
                <span class="song-name">${song.songname}</span>- ${song.singername}
            </li>             
        `).join('')
    }

}