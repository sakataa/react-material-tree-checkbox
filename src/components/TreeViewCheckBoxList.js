import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import CollapsedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandedIcon from '@material-ui/icons/ChevronRightRounded';
import { renderTree } from '../utils/treeRenderer';

const styles = {
  root: {
    flexGrow: 1,
    padding: 15,
  },
};

const TreeViewCheckBoxList = (props) => {
  const { classes, dataSource, onCheck, expandedIds } = props;

  const handleChange = (evt) => {
    const { id, name, checked, level } = evt.target;
    onCheck({ id, name, checked, level });
  };

  if (!expandedIds?.length) {
    return null;
  }

  const tree = renderTree(dataSource, handleChange);

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={expandedIds}
      defaultCollapseIcon={<CollapsedIcon />}
      defaultExpandIcon={<ExpandedIcon />}>
      {tree}
    </TreeView>
  );
};

TreeViewCheckBoxList.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          children: PropTypes.arrayOf(PropTypes.shape({})),
        })
      ),
      checked: PropTypes.bool,
    })
  ),
  onCheck: PropTypes.func,
  expandedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

TreeViewCheckBoxList.defaultProps = {
  dataSource: [],
  onCheck: () => [],
  expandedIds: [],
};

export default withStyles(styles)(TreeViewCheckBoxList);
