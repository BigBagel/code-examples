import { evaluate, format } from 'mathjs';

const display = document.querySelector('.js-display');
const keys = document.querySelectorAll('.js-key');

keys.forEach((key) => {
	const text = key.textContent;

	key.addEventListener('click', (evt) => {
		if (text === 'DEL') {
			display.value = display.value ? display.value.slice(0, -1) : '';
			return;
		}

		if (text === 'RESET') {
			display.value = '';
			return;
		}

		if (text === '=') {
			display.value = format(evaluate(display.value));
			return;
		}

		display.value = `${display.value}${text}`;
	});
});
