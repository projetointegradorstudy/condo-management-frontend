import Cookie from 'js-cookie';

interface Storage {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
  remove: (key: string) => void;
}

const storage = {} as Storage;

try {
  if (!window.localStorage) {
    throw Error('no local storage');
  }

  storage.set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  storage.get = (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item ?? '');
    } catch (e) {
      return null;
    }
  };
  storage.remove = (key) => localStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.get = Cookie.get;
  storage.remove = Cookie.remove;
}

export default storage;
