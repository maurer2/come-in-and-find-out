import Graph from "./components/graph/graph";

function App() {
  // todo responsive stuff

  return (
    <main className="flex min-h-svh align-items">
      <figure className="m-auto">
        <Graph width={800} height={600} />
      </figure>
    </main>
  );
}

export default App;
