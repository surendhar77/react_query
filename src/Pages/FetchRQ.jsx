import React, { useState } from 'react'
import { deletePost, fetchPosts, updatePost } from '../API/api';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  // react query 
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],  // useState
    queryFn: () => fetchPosts(pageNumber),  //useEfect
    // gcTime:1000,
    // staleTime:10000, 
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  //! mutation funcion to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // console.log(data, id);
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id != id)
      })
    }
  })

  //! mutation funcion to update the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      // console.log(apiData, postId);
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) => {
          return curPost.id === postId ?
            {
              ...curPost, title: apiData.data.title
            } : curPost;
        });
      })
    }
  })


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
              {/* <button onClick={() => alert(`hi post ${id}`)}>Delete</button> */}
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
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