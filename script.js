window.addEventListener('DOMContentLoaded', function () {
	'use strict'

	// Tabs

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');
	function hideTabContent(a) {
		for (var i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (var i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	//Mask to popup

	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
	else if (elem.createTextRange) {
			let range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}
	function mask(event) {
		let matrix = this.defaultValue,
		i = 0,
		def = matrix.replace(/\D/g, ""),
		val = this.value.replace(/\D/g, "");
		def.length >= val.length && (val = def);
		matrix = matrix.replace(/[_\d]/g, function(a) {
			return val.charAt(i++) || "_"
		});
		this.value = matrix;
		i = matrix.lastIndexOf(val.substr(-1));
		i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
		setCursorPosition(i, this)
	}
	let inputPopup = document.querySelector(".popup-form__input"),
		inputForm = document.querySelector("#phone")
	inputPopup.addEventListener("input", mask, false)
	inputForm.addEventListener("input", mask, false)

	//Timer

	if (localStorage.getItem('deadLine') === null) {
		var deadLine = new Date();
		deadLine.setDate(deadLine.getDate() + 1);

		localStorage.setItem('deadLine', Number(deadLine))
	} else {
		var deadLine = localStorage.getItem('deadLine') // без этого присвоения значения таймера будут NaN
	} 	// сохраняем время посещения каждого нового пользователя
		// это позволяет сделать уникальный отсчёт времени для каждого пользователя

	function getTimeRemeining(endtime) {
		let t = endtime - Number(new Date()),
			seconds = Math.floor((t/1000) % 60),
			minutes = Math.floor((t/1000/60) % 60),
			hours = Math.floor((t/(1000*60*60)));

		return {
			'total' : t, //кол-во милисекунд
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemeining(endtime);
				hours.textContent = ('0' + t.hours).slice(-2);
				minutes.textContent = ('0' + t.minutes).slice(-2);
				seconds.textContent = ('0' + t.seconds).slice(-2);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
	}
	setClock('timer', deadLine);

	//Modal

	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		allButtons = document.querySelectorAll('.description-btn, .more');

	for (let i = 0; i < allButtons.length; i++) {
		allButtons[i].addEventListener('click', function() {
			overlay.style.display = 'block';
		});
	}

	function closeModal() {
		close.addEventListener('click', function(){
			overlay.style.display = 'none';
		});
	};
	closeModal();

	// Form

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
					}
					let obj = {}
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
					inputsAll[i].value = '';
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

	// let phone = document.getElementsByName('user_phone');
	// for (let i = 0; i < phone.length; i++) {
	// 	phone[i].addEventListener('keypress', function (e) {
	//         if (!/\d/.test(e.key) && !/\+/.test(e.key)) {
	//             e.preventDefault();
	//         }
    // 	});
	// }

	//Slider

	let slideIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

		showSlides(slideIndex);

		function showSlides(n){

			if (n > slides.length) {
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = slides.length;
			}

			slides.forEach((item) => item.style.display = 'none');

			dots.forEach((item) => item.classList.remove('dot-active'));

			slides[slideIndex - 1].style.display = 'block';
			dots[slideIndex - 1].classList.add('dot-active')
		}

		function plusSlides(n) {
			showSlides(slideIndex += n)
		}
		function currentSlide(n) {
			showSlides(slideIndex = n)
		}

		prev.addEventListener('click', function(){
			plusSlides(-1);
		});
		next.addEventListener('click', function(){
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', function(event){
			for (let i = 0; i < dots.length +1; i++) {
				if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
					currentSlide(i);
				}
			}
		});

	//Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		counter = document.querySelectorAll('.counter'),
		minMax = document.querySelectorAll('.min-max'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	function checkQuantity() {
		if (persons.value > 20)
			minMax[0].style.display = 'block'
		else
			minMax[0].style.display = 'none'
		if (restDays.value > 14)
			minMax[1].style.display = 'block'
		else
			minMax[1].style.display = 'none'
	}

	place.addEventListener('change', function() {
		if (persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else if (persons.value <= 20 && restDays.value <= 14) {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		} else {
			totalValue.innerHTML = 0
		}
		checkQuantity()
	});

	for (let i = 0; i < counter.length; i++) {
		counter[i].addEventListener('change', function(){
			personsSum = +persons.value;
			daysSum = +restDays.value;
			total = (daysSum + personsSum)*4000;

			if (restDays.value == '' || persons.value == '' || restDays.value == 0 || persons.value == 0) {
				totalValue.innerHTML = 0;
			} else if (persons.value <= 20 && restDays.value <= 14) {
				totalValue.innerHTML = total * place.options[place.selectedIndex].value;
			} else {
				totalValue.innerHTML = 0
			}
			checkQuantity()
		});
	}


	let counterInput = document.querySelectorAll('.counter-block-input');
	for (let i = 0; i < counterInput.length; i++) {
		counterInput[i].addEventListener('keypress', function(e){
			this.value = counterInput[i].value.replace(/^0/,'');
			if (!/\d/.test(e.key)) { 
				e.preventDefault();
			} 
		});
	}
});
