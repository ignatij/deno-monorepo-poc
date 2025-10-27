import "./App.css";
import { add } from "@deno-monorepo-poc/domain";
import { FeatureConfig } from "./config/feature-config.ts";
import { createFeatureAwareFactory } from "./feature-aware-factory.ts";

await FeatureConfig.initialize();
const config = FeatureConfig.getInstance().getFeatureFlags();

const App: React.FunctionComponent = () => {
  const a = 3;
  const b = 3;
  const c = add(a, b);

  // Create factory with current feature flags
  const factory = createFeatureAwareFactory(config);
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
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </details>
    </div>
  );
};

export default App;
