import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import tw, {css} from 'twin.macro';

import planetData from '../data/data.json';

const styles = {
	header: tw`
		grid grid-cols-2 items-center justify-between gap-4 px-4 border-b border-b-dark-gray h-[5.25rem]
		md:(grid-cols-1 grid-rows-2 gap-0 justify-items-center h-auto)
		lg:(grid-cols-[auto auto] grid-rows-1 gap-4 h-[5.25rem])
	`,
	title: tw`text-[1.75rem] md:py-4 lg:py-0`,
	nav: (isOpen: boolean) => [
		tw`
			hidden fixed w-full left-0 bottom-0 top-[5.25rem] bg-black overflow-y-scroll z-10 translate-x-full transition-transform overflow-visible
			md:(static block h-auto bg-transparent translate-x-0)
		`,
		isOpen && tw`translate-x-0 block`,
	],
	navList: tw`
		flex flex-col pt-4 px-8
		md:(flex-row gap-8 pt-0 px-0 justify-center)`,
	link: (slug: string) => [
		css`
			&::before {
				content: '';
				width: 1.5rem;
				aspect-ratio: 1 / 1;
				border-radius: 50%;
				position: absolute;
				left: 1rem;
				top: 50%;
				transform: translateY(-60%);
				background: ${`var(--color-${slug})`};
			}
		`,
		tw`
			block relative uppercase cursor-pointer font-bold pl-16 py-8 border-b border-b-dark-gray opacity-75 hocus:(opacity-100)
			md:(before:hidden after:hidden border-b-0 text-[.6875rem] pl-0 py-0 line-height[1.5625rem])
		`,
	],
	mobileToggleContainer: tw`flex justify-end md:hidden`,
	mobileToggle: tw`block`,
};

const planets = planetData.map((p) => ({
	name: p.name,
	slug: encodeURIComponent(p.name.toLowerCase()),
}));

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const mobileToggleEl = useRef<HTMLButtonElement>(null);

	const handleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
		mobileToggleEl?.current?.focus();
	};

	const handleEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && menuOpen) {
			closeMenu();
		}
	};

	useEffect(() => {
		document.addEventListener('keyup', handleEsc, false);

		return () => {
			document.removeEventListener('keyup', handleEsc, false);
		};
	});

	return (
		<header css={styles.header}>
			<h1 css={styles.title}>
				<Link href={`/`} passHref>
					<a>The Planets</a>
				</Link>
			</h1>
			<div css={styles.mobileToggleContainer}>
				<button
					onClick={handleMenu}
					ref={mobileToggleEl}
					css={styles.mobileToggle}
					aria-controls="MainNav"
					aria-expanded={menuOpen}
				>
						<img src="/assets/images/icon-hamburger.svg" alt="Menu" />
					</button>
			</div>
			<nav id="MainNav" css={styles.nav(menuOpen)} aria-label="Main navigation">
				<ul css={styles.navList}>
					{planets.map(p => (
						<li key={p.slug}>
							<Link href={`/${p.slug}`} passHref>
								<a onClick={closeMenu} css={styles.link(p.slug)}>{p.name}</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
