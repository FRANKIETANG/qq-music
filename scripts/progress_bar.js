export class ProgressBar {
    constructor(el, duration, start) {
        this.$el = el
        this.elapsed = 0 //已播放时间
        this.duration = duration || 0 //总时间
        this.progress = 0 // elapsed/duration
        this.render()
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('.progress-elapsed')
        this.$duration = this.$el.querySelector('.progress-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)
        if(start) this.start()
    }

    start() {
        this.intervalId = setInterval(this.update.bind(this), 50)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    update() {
        console.log('update')
        if (this.elapsed >= this.duration) this.reset()
        this.elapsed += 0.05
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }

    reset(duration) {
        this.pause()
        this.elapsed = 0
        this.progress = 0
        if (duration) {
            this.duration = +duration //+ 变成一个数字
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }

    restart() {
        this.reset()
        this.start()
    }    

    render() {
        this.$el.innerHTML = `
            <div class="progress-time progress-elapsed"></div>
                <div class="progress-bar">
                    <div class="progress-bar-progress"></div>
                </div>
            <div class="progress-time progress-duration"></div>          
        `
    }

    formatTime(seconds) {
        let mins = Math.floor(seconds / 60)
        let secs = Math.floor(seconds % 60)
        if (mins < 10) mins = '0' + mins
        if (secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }
}