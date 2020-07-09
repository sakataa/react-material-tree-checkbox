export const processCheckingItem = (itemId, itemChecked, level, cascadeChecking) => {
  const handleUpdateTreeViewData = (flattenedTreeData) => {
    const activeItem = flattenedTreeData.find((x) => x.id === itemId && x.level === level);
    if (!activeItem) {
      return;
    }

    activeItem.checked = itemChecked;
    if (!cascadeChecking) {
      return;
    }

    const children = getChildren(flattenedTreeData, itemId, level);

    // handle for children of checking item
    for (let i = 0; i < children.length; i++) {
      const dataItem = children[i];
      dataItem.checked = itemChecked;

      const { id, level: itemLevel } = dataItem;
      const dataItemChildren = getChildren(flattenedTreeData, id, itemLevel);

      if (dataItemChildren.length > 0) {
        updateCheckingForChildren(dataItemChildren, itemChecked, flattenedTreeData);
      }
    }

    const parents = getParents(flattenedTreeData, activeItem.parent, activeItem.level);

    // handle for parent and upper of checking item
    for (let i = 0; i < parents.length; i++) {
      const parentItem = parents[i];

      if (shouldChangeCheckingParent(flattenedTreeData, parentItem)) {
        parentItem.checked = !parentItem.checked;
      }
    }
  };

  return handleUpdateTreeViewData;
};

const updateCheckingForChildren = (children, parentChecked, flattenedTreeData) => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.checked = parentChecked;

    const itemChildren = getChildren(flattenedTreeData, child.id, child.level);

    if (itemChildren?.length) {
      updateCheckingForChildren(itemChildren, parentChecked, flattenedTreeData);
    }
  }
};

const shouldChangeCheckingParent = (flattenedTreeData, parent) => {
  const children = getChildren(flattenedTreeData, parent.id, parent.level);
  if (children.length === 0) {
    return false;
  }

  const isCheckedAll = children.length === children.filter((x) => x.checked).length;

  return parent.checked !== isCheckedAll;
};

const getChildren = (flattenedTreeData, itemId, parentLevel) => {
  return flattenedTreeData?.filter((x) => x.parent === itemId && x.level === parentLevel + 1 && !x.disabled) ?? [];
};

const getParents = (flattenedTreeData, itemParentId, itemLevel) => {
  const parents = [];

  if (itemLevel > 0) {
    const parentItem = flattenedTreeData?.find(
      (x) => x.id === itemParentId && x.level === itemLevel - 1 && !x.disabled
    );
    if (parentItem) {
      parents.push(parentItem);

      if (!!parentItem.parent) {
        parents.push(...getParents(flattenedTreeData, parentItem.parent, parentItem.level));
      }
    }
  }

  return parents;
};
