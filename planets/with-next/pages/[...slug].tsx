import type { NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import tw from 'twin.macro';

import InfoBox from '../components/info-box';
import SectionNav from '../components/section-nav';

import planetData from '../data/data.json';
import type { PlanetData, PlanetInfoSection } from '../types/planets';

type Props = {
  planet: PlanetData;
	slug: string;
	content: string;
	source: string;
	image: string;
	sectionName: PlanetInfoSection;
};

interface IParams extends ParsedUrlQuery {
    slug: string,
};

const styles = {
	planetContainer: (planetSlug: string = 'mercury') => [
		{'--planet-color': `var(--color-${planetSlug})`},
		tw`
			grid mb-6
			md:(gap-8 mt-20)
			lg:(grid-cols-[minmax(0, 2fr) minmax(0, 1fr)] gap-8)
		`,
	],
	imageContainer: tw`
		relative grid place-content-center min-h-[30rem]
		md:(min-h-[36rem])
		lg:(min-h-full)
	`,
	planetImage: (size: number ) => [
		{ maxWidth: `${size}%` },
		tw`mx-auto`,
	],
	geologyImage: tw`absolute max-w-[8rem] left-1/2 top-1/2 -translate-x-1/2 translate-y-1/4`,
	contentContainer: tw`
		grid
		md:(grid-cols-2 grid-rows-1 gap-16)
		lg:(grid-cols-1 grid-rows-[repeat(2, min-content)])
	`,
	content: tw`flex flex-col lg:mb-6`,
	contentTitle: tw`font-title mb-6`,
	contentText: tw`mb-2 lg:(min-h-[10.5rem])`,
	source: tw`mt-auto`,
	sourceLink: tw`underline`,
	infoContainer: tw`
		grid gap-2 grid-cols-1 grid-rows-4
		md:(grid-cols-4 grid-rows-1 gap-4)
	`,
}

const Page: NextPage<Props> = ({ 
	planet, 
	slug, 
	image, 
	content, 
	source, 
	sectionName 
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	if (!planet) {
		return null;
	}

	const sectionLinks = [
		{
			section: 'overview',
			text: 'Overview',
			link: slug,
		},
		{
			section: 'structure',
			text: 'Internal Structure',
			mobileText: 'Structure',
			link: `${slug}/structure`,
		},
		{
			section: 'geology',
			text: 'Surface Geology',
			mobileText: 'Geoglogy',
			link: `${slug}/geology`,
		},
	];

	const infoItems = [
		{
			heading: 'Rotation Time',
			text: planet.rotation,
		},
		{
			heading: 'Revolution Time',
			text: planet.revolution,
		},
		{
			heading: 'Radius',
			text: planet.radius,
		},
		{
			heading: 'Average Temp.',
			text: planet.temperature,
		},
	];

	return (
		<>
			<Head>
				<title>{planet.name} | The Planets</title>
			</Head>
			<div css={styles.planetContainer(slug)}>
				<SectionNav
					isMobileOnly={true}
					sections={sectionLinks}
					activeSection={sectionName}
				/>
				<div css={styles.imageContainer}>
					<img
						css={styles.planetImage(planet.imageSize)}
						src={image}
						alt={sectionName === 'internal' ? `Internal cutout of ${planet.name}` : planet.name}
					/>
					{sectionName === 'geology' &&
						<img
							css={styles.geologyImage}
							src={planet.images.geology}
							alt={`Surface of ${planet.name}`}
						/>
					}
				</div>
				<div css={styles.contentContainer}>
					<div css={styles.content}>
						<h1 css={styles.contentTitle}>{ planet.name }</h1>
						<p css={styles.contentText}>{ content }</p>
						<p css={styles.source}>Source: <a href={ source } css={styles.sourceLink}>Wikipedia <img src="/assets/images/source.svg" alt="" /></a></p>
					</div>
					<SectionNav
						tw='hidden md:block'
						sections={sectionLinks}
						activeSection={sectionName}
					/>
				</div>
			</div>
			<div css={styles.infoContainer}>
				{infoItems.map(({ heading, text }) => (
					<InfoBox
						heading={heading}
						key={heading}
					>
						{text}
					</InfoBox>
				))}
			</div>
		</>
	);
};

const getStaticPaths: GetStaticPaths = () => {
	const slugs = planetData?.flatMap((planet) => {
		const planetSlug = encodeURIComponent(planet.name.toLowerCase());

		return [
			[ planetSlug ],
			[ planetSlug, 'structure' ],
			[ planetSlug, 'geology' ],
		];
	});

	const paths = slugs?.map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false
	};
};

const getStaticProps: GetStaticProps<Props> = ({ params }) => {
	const { slug } = params as IParams;
	const planetSlug: string = slug[0];
	const sectionName: PlanetInfoSection = slug[1] as PlanetInfoSection ?? 'overview';
	const planet: any = planetData.find(p => p.name.toLowerCase() === planetSlug);
	const image: string = sectionName === 'geology' ? planet.images.overview : planet.images[sectionName];

	return {
		props: {
			planet,
			slug: planetSlug,
			content: planet[sectionName].content,
			source: planet[sectionName].source,
			image,
			sectionName,
		},
	};
};

export { getStaticPaths, getStaticProps };
export default Page;
