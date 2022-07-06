import React from "react";

export default function BaseModal({ children }) {
  return (
    <div className="fixed inset-0 z-40 w-full h-full overflow-y-scroll sfondo">
      {children}
    </div>
  );
}
