export const formatViews = (views) => {
  if (views > 1000000) {
    const formatedViews = Math.round(views / 100000) / 10;
    return formatedViews + "M";
  } else if (views > 1000) {
    const formatedViews = Math.round(views / 100) / 10;
    return formatedViews + "K";
  } else {
    return views;
  }
};

export const randomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
