import './App.css'
import NavigationLinks from "./navigation/NavigationLinks.tsx";
import RoutingPaths from "./navigation/RoutingPaths.tsx";

export default function App() {
  return (
      <>
          <div className="grid">
              <div className={"window-pane top"}>
                  Recipes & Recipes
              </div>
              <div className={"window-pane left"}>
                  <NavigationLinks/>
              </div>
              <div className={"window-pane right"}>
                  <RoutingPaths/>
              </div>
          </div>
      </>
  )
}

