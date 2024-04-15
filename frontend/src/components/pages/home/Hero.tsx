import { Link } from "react-router-dom";
import Button from "../../common/Button";

const Hero = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-tr from-accent via-secondary to-accent blur-3xl h-screen w-screen"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="mt-5 max-w-2xl">
                <h1 className="block font-semibold text-neutral text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Granimal
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className="text-lg text-neutral">
                  Track all your favorite anime, all in one place. Granimal is a
                  platform that allows you to keep track of all your favorite
                  anime. You can also discover new ones and share your thoughts
                  with other users.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center flex-col md:flex-row align-center">
                <Link to="/login" className="md:w-1/3">
                  <Button
                   className="w-full justify-center"
                    variant="primary"
                    text="Sign to your account"
                  />
                </Link>
                <Button
                  className="md:w-1/3 justify-center"
                  variant="secondary"
                  text="Continue without an account"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
