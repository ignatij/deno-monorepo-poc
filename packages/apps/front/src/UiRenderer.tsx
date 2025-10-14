import type { JSX } from "react";

export const legacyUIRenderer = (): JSX.Element => (
  <div className="legacy-ui">
    <h1>Legacy UI</h1>
    <p>This is the old, stable UI</p>
  </div>
);

export const modernUIRenderer = (): JSX.Element => (
  <div className="modern-ui">
    <h1>✨ Modern UI</h1>
    <p>This is the new, experimental UI</p>
  </div>
);
