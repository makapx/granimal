import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import Grid from "../components/layout/Grid";
import Card from "../components/common/Card";
import { useEffect, useState } from "react";
import { searchAnime } from "../api/anime.api";
import { AnimeFragment } from "../api/types";

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState<AnimeFragment[]>([]);
  useEffect(() => {
    if (!query) return;
    searchAnime({
      search: query,
      page: 1,
      size: 10,
    }).then((data) => {
      if (data) {
        setResults(data.result);
      }
    });
  }, [query]);

  return (
    <>
      <Header />
      <Container>
        <h1 className="p-5 pt-8 text-xl">You're looking for: {query}</h1>
        {!results || results.length === 0 && (
            <div className="p-5 text-lg">
              No results found
            </div>
          )}
        <Grid>
          {results && results.map((anime) => (
            <Card
              key={anime.id}
              title={anime.title}
              image={anime.coverImage}
              episode={anime.episodes}
              genres={anime.genres}
              url={`/anime/${anime.id}`}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Search;
