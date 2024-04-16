import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import Grid from "../components/layout/Grid";
import Card from "../components/common/Card";
import { useEffect, useState } from "react";
import { searchAnime } from "../api/anime.api";
import { AnimeFragment, AnimeSearchParams, AnimeSearchResult } from "../api/types";

function parseSearchParams(params: URLSearchParams): Partial<AnimeSearchParams> {
  const result = [...params.entries()].reduce((next, [key, value]) => ({ ...next, [key]: value }), {}) as Partial<AnimeSearchParams>;
  return result;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<AnimeSearchResult | undefined>(undefined);

  const { search = undefined, page = 1, size = 10, genres = undefined, sort = 'SCORE', year = undefined, season = undefined } = parseSearchParams(searchParams);
  useEffect(() => {
    if (searchParams.size === 0) return;
    setResults(undefined);
    searchAnime({
      search, page, size, genres, sort, year, season
    }).then(setResults);
  }, [searchParams]);

  const scrollPage = (direction: number) => () => setSearchParams(prev => {
    const next = new URLSearchParams(prev)
    prev.set('page', (Number(page) + direction).toString())
    return prev;
  })

  const renderResults = ({ hasNext, result }: AnimeSearchResult) => {
    if (result.length) {
      return (<>
        <Grid>
          {result.map((anime) => (
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
        <div className="flex my-4 mx-2">
          <button className="btn w-40" disabled={page <= 1} onClick={scrollPage(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <span>Previous page</span>
          </button>
          <div className="flex-grow"></div>
          <button className="btn w-40" disabled={!hasNext} onClick={scrollPage(+1)}>
            <span>Next page</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </>)
    }
    else {
      return (<>
        <div className="p-5 text-lg">
          No results found
        </div>
      </>)
    }
  }

  return (
    <>
      <Header />
      <Container>
        {search && <h1 className="p-5 pt-8 text-xl">You're looking for: {search}</h1>}
        {genres && <h1 className="p-5 pt-8 text-xl">You're looking for genre: {genres}</h1>}

        {results && renderResults(results)}
        {!results && (<>
          <div className="min-h-[66vh] flex items-center justify-center flex-col scale-[200%]">
            <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
        </>)}

      </Container>
      <Footer />
    </>
  );
};

export default Search;
