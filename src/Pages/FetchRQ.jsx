import React, { useState } from 'react'
import { fetchPosts } from '../API/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  // react query 
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],  // useState
    queryFn: () => fetchPosts(pageNumber),  //useEfect
    // gcTime:1000,
    // staleTime:10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
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
      <div className="pagination-section container">
        <button 
        disabled = {pageNumber === 0 ? true : false }
        onClick={() => setPageNumber((prev) => prev - 3)}>
          Prev
        </button>
        <p>
          {(pageNumber / 3 + 1)}
        </p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default FetchRQ