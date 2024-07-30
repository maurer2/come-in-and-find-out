import { useQueryParam } from "./hooks/useQueryParams/useQueryParam";
import Graph from "./components/graph/graph";

function App() {
  // todo responsive stuff

  const labelXAxis = useQueryParam("label") || "Mess around";
  const labelYAxis = "Find out";

  return (
    <main className="flex min-h-svh align-items">
      <figure className="m-auto">
        <Graph
          width={800}
          height={600}
          labelXAxis={labelXAxis}
          labelYAxis={labelYAxis}
        />
      </figure>
    </main>
  );
}

export default App;
