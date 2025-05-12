import UILayout from '@/ui/components/layout';

export default function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UILayout pageTitle="Fechar conta">{children}</UILayout>;
}
