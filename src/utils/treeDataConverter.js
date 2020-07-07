export const convertToTreeData = (data, idField, nameField, childrenField, selectedIds) => {
  return data?.map(item => {
    const { [idField]: id, [nameField]: name, [childrenField]: children } = item;
    const treeItem = { id, name };
    const hasChildren = !!children?.length;

    if (hasChildren) {
      treeItem.children = convertToTreeData(children, idField, nameField, childrenField, selectedIds);
    }

    treeItem.checked = hasChildren
      ? treeItem.children.every(child => selectedIds.includes(child.id))
      : !!selectedIds?.includes(id);

    return treeItem;
  });
};

export const flattenTreeData = (treeData, level = 0, parent = null) => {
  const result = [];
  if (treeData?.length) {
    for (let i = 0; i < treeData.length; i++) {
      const { id, name, children, checked } = treeData[i];
      const convertedItem = { id, name, checked: !!checked, level, parent };
      result.push(convertedItem);

      if (children?.length) {
        const convertedChildren = flattenTreeData(children, level + 1, convertedItem.id);
        result.push(...convertedChildren);
      }
    }
  }

  return result;
};
