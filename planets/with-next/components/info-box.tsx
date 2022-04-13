import tw from 'twin.macro';

type Props = {
    heading: string,
	headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
	children: any,
};

const styles = {
	container: tw`flex justify-between items-center border border-dark-gray p-6 md:(block)`,
	title: tw`opacity-50 uppercase text-[.6875rem] tracking-[1px] font-bold md:(pb-1)`,
	content: tw`font-title text-[2.5rem] line-height[1.3] tracking-[-1.5px] uppercase`,
}

const InfoBox = ({ heading, headingTag = 'h3', children }: Props) => {
	const HeadingTag: keyof JSX.IntrinsicElements = headingTag;

	return (
		<div css={styles.container}>
			<HeadingTag css={styles.title}>{ heading }</HeadingTag>
			<p css={styles.content}>{ children }</p>
		</div>
	);
};

export default InfoBox;
