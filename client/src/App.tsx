import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";

import Docs from "./pages/Docs";
import Signup from "./pages/Signup";
import Investors from "./pages/Investors";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />

      <Route path={"/docs"} component={Docs} />
      <Route path={"/signup"} component={Signup} />
      <Route path={"/investors"} component={Investors} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: 'oklch(0.12 0.008 285 / 90%)',
                border: '1px solid oklch(1 0 0 / 8%)',
                color: 'oklch(0.93 0.005 285)',
                backdropFilter: 'blur(20px)',
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
