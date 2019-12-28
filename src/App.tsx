import React, { useState, useEffect } from 'react';
import { Card, Col, Layout, Menu, Pagination, Row, Select, Switch } from 'antd';
import './App.css';
import getPets from './services/api';

const { Meta } = Card;
const { Footer, Header, Content } = Layout;
const { Option } = Select;

const App: React.FC = () => {
  const [data, setData] = useState<any>({ result: [] });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sex, setSex] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [order, setOrder] = useState<boolean>(true);

  const setPageSize = (current: number, size: number) => {
    setLimit(size)
  }

  const editQuery = (page: number, limit: number, sex: string | null, size: string | null, age: string | null, order: boolean) => {
    const search: any = {}
    if (sex) search.sex_key = sex
    if (size) search.size_key = size
    if (age) search.age_key = age
    const options = { page, limit }
    const sort: string[] = [];
    order ? sort.push('name') : sort.push('-name')
    return { search, options, sort }
  }

  useEffect(() => {
    async function loadPets() {
      const query = editQuery(page, limit, sex, size, age, order)
      console.log(query)
      const data = await getPets(query)
      console.log(data.data)
      setData(data.data)
    }
    loadPets();
  }, [page, limit, sex, size, age, order]);

  return (
    // <div className="App">
    <Layout className="layout">
      {/* <header className="App-header">
        {data.map(item => <p key={item}>{item}</p>)}
        <Button type="primary">Button</Button>
      </header> */}
      <Header>
        <div className="logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['two']}
          style={{ lineHeight: '63px' }}
        >
          {/* {data.map(item => <Menu.Item key={item}>{item}</Menu.Item>)} */}
        </Menu>
      </Header>
      <Content>
        <div style={{ background: '#fff', padding: 24, width: '90%', margin: '30px auto' }}>
          <Row style={{ padding: '0 10px', textAlign: 'center' }}>
            <Col xs={24} md={6}>
              <span style={{ width: '40%' }}>Sex: </span>
              <Select defaultValue="" style={{ width: '60%' }} onChange={setSex}>
                <Option value="">All</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="MALE">Male</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <span style={{ width: '40%' }}>Size: </span>
              <Select defaultValue="" style={{ width: '60%' }} onChange={setSize}>
                <Option value="">All</Option>
                <Option value="S">Small</Option>
                <Option value="M">Medium</Option>
                <Option value="L">Large</Option>
                <Option value="XL">XLarge</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <span style={{ width: '40%' }}>Age: </span>
              <Select defaultValue="" style={{ width: '60%' }} onChange={setAge}>
                <Option value="">All</Option>
                <Option value="BABY">Baby</Option>
                <Option value="YOUNG">Young</Option>
                <Option value="ADULT">Adult</Option>
                <Option value="SENIOR">Senior</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <span style={{ width: '40%' }}>Order By: </span>
              <Switch checkedChildren="ASC" unCheckedChildren="DESC" defaultChecked onChange={setOrder} />
            </Col>
          </Row>
          <Row>
            {data.result.map((item: any) =>
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.uuid}>
                <Card
                  style={{ margin: 10, backgroundColor: item.sex_key === 'MALE' ? '#D7EFF4' : '#FFE5EC' }}
                // cover={
                //   <img
                //     alt="example"
                //     src={`https://firebasestorage.googleapis.com/v0/b/adopets-fe-test.appspot.com/o/${item.picture.split('.')[0]}.jpg?alt=media`}
                //     className="card-image"
                //   />
                // }
                // actions={[
                //   <Icon type="setting" key="setting" />,
                //   <Icon type="edit" key="edit" />,
                //   <Icon type="ellipsis" key="ellipsis" />,
                // ]}
                >
                  <Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.name}
                    description={`${item.sex_key} (${item.size_key})`}
                  />
                </Card>
              </Col>
            )}
          </Row>
          <Pagination
            showSizeChanger
            defaultCurrent={page}
            defaultPageSize={10}
            total={data.count}
            showTotal={total => `Total ${data.count} items`}
            style={{ textAlign: 'center', margin: '10px auto' }}
            onChange={setPage}
            onShowSizeChange={setPageSize}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    // </div>
  );
}

export default App;
