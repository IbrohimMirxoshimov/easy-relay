import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type MainStorageState = {
  auto_refresh: boolean;
  interval: number;
  open_info_bottom: boolean;
  top_increase_price: number;
  auto_book: boolean;
};

type ThemeStorage = BaseStorage<MainStorageState> & {
  update: (payload: Partial<MainStorageState>) => Promise<void>;
};

const storage = createStorage<MainStorageState>(
  'main-s',
  {
    auto_refresh: false,
    interval: 5,
    open_info_bottom: true,
    top_increase_price: 50,
    auto_book: false,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// You can extend it with your own methods
export const mainStorage: ThemeStorage = {
  ...storage,
  update: async payload => {
    const data = await storage.get();
    await storage.set({
      ...data,
      ...payload,
    });
  },
};
