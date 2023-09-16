import { useState } from "react";

import SellerPage from './Component/SellerPage'
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <SellerPage />
    </>
  );
}

export default App;
