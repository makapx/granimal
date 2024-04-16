import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import LoginForm from "../components/pages/auth/LoginForm";
const Login = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="bg-gradient-to-tr from-accent via-secondary to-accent blur-3xl absolute w-full h-full top-0 left-0 -z-10">
        </div>
        <LoginForm />
      </Container>
      <Footer />
    </>
  );
};

export default Login;
