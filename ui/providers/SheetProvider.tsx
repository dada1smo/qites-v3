'use client';

import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface SheetProviderProps {
  children: ReactNode;
}

interface SheetContextProps {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextProps | null>(null);

const UISheetProvider: FunctionComponent<SheetProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSheet = () => setIsOpen(true);

  const closeSheet = () => setIsOpen(false);

  const contextValue = {
    isOpen,
    openSheet,
    closeSheet,
  };

  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  );
};

function useSheet() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error(
      'useSheet deve ser usado num componente filho ao SheetProvider'
    );
  }
  return context;
}

export { UISheetProvider, useSheet };
