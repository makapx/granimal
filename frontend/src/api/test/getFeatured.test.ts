import getFeaturedMock from "../mock/getFeatured.mock";
import getFeatured from "../getFeatured";

describe("getFeaturedApi", () => {
    it("should return featured products", async () => {
        const result = await getFeatured();
        expect(result).toEqual(getFeaturedMock());
    });
});
