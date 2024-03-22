const getFeatured = async () => {
  return await import("./mock/getFeatured.mock").then((module) =>
    module.default()
  );
};
export default getFeatured;