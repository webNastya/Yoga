function modal() {
    let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		allButtons = document.querySelectorAll('.description-btn, .more');

	for (let i = 0; i < allButtons.length; i++) {
		allButtons[i].addEventListener('click', function() {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	}

	function closeModal() {
		close.addEventListener('click', function(){
			overlay.style.display = 'none';
			more.classList.remove('more-splash');
			document.body.style.overflow = '';
		});
	}
    closeModal();
}

module.exports = modal;