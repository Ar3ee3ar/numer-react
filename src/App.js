import React,{Component,useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Switch,NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Drawer, Button, Radio, Space } from 'antd';
import './style/screen.css'
import { BarsOutlined } from '@ant-design/icons';

import Bisection from './pages/Root of Equation/Bisection';
import Graphical from './pages/Root of Equation/Graphical';
import False_position from './pages/Root of Equation/False_position';
import One_point_iteration from './pages/Root of Equation/One_point_iteration';
import Newton_Raphson from './pages/Root of Equation/Newton_Raphson';
import Secant from './pages/Root of Equation/Secant';

const { SubMenu } = Menu;
const { Header, Content,Sider } = Layout;

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false, 
      placement: 'left'
    };
  }


  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { placement, visible,windowWidth} = this.state;
    
    return (
      <>
      <Router>
        <Layout style={{background:"#fff"}}>
          <Header className="hideOnDesktop" style={{ position: 'fixed', zIndex: 1, width: '100%' ,padding:'0 16px'}}>
            <Space>
              <BarsOutlined style={{color:'white',fontSize:'20px'}} onClick={this.showDrawer}/>
              <span style={{color: 'white',marginLeft:'10px',fontSize:'20px'}}>Numerical method</span>
            </Space>
          </Header>
          <Header className="hideOnMobile" style={{ position: 'fixed', zIndex: 1, width: '100%' ,padding:'0 16px'}}>
            <h2 style={{color: 'white',marginLeft:'10px'}}>Numerical method</h2>
          </Header>
          <Layout>
            
        <Drawer
          title="Numerical method"
          placement="left"
          closable={true}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          className="hideOnDesktop"
          footer="Arzeezar Lording"
        >
          <Menu
              mode ="inline"
              defaultSelectedKeys={['menu_graphical']}
              defaultOpenKeys={['root_submenu']}
              >
                <SubMenu key="root_submenu" title={<span>Root of Equation</span>}>
                  <Menu.Item key="menu_graphical" ><Link to="/">Graphical</Link></Menu.Item>
                  <Menu.Item key="menu_bisection" ><Link to="/bisection">Bisection</Link></Menu.Item>
                  <Menu.Item key="menu_false"><Link to="/false_position">False Position</Link></Menu.Item>
                  <Menu.Item key="menu_onepoint"><Link to="/one_point_iteration">One-Point Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_newton"><Link to="/newton_Raphson">Newton-Raphson</Link></Menu.Item>
                  <Menu.Item key="menu_secant"><Link to="/secant">Secant Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="algebra_submenu" title={<span>Linear Algebra</span>}>
                  <Menu.Item key="menu_cramer"><Link to="">Cramer's Rule</Link></Menu.Item>
                  <Menu.Item key="menu_gauss"><Link to="">Gauss's Elimination</Link></Menu.Item>
                  <Menu.Item key="menu_jordan"><Link to="">Gauss Jordan Method</Link></Menu.Item>
                  <Menu.Item key="menu_inverse"><Link to="">Matrix Inversion</Link></Menu.Item>
                  <Menu.Item key="menu_lu"><Link to="">LU Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_cholesky"><Link to="">Cholesky Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_jacobi"><Link to="">Jacobi Iteration Method</Link></Menu.Item>
                  <Menu.Item key="menu_seidel"><Link to="">Gauss Seidel Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_gradient"><Link to="">Conjugate Gradient Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide"><Link to="">Newton Divide Difference</Link></Menu.Item>
                  <Menu.Item key="menu_lagrange"><Link to="">Lagrange</Link></Menu.Item>
                  <Menu.Item key="menu_spline"><Link to="">Spline</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="regression_submenu" title={<span>Least Squares Regression</span>}>
                  <Menu.Item key="menu_linear"><Link to="">Linear Regression</Link></Menu.Item>
                  <Menu.Item key="menu_poly"><Link to="">Polynomial Regression</Link></Menu.Item>
                  <Menu.Item key="menu_multiple"><Link to="">Multiple Linear Regression</Link></Menu.Item>
                </SubMenu>
              </Menu>
        </Drawer>
        <Sider
        width={335}
          breakpoint="lg"
          collapsedWidth="0"
          className="hideOnMobile"
          style={{background:'white', height: "100vh"}}
        >
          <Menu
              mode ="inline"
                style={{height: '100vh', borderRight: 0, backgroundColor: "white", overflowY: "scroll",marginTop:'60px'}}
                defaultSelectedKeys={['menu_graphical']}
              defaultOpenKeys={['root_submenu']}
              >
                <SubMenu key="root_submenu" title={<span>Root of Equation</span>}>
                  <Menu.Item key="menu_graphical" ><Link to="/">Graphical</Link></Menu.Item>
                  <Menu.Item key="menu_bisection" ><Link to="/bisection">Bisection</Link></Menu.Item>
                  <Menu.Item key="menu_false"><Link to="/false_position">False Position</Link></Menu.Item>
                  <Menu.Item key="menu_onepoint"><Link to="/one_point_iteration">One-Point Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_newton"><Link to="/newton_Raphson">Newton-Raphson</Link></Menu.Item>
                  <Menu.Item key="menu_secant"><Link to="/secant">Secant Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="algebra_submenu" title={<span>Linear Algebra</span>}>
                  <Menu.Item key="menu_cramer"><Link to="">Cramer's Rule</Link></Menu.Item>
                  <Menu.Item key="menu_gauss"><Link to="">Gauss's Elimination</Link></Menu.Item>
                  <Menu.Item key="menu_jordan"><Link to="">Gauss Jordan Method</Link></Menu.Item>
                  <Menu.Item key="menu_inverse"><Link to="">Matrix Inversion</Link></Menu.Item>
                  <Menu.Item key="menu_lu"><Link to="">LU Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_cholesky"><Link to="">Cholesky Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_jacobi"><Link to="">Jacobi Iteration Method</Link></Menu.Item>
                  <Menu.Item key="menu_seidel"><Link to="">Gauss Seidel Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_gradient"><Link to="">Conjugate Gradient Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide"><Link to="">Newton Divide Difference</Link></Menu.Item>
                  <Menu.Item key="menu_lagrange"><Link to="">Lagrange</Link></Menu.Item>
                  <Menu.Item key="menu_spline"><Link to="">Spline</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="regression_submenu" title={<span>Least Squares Regression</span>}>
                  <Menu.Item key="menu_linear"><Link to="">Linear Regression</Link></Menu.Item>
                  <Menu.Item key="menu_poly"><Link to="">Polynomial Regression</Link></Menu.Item>
                  <Menu.Item key="menu_multiple"><Link to="">Multiple Linear Regression</Link></Menu.Item>
                </SubMenu>
              </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
                <Switch>
                  {/* Root of Equation */}
                  <Route exact path="/" component={Graphical} />
                  <Route exact path="/bisection" component={Bisection} />
                  <Route exact path="/false_position" component={False_position} />
                  <Route exact path="/one_point_iteration" component={One_point_iteration} />
                  <Route exact path="/newton_Raphson" component={Newton_Raphson} />
                  <Route exact path="/secant" component={Secant} />
                  {/* Linear Algebra */}
                  <Route exact path="/cramer" component={Bisection} />
                  <Route exact path="/gauss" component={Bisection} />
                  <Route exact path="/jordan" component={Bisection} />
                  <Route exact path="/inverse" component={Bisection} />
                  <Route exact path="/lu" component={Bisection} />
                  <Route exact path="/cholesky" component={Bisection} />
                  <Route exact path="/jacobi" component={Bisection} />
                  <Route exact path="/seidel" component={Bisection} />
                  <Route exact path="/conjugate-gradient" component={Bisection} />
                  {/* Interpolation */}
                  <Route exact path="/newton" component={Bisection} />
                  <Route exact path="/lagrange" component={Bisection} />
                  <Route exact path="/spline" component={Bisection} />
                  {/* Regression */}
                  <Route exact path="/linear" component={Bisection} />
                  <Route exact path="/polynomial" component={Bisection} />
                  <Route exact path="/multiple-linear" component={Bisection} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
         
        </Layout>
      </Router>
      </>
    );
  }
}

export default Routes;