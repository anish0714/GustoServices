import React, {useState, useEffect} from 'react';
import MainApp from './MainApp';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashLoading(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <MainApp isSplashLoading={isSplashLoading} />
    </Provider>
  );
};

export default App;
