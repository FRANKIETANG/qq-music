import { LyricsPlayer } from './lyrics_player.js'
import { ProgressBar } from './progress_bar.js'
import { songUrl, lyricsUrl, albumCoverUrl } from './helpers.js'

export class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
        this.progress = new ProgressBar(this.$el.querySelector('.progress'), 0, true)
        this.createAudio()
    }

    createAudio() {
        this.$audio = document.createElement('audio')
        this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
        this.$audio.onended = () => {
            this.$audio.play()
            this.lyrics.restart()
            this.progress.restart()
        }
        document.body.appendChild(this.$audio)
    }

    handleEvent(event) {
        let target = event.target
        switch (true) {
            case target.matches('.icon-play'):
                this.onPlay(event)
                break
            case target.matches('.icon-pause'):
                this.onPause(event)
                break
            case target.matches('.icon-list'):
                this.hide()
                break
        }
    }

    onPlay(event) {
        console.log('onPlay')
        this.$audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }

    onPause(event) {
        console.log('onPause')
        this.$audio.pause()
        this.lyrics.pause()
        this.progress.pause()
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }

    play(options = {}) {
        if (!options) return

        this.$el.querySelector('.song-name').innerText = decodeURIComponent(options.songname)
        this.$el.querySelector('.song-artist').innerText = decodeURIComponent(options.artist)
        this.progress.reset(options.duration)

        let url = albumCoverUrl(options.albummid)
        this.$el.querySelector('.album-cover').src = url
        this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`
        this.$el.querySelector('.player-container').style.background = `rgba(34, 46, 33, 0.32)`

        if (options.songid) {
            this.songid = options.songid
            this.songmid = options.songmid
            this.$audio.src = songUrl(this.songmid)
            fetch(lyricsUrl(this.songid))
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text =>
                    this.lyrics.reset(text),
                    this.$el.querySelector('.progress-bar-progress').style.transform = `translateX(-100%)`,
                    this.$el.querySelector('.progress-elapsed').innerText = `0:00`,
                    this.$el.querySelector('.player-container').style.background = `rgba(34, 46, 33, 0.32)`,
                    this.$el.querySelector('.icon-action').classList.add('icon-play'),
                    this.$el.querySelector('.icon-action').classList.remove('icon-pause')
                )
                .catch(() => { })
        }
        this.show()
    }

    show() {
        this.$el.classList.add('show')
        document.body.classList.add('noscroll')
    }

    hide() {
        this.$el.classList.remove('show')
        document.body.classList.remove('noscroll')
    }

}