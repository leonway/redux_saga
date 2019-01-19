import { treeToMenu,childrenKeyHandle,treeDataHandle } from './common'; 

const distributionTreeRoot = {   //  根节点数据
  root: 'top',
  top: {key: 'top', children: ['distribution']},
  distribution: {key: 'distribution', title: '已分配权限', children: [], data:{}},
};
const deepcopy = (data)=>(JSON.parse(JSON.stringify(data)));

const treeHandlData = (rolePowerDics)=>{//此方法把后台返回的多个角色的权限树合为一个权限树
 return rolePowerDics.reduce((t,{powerDic,roleName})=>{
  const distributionTreeRoot = {   //  根节点数据
      root: 'top',
      top: {key: 'top', children: ['distribution']},
      distribution: {key: 'distribution', title: '已分配权限', children: [], data:{}},
    };
   const distributionChildrenKey = childrenKeyHandle(powerDic);
   distributionTreeRoot.distribution.children = distributionChildrenKey;
   treeDataHandle('distribution', distributionChildrenKey, powerDic, distributionTreeRoot);
    if(!Object.keys(t).length){
        t=distributionTreeRoot
    }else{
      Object.keys(t).forEach(x=>{
          Object.keys(distributionTreeRoot).forEach(y=>{
              if(Object.keys(t).indexOf(y)===-1){
                  t[y]=distributionTreeRoot[y]
              }
            if(x===y&&t[x].children&&distributionTreeRoot[y]){
                const [...trueChildren] = new Set(t[x].children.concat(distributionTreeRoot[y].children))
                  t[x].children=trueChildren;
            }
          })
        })
    }
      return t
  },{})
}

//把一级菜单（模块）下的 第一个三级菜单（页面）路由找到 赋值给path
let path = "",isContinue = true;
const getFirstChildrenPath = (items=[])=>{
    if(!items.length){
      return path = "";
    }else{
      for( let x of items){
        if(!isContinue){return}
        if(x.resourceType===2){
          isContinue = false;
          const params = x.path.split('/');
          return path=`/${params[1]}/${params.pop()}`
        }else{
          getFirstChildrenPath(x.children)
        }
      }
    }
}

const treeToSidebars = (tree)=>{//从authTree里提取出侧边栏菜单

  Object.keys(tree).forEach(key=>{
    if(tree[key].data.resourceType===2){
      const params = tree[key].data.path;
      tree[key] = {
        href:`/${params[0]}/${params.pop()}`,
        title:tree[key].data.resourceName,
        key:tree[key].data.resourceKey
      }
    }else if([0,1].find(x=>x===tree[key].data.resourceType)!==undefined){
      const params = tree[key].data.path;
      tree[key] = {
        isFolder: true,
        href:`/${params[0]}/${params.pop()}`,
        title:tree[key].data.resourceName,
        icon:tree[key].data.icon,
        key:tree[key].data.resourceKey,
        children:tree[key].children
    }
  }else if(!tree[key].data.resourceType){
    tree[key]={
      children:tree[key].children
    }
  }else{
    delete tree[key]
  }
})

Object.keys(tree).forEach(key=>{
    if(tree[key].children){
        tree[key].children.forEach((k,i)=>{
            tree[key].children.splice(i,1,tree[k])
        })
    }
})
const sidebars = {};
  tree.distribution.children.forEach(x=>{
    sidebars[x.key] = x.children
  })

return sidebars;
}

export const loginToData = (rolePowerDics)=>{
  let error = "当前用户缺乏权限，请联系管理员！";
  const authorTree = treeHandlData(rolePowerDics)
  delete authorTree.top;
  delete authorTree.root;
  if(!Object.keys(authorTree).length){
      throw new Error(error);
  }

  const sidebars = treeToSidebars(deepcopy(authorTree));
  if(sidebars.index){
    delete sidebars.index
  }
  const menus = treeToMenu(authorTree);
  const navItems = Object.values(authorTree).filter(x=>x.resourceType===0).reduce((navs,item)=>{
      isContinue = true;
      item.children&&item.children.length&&getFirstChildrenPath(item.children)
      navs.push({ key:item.key, title:item.name, href:!item.children.length?item.path:path })
    return navs
  },[])
  const openKeys = Object.values(authorTree).filter(x=>x.resourceType===0&&x.children.some(x=>x.resourceType===1)).reduce((keys,item)=>{
    for(let child of item.children){
      if(child.resourceType===1){
        keys[item.key]= [child.key]
        break
      }
    }
  return keys
},{})
  return { authorTree, navItems, sidebars,openKeys }
 
}
