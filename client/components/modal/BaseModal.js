import React from "react";

export default function BaseModal({ children }) {
  return (
    <div className="fixed inset-0 z-40 w-full h-full bg-white border-4 border-green-500 bg-opacity-80">
      {children}
    </div>
  );
}
