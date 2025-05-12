'use client';

import UIBox from '@/ui/components/box';
import UIForm from '@/ui/components/form';
import UIBaseInput from '@/ui/components/input/base';
import { FunctionComponent } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UIFormInput from '@/ui/components/input/form';

interface TabFormProps {}

const schema = z.object({
  tab_total: z
    .string()
    .min(2, 'Preencha pelo menos dois caracteres para pesquisar.'),
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

  const submit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <UIBox py="3">
      <UIForm onSubmit={handleSubmit(submit)}>
        <UIFormInput
          name="tab_total"
          label="Valor total"
          placeholder="0,00"
          control={control}
          mask="currency"
          inputMode="currency"
        />
      </UIForm>
    </UIBox>
  );
};

export default TabForm;
