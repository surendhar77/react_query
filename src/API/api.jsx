import axios from "axios";


const api = axios.create({
    baseURL :"https://jsonplaceholder.typicode.com"
});

// to fetch the data
export const fetchPosts = async() => {
    const res = await  api.get("/posts");
      return   res.status ===200 ? res.data :[];
}

// to fetch the indivial data

export const fetchIndvPost = async(id) => {
    try{
     const res = await  api.get(`/posts/${id}`)
     return res.status === 200 ? res.data:[];
    }
    catch(error)
    {
     console.log(error);
    }

}