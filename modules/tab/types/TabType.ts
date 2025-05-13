export interface TabParticipantType {
  id: string;
  name: string;
}

export interface TabItemSplitType {
  participant_id: string;
  split_type: 'quantity' | 'fraction';
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
