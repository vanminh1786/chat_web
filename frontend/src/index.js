import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from '~/components/GlobalStyles';
import { Provider as StoreProvider } from 'react-redux';
import store from '~/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalStyles>
			<StoreProvider store={store}>
				<App />
			</StoreProvider>
		</GlobalStyles>
	</React.StrictMode>
);
