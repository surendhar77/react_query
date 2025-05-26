import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../API/api';

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      // console.log(res);
      res.status === 200 ? setPosts(res.data) : [];
      if (res.status === 200) {
        setPosts(res.data); // Set the fetched posts data
        setIsLoading(false); // Turn off loading state
      }
    }
    catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);

    }
  };
  useEffect(() => {
    getPostsData();
  }, []);
   // Conditional rendering based on loading, error, and posts data
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default FetchOld