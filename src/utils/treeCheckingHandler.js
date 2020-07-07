export const processCheckingItem = (itemId, itemChecked) => {
  const handleUpdateTreeViewData = (flattenedTreeData) => {
    const children = getChildren(flattenedTreeData, itemId);

    // handle for children of checking item
    for (let i = 0; i < children.length; i++) {
      const dataItem = children[i];
      dataItem.checked = itemChecked;

      const { id } = dataItem;
      const dataItemChildren = getChildren(flattenedTreeData, id);

      if (dataItemChildren.length > 0) {
        updateCheckingForChildren(
          dataItemChildren,
          itemChecked,
          flattenedTreeData
        );
      }
    }

    const activeItem = flattenedTreeData.find((x) => x.id === itemId);
    if (activeItem) {
      activeItem.checked = itemChecked;
      const parentIds = getParentIds(flattenedTreeData, activeItem.parent);

      // handle for parent and upper of checking item
      for (let i = 0; i < parentIds.length; i++) {
        const parentItem = flattenedTreeData.find((x) => x.id === parentIds[i]);

        if (shouldChangeCheckingParent(flattenedTreeData, parentItem)) {
          parentItem.checked = !parentItem.checked;
        }
      }
    }
  };

  return handleUpdateTreeViewData;
};

const updateCheckingForChildren = (
  children,
  parentChecked,
  flattenedTreeData
) => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.checked = parentChecked;

    const itemChildren = getChildren(flattenedTreeData, child.id);

    if (itemChildren?.length) {
      updateCheckingForChildren(itemChildren, parentChecked, flattenedTreeData);
    }
  }
};

const shouldChangeCheckingParent = (flattenedTreeData, parent) => {
  const children = getChildren(flattenedTreeData, parent.id);
  if (children.length === 0) {
    return false;
  }

  const isCheckedAll =
    children.length === children.filter((x) => x.checked).length;

  return parent.checked !== isCheckedAll;
};

const getChildren = (flattenedTreeData, itemId) => {
  return flattenedTreeData?.filter((x) => x.parent === itemId) ?? [];
};

const getParentIds = (flattenedTreeData, itemParentId) => {
  const parents = [];
  const parentItem = flattenedTreeData?.find((x) => x.id === itemParentId);
  if (parentItem) {
    parents.push(parentItem.id);

    if (!!parentItem.parent) {
      parents.push(...getParentIds(flattenedTreeData, parentItem.parent));
    }
  }

  return parents;
};
