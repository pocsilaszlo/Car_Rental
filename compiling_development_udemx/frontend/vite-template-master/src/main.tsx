import ReactDOM from 'react-dom/client';
import App from './App';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Provider } from 'react-redux';
import { store } from './state/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
