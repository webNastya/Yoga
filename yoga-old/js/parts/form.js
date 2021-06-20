function form() {
	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так'
	};

	let form = document.querySelector('.main-form'),
		formContact = document.querySelector('#form'),
		statusMessage = document.createElement('div');
		statusMessage.classList.add('status');

	function sendForm(elem) {
		elem.addEventListener('submit', function(e) {
			e.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);

			function postData(data){
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					request.onreadystatechange = function(){
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							if (request.status === 200 && request.status < 300) {
								resolve();
							} else {
								reject();
							}
						}
					};
					let obj = {};
					formData.forEach(function(value, key){
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					
					request.send(json);
				});
			}

			function clearInput(){
				let inputsAll = document.querySelectorAll('input');
				for (let i = 0; i < inputsAll.length; i++) {
					inputsAll[i]. value = '';
				}
			}

			postData(formData)
				.then(()=> statusMessage.innerHTML = message.loading)
				.then(()=> statusMessage.innerHTML = message.success)
				.catch(()=> statusMessage.innerHTML = message.failure)
				.then(clearInput);	
		});
	}

	sendForm(form);
	sendForm(formContact);

	let phone = document.getElementsByName('phone');
	for (let i = 0; i < phone.length; i++) {
		phone[i].addEventListener('keypress', function (e) {
	        if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
	            e.preventDefault();
	        }
    	});
	}

	let tel = document.getElementsByName('tel');
	tel[0].addEventListener('keypress', function(e){
		if (!/\d/.test(e.key) || !/\+/.test(e.key) || /\0/.test(e.key)) { 
			e.preventDefault();
		}
	});
}
module.exports = form;