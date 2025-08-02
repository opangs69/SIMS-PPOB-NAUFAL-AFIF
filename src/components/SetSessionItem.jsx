const setSessionItem = (key, value, minutesToExpire) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + minutesToExpire * 60 * 1000,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};

export default setSessionItem