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
    needToConvertEntry,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const flattenedTreeData = useRef([]);

  const handleCheckTreeItem = (item) => {
    const { id, checked } = item;
    const handleChecking = processCheckingItem(id, checked);
    handleChecking(flattenedTreeData.current);

    const treeInfo = getTreeInfo(flattenedTreeData.current);

    onCheck(
      treeInfo.selectedIds,
      treeInfo.selectedItems,
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
          selectedIds
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
  ]);

  const expandedIds = flattenedTreeData.current.map((x) => `${x.id}`);

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
};

TreeViewCheckBoxContainer.defaultProps = {
  data: [],
  idField: 'id',
  nameField: 'name',
  childrenFieldName: 'children',
  onCheck: () => [],
  needToConvertEntry: true,
  selectedIds: [],
};

export default TreeViewCheckBoxContainer;
