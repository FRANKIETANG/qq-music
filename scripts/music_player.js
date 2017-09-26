class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.createAudio()
    }

    createAudio() {

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
        }
    }

    onPlay(event) {
        console.log('onPlay')
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }

    onPause(event) {
        console.log('onPause')
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }

    play() {

    }

    show() {

    }

    hide() {

    }

}