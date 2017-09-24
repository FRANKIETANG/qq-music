class Search {
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup',this.onKeyUp.bind(this)) 
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.song = []
        this.perpage = 20
    }

    onKeyUp(event){
        console.log(this)
        let keyword = event.target.value.trim() //trim() 前后空格去掉
        if (!keyword) return this.reset()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }

    reset(){
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }

    search(keyword){
        this.keyword = keyword
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
            .then(res => res.json())
            .then(json => json.data.song.list)
            .then(songs => this.append(songs))
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