import {View, Text, Dimensions} from 'react-native';
import React, {PropsWithChildren, createContext, useState} from 'react';
import BottomSheet from '../components/BottomSheet';

const {height: windowHeight} = Dimensions.get('window');

export interface bottomSheetProps {
  open: boolean;
  height: number;
}

interface bottomSheetContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<bottomSheetProps>>;
  toggleSheet: ({open, height}: bottomSheetProps) => void | undefined;
}

export const BottomSheetContext = createContext<bottomSheetContext>({
  open: false,
  setOpen: () => {},
  toggleSheet: ({open, height}) => {},
});

type bottomSheetProviderProps = PropsWithChildren<{
  children: React.JSX.Element;
}>;

const BottomSheetProvider = ({children}: bottomSheetProviderProps) => {
  const [isOpen, setOpen] = useState<bottomSheetProps>({
    open: false,
    height: 0,
  });

  const toggleSheet = ({open, height}: bottomSheetProps) => {
    setOpen(prev => ({...prev, open: !open, height: windowHeight * height}));
  };

  return (
    <BottomSheetContext.Provider
      value={{open: isOpen.open, setOpen, toggleSheet}}>
      {isOpen.open && (
        <BottomSheet
          setOpen={setOpen}
          open={isOpen.open}
          sheetHeight={isOpen.height}
        />
      )}
      {children}
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
