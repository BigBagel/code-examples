import GlobalStyles from '../styles/global-styles';
import Layout from '../components/layout';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyles />
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</>
);

export default App;
