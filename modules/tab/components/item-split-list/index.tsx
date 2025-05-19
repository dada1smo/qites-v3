import { FunctionComponent, useMemo } from 'react';
import UIDynamicList from '@/ui/components/dynamic-list';
import { TabSplitHook } from '../../hooks/use-tab-split';

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
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [split]
  );

  return <UIDynamicList items={items} />;
};

export default ItemSplitList;
