import { FunctionComponent } from 'react';
import { TabParticipantType } from '../../types/TabType';
import UIFlex from '@/ui/components/flex';
import UIText from '@/ui/components/text';
import UIChip from '@/ui/components/chip';
import TabParticipantForm from '../tab-participant-form';
import { getSingularOrPlural } from '@/utils/format/string';

interface TabParticipantControlProps {
  participants: TabParticipantType[];
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
}

const TabParticipantControl: FunctionComponent<TabParticipantControlProps> = ({
  participants,
  addParticipant,
  removeParticipant,
}) => {
  return (
    <UIFlex
      direction="column"
      gap="1"
      align="start"
      className="overflow-hidden"
    >
      <UIFlex gap="2" justify="between" width="100%">
        <UIText as="span" size="2" weight="medium" className="text-(--jade-12)">
          Quem tá junto?
        </UIText>
        <UIText as="span" size="2" className="text-(--slate-11)">
          ({getSingularOrPlural(participants.length, 'pessoa', 'pessoas', true)}
          )
        </UIText>
      </UIFlex>
      <UIFlex
        gap="2"
        wrap="wrap"
        className="max-w-full overflow-y-auto overflow-x-hidden"
      >
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
  );
};

export default TabParticipantControl;
