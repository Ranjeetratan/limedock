import type { Metadata } from "next";
import NewPresentationPage from "./page-client";

export const metadata: Metadata = {
  title: "New presentation",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <NewPresentationPage />;
}
