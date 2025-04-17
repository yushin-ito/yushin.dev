import { ReactNode } from "react";

import Icons from "@/components/icons";

interface CalloutProps {
  type?: "note" | "tip" | "warning";
  children?: ReactNode;
}

const Callout = ({ type = "note", children }: CalloutProps) => {
  if (type === "note") {
    return (
      <div className="relative my-4 space-y-2 rounded-md bg-blue-50 px-6 pb-4 pt-2">
        <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-blue-600" />
        <div className="flex items-center space-x-1">
          <Icons.note className="text-lg text-blue-600" />
          <p className="text-lg font-semibold text-blue-600">Info</p>
        </div>
        <div className="text-sm leading-relaxed text-blue-900">{children}</div>
      </div>
    );
  }

  if (type === "tip") {
    return (
      <div className="relative my-4 space-y-2 rounded-md bg-green-50 px-6 pb-4 pt-2">
        <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-green-600" />
        <div className="flex items-center space-x-1">
          <Icons.tip className="text-lg text-green-600" />
          <p className="text-lg font-semibold text-green-600">Tip</p>
        </div>
        <div className="text-sm leading-relaxed text-green-900">{children}</div>
      </div>
    );
  }

  if (type === "warning") {
    return (
      <div className="relative my-4 space-y-2 rounded-md bg-yellow-50 px-6 pb-4 pt-2">
        <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-yellow-700" />
        <div className="flex items-center space-x-1">
          <Icons.alert className="text-lg text-yellow-700" />
          <p className="text-lg font-semibold text-yellow-700">Warning</p>
        </div>
        <div className="text-sm leading-relaxed text-yellow-900">
          {children}
        </div>
      </div>
    );
  }

  return null;
};

export default Callout;
