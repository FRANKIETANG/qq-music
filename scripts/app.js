import './tab.js'
import { Search } from './search.js'
import { MusicPlayer } from './music_player.js'
import { Recommend } from './recommend.js'
import { TopList } from './toplist.js'
import { hotKey }from'./hotkey.js'
import { loadingAnimate } from './helpers.js'

let recommend = new Recommend(document.querySelector('.rec-view')).launch()
let toplist = new TopList(document.querySelector('.rank-view')).launch()
let hotkey = new hotKey(document.querySelector('.result-tags')).launch()
let search = new Search(document.querySelector('.search-view'))
let player = new MusicPlayer(document.querySelector('.player'))

document.querySelector('.show-player').addEventListener('click', () => {
    player.show()
})

loadingAnimate()

onHashChange()
addEventListener('hashchange', onHashChange)

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