export const convertToTreeData = (
  data,
  idField,
  nameField,
  childrenField,
  selectedIds,
  disabledIds,
  disabledLevels,
  cascadeChecking,
  level = 0
) => {
  return data?.map((item) => {
    const {
      [idField]: id,
      [nameField]: name,
      [childrenField]: children,
    } = item;
    const treeItem = {
      id,
      name,
      level,
      disabled:
        !!disabledIds?.includes(id) || !!disabledLevels?.includes(level),
    };
    const hasChildren = !!children?.length;

    if (hasChildren) {
      treeItem.children = convertToTreeData(
        children,
        idField,
        nameField,
        childrenField,
        selectedIds,
        disabledIds,
        disabledLevels,
        cascadeChecking,
        level + 1
      );
    }

    treeItem.checked =
      !treeItem.disabled &&
      (cascadeChecking && hasChildren
        ? treeItem.children.every((child) => selectedIds.includes(child.id))
        : !!selectedIds?.includes(id));

    return treeItem;
  });
};

export const flattenTreeData = (treeData, level = 0, parent = null) => {
  const result = [];
  if (treeData?.length) {
    for (let i = 0; i < treeData.length; i++) {
      const { id, name, children, checked, disabled } = treeData[i];
      const convertedItem = {
        id,
        name,
        checked: !!checked,
        level,
        parent,
        disabled,
      };
      result.push(convertedItem);

      if (children?.length) {
        const convertedChildren = flattenTreeData(
          children,
          level + 1,
          convertedItem.id
        );
        result.push(...convertedChildren);
      }
    }
  }

  return result;
};
