export const getTreeInfo = flattenedData => {
  const selectedItems = [];
  const selectedIds = [];
  const selectedNames = [];

  for (let i = 0; i < flattenedData.length; i++) {
    const item = flattenedData[i];
    const { id, name, checked } = item;

    if (checked) {
      selectedItems.push(item);
      selectedIds.push(id);
      selectedNames.push(name);
    }
  }

  return {
    selectedItems,
    selectedIds,
    selectedNames,
  };
};
