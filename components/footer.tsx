import { site } from "config/site";

const Footer = () => {
  return (
    <footer className="py-2">
      <p className="text-center text-xs text-muted-foreground md:text-sm">
        &copy;2025{" "}
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-1"
        >
          yushin
        </a>{" "}
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
