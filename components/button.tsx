"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export default function Button({
  children,
  leftComponent,
  rightComponent,
  ...props
}: ButtonProps) {
  return (
    <button
      className="inline-flex gap-2 items-center bg-primary px-4 py-2 rounded-full text-neutral-100 disabled:bg-neutral-200 disabled:cursor-not-allowed"
      {...props}
    >
      {leftComponent}
      <span>{children}</span>
      {rightComponent}
    </button>
  );
}
