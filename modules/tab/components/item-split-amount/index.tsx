import UIFormIncrementalInput from '@/ui/components/incremental-input/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TabSplitHook } from '../../hooks/use-tab-split';

const schema = z.object({ split_amount: z.coerce.number() });

interface ItemSplitAmountProps {
  participantId: string;
  dispatch: TabSplitHook['dispatch'];
  participantAmount: number;
  amountLeft: number;
}

type FormFields = z.infer<typeof schema>;

const ItemSplitAmount: FunctionComponent<ItemSplitAmountProps> = ({
  participantId,
  dispatch,
  participantAmount,
  amountLeft,
}) => {
  const defaultValues: FormFields = {
    split_amount: participantAmount,
  };

  const { control } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <UIFormIncrementalInput
      name="split_amount"
      control={control}
      min={0}
      max={participantAmount + amountLeft}
      width="fit"
      size="sm"
      variant="ghost"
      onFieldChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
          type: 'CHANGE_PARTICIPANT_AMOUNT',
          payload: { id: participantId, value: parseInt(e.target.value, 10) },
        });
      }}
    />
  );
};

export default ItemSplitAmount;
