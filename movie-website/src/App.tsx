import { Routes, Route,} from 'react-router';

import { Home } from "./home";
import { ItemInfo } from "./iteminfo";
import { Header } from "./header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path=":itemId" element={<ItemInfo />} />
      </Routes>
    </>
  );
};

export default App;
