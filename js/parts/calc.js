function calc() {
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		counter = document.querySelectorAll('.counter'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	place.addEventListener('change', function(){
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

	for (let i = 0; i < counter.length; i++) {
		counter[i].addEventListener('change', function(){
			personsSum = +persons.value;
			daysSum = +restDays.value;
			total = (daysSum + personsSum)*4000;

			if (restDays.value == '' || persons.value == '' || restDays.value == 0 || persons.value == 0) {
				totalValue.innerHTML = 0;
			} else {
				totalValue.innerHTML = total * place.options[place.selectedIndex].value;
			}
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
}
module.exports = calc;