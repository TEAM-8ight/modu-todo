interface IlocalStorageHelper {
  getItem: (key: string) => any | null;
  setItem: (key: string, data: any) => void;
}

const localStorageHelper: IlocalStorageHelper = {
  getItem: key => {
    const data: string | null = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  },
  setItem: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
};
export default localStorageHelper;