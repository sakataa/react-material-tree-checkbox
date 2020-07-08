import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TreeViewCheckBoxList from './TreeViewCheckBoxList';

import { convertToTreeData, flattenTreeData } from '../utils/treeDataConverter';
import { getTreeInfo } from '../utils/treeDataUtils';
import { processCheckingItem } from '../utils/treeCheckingHandler';

const TreeViewCheckBoxContainer = (props) => {
  const {
    data,
    onCheck,
    idField,
    nameField,
    childrenFieldName,
    selectedIds,
    disabledIds,
    disabledLevels,
    needToConvertEntry,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const flattenedTreeData = useRef([]);

  const handleCheckTreeItem = (item) => {
    const { id, checked, level } = item;
    const handleChecking = processCheckingItem(id, checked, level);
    handleChecking(flattenedTreeData.current);

    const treeInfo = getTreeInfo(flattenedTreeData.current);
    const {
      selectedIds: newSelectedIds,
      selectedItems,
      selectedIdsByLevelAndParent,
    } = treeInfo;

    onCheck(
      newSelectedIds,
      selectedItems,
      selectedIdsByLevelAndParent,
      flattenedTreeData.current
    );
  };

  useEffect(() => {
    const treeData = needToConvertEntry
      ? convertToTreeData(
          data,
          idField,
          nameField,
          childrenFieldName,
          selectedIds,
          disabledIds,
          disabledLevels
        )
      : data;

    flattenedTreeData.current = flattenTreeData(treeData);
    setDataSource(treeData);
  }, [
    data,
    needToConvertEntry,
    idField,
    nameField,
    childrenFieldName,
    selectedIds,
    disabledIds,
    disabledLevels,
  ]);

  const expandedIds = flattenedTreeData.current.map(
    (x) => `${x.level}-${x.id}`
  );

  return (
    <TreeViewCheckBoxList
      dataSource={dataSource}
      onCheck={handleCheckTreeItem}
      expandedIds={expandedIds}
    />
  );
};

TreeViewCheckBoxContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  idField: PropTypes.string,
  nameField: PropTypes.string,
  childrenFieldName: PropTypes.string,
  onCheck: PropTypes.func,
  needToConvertEntry: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  disabledIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  disabledLevels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

TreeViewCheckBoxContainer.defaultProps = {
  data: [],
  idField: 'id',
  nameField: 'name',
  childrenFieldName: 'children',
  onCheck: () => [],
  needToConvertEntry: true,
  selectedIds: [],
  disabledIds: [],
  disabledLevels: [],
};

export default TreeViewCheckBoxContainer;
