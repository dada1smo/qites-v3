import useGlobalStore from '@/modules/global/store/global.store';
import UIButton from '@/ui/components/button';
import UIDataList from '@/ui/components/data-list';
import UIFlex from '@/ui/components/flex';
import { useSheet } from '@/ui/providers/SheetProvider';
import { formatCurrency } from '@/utils/format/currency';
import { getSingularOrPlural } from '@/utils/format/string';
import { FunctionComponent } from 'react';

const TabData: FunctionComponent = () => {
  const tabTotal = useGlobalStore((state) => state.tab?.total);
  const participantsLength =
    useGlobalStore((state) => state.tab?.participants)?.length || 0;

  const { openSheet } = useSheet();

  return (
    <UIFlex direction="column" gap="3">
      <UIDataList
        list={[
          {
            label: 'Total',
            value: formatCurrency(tabTotal || ''),
          },
          {
            label: 'Participantes',
            value: getSingularOrPlural(
              participantsLength,
              'pessoa',
              'pessoas',
              true
            ),
          },
        ]}
      />
      <UIFlex gap="4" align="center" justify="center">
        <UIButton className="grow" variant="soft" size="3" onClick={openSheet}>
          Editar dados
        </UIButton>
        <UIButton className="!grow" size="3">
          Ver pagamentos
        </UIButton>
      </UIFlex>
    </UIFlex>
  );
};

export default TabData;
