import React, { PureComponent, Fragment } from 'react';
import { Table, Alert, Pagination, Popover, Checkbox, Button, Row, Col } from 'antd';
import styles from './index.less';

function initTotalList(columns, data) {
  if (!data.list) data.list = [];
  const totalRow = { disabled: true };
  columns.forEach(column => {

    switch (typeof (column.total)) {
      case 'string':
        totalRow[column.dataIndex] = column.total;
        break;
      case 'boolean':
        totalRow[column.dataIndex] = data.list.reduce((sum, val) => sum + parseFloat(val[column.dataIndex], 10), 0) || 0;
        break;
      case 'object':
        totalRow[column.dataIndex] = (computeArrayTotal(column.total, columns, data.list) || 0).toFixed(2);
        break;
      default:
        totalRow[column.dataIndex] = null;
        break;
    }
  });

  return totalRow;
}

function computeArrayTotal(array, columns, list) {
  const columnArray = columns.map(ele => ele.dataIndex);
  let evalString = '';
  array.forEach(ele => {
    if (columnArray.includes(ele)) {
      evalString += list.reduce((sum, val) => sum + parseFloat(val[ele], 10), 0) || 0;
    } else {
      evalString += ele;
    }
  })
  return eval(evalString)
}


class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;

    const filterChecked = [];
    const filterList = columns.map(ele => {
      if (ele.checked) filterChecked.push(ele.dataIndex);
      return { name: ele.title, value: ele.dataIndex, checked: ele.checked || false, disabled: ele.disabled };
    })
    console.log(filterList, filterChecked, 'filterList, filterChecked');

    this.state = {
      selectedRowKeys: [],
      filterList,
      filterChecked
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (!nextProps.selectedRows) {
      return {
        selectedRowKeys: null,
      };
    }
    if (nextProps.selectedRows.length === 0) {
      return {
        selectedRowKeys: [],
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);

    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  };

  handleTableChange = (page, size) => {
    console.log(page, size);
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      ...this.props.data.pagination,

    }
    if (page) {
      paginationProps.current = page;
    }
    if (size) {
      paginationProps.pageSize = size;
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(paginationProps);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  filterChange = (val) => {
    console.log(val);

    this.setState({
      filterChecked: val
    })
  }

  render() {
    const { selectedRowKeys, filterChecked, filterList } = this.state;
    const { data = {}, rowKey, columns, ...rest } = this.props;
    const { list = [], pagination } = data;

    if (list.length === pagination.pageSize) {
      const totalRow = initTotalList(columns, data);
      list.push(totalRow);
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      ...pagination,
    };

    let rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    if (!selectedRowKeys) rowSelection = null;

    const _columns = columns.filter(ele => filterChecked.includes(ele.dataIndex));

    return (
      <div className={styles.standardTable}>
        <div style={{ marginBottom: 16 }}>
          <Popover placement="bottomLeft" style={{ maxWidth: 300 }} title="自定义列" content={
            <Checkbox.Group style={{ width: '100%' }} onChange={this.filterChange} value={filterChecked}>
              <Row>
                {filterList.map(ele =>
                  <Col span={8} key={ele.value}>
                    <Checkbox style={{ margin: '5px 5px 5px 0' }} checked={ele.checked} value={ele.value}>{ele.name}</Checkbox>
                  </Col>)}
              </Row>
            </Checkbox.Group>
          }>
            <Button>自定义列</Button>
          </Popover>
        </div>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={false}
          columns={_columns}
          {...rest}
        />
        <Pagination style={{ textAlign: 'right', marginTop: 15 }} {...paginationProps} onChange={this.handleTableChange} onShowSizeChange={this.handleTableChange} />
      </div>
    );
  }
}

export default StandardTable;
