import type { ReactNode } from "react";

type PageFrameProps = {
  variant: string;
  children: ReactNode;
};

export default function PageFrame({ variant, children }: PageFrameProps) {
  return (
    <div className={`page-frame page-frame-${variant}`}>
      <div className="paper-grain" aria-hidden="true" />
      <div className="frame-line frame-line-top" aria-hidden="true" />
      <div className="frame-line frame-line-bottom" aria-hidden="true" />
      <div className="frame-corner corner-top-left" aria-hidden="true" />
      <div className="frame-corner corner-top-right" aria-hidden="true" />
      <div className="frame-corner corner-bottom-left" aria-hidden="true" />
      <div className="frame-corner corner-bottom-right" aria-hidden="true" />
      {children}
    </div>
  );
}
