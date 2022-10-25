const axios = require("axios");

exports.handler = async function (event) {
  console.log(event);
  const payload = JSON.parse(event.body);
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = "78b63013";
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  if (id) {
    console.log("fetchMovie 에서 입력받은 id ", id);
  }

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error,
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message,
    };
  }
};
