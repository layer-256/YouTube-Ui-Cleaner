/* gemini */
/* The code below adds buttons to the header */

const icons = {
	watchLater:
		'M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm0 3a1 1 0 00-1 1v5.565l.485.292 3.33 2a1 1 0 001.03-1.714L13 11.435V7a1 1 0 00-1-1Z',
	playlists:
		'M16 15.395a.5.5 0 01.762-.426L22.5 18.5l-5.738 3.531a.5.5 0 01-.762-.425v-6.212ZM14 19H4a1 1 0 110-2h10v2Zm6-8a1 1 0 110 2H4a1 1 0 110-2h16Zm0-6a1 1 0 110 2H4a1 1 0 010-2h16Z',
	history:
		'M8.76 1.487a11 11 0 11-7.54 12.706 1 1 0 011.96-.4 9 9 0 0014.254 5.38A9 9 0 0016.79 4.38 9 9 0 004.518 7H7a1 1 0 010 2H1V3a1 1 0 012 0v2.678a11 11 0 015.76-4.192ZM12 6a1 1 0 00-1 1v5.58l.504.288 3.5 2a1 1 0 10.992-1.736L13 11.42V7a1 1 0 00-1-1Z',
}

function createHeaderButton(url, svgPath, title) {
	const link = document.createElement('a')
	link.href = url
	link.className = 'yt-clean-ui-ext-header-btn'
	link.title = title

	link.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="${svgPath}"></path>
        </svg>
    `
	return link
}

function injectMyButtons() {
	const startContainer = document.querySelector('#start.ytd-masthead')
	const logo = startContainer
		? startContainer.querySelector('ytd-topbar-logo-renderer')
		: null
	if (
		startContainer &&
		logo &&
		!document.querySelector('.yt-clean-ui-ext-header-group')
	) {
		const btnGroup = document.createElement('div')
		btnGroup.className = 'yt-clean-ui-ext-header-group'

		const watchLaterBtn = createHeaderButton(
			'/playlist?list=WL',
			icons.watchLater,
			'Смотреть позже',
		)
		const playlistsBtn = createHeaderButton(
			'/feed/playlists',
			icons.playlists,
			'Плейлисты',
		)
		const historyBtn = createHeaderButton(
			'/feed/history',
			icons.history,
			'История',
		)

		btnGroup.appendChild(watchLaterBtn)
		btnGroup.appendChild(playlistsBtn)
		btnGroup.appendChild(historyBtn)

		logo.parentNode.insertBefore(btnGroup, logo.nextSibling)
	}
}

const observer = new MutationObserver(() => {
	injectMyButtons()
})

observer.observe(document.body, {
	childList: true,
	subtree: true,
})

/* The code below prevents users from scrolling down while watching a video in full-screen mode */

window.addEventListener(
	'wheel',
	function (event) {
		const player = document.querySelector('.html5-video-player')

		if (player && player.classList.contains('ytp-fullscreen')) {
			event.preventDefault()
			event.stopPropagation()
			event.stopImmediatePropagation()
		}
	},
	{ passive: false, capture: true },
)
