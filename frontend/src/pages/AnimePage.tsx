import { useEffect, useState } from "react";
import { Anime } from "../api/types";
import { getAnimeMock } from "../api/mock/getAnime.mock";
import Header from "../components/layout/Header";
import ImageCard from "../components/common/ImageCard";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { getAnime } from "../api/anime.api";
import ListDialog from "../components/dialogs/ListDialog";

function formatDate(date: string) {
  return (
    dayjs(date).format('D MMM, YYYY')
  );
}

export default function () {
  const [anime, setAnime] = useState<Anime>(getAnimeMock() as Anime);
  const { id: animeId } = useParams();
  useEffect(() => {
    if (animeId !== undefined) {
      getAnime(Number(animeId)).then(anime => setAnime(anime));
    }
  }, [animeId]);
  return (
    <>
      <Header />
      <div className="relative">
        <img src={anime.bannerImage} className="h-96 w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="flex flex-col gap-4 col-span-12 md:col-span-4 lg:col-span-3">
            <div className="relative h-24">
              <div className="absolute bottom-0 w-full">

                <img src={anime.coverImage} className=" rounded mx-auto max-h-60 sm:max-h-96" alt="" />
              </div>
            </div>
            <ListDialog anime={anime} />
          </div>

          <div className="col-span-12 p-2 md:col-span-8 lg:col-span-9">
            <h1 className="my-3.5 font-bold" >{anime.title} </h1>
            <p dangerouslySetInnerHTML={{ __html: anime.description }}></p>
          </div>
          <div className=" flex flex-col gap-4 bg-primary-content/30 col-span-12 md:col-span-4 lg:col-span-3 p-4">
            {anime.format && <div>
              <div className="font-bold"> Format </div>
              <div > {anime.format} </div>
            </div>}
            {anime.season && <div>
              <div className="font-bold"> Season </div>
              <div > {anime.season} {anime.seasonYear} </div>
            </div>}

            {anime.episodes && <div>
              <div className="font-bold"> Episodes </div>
              <div > {anime.episodes}, {anime.status} </div>
            </div>}
            {anime.startDate && <div>
              <div className="font-bold"> Date </div>
              <div > {formatDate(anime.startDate)}{anime.endDate && <> - {formatDate(anime.endDate)}</>} </div>
            </div>}
            {anime.score && <div>
              <div className="font-bold"> Score </div>
              <div > {anime.score} % </div>
            </div>}
            {anime.studios && <div>
              <div className="font-bold"> Studios </div>
              <div > {anime.studios.map(studio => <>{studio}<br /></>)} </div>
            </div>}
            {anime.synonyms && <div>
              <div className="font-bold"> Synonyms </div>
              <div > {anime.synonyms.map(synonyms => <>{synonyms}<br /></>)} </div>
            </div>}
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 ">

            <div className="font-bold mb-4 mt-2">Related</div>
            <div className="grid grid-cols-6 m-2 gap-4 md:gap-2 grid-auto-rows">
              {
                anime.relations.map(anime =>
                  <Link to={'/anime/' + anime.id} className="col-span-3 md:col-span-2 lg:col-span-1">
                    <ImageCard imgsrc={anime.coverImage}>
                      <span className="text-sm">{anime.title}</span>
                    </ImageCard>
                  </Link>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}