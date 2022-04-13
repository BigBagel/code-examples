import { useRef } from 'react';
import tw from 'twin.macro';

import Header from './header';

type Props = {
	children: any,
};

const styles = {
	nav: tw`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full transition-transform focus-within:(translate-y-2)`,
	link: tw`block py-2 px-4 bg-white text-black font-bold`,
	main: tw`max-w-screen-lg mx-auto p-4 pt-0`,
};

const Layout = ({ children }: Props) => {
	const mainEl = useRef<HTMLElement>(null);

	const handleSkipnav = (e: React.MouseEvent) => {
		e.preventDefault();

		mainEl?.current?.focus();
	}

	return (
		<>
			<nav css={styles.nav} aria-label="Skip navigation">
				<a css={styles.link} href="#Main" onClick={handleSkipnav}>Skip to content</a>
			</nav>
			<Header />
			<main id="Main" css={styles.main} ref={mainEl} tabIndex={-1}>{ children }</main>
		</>
	);
};

export default Layout;
