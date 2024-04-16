import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import Grid from "../components/layout/Grid";
import { AnimeFragment } from "../api/types";
import { searchAnime } from "../api/anime.api";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";
import Footer from "../components/layout/Footer";

const Category = () => {
  const { name } = useParams();
  const [anime, setAnime] = useState<AnimeFragment[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!name) return;
    const fetchAnime = async () => {
      const data = await searchAnime({
        sort: "POPULARITY",
        page: 1,
        size: 15,
        genres: [name],
      });
      if (data) {
        setAnime(data.result);
      }
    };

    fetchAnime();
  }, [name]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <=
          document.documentElement.offsetHeight / 2 ||
        loading ||
        !name
      )
        return;
      setLoading(true);
      searchAnime({
        sort: "POPULARITY",
        page: anime.length / 15 + 1,
        size: 15,
        genres: [name],
      }).then((data) => {
        if (data) {
          setAnime([...anime, ...data.result]);
          setLoading(false);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
  }, [anime, name, loading]);

  return (
    <>
      <Header />
      <Container>
        <Grid>
          {anime &&
            anime.map((anime) => (
              <Card
                key={anime.id}
                title={anime.title}
                image={anime.coverImage}
                genres={anime.genres}
                episode={anime.episodes}
              />
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Category;