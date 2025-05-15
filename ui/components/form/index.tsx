import { FormEventHandler, FunctionComponent, ReactNode } from 'react';
import UIFlex from '../flex';

interface UIFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  className?: string;
  children: ReactNode;
}

const UIForm: FunctionComponent<UIFormProps> = ({
  onSubmit,
  className,
  children,
}) => {
  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <UIFlex direction="column" gap="6">
        {children as ReactNode}
      </UIFlex>
    </form>
  );
};

export default UIForm;
