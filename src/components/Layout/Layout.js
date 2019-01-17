import React from 'react';
import PropTypes from 'prop-type';
import s from './Layout.module.less';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Loading from '../Loading';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import { query } from './config';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    nav1: PropTypes.string,
    nav2: PropTypes.string,
    settingUrl: PropTypes.string,
    navItems: PropTypes.array,
    sidebars: PropTypes.object,
    openKeys: PropTypes.object,
    onOpenChange: PropTypes.func,
    onMenuClick: PropTypes.func
  };
    getPageTitle() {
    const { routerData, location } = this.props;
    console.log(this.props);

    const { pathname } = location;
    let title = 'RGtech';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - RGtech`;
    }
    return title;
  }

  onOpenChange = (openKeys) => {
    const {nav1, onOpenChange} = this.props;
    if (onOpenChange) {
      onOpenChange(nav1, openKeys);
    }
  };

  getSidebarProps = (nav1, nav2) => {
    const {sidebars, openKeys={}} = this.props;
    return {
      activeKey: nav2,
      items: sidebars[nav1] || [],
      onOpenChange: this.onOpenChange,
      openKeys: openKeys[nav1]
    };
  };

  toSidebar = (nav1, nav2) => {
    if (!nav2) {
      return null;
    } else {
      return <Sidebar {...this.getSidebarProps(nav1, nav2)} />;
    }
  };

  getSelectKey = (nav1) => {
    if (nav1 === 'basic') {
      return 'setting';
    } else {
      return nav1;
    }
  };

  toHeader = (loading, nav1, nav2) => {
    const {navItems: items, settingUrl, onMenuClick} = this.props;
    const selectKey = this.getSelectKey(nav1);
    const selectUrl = loading ? '' : `/${nav1}/${nav2}`;
    return <Header {...{items, selectKey, selectUrl, settingUrl, onMenuClick}} />;
  };

  content = ()=>{
    const {loading, nav1='', nav2='', children} = this.props;
    return (
    <div className={s.root}>
      {this.toHeader(loading, loading || nav1, nav2)}
      {
        loading ? <Loading /> :
        <div>
          <aside>{this.toSidebar(nav1, nav2)}</aside>
          <section>{children}</section>
        </div>
      }
    </div>
    )
  }

  render() {
    
    return (
       <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{this.content()}</div>}
        </ContainerQuery>
      </DocumentTitle>
    )
  };
}

export default Layout;


