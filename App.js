

import { Provider } from 'react-redux'

// import { useRoute } from './router';
import { store } from './Screens/redux/store';



// import {auth} from './firebase/config'
// import { useState } from 'react';
import Main from './coponents/Main';

export default function App() {
  // const [isAuth, setIsAuth] = useState(null)
  // const routing = useRoute(isAuth)
  
  

  return (
    <Provider store={store}>
      <Main />
    </Provider>
      
  );
}

