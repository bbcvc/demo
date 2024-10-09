import React from "react";
import Game from "./Game";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>喵星人音调大挑战</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer className="app-footer">
        <p>© 2023 喵星人音调大挑战 版权所有</p>
      </footer>
    </div>
  );
};

export default App;
