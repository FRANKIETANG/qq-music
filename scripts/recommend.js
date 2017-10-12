import { RECOMMEND_URL } from './contants.js'
import { lazyload } from './lazyload.js'
import { Slider } from './slider.js'
import { loadingDone } from './helpers.js'

export class Recommend {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(RECOMMEND_URL)
            .then(res => res.json())
            .then(json => this.render(json))
            .then(() => loadingDone())
        return this
    }

    render(json) {
        this.renderSlider(json.data.slider)
        this.renderRadios(json.data.radioList)
        this.renderHotlists(json.data.songList)
        lazyload(this.$el.querySelectorAll('.lazyload'))
    }

    renderSlider(slides) {
        new Slider({
            el: document.querySelector('#slider'),
            slides: slides.map(slide => {
                return { link: slide.linkUrl, image: slide.picUrl.replace('http://', 'https://') }
            })
        })
    }

    renderRadios(radios) {
        this.$el.querySelector('.radios .list').innerHTML = radios.map(radio => `
            <div class="list-item">
                <div class="list-madia">
                    <img class="lazyload" data-src="${radio.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${radio.Ftitle}</div>
            </div>        
        `).join('')
    }

    renderHotlists(hotlists) {
        this.$el.querySelector('.hotlists .list').innerHTML = hotlists.map(list => `
            <div class="list-item">
                <div class="list-madia">
                    <img class="lazyload" data-src="${list.picUrl}">
                    <span class="icon icon_play"></span>
                </div>
                <div class="list-title">${list.songListDesc}</div>
            </div>        
        `).join('')
    }
}