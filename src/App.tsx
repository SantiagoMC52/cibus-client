import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

function App() {
  const [data, setData] = useState<Post>([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2>CIBUS</h2>
      {data && data.map((item: any) => <h2 key={item.id}>{item.title}</h2>)}
    </div>
  );
}

export default App;
