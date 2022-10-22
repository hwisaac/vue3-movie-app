import axios from "axios";

export default {
  // module!
  namespaced: true,
  // data!
  state: () => {
    return {
      movies: [],
      message: "",
      loading: false,
    };
  },
  // computed!
  getters: {},
  // methods!
  //// data 는 mutations 로만 수정
  mutations: {
    updateState(state, payload) {},
    resetMovies(state) {
      state.movies = [];
    },
  },
  //// actions 는 비동기로 작동한다.(async await 안적어도)
  actions: {
    async searchMovies(context, payload) {
      const { title, type, number, year } = payload;
      //Search movies..
      const OMDB_API_KEY = "78b63013";
      const res = await axios.get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${1}`
      );
      const { Search, totalResults } = res.data;
      context.commit("updateState", {
        movies: Search,
        message: "Hello world",
        loading: true,
      });
    },
  },
};
