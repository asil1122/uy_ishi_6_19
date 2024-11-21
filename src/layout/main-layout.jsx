import React from 'react'
import { data } from './layout-data'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { Button, Layout, Menu, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { MenuIcon } from '../assets/menu-icon'
import { loadState } from '../config/store'

const { Header, Content, Footer } = Layout

const item = data.map((item) => {
  return {
    key: item.id,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: React.createElement(item.icon),

  }
})
export const MainLayout = () => {
  const [state, setState] = React.useState(false)
  const user = loadState('userData');

  if(!user){
    return <Navigate replace to={'/'} />
  }


  return (
    <div className='wrapper'>
      <Layout style={{ height: '100%' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={state} onCollapse={(value) => setState(value)} width={200}>
            <Menu mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} style={{ height: "100%", borderRight: 0, }} items={item} />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Button style={{ width: '40px' }} type="primary" onClick={() => setState(!state)}><MenuIcon/></Button>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
