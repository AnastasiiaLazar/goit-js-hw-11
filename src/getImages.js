import axios from "axios";

const URL = 'https://pixabay.com/api/';
const KEY = '32168467-080c4405d966fac64f94e8bf1';
const searchParams = {
    image_type: 'photo',
    orientation:'horizontal',
    safesearch: true,
}

export async function fetchImages(query, page, per_page) {
    const result = await axios.get(`${URL}/?key=${KEY}&q=${query}&page=${page}&per_page=${per_page}`, searchParams);
    const data = result.data;
    return data;
};

