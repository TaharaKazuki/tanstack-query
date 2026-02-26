import './App.css';

import { useQuery } from '@tanstack/react-query';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPostsById = async (postId: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function App() {
  const postId = 1;
  const { data, isPending, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostsById(postId),
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
