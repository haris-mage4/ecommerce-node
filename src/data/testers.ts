// Tester Box configuration — adjust sizes and prices here
export interface TesterBoxOption {
  id: string;
  label: string;
  count: number;
  price: number;
}

export const testerSize = '5ml';

export const testerBoxOptions: TesterBoxOption[] = [
  { id: 'discovery', label: 'Discovery Box', count: 3, price: 1500 },
  { id: 'signature', label: 'Signature Box', count: 5, price: 2300 },
];

// Cart items for tester boxes link back to the builder on the home page
export const TESTER_BOX_ID_PREFIX = 'tester-box';
export const TESTER_BOX_HREF = '/#tester-box';
