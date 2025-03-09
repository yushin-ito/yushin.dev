import { ReactNode } from "react";

import Footer from "components/footer";
import Header from "components/header";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default ContentLayout;
