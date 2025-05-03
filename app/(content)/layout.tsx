import { ReactNode } from "react";

import CotentFooter from "@/components/content-footer";
import ContentHeader from "@/components/content-header";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header>
        <ContentHeader />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <CotentFooter />
      </footer>
    </div>
  );
};

export default ContentLayout;
