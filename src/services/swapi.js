import axios from 'axios';

const API_BASE_URL = 'https://swapi.info/api/';

export const fetchEntities = async (type,page=1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${type}/?page=${page}`);
    return response.data;   
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

export const fetchEntityDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching entity details from ${url}:`, error);
        throw error;
    }
};

// export const fetchEntityById = async (type, id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}${type}/${id}/`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching ${type} with ID ${id}:`, error);
//     throw error;
//   }
// };
// export const searchEntities = async (type, query) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}${type}/?search=${query}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error searching ${type} with query "${query}":`, error);
//     throw error;
//   }
// };
// export const fetchAllEntities = async (type) => {   
//     let allEntities = [];
//     let page = 1;
//     let hasMore = true;
    
//     try {
//         while (hasMore) {
//         const response = await axios.get(`${API_BASE_URL}${type}/?page=${page}`);
//         allEntities = allEntities.concat(response.data.results);
//         if (response.data.next) {
//             page += 1;
//         } else {
//             hasMore = false;
//         }
//         }
//         return allEntities;
//     } catch (error) {
//         console.error(`Error fetching all ${type}:`, error);
//         throw error;
//     }
// };

