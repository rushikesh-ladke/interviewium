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
