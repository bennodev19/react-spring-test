import React from "react";
import RotateImage from "./components/RotateImage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Slider from "./components/Slider";
import Drag from "./components/Drag";
import Card from "./components/Card";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/rotate-image" component={RotateImage} />
        <Route path="/slider" component={Slider} />
        <Route path="/drag" component={Drag}/>
        <Route path="/card" component={Card}/>
      </Switch>
    </Router>
  );
};

export default App;
