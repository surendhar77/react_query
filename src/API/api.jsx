import axios from "axios";


const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

// to fetch the data
export const fetchPosts = async (pageNumber) => {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
}

// to fetch the indivial data

export const fetchIndvPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`)
        return res.status === 200 ? res.data : [];
    }
    catch (error) {
        console.log(error);
    }
}
// ..pagination
//! https://jsonplaceholder.typicode.com/posts?_start=1&_limit=3

// to delete the post
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}
// to update the post
export const updatePost = (id) => {
    return api.patch(`/posts/${id}`,{title:"I have Updated"});
}