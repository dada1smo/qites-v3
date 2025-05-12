'use client';

import UICardLink from '@/ui/components/card-link';
import UIFlex from '@/ui/components/flex';
import UIHeading from '@/ui/components/heading';
import UILayout from '@/ui/components/layout';
import { Receipt, UserSquare } from '@phosphor-icons/react';

export default function HomePage() {
  return (
    <UILayout>
      <UIFlex
        height="100%"
        direction="column"
        justify="center"
        gap="5"
        px="4"
        py="3"
        asChild
      >
        <main>
          <UIHeading as="h2">O que você gostaria de fazer?</UIHeading>
          <UICardLink
            href="/conta"
            title="Fechar conta"
            description="Pra dividir a contra entre todos"
            icon={<Receipt size={24} color="var(--accent-10)" />}
          />
          <UICardLink
            href="/conta"
            title="Comanda individual"
            description="Pra calcular apenas o seu consumo"
            icon={<UserSquare size={24} color="var(--accent-10)" />}
          />
        </main>
      </UIFlex>
    </UILayout>
  );
}
