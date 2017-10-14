document.addEventListener('click', function (event) {

    let target = event.target

    if (target.dataset.role !== 'tab') return

    [].forEach.call(target.parentElement.children, tab => {
        tab.classList.remove('active')
    })

    target.classList.add('active')

    let content = document.querySelector(target.dataset.view)

    let playerlogo = document.querySelector('.show-player')

    if (content) {
        [].forEach.call(content.parentElement.children, child => {
            child.style.display = 'none'
        })
        content.style.display = 'block'
    }

    if (target.dataset.view === '.search-view') {
        document.querySelector('.hot-keys').style.display = 'block'
        playerlogo.classList.remove('hide')
        document.body.style.background = '#fff'
    } else {
        playerlogo.classList.add('hide')
        document.body.style.background = '#f4f4f4'
    }

})