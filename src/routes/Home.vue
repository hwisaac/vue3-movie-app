<template>
  <Headline />
  <Search />
  <MovieList />
  <!-- <MovieItem /> -->
</template>

<script>
import Headline from "~/components/Headline";
import Search from "~/components/Search";
import MovieList from "~/components/MovieList";
// import MovieItem from "~/components/MovieItem";
export default {
  components: {
    Headline,
    Search,
    MovieList,
    // MovieItem,
  },
};
</script>
