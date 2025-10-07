import { Routes, Route,} from 'react-router';

import { Home } from "./home";
import { Header } from "./header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
