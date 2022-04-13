import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		const critical = extractCritical(initialProps.html);
		initialProps.html = critical.html;
		initialProps.styles = (
			<>
				{initialProps.styles}
				<style
					data-emotion-css={critical.ids.join(' ')}
					dangerouslySetInnerHTML={{ __html: critical.css }}
				/>
			</>
		);

		return initialProps;
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Antonio&amp;family=Spartan:wght@400;700&amp;display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
