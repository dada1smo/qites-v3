import { FunctionComponent, useMemo } from 'react';
import UIDynamicList from '@/ui/components/dynamic-list';
import { TabSplitHook } from '../../hooks/use-tab-split';
import UIText from '@/ui/components/text';
import ItemSplitAmount from '../item-split-amount';

interface ItemSplitListProps {
  split: TabSplitHook['split'];
  dispatch: TabSplitHook['dispatch'];
}

const ItemSplitList: FunctionComponent<ItemSplitListProps> = ({
  split,
  dispatch,
}) => {
  const items = useMemo(
    () =>
      split.participants.map((participant) => {
        return {
          id: participant.participant.id,
          title: participant.participant.name,
          onRemove: () =>
            dispatch({
              type: 'REMOVE_PARTICIPANT',
              payload: participant.participant.id,
            }),
          endContent:
            split.type === 'fraction' ? (
              <UIText className="font-space-mono">
                1 / {split.participants.length}
              </UIText>
            ) : (
              <ItemSplitAmount
                participantId={participant.participant.id}
                dispatch={dispatch}
                participantAmount={participant.split_amount}
                amountLeft={split.amountLeft}
              />
            ),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [split]
  );

  return <UIDynamicList items={items} />;
};

export default ItemSplitList;
