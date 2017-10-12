export class Slider {
    constructor(options = {}) {
        this.$el = options.el
        this.slides = options.slides
        this.interval = options.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }

    render() {
        this.$el.innerHTML = `<ul class="qq-slider-wrap"></ul>`
        this.$wrap = this.$el.firstElementChild
        this.$wrap.innerHTML = this.slides.map(slide => `
            <li class="qq-slider-item">
                <a href="${ slide.link}">
                    <img src="${ slide.image}">
                </a>                
            </li>       
        `).join('')
        this.$el.innerHTML += `
            <div class="dot">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        `
    }

    start() {
        $('#slider').swipeSlide({
            continuousScroll: true,
            speed: 3000,
            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
            firstCallback: function (i, sum, me) {
                me.find('.dot').children().first().addClass('cur');
            },
            callback: function (i, sum, me) {
                me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
            }
        })
    }
}