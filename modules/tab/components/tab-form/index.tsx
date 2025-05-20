'use client';

import { FunctionComponent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UIFormInput from '@/ui/components/input/form';
import UIFlex from '@/ui/components/flex';
import { TabParticipantType } from '../../types/TabType';
import UIButton from '@/ui/components/button';
import UIHeading from '@/ui/components/heading';
import TabParticipantControl from '../tab-participant-control';
import useGlobalStore from '@/modules/global/store/global.store';
import { formatCurrencyToFloat, formatFloat } from '@/utils/format/number';
import { useSheet } from '@/ui/providers/SheetProvider';

const schema = z.object({
  tab_total: z
    .string()
    .min(2, 'Preencha um valor total, você pode alterar depois :)'),
});

type FormFields = z.infer<typeof schema>;

const TabForm: FunctionComponent = () => {
  const initTab = useGlobalStore((state) => state.initTab);
  const updateTabData = useGlobalStore((state) => state.updateTabData);
  const tab = useGlobalStore((state) => state.tab);

  const defaultValues: FormFields = {
    tab_total: formatFloat(tab?.total) || '',
  };

  const { closeSheet } = useSheet();

  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [participants, setParticipants] = useState<TabParticipantType[]>(
    tab?.participants || []
  );

  const addParticipant = (name: string) => {
    if (name.length < 2) return;

    if (
      participants.some(
        (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    )
      return;

    const newParticipant = {
      id: crypto.randomUUID(),
      name,
    };

    setParticipants((prev) => [...prev, newParticipant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const submit = (data: FormFields) => {
    if (!tab?.id) {
      initTab(formatCurrencyToFloat(data.tab_total), participants);
    } else {
      updateTabData(formatCurrencyToFloat(data.tab_total), participants);
    }

    closeSheet();
  };

  return (
    <UIFlex
      gap="6"
      direction="column"
      pt="2"
      pb="4"
      className="overflow-hidden max-h-full"
    >
      <UIHeading as="h2" size="5">
        Vamos começar com o básico
      </UIHeading>
      <UIFormInput
        name="tab_total"
        label="Qual foi o total da conta?"
        placeholder="0,00"
        control={control}
        mask="currency"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <TabParticipantControl
        addParticipant={addParticipant}
        removeParticipant={removeParticipant}
        participants={participants}
      />
      <UIButton
        type="submit"
        disabled={participants.length === 0}
        onClick={handleSubmit(submit)}
        size="3"
      >
        Pronto
      </UIButton>
    </UIFlex>
  );
};

export default TabForm;
