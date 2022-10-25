import axios from "axios";
import _uniqBy from "lodash/uniqBy";

const _defaultMessage = "Search for the movie title!";

export default {
  // module!
  namespaced: true,
  // data!
  state: () => {
    return {
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {},
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
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
  },
  //// actions 는 비동기로 작동한다.(async await 안적어도)
  actions: {
    // payload ={ title, type, number, year}
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return;
      commit("updateState", {
        message: "",
        loading: true,
      });

      try {
        //Search movies..

        const res = await _fetchMovie({ ...payload, page: 1 });
        console.log("검색 결과 ", res);
        const { Search, totalResults } = res.data;
        // Search 를 위의 state 의 movies 리스트에 저장해야 한다.
        commit("updateState", {
          movies: _uniqBy(Search, "imdbID"), // 중복되는 ID 합치기
        });

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);
        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({ ...payload, page });

            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch ({ message }) {
        commit("updateState", {
          movies: [],
          message,
        });
      } finally {
        commit("updateState", { loading: false });
      }
    },

    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;
      commit("updateState", {
        theMovie: {},
        loading: true,
      });
      try {
        console.log("아이디로 검색중! ID: ", payload.id);
        const res = await _fetchMovie(payload);
        console.log("id검색으로 인한 res출력", res);
        commit("updateState", {
          theMovie: res.data,
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

async function _fetchMovie(payload) {
  return await axios.post("/.netlify/functions/movie", payload);
}
