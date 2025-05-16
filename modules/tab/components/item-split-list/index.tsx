import { FunctionComponent, useMemo, useState } from 'react';
import { ItemSplitType, TabParticipantType } from '../../types/TabType';
import UIDynamicList from '@/ui/components/dynamic-list';
import useGlobalStore from '@/modules/global/store/global.store';

interface ItemSplitListProps {
  splitType: ItemSplitType;
}

const ItemSplitList: FunctionComponent<ItemSplitListProps> = ({
  splitType,
}) => {
  const participants = useGlobalStore((state) => state.tab?.participants) || [];

  const [splitParticipants, setSplitParticipants] =
    useState<TabParticipantType[]>(participants);

  const handleRemoveParticipant = (participantId: string) => {
    setSplitParticipants((prev) =>
      prev.filter((participant) => participant.id !== participantId)
    );
  };

  const items = useMemo(() => {
    return splitParticipants.map((participant) => {
      return {
        id: participant.id,
        title: participant.name,
        onRemove: handleRemoveParticipant,
      };
    });
  }, [splitParticipants]);

  return <UIDynamicList items={items} />;
};

export default ItemSplitList;
