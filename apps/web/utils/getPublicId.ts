export const getPublicIdFromUrl = (url: string) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const folderPart = parts[parts.length - 2];
  const publicIdWithExtension = `${folderPart}/${lastPart}`;
  return publicIdWithExtension.split('.')[0];
};