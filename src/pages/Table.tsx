import * as React from 'react';
import './App.scss';
import { Card, Button } from 'antd';
import StandardTable from '../components/StandardTable';
import Ellipsis from '../components/Ellipsis';
import { connect } from 'dva';
import './Table.less';

interface Props {
  dispatch: Function;
  loading: any;
  List: any;
  ListParams: any;
}

@connect(({ listModel }) => ({
  ...listModel,
}))
class Table extends React.Component<Props, {}>{

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      checked: true,
      total: '总计'
    },
    {
      title: 'email',
      dataIndex: 'email',
      checked: true,
      render: (_, row) => (
        <div className="someone">
          <Ellipsis tooltip length={20}>{row.email}</Ellipsis>
        </div>
      ),
    },
    {
      title: 'number',
      dataIndex: 'number',
      checked: true,
      total: true
    },
    {
      title: 'number2',
      dataIndex: 'number2',
      checked: true,
      total: true
    },
    {
      title: 'number/number2*100%',
      dataIndex: 'number3',
      checked: false,
      total: ['number', '/', 'number2', '*', 100],
      render: (val) => `${val}%`
    },
    {
      title: 'url',
      dataIndex: 'url',
      checked: false,
    },
    {
      title: 'address',
      dataIndex: 'address',
      checked: true,
    },
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'listModel/List',
    });
  }
  handleStandardTableChange = async (pagination) => {
    console.log(pagination);

    await this.props.dispatch({ // 更新翻页
      type: 'listModel/save',
      payload: {
        List: { ...this.props.List, pagination },
      },
    });
    this.props.dispatch({
      type: 'listModel/List',
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  }

  state = {
    selectedRows: []
  };


  public render() {
    const { loading, List } = this.props;
    const { selectedRows } = this.state;
    return (
      <div className="App" style={{ padding: '100px' }}>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListOperator">
              {selectedRows.length ? <span>
                批量操作：
                  <Button>批量干嘛</Button>
              </span> : null}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={List}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

      </div>
    );
  }
}

export default Table;
