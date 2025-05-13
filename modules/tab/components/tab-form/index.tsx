'use client';

import { FunctionComponent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UIFormInput from '@/ui/components/input/form';
import UIFlex from '@/ui/components/flex';
import UIText from '@/ui/components/text';
import TabParticipantForm from '../tab-participant-form';
import { TabParticipantType } from '../../types/TabType';
import UIChip from '@/ui/components/chip';
import UIButton from '@/ui/components/button';
import UIHeading from '@/ui/components/heading';

interface TabFormProps {}

const schema = z.object({
  tab_total: z
    .string()
    .min(2, 'Preencha um valor total, você pode alterar depois :)'),
});

type FormFields = z.infer<typeof schema>;

const defaultValues: FormFields = {
  tab_total: '',
};

const TabForm: FunctionComponent<TabFormProps> = () => {
  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [participants, setParticipants] = useState<TabParticipantType[]>([]);

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
    console.log(data);
  };

  return (
    <UIFlex gap="6" direction="column" py="2">
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
      <UIFlex direction="column" gap="1" align="start">
        <UIText as="span" size="2" weight="medium" className="text-(--jade-12)">
          Quem tá junto?
        </UIText>
        <UIFlex gap="2" wrap="wrap">
          {participants.map((participant) => {
            return (
              <UIChip
                key={participant.id}
                label={participant.name}
                onDelete={() => removeParticipant(participant.id)}
              />
            );
          })}
          <TabParticipantForm addParticipant={addParticipant} />
        </UIFlex>
      </UIFlex>
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
