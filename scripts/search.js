class Search {
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup',this.onKeyUp.bind(this)) 
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.perpage = 20
        this.nomore = false
        this.fetching = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }

    onKeyUp(event){
        console.log(this)
        let keyword = event.target.value.trim() //trim() 前后空格去掉
        if (!keyword) return this.reset()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }

    onScroll(event){
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.nomore = false
        this.$songs.innerHTML = ''
    }

    search(keyword, page){
        if (this.fetching) return
        this.keyword = keyword
        this.fetching = true
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.fetching = false)
            .catch(() => this.fetching = false)
    }

    append(songs){
        let html = songs.map(song => `
            <a class="song-item" href="#player?artist=David Guetta Justin Bieber&songid=202712996&songname=2U&albummid=0008u6bN048czH&duration=194">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
            </a>        
        `).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }

}