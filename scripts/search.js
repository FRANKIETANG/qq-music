class Search {
    constructor(el) {
        this.$el = el
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.perpage = 20
        this.nomore = false
        this.fetching = false
        this.history = []
        this.$input = this.$el.querySelector('#search')
        this.$cancel = this.$el.querySelector('.search-bar-tip-text')
        this.$delete = this.$el.querySelector('.icon-delete')
        this.$songs = this.$el.querySelector('.song-list')
        this.$hotKey = this.$el.querySelector('.hot-keys')
        this.$history = this.$el.querySelector('.record-keys')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        window.addEventListener('click', this.onClick.bind(this))
        window.addEventListener('scroll', this.onScroll.bind(this))

        this.HISTORY_KEY = 'frankie_search_history'
        this.history = localStorage.getItem(this.HISTORY_KEY) ? localStorage.getItem(this.HISTORY_KEY).split(',') : []
    }

    addHistory(keyword) {
        console.log("add:" + keyword)
        let index = this.history.indexOf(keyword)
        if (index > -1) {
            this.history.splice(index, 1)
        }
        this.history.unshift(keyword)
        localStorage.setItem(this.HISTORY_KEY, this.history)
    }

    renderHistory() {
        if (this.history.length > 0) {
            let historyHTML = this.history.map(item => `
                <li>
                    <a href="#" class="record-main">
                        <span class="icon icon-clock"></span>
                        <span class="record-con ellipsis">${item}</span>
                        <span class="icon icon-close"></span>
                    </a>
                </li>
            `).join('')
            historyHTML += `
                <p class="record-clear-btn record-delete">清除搜索记录</p>
            `
            console.log(historyHTML)
            console.log(this.$history)
            this.$history.innerHTML = historyHTML
        } else if (this.history.length === 0){
            this.$history.innerHTML = ''
            this.history = []
        }
    }

    onClick(e) {
        if (e.target === this.$input) {
            this.$cancel.classList.remove('hide')
            this.$hotKey.classList.add('hide')
            this.$history.classList.remove('hide')
            this.renderHistory()
        }
        if (e.target === this.$cancel) {
            this.$cancel.classList.add('hide')
            this.$delete.classList.add('hide')
            this.$history.classList.add('hide')
            this.$hotKey.style.display = 'block'
            this.$input.value = ''
            this.reset()
        }
        if (e.target === this.$delete) {
            this.$input.value = ''
            this.$delete.classList.add('hide')
        }
        if (e.target.matches('.icon-close')) {
            let index = this.history.indexOf(e.target.previousElementSibling.innerHTML)
            this.history.splice(index, 1)
            localStorage.setItem(this.HISTORY_KEY, this.history)
            this.renderHistory()
        }
        if (e.target.matches('.record-delete')) {
            this.history = []
            localStorage.setItem(this.HISTORY_KEY, this.history)
            this.$history.innerHTML = ''
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
        this.addHistory(keyword)
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
        this.$hotKey.style.display = 'none'
        this.$history.classList.add('hide')
        this.loading()
        fetch(`https://frankietangkalun-qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data.song.list
            })
            .then(songs => {
                this.append(songs)
                
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