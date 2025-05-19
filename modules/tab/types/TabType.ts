export interface TabParticipantType {
  id: string;
  name: string;
}

export type ItemSplitType = 'quantity' | 'fraction';

export interface TabItemSplitType {
  participant: TabParticipantType;
  split_type: ItemSplitType;
  split_value: number;
}

export interface TabItemType {
  id: string;
  name: string;
  value: number;
  quantity: number;
  split: TabItemSplitType[];
}

export interface TabType {
  id: string;
  total: number;
  items: TabItemType[];
  participants: TabParticipantType[];
}
