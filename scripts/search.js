class Search {
    constructor(el) {
        this.$el = el
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.perpage = 20
        this.nomore = false
        this.fetching = false
        this.$input = this.$el.querySelector('#search')
        this.$cancel = this.$el.querySelector('.search-bar-tip-text')
        this.$delete = this.$el.querySelector('.icon-delete')
        this.$songs = this.$el.querySelector('.song-list')
        this.$hotKey = this.$el.querySelector('.hot-keys')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        window.addEventListener('click', this.onClick.bind(this))
        window.addEventListener('scroll', this.onScroll.bind(this))
    }

    onClick(e) {
        if (e.target === this.$input) {
            this.$cancel.classList.remove('hide')
        }
        if (e.target === this.$cancel) {
            this.$cancel.classList.add('hide')
            this.$delete.classList.add('hide')
            this.reset()
            this.$hotKey.style.display = 'block'
            this.$input.value = ''
        }
        if (e.target === this.$delete) {
            this.$input.value = ''
            this.$delete.classList.add('hide')
        }
    }

    onKeyUp(event) {
        console.log(this)
        let keyword = event.target.value.trim() //trim() 前后空格去掉
        if (keyword) {
            this.$delete.classList.remove('hide')
        } else {
            this.$delete.classList.add('hide')
        }
        if (!keyword) return this.reset()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }

    onScroll(event) {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }

    reset() {
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.nomore = false
        this.$songs.innerHTML = ''
    }

    search(keyword, page) {
        if (this.fetching) return
        this.keyword = keyword
        this.loading()
        fetch(`https://qq-music-api-krplcorlls.now.sh/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data.song.list
            })
            .then(songs => {
                this.append(songs)
                this.$hotKey.style.display = 'none'
            })
            .then(() => this.done())
            .catch(() => this.fetching = false)
    }

    append(songs) {
        `#player?artist=David Guetta Justin Bieber&songid=202712996&songname=2U&albummid=0008u6bN048czH&duration=194`
        let html = songs.map(song => {
            let artist = song.singer.map(s => s.name).join(' ')
            return `
            <a class="song-item" href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
            </a>        
        `}).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }

    loading() {
        this.fetching = true
        this.$el.querySelector('.search-loading').classList.add('show')
    }

    done() {
        this.fetching = false
        if (this.nomore) {
            this.$el.querySelector('.loading-icon').style.display = 'none'
            this.$el.querySelector('.loading-text').style.display = 'none'
            this.$el.querySelector('.loading-done').style.display = 'block'
            this.$el.querySelector('.search-loading').classList.add('show')
        } else {
            this.$el.querySelector('.search-loading').classList.remove('show')
        }
    }

}