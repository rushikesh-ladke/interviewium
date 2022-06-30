import notification from 'antd/lib/notification';

export const saveToLocalStorage = (data: any) => {
  try {
    for (var key in data) {
      window.localStorage.setItem(key, data[key]);
    }
  } catch {
    notification['error']({
      message: 'Error',
      description: 'Something went wrong',
    });
  }
};

export const getStringifiedLocalStorageData = (key: any) => {
  let data: any = localStorage.getItem(key);
  try {
    return (data = JSON.parse(data));
  } catch {
    console.error('something went wrong in getStringifiedLocalStorageData');
    return data;
  }
};
