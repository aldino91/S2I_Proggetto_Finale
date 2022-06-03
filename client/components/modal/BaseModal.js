import React from "react";

export default function BaseModal({ children }) {
  return (
    <div className="fixed inset-0 z-40 w-full h-full bg-white bg-opacity-50 border-4 border-teal-500">
      {children}
    </div>
  );
}
