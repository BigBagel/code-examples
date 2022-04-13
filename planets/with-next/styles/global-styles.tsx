import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css`
	:root {
		--color-white: #ffffff;
		--color-black: #070724;
		--color-dark-gray: #38384F;
		--color-gray: #838391;
		--color-mercury: #419EBB;
		--color-venus: #EDA249;
		--color-earth: #6D2ED5;
		--color-mars: #D14C32;
		--color-jupiter: #D83A34;
		--color-saturn: #CD5120;
		--color-uranus: #1EC1A2;
		--color-neptune: #2D68F0;

		--font-title: 'Antonio', 'sans-serif';
		--font-sans: 'Spartan', 'sans-serif';
	}

	body {
		${tw`antialiased bg-stars bg-black bg-cover bg-no-repeat text-white`};
	}

	h1 {
		${tw`font-title text-[5rem] line-height[1.2875] uppercase`};
	}

	h2 {
		${tw`font-title text-[2.5rem] line-height[1.3] tracking-[-1.5px] uppercase`};
	}

	p {
		${tw`text-sm leading-6`};
	}

	a:focus,
	button:focus {
		${tw`outline-white outline-offset[2px]`};
	}
`;

const GlobalStyles = () => (
	<>
		<BaseStyles />
		<Global styles={customStyles} />
	</>
);

export default GlobalStyles;
