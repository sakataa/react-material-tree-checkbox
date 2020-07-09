export const getTreeInfo = (flattenedData) => {
  const selectedItems = [];
  const selectedNames = [];
  const selectedIds = [];

  // sample for this data structure [level, parentId, [selectedId1, selectedId2]]
  const selectedIdsByLevelAndParent = [];

  for (let i = 0; i < flattenedData.length; i++) {
    const item = flattenedData[i];
    const { id, name, checked, parent, level } = item;

    if (checked) {
      selectedItems.push(item);
      selectedIds.push(id);
      selectedNames.push(name);

      const itemByLevelAndParent = selectedIdsByLevelAndParent.find((x) => x[0] === level && x[1] === parent);
      if (itemByLevelAndParent) {
        itemByLevelAndParent[2].push(id);
      } else {
        selectedIdsByLevelAndParent.push([level, parent, [id]]);
      }
    }
  }

  return {
    selectedItems,
    selectedIds,
    selectedNames,
    selectedIdsByLevelAndParent,
  };
};
