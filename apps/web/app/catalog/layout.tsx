import { Breadcrumbs } from "../../components/shared/Breadcrumbs";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-basic mx-auto">
      <Breadcrumbs />
      <main>
        {children}
      </main>
    </div>
  );
}