import React, { useState, useEffect } from 'react';
import { Card, Col, Layout, Pagination, Row, Select, Switch } from 'antd';
import './App.css';
import getPets from './services/api';
import queryEditor from './services/utils'
import { Result } from './models/result';
import { Query } from './models/query';

const { Meta } = Card;
const { Footer, Header, Content } = Layout;
const { Option } = Select;

const App: React.FC = () => {
  const [data, setData] = useState<Result>({ result: [] });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sex, setSex] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [order, setOrder] = useState<boolean>(true);

  const setPageSize = (current: number, size: number) => {
    setLimit(size)
  }

  useEffect(() => {
    (async function loadPets() {
      const query: Query = queryEditor(page, limit, sex, size, age, order)
      const result = await getPets(query) // API call 
      setData(result.data)
    })()
  }, [page, limit, sex, size, age, order]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content>
        <div style={{ background: '#fff', padding: 24, width: '90%', margin: '30px auto' }}>
          <Row style={{ padding: '0 10px', textAlign: 'center' }}>
            {/* filters */}
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
            {/* result (cards) */}
            {data.result.map((item: any) =>
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.uuid}>
                <Card style={{ margin: 10, backgroundColor: item.sex_key === 'MALE' ? '#D7EFF4' : '#FFE5EC' }}>
                  <Meta title={item.name} description={`${item.sex_key} (${item.size_key})`}
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
            showTotal={() => `Total ${data.count} items`}
            style={{ textAlign: 'center', margin: '10px auto' }}
            onChange={setPage}
            onShowSizeChange={setPageSize}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        FrontEnd React 2019,  Created by Adopets, Made by 
        <a href="https://www.linkedin.com/in/rafael-paiva-de-oliveira-210087a7/" 
          target="_blank" rel="noopener noreferrer"> Rafael Paiva de Oliveira</a>
      </Footer>
    </Layout>
    // </div>
  );
}

export default App;
