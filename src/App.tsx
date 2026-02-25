import './App.css';

import { useQuery } from '@tanstack/react-query';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchData = async (): Promise<Post> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return response.json();
};

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ['post'],
    queryFn: fetchData,
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}

export default App;
