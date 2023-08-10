import React from 'react';
import { Provider } from 'react-redux';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import store from '@/redux/store';


interface AppProps {
  Component: React.FC;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
