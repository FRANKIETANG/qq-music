import { HOTKEY_URL } from './contants.js'

export class hotKey {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(HOTKEY_URL)
            .then(res => res.json())
            .then(json => this.render(json.data))
        return this
    }

    render(data) {
        let keys = data.hotkey
        let hotKeys = this.shuffle(keys, 6).map(hotKey => `
            <a href="#" class="tag tag-keyword">${hotKey.k}</a>
        `).join('')

        this.$el.innerHTML = `<a href="${data.special_url}" class="tag tag-hot">${data.special_key}</a>` + hotKeys
    }

    shuffle(array, count) {
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

}