import Link from 'next/link';
import tw from 'twin.macro';

type Props = {
	sections: any,
	activeSection: string,
	isMobileOnly?: boolean,
};

type Section = {
	section: string,
	text: string,
	mobileText: string,
	link: URL,
}

const commonStyles = {
	sectionNavLink: tw`relative flex items-center font-bold uppercase tracking-[2.57px] text-xs cursor-pointer`,
}

const mobileStyles = {
	sectionNav: tw`block md:hidden -mx-4 border-b border-dark-gray mb-4 px-4`,
	sectionNavMenu: tw`flex justify-between min-h-[4rem]`,
	sectionNavLink: ({ active = false }: { active?: boolean }) => [
		commonStyles.sectionNavLink,
		tw`h-full pt-2 border-b-4 border-transparent opacity-50 hocus:(opacity-100)`,
		active && tw`border-[var(--planet-color)] opacity-100`,
	],
	sectionNavNumber: tw`hidden`,
}

const desktopStyles = {
	sectionNav: tw`hidden md:block`,
	sectionNavMenu: tw`flex flex-col gap-4 md:(mt-24) lg:(mt-0)`,
	sectionNavLink: ({ active = false }: { active?: boolean }) => [
		commonStyles.sectionNavLink,
		tw`min-h-[3rem] pl-16 pr-4 border border-dark-gray hocus:(bg-dark-gray)`,
		active && tw`bg-[var(--planet-color)] hocus:bg-[var(--planet-color)]`,
	],
	sectionNavNumber: tw`absolute left-6 opacity-50`,
};

const SectionNav = ({ sections, activeSection, isMobileOnly = false }: Props) => {
	const styles = isMobileOnly ? mobileStyles : desktopStyles;

	return (
		<nav css={styles.sectionNav}>
			<ul css={styles.sectionNavMenu}>
				{sections.map(({ section, text, mobileText, link }: Section, index: number) => (
					<li key={index}>
						<Link href={link} passHref>
							<a css={styles.sectionNavLink({ active: section === activeSection })}>
								{!isMobileOnly && <span css={styles.sectionNavNumber}>{`0${index}`}</span> }
								{isMobileOnly ? ( mobileText ?? text ) : text}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SectionNav;
