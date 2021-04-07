import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Drawer, Space } from 'antd';
import './style/screen.css'
import { BarsOutlined } from '@ant-design/icons';

import Bisection from './pages/Root of Equation/Bisection';
import Graphical from './pages/Root of Equation/Graphical';
import False_position from './pages/Root of Equation/False_position';
import One_point_iteration from './pages/Root of Equation/One_point_iteration';
import Newton_Raphson from './pages/Root of Equation/Newton_Raphson';
import Secant from './pages/Root of Equation/Secant';

import Cramer from './pages/Linear Algebra/Cramer';
import Gauss from './pages/Linear Algebra/Gauss';
import Jordan from './pages/Linear Algebra/Jordan';
import Inverse from './pages/Linear Algebra/Inverse';
import LU from './pages/Linear Algebra/LU';
import Cholesky from './pages/Linear Algebra/Cholesky';
import Jacobi from './pages/Linear Algebra/Jacobi';
import Seidel from './pages/Linear Algebra/Seidel';
import Gradient from './pages/Linear Algebra/Gradient';

import NewtonInterpolate from './pages/Interpolation/Newton';
import Lagrange from './pages/Interpolation/Lagrange';
import Spline from './pages/Interpolation/Spline';

import Linear from './pages/Regression/Linear';
import Polynomial from './pages/Regression/Polynomial';
import MultipleLinear from './pages/Regression/MultipleLinear';

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
    const { placement, visible} = this.state;
    
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
                  <Menu.Item key="menu_cramer"><Link to="/cramer">Cramer's Rule</Link></Menu.Item>
                  <Menu.Item key="menu_gauss"><Link to="/gauss">Gauss's Elimination</Link></Menu.Item>
                  <Menu.Item key="menu_jordan"><Link to="/jordan">Gauss Jordan Method</Link></Menu.Item>
                  <Menu.Item key="menu_inverse"><Link to="/inverse">Matrix Inversion</Link></Menu.Item>
                  <Menu.Item key="menu_lu"><Link to="/lu">LU Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_cholesky"><Link to="/cholesky">Cholesky Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_jacobi"><Link to="/jacobi">Jacobi Iteration Method</Link></Menu.Item>
                  <Menu.Item key="menu_seidel"><Link to="/seidel">Gauss Seidel Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_gradient"><Link to="/conjugate-gradient">Conjugate Gradient Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide"><Link to="/newton">Newton Divide Difference</Link></Menu.Item>
                  <Menu.Item key="menu_lagrange"><Link to="/lagrange">Lagrange</Link></Menu.Item>
                  <Menu.Item key="menu_spline"><Link to="/spline">Spline</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="regression_submenu" title={<span>Least Squares Regression</span>}>
                  <Menu.Item key="menu_linear"><Link to="/linear">Linear Regression</Link></Menu.Item>
                  <Menu.Item key="menu_poly"><Link to="/polynomial">Polynomial Regression</Link></Menu.Item>
                  <Menu.Item key="menu_multiple"><Link to="/multiple-linear">Multiple Linear Regression</Link></Menu.Item>
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
                  <Menu.Item key="menu_cramer"><Link to="/cramer">Cramer's Rule</Link></Menu.Item>
                  <Menu.Item key="menu_gauss"><Link to="/gauss">Gauss's Elimination</Link></Menu.Item>
                  <Menu.Item key="menu_jordan"><Link to="/jordan">Gauss Jordan Method</Link></Menu.Item>
                  <Menu.Item key="menu_inverse"><Link to="/inverse">Matrix Inversion</Link></Menu.Item>
                  <Menu.Item key="menu_lu"><Link to="/lu">LU Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_cholesky"><Link to="/cholesky">Cholesky Decomposition</Link></Menu.Item>
                  <Menu.Item key="menu_jacobi"><Link to="/jacobi">Jacobi Iteration Method</Link></Menu.Item>
                  <Menu.Item key="menu_seidel"><Link to="/seidel">Gauss Seidel Iteration</Link></Menu.Item>
                  <Menu.Item key="menu_gradient"><Link to="/conjugate-gradient">Conjugate Gradient Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide"><Link to="/newton">Newton Divide Difference</Link></Menu.Item>
                  <Menu.Item key="menu_lagrange"><Link to="/lagrange">Lagrange</Link></Menu.Item>
                  <Menu.Item key="menu_spline"><Link to="/spline">Spline</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="regression_submenu" title={<span>Least Squares Regression</span>}>
                  <Menu.Item key="menu_linear"><Link to="/linear">Linear Regression</Link></Menu.Item>
                  <Menu.Item key="menu_poly"><Link to="/polynomial">Polynomial Regression</Link></Menu.Item>
                  <Menu.Item key="menu_multiple"><Link to="/multiple-linear">Multiple Linear Regression</Link></Menu.Item>
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
                  <Route exact path="/cramer" component={Cramer} />
                  <Route exact path="/gauss" component={Gauss} />
                  <Route exact path="/jordan" component={Jordan} />
                  <Route exact path="/inverse" component={Inverse} />
                  <Route exact path="/lu" component={LU} />
                  <Route exact path="/cholesky" component={Cholesky} />
                  <Route exact path="/jacobi" component={Jacobi} />
                  <Route exact path="/seidel" component={Seidel} />
                  <Route exact path="/conjugate-gradient" component={Gradient} />
                  {/* Interpolation */}
                  <Route exact path="/newton" component={NewtonInterpolate} />
                  <Route exact path="/lagrange" component={Lagrange} />
                  <Route exact path="/spline" component={Spline} />
                  {/* Regression */}
                  <Route exact path="/linear" component={Linear} />
                  <Route exact path="/polynomial" component={Polynomial} />
                  <Route exact path="/multiple-linear" component={MultipleLinear} />
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