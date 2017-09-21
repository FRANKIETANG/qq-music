class Slider {
    constructor(options = {}) {
        this.$el = options.el
        this.slides = options.slides
        this.interval = options.interval || 3000
        this.render()
        this.start()
    }

    render() {
        this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
        this.$wrap = this.$el.firstElementChild
        this.$wrap.style.width = `${this.slides.length * 100}%`
        this.$wrap.innerHTML = this.slides.map(slide => `
            <div class="qq-slider-item">
                <a href="${ slide.link }">
                    <img src="${ slide.image }">
                </a>                
            </div>       
        `).join('')
    }

    start() {
        setInterval(this.next.bind(this), this.interval)
    }

    next() {
        console.log('next')
    }
}