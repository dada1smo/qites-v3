import UIButton from '@/ui/components/button';
import UIFlex from '@/ui/components/flex';
import UIHeading from '@/ui/components/heading';
import UIFormIncrementalInput from '@/ui/components/incremental-input/form';
import UIFormInput from '@/ui/components/input/form';
import UIFormSegmentedControl from '@/ui/components/segmented-control/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  item_name: z
    .string()
    .min(2, 'Preencha o nome do item')
    .max(50, 'O nome do item deve ter no máximo 50 caracteres'),
  item_value: z.string().min(2, 'Preencha um valor'),
  item_amount: z.coerce
    .number()
    .min(1, 'Preencha a quantidade')
    .max(100, 'A quantidade deve ser no máximo 100'),
  item_split_type: z.enum(['quantity', 'fraction'], {
    errorMap: () => ({ message: 'Selecione o tipo de divisão' }),
  }),
});

type FormFields = z.infer<typeof schema>;

interface TabItemFormProps {
  setOpen: (open: boolean) => void;
  itemId?: string;
}

const TabItemForm: FunctionComponent<TabItemFormProps> = ({
  setOpen,
  itemId,
}) => {
  const defaultValues: FormFields = {
    item_name: '',
    item_value: '',
    item_amount: 1,
    item_split_type: 'fraction',
  };

  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [splitType, setSplitType] = useState<'quantity' | 'fraction'>(
    defaultValues.item_split_type
  );

  const handleSplitTypeChange = (value: 'quantity' | 'fraction') => {
    setSplitType(value);
  };

  const submit = (data: FormFields) => {
    console.log(data);
  };

  console.log(splitType);

  return (
    <UIFlex gap="6" direction="column" pt="1" pb="4">
      {/* <UIHeading as="h2" size="5">
        Vamos começar com o básico
      </UIHeading> */}
      <UIFormInput
        name="item_name"
        label="O que foi consumido?"
        placeholder="Ex.: Litrão de Antárctica"
        control={control}
      />
      <UIFlex gap="4">
        <UIFormInput
          name="item_value"
          label="Qual o valor do item?"
          placeholder="0,00"
          control={control}
          mask="currency"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <UIFormIncrementalInput
          name="item_amount"
          label="E a quantidade?"
          control={control}
          min={1}
          max={100}
        />
      </UIFlex>
      <UIFormSegmentedControl
        name="item_split_type"
        label="Como dividir?"
        control={control}
        onFieldChange={handleSplitTypeChange}
        options={[
          { label: 'Por fração', value: 'fraction' },
          { label: 'Por quantidade', value: 'quantity' },
        ]}
      />
      <UIFlex gap="4" align="center" justify="center">
        <UIButton
          className="grow"
          variant="soft"
          size="3"
          onClick={() => setOpen(false)}
        >
          Voltar
        </UIButton>
        <UIButton
          type="submit"
          onClick={handleSubmit(submit)}
          size="3"
          className="!grow"
        >
          Pronto
        </UIButton>
      </UIFlex>
    </UIFlex>
  );
};

export default TabItemForm;
