import "./App.css";
import { add } from "@deno-monorepo-poc/domain";
import { featureConfig } from "./config/feature-config.ts";
import { createFeatureAwareFactory } from "./feature-aware-factory.ts";

const App: React.FunctionComponent = () => {
  const a = 1;
  const b = 2;
  const c = add(a, b);

  // Create factory with current feature flags
  const factory = createFeatureAwareFactory(featureConfig.getFeatureFlags());
  const uiRenderer = factory.uiRenderer();
  const theme = factory.getTheme();

  return (
    <div className={`app theme-${theme}`}>
      {/* Theme indicator */}
      <div className="theme-indicator">
        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </div>

      <div className="card">
        <div>
          This computation uses <code>add</code> from{" "}
          <code>@deno-monorepo-poc/domain</code>
        </div>
        <code>{`${a} + ${b} = ${c}`}</code>
      </div>

      <hr />

      {/* Render UI based on feature flag */}
      {uiRenderer}

      <hr />

      {/* Debug panel - show all features */}
      <details className="feature-debug">
        <summary>🔧 Feature Flags</summary>
        <pre>{JSON.stringify(featureConfig.getFeatureFlags(), null, 2)}</pre>
      </details>
    </div>
  );
};

export default App;
