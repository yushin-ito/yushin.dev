import { siteConfig } from "@/config/site";

const ContentFooter = () => {
  return (
    <div className="h-6">
      <p className="text-center text-xs text-muted-foreground md:text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          {siteConfig.name}
        </a>{" "}
        All rights reserved.
      </p>
    </div>
  );
};

export default ContentFooter;
