import { useQueryParam } from "./hooks/useQueryParams/useQueryParams";
import Graph from "./components/graph/graph";

function App() {
  // todo responsive stuff

  const label = useQueryParam("label") || "Mess around";

  return (
    <main className="flex min-h-svh align-items">
      <figure className="m-auto">
        <Graph width={800} height={600} labelXAxis={label} />
        <figcaption className="mt-4 text-center text-white text-2xl">{label}</figcaption>
      </figure>
    </main>
  );
}

export default App;
