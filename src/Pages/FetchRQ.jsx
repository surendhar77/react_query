import React from 'react'
import { fetchPosts } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  // react query 

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],  // useState
    queryFn: fetchPosts,  //useEfect
    // gcTime:1000,
    // staleTime:10000,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error : {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>

            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default FetchRQ