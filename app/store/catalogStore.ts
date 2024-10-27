import { create } from 'zustand'

const useCatalogStore = create((set) => ({
  catalog: {},

  setCatalog: (newCatalog: object) => set(() => ({ catalog: newCatalog })),
}))

export default useCatalogStore