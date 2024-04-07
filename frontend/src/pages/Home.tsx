import Header from "../components/layout/Header";
import Hero from "../components/pages/home/Hero";
import getFeatured from "../api/getFeatured";
import Container from "../components/layout/Container";
import { useEffect, useState } from "react";
import ImageCard from "../components/common/ImageCard";
import Toplist from "../components/Toplist";
import { AnimeFragment } from "../api/types";

const Home = () => {
  const [featured, setFeatured] = useState<AnimeFragment[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await getFeatured();
      setFeatured(data);
    };
    fetchFeatured();
  }, []);


  return (
    <>
      <Header />
      <Hero />

      <Toplist media={featured} />
      <Container children={
        featured.map((item) => (
          <ImageCard imgsrc={item.coverImage ?? ""}>
            <h1 className="text-xl font-bold mb-2">{item.title}</h1>
            <div className="card-actions bg-transparent justify-end">
              {item.genres &&
                item.genres.slice(0, 3).map((genre) => (
                  <div key={genre} className="badge badge-secondary text-base-100">
                    {genre}
                  </div>
                ))}
            </div>
          </ImageCard>
        ))
      } />
    </>
  );
};

export default Home;