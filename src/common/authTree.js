import { treeToMenu,childrenKeyHandle,treeDataHandle } from './common'; 

const distributionTreeRoot = {   //  根节点数据
  root: 'top',
  top: {key: 'top', children: ['distribution']},
  distribution: {key: 'distribution', title: '已分配权限', children: [], data:{}},
};
const treeHandlData = (rolePowerDics)=>{
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

export const loginToData = (rolePowerDics)=>{
  let error = "当前用户缺乏权限，请联系管理员！";
  const authorTree = treeHandlData(rolePowerDics)
  delete authorTree.top;
  delete authorTree.root;
  if(!Object.keys(authorTree).length){
      return { error }
  }else{
    return { authorTree, menus: treeToMenu(authorTree) }
  }
}

