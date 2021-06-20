function slider() {
	let slideIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

		showSlides(slideIndex);

		function showSlides(n){

			if (n > slides.length) { //n - номер слайда
				slideIndex = 1; //если слайды закончились то возвращаемся к первому слайду
			}
			if (n < 1) {
				slideIndex = slides.length; //и наоборот если листаем назад
			}

			slides.forEach((item) => item.style.display = 'none');//все лишние слайды скрываются

			dots.forEach((item) => item.classList.remove('dot-active'));//удаляется активный класс точки

			slides[slideIndex - 1].style.display = 'block';//показывается 1ый слайд
			dots[slideIndex - 1].classList.add('dot-active');//активна первая точка
		}

		function plusSlides(n){
			showSlides(slideIndex += n);//узнаём текущее значение слайда и вызов showSlides
		}
		function currentSlide(n){
			showSlides(slideIndex = n);//связка переключения с точками
		}

		prev.addEventListener('click', function(){//клик по стрелке назад
			plusSlides(-1);
		});
		next.addEventListener('click', function(){//клик по стрелке вперёд
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', function(event){
			for (let i = 0; i < dots.length +1; i++) {
				if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
					currentSlide(i);
				}
			}
		});
}
module.exports = slider;