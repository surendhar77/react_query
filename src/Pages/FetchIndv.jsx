import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchIndvPost } from '../API/api';
import { NavLink, useParams } from 'react-router-dom';

const FetchIndv = () => {
    const { id } = useParams();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts", id],  // useState
        queryFn: () => fetchIndvPost(id),  //useEfect
    });
    console.log(data);
    // Conditional rendering based on loading, error, and posts data
    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error : {error.message || "Something went wrong!"}</p>;

    return (

            <div className='section-accordion'>
                <h1>Post Id Number - {id}</h1>
                <div>
                    <p>
                        Id:{data.id}
                    </p>
                    <p>
                        Title :{data.title}
                    </p>
                    <p>
                        Body :{data.body}
                    </p>
                </div>
                <NavLink to="/rq">
                    <button> Go Back </button>
                </NavLink>
            </div>
    )
}

export default FetchIndv