import "./globals.css";
import { LayoutWrapper } from "@/app/components";
import { UIProvider } from "@/context/UIContext";

export const metadata = {
  title: "Trackey",
  description: "Trackey application with reusable layout architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UIProvider>
      </body>
    </html>
  );
}
