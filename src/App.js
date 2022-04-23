import React from "react";
import Jokes from "./pages/Jokes";
import "./assets/styles.css";
import { SnackbarProvider } from "notistack";

/** 
 * Basic React landing app 
 * Covering Header, Section, footer
 * Jokes component is dashboard / landing page.
 */
function App() {
  return (
    // Added snackbar provide to enable dynamic toast notification across application
    <SnackbarProvider maxSnack={5}>
      <div className="App">
        <header className="header">Jokes App</header>
        <section>
          <Jokes></Jokes>
        </section>
        <footer className="footer">
          <span>IO Jokes. All rights reserved.</span>
        </footer>
      </div>
    </SnackbarProvider>
  );
}

export default App;
