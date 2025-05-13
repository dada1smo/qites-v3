'use client';

import UIForm from '@/ui/components/form';
import UIFormInput from '@/ui/components/input/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface TabParticipantFormProps {
  addParticipant: (name: string) => void;
}

const schema = z.object({
  participant_name: z
    .string()
    .min(2, 'Nome precisa ter pelo menos dois caracteres.'),
});

type FormFields = z.infer<typeof schema>;

const defaultValues: FormFields = {
  participant_name: '',
};

const TabParticipantForm: FunctionComponent<TabParticipantFormProps> = ({
  addParticipant,
}) => {
  const { control, reset, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleAddParticipant = (name: string) => {
    addParticipant(name);
    reset(defaultValues);
  };

  const submit = (data: FormFields) => {
    handleAddParticipant(data.participant_name);
  };

  return (
    <UIForm onSubmit={handleSubmit(submit)}>
      <UIFormInput
        name="participant_name"
        placeholder="Nome"
        control={control}
        onFieldBlur={handleAddParticipant}
        width="fit"
      />
    </UIForm>
  );
};

export default TabParticipantForm;
