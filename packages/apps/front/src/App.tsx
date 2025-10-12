import "./App.css";
import { add } from "@deno-monorepo-poc/domain";

const App: React.FunctionComponent = () => {
  const a = 2;

  const b = 1;

  const c = add(a, b);

  return (
    <div>
      <div>
        This computation uses <code>add</code> from{" "}
        <code>@deno-monorepo-poc/domain</code>
      </div>
      <code>{`${a} + ${b} = ${c}`}</code>
    </div>
  );
};

export default App;
