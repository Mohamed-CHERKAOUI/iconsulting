import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Cybersecurity, audit and digital transformation insights from iConsulting.",
  openGraph: {
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630
      }
    ]
  }
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
