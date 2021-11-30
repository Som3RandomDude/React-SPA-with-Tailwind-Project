import * as React from "react";
import { VechaiProvider, Button } from "@vechaiui/react";
import Register from './components/register/Register.js'
import Header from "./components/header/Header.js";
function App() {
  return (
    <div className="w-full">
      <Header />
      <Register />


      <Button variant="solid">Test</Button>
    </div>
  );
}

export default App;
