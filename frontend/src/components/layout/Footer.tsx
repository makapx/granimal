const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-base-100">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-neutral text-base-100 border-secondary">
        <aside className="items-center grid-flow-col">
          <p>
            Granimal <br />
            Made with ❤️
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
