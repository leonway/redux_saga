import React from 'react';
import { connect } from 'react-redux';
import {Action} from 'actionReducer/action';
import {getPathValue} from 'actionReducer/helper';
import helper from 'common/common';
// import Layout from 'components/Layout/Layout';

import {EnhanceLoading} from 'components/Enhance';
// import {jump} from 'components/Link/Link';

const action = new Action(['layout']);

//获取用户表格列设置信息
// const getTableColsConfig = async () => {
//   let setting = {};
//   const {returnCode, result} = await helper.fetchJson(TABLE_SETTING_URL);
//   if (returnCode === 0) {
//     setting = result;
//   }
//   return setting;
// };

// const splitNavigation = (navItems) => {
//   const index = navItems.findIndex(item => item.key === 'basic');
//   const settingUrl = index >= 0 ? navItems[index].href : '';
//   (index >= 0) && navItems.splice(index, 1);
//   return {navItems, settingUrl};
// };

const initActionCreator = () => {
  // const { location } = this.props
  return action.create('init')
};

// function hasHref(items, href) {
//   return items.some(item => {
//     if (item.children) {
//       return hasHref(item.children, href);
//     } else {
//       return item.href === href;
//     }
//   });
// }

// const canOpen = (nav1, nav2) => {
//     const state = global.store.getState();
//     if (state.layout.status !== 'page') {
//       return true;
//     } else {
//       const path = ['layout', 'sidebars', nav1];
//       const sidebar = getPathValue(state, path) || [];
//       const href = `/${nav1}/${nav2}`;
//       return hasHref(sidebar, href);
//     }
// };

const openChangeActionCreator = (key, openKeys) => {
  return action.assign({[key]: openKeys}, 'openKeys');
};

// const menuClickActionCreator = (key) => async () => {
//   if (key === 'revoke') {
//     await helper.fetchJson(REVOKE_URL, 'put');
//     window.location.href = '/login';
//   } else if (key === 'modify') {
//     jump('/password/modify');
//   }
// };

const mapStateToProps = (...state) => {
  console.log(state)
  return state.layout;
};

const actionCreators = {
  onInit: initActionCreator,
  // onOpenChange: openChangeActionCreator,
  // onMenuClick: menuClickActionCreator
};

const Container = connect(mapStateToProps, actionCreators)(EnhanceLoading((state)=>{
  console.log(state)
  return <div>haha</div>
}));
export default Container;
// export {canOpen};
