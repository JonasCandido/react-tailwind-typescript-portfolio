import { Routes, Route,} from 'react-router';

import { Home } from "./home";
import { ItemInfo } from "./iteminfo";
import { Header } from "./header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/iteminfo" element={<ItemInfo />} />
        <Route index element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
