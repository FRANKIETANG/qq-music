import { LYRICS_URL, SEARCH_URL } from './contants.js'

export function lyricsUrl(songid){
    return `${LYRICS_URL}?id=${songid}`
}

export function songUrl(id) {
    return `http://isure.stream.qqmusic.qq.com/C100${id}.m4a?fromtag=32`
}

export function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}

export function searchUrl(keyword, page = 1){
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}

export function loadingAnimate(){
    document.querySelector('.loading-box').style.display = 'block'
    document.querySelector('.rec-view').style.display = 'none'
}

export function loadingDone(){
    document.querySelector('.loading-box').style.display = 'none'
    document.querySelector('.rec-view').style.display = 'block'
}