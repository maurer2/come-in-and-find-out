import { useScreenSize } from '@visx/responsive';

import { useQueryParam } from "./hooks/useQueryParams/useQueryParam";
import Graph from "./components/graph/graph";


function App() {
  const { width: widthScreen } = useScreenSize({ debounceTime: 50 });

  const labelXAxis = useQueryParam("label") || "Mess around";
  const labelYAxis = "Find out";
  const size = Math.min(widthScreen, 1024);

  return (
    <main className="flex min-h-svh align-items">
      <figure className="m-auto">
        <Graph
          width={size}
          height={size}
          labelXAxis={labelXAxis}
          labelYAxis={labelYAxis}
        />
      </figure>
    </main>
  );
}

export default App;
