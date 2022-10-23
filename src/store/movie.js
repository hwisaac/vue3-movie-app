import axios from "axios";
import _uniqBy from "lodash/uniqBy";

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
    updateState(state, payload) {
      // ['movies', 'message', 'loading' ].forEach
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
        state.message = payload.message;
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  //// actions 는 비동기로 작동한다.(async await 안적어도)
  actions: {
    async searchMovies({ state, commit }, payload) {
      //Search movies..

      const res = await _fetchMovie({ ...payload, page: 1 });

      const { Search, totalResults } = res.data;
      // Search 를 위의 state 의 movies 리스트에 저장해야 한다.
      commit("updateState", {
        movies: _uniqBy(Search, "imdbID"), // 중복되는 ID 합치기
      });

      const total = parseInt(totalResults, 10);
      const pageLength = Math.ceil(total / 10);

      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page++) {
          if (page > payload.number / 10) break;
          const res = await _fetchMovie(...payload, page);

          const { Search } = res.data;
          commit("updateState", {
            movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
          });
        }
      }
    },
  },
};

// 현재 파일 내부에서만 처리된다는 의미로 _ 를 붙인다.
function _fetchMovie(payload) {
  const [title, type, year, page] = payload;
  const OMDB_API_KEY = "78b63013";
  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
