import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { RecordsProvider } from "./pages/contexts/record-context";
import { Landing } from "./pages/home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <RecordsProvider>
                    <Dashboard />
                  </RecordsProvider>
                </SignedIn>

                <SignedOut>
                  <Landing />
                </SignedOut>
              </>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
