import { AnimeFragment } from "./types";

const getFeatured = async () => {
  return await import("./mock/getFeatured.mock").then((module) =>
    module.default() as AnimeFragment[]
  );
};
export default getFeatured;