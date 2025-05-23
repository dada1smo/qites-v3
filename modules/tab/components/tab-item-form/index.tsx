'use client';

import UIButton from '@/ui/components/button';
import UIFlex from '@/ui/components/flex';
import UIFormIncrementalInput from '@/ui/components/incremental-input/form';
import UIFormInput from '@/ui/components/input/form';
import UIFormSegmentedControl from '@/ui/components/segmented-control/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useGlobalStore from '@/modules/global/store/global.store';
import useTabSplit from '../../hooks/use-tab-split';
import {
  ItemSplitType,
  TabItemSplitType,
  TabItemType,
} from '../../types/TabType';
import ItemSplitList from '../item-split-list';
import UIText from '@/ui/components/text';
import { getSingularOrPlural } from '@/utils/format/string';
import { formatCurrency } from '@/utils/format/currency';

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

export interface ItemFormOutput extends FormFields {
  split: TabItemSplitType[];
}

interface TabItemFormProps {
  setOpen: (open: boolean) => void;
  selectedItem: TabItemType | null;
}

const TabItemForm: FunctionComponent<TabItemFormProps> = ({
  setOpen,
  selectedItem,
}) => {
  const participants = useGlobalStore((state) => state.tab?.participants) || [];
  const createItem = useGlobalStore((state) => state.createItem);
  const updateItem = useGlobalStore((state) => state.updateItem);

  const defaultValues: FormFields = {
    item_name: selectedItem?.name || '',
    item_value: selectedItem?.value.toString() || '',
    item_amount: selectedItem?.quantity || 1,
    item_split_type: selectedItem?.split[0]?.split_type || 'fraction',
  };

  const { control, handleSubmit, watch } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { split, dispatch } = useTabSplit({
    participants,
    initialSplitType: defaultValues.item_split_type,
    totalAmount: defaultValues.item_amount,
    selectedItem,
  });

  const watchItemValue = watch('item_value');

  const submit = (data: FormFields) => {
    if (selectedItem) {
      updateItem(selectedItem.id, {
        ...data,
        split: split.participants.map((participant) => ({
          ...participant,
          split_type: data.item_split_type,
        })),
      });
    } else {
      createItem({
        ...data,
        split: split.participants.map((participant) => ({
          ...participant,
          split_type: data.item_split_type,
        })),
      });
    }
    setOpen(false);
  };

  return (
    <UIFlex
      gap="6"
      direction="column"
      pt="1"
      pb="6"
      className="w-full overflow-hidden relative max-h-full"
    >
      <UIFormInput
        name="item_name"
        label="O que foi consumido?"
        placeholder="Ex.: Litrão de Antárctica"
        control={control}
      />
      <UIFlex gap="1" direction="column">
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
            onFieldChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: 'SET_TOTAL_AMOUNT',
                payload: parseInt(e.target.value, 10),
              });
            }}
          />
        </UIFlex>
        <UIText as="span" size="2" className="text-(--slate-11)">
          Valor total:{' '}
          {watchItemValue
            ? formatCurrency(parseFloat(watchItemValue) * split.totalAmount)
            : 'R$ 0,00'}
        </UIText>
      </UIFlex>
      <UIFlex gap="2" direction="column" className="overflow-hidden relative">
        <UIFlex gap="1" direction="column">
          <UIFlex gap="2" justify="between" width="100%">
            <UIText
              as="span"
              size="2"
              weight="medium"
              className="text-(--jade-12)"
            >
              Como dividir?
            </UIText>
            <UIText as="span" size="2" className="text-(--slate-11)">
              (
              {getSingularOrPlural(
                split.participants.length,
                'pessoa',
                'pessoas',
                true
              )}
              )
            </UIText>
          </UIFlex>
          <UIFormSegmentedControl
            name="item_split_type"
            control={control}
            onFieldChange={(value: ItemSplitType) => {
              dispatch({
                type: 'SET_SPLIT_TYPE',
                payload: value,
              });
            }}
            options={[
              { label: 'Igualmente', value: 'fraction' },
              { label: 'Por quantidade', value: 'quantity' },
            ]}
          />
        </UIFlex>
        <ItemSplitList split={split} dispatch={dispatch} />
      </UIFlex>
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
