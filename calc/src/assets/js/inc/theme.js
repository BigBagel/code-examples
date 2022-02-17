const body = document.querySelector('body');
const themeButtons = document.querySelectorAll('input[name="theme"]');
const savedTheme = localStorage.getItem('theme');
const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const darkModeTheme = 1;

const setThemeToggle = (theme) => {
	const toggleElem = document.querySelector(`input[name="theme"][value="${theme}"]`);
	toggleElem.checked = true;
}

const setTheme = (theme) => {
	if (theme === body.dataset.theme) {
		return;
	}

	body.dataset.theme = theme;
	localStorage.setItem('theme', theme);
};

const setThemeAndToggle = (theme) => {
	setTheme(theme);
	setThemeToggle(theme);
}

if (savedTheme) {
	setThemeAndToggle(savedTheme);
} else if (darkMode) {
	setThemeAndToggle(darkModeTheme);
}

themeButtons.forEach((button) => {
	button.addEventListener('click', (evt) => {
		const newThemeVal = button.value;

		setTheme(newThemeVal);
	});
});
