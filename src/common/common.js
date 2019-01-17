import {message} from 'antd';

const showError = (msg) => {
    message.error(msg);
};

const showSuccess = (msg) => {
    message.success(msg)
}
/**
 * 功能：设置fetch的选项
 */
const postOption = (body, method = 'POST') => {
    return {
        method,
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(body)
    }
};

/**
 * 功能：设置fetch的选项
 */
const formDataOption = (body, method = 'POST') => {
    const form = new FormData();
    Object.keys(body).forEach(key => {
        form.append(key, JSON.stringify(body[key]))
    })
    return {
        method,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: form
    }
};


/**
 * 功能：从obj中提取出指定属性，并构造出一个新的对象
 *  obj：[必须]，对象
 *  keys：[必须]，字符串数组，用于指定需要提取的属性
 * 返回值：返回构造出的对象
 */
const getObject = (obj, keys) => {
    return keys.reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;
    }, {});
};

/**
 * 功能：从obj中取出不包含keys指定的属性，并组成一个新的子对象
 */
const getObjectExclude = (obj, keys) => {
    const inKeys = key => keys.some(k => k === key);
    return Object.keys(obj).reduce((newObj, key) => {
        !inKeys(key) && (newObj[key] = obj[key]);
        return newObj;
    }, {});
};

/**
 * 功能：如果returnCode不为0，则抛出异常，否则取出result
 * 参数：从服务端获取的JSON格式数据
 */
const getJsonResult = (json) => {
    if (json.returnCode !== 0) {
        const error = new Error();
        error.message = json.returnMsg;
        error.code = json.returnCode;
        throw error;
    } else {
        return json.result;
    }
};

/**
 * 功能：判断一个值是否为空(null,undefined和''属于空)
 */
const isEmpty = (value) => {
    const type = typeof value;
    if (type === 'number' || type === 'boolean') {
        return false;
    } else {
        return !value;
    }
};

/**
 * 功能：判断一个值是否为空(null,undefined,''和[]属于空)
 */
const isEmpty2 = (value) => {
    const type = typeof value;
    if (type === 'number' || type === 'boolean') {
        return false;
    } else if (Array.isArray(value)) {
        return !value.length;
    } else {
        return !value;
    }
};

/**
 * 功能：将待提交的表单数据中为key：{title，value}的数据转成key：value
 *  obj：[必须]，对象(一般为表单数据对象)
 * 返回值：转化后的对象
 */
const toFormValue = (obj, titleKeys = []) => {
    let newObj = Object.assign({}, obj);
    for (let key of Object.keys(obj)) {
        if (Array.isArray(obj[key])) {
            newObj[key] = obj[key];
        } else if (obj[key] && typeof obj[key] === 'object') {
            newObj[key] = titleKeys.findIndex(titleKey => titleKey === key) >= 0 ? obj[key].title : obj[key].value;
        }
    }
    return newObj;
};

// 判断是否只选中了一个，如果选中多个或未选中一个，则返回-1；否则，返回选中的索引号
const findOnlyCheckedIndex = (items) => {
    const index = items.reduce((result, item, index) => {
        item.checked && result.push(index);
        return result;
    }, []);
    return index.length !== 1 ? -1 : index[0];
};

const normalValue = (value) => {
    if (typeof value === 'object') {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            } else if (typeof value.title !== 'undefined') {
                return value.value;
            } else {
                return value;
            }
        } else {
            return '';
        }
    } else {
        return value;
    }
};


/**
 * 提取出包含{value,title}中的value，用于传递给后端接口
 */
const convert = (value) => {
    return Object.keys(value).reduce((result, key) => {
        result[key] = normalValue(value[key]);
        return result;
    }, {});
};

// 判断指定的tab key是否存在
const isTabExist = (tabs, key) => {
    return tabs.some(tab => tab.key === key);
};

//判断登陆用户是否有当前路由的权限


// 生成唯一的tab key
const genTabKey = (prefix, tabs) => {
    const defKey = `${prefix}_${tabs.length}`;
    let key = defKey;
    for (let i = 1; isTabExist(tabs, key); i++) {
        key = `${defKey}_${i}`;
    }
    return key;
};

const childrenKeyHandle = (arrayObj) => {  // 提取权限树根节点下的子节点生成key值数组
    let children = [];
    arrayObj.forEach((obj) => {
        children.push(obj.id);
    });
    return children;
};

const treeToMenu = (tree,children,menu)=>{ //把权限树变为菜单树
    Object.keys(tree).forEach(key=>{
        tree[key] = {
            resourceType: tree[key].data.resourceType,
            name:tree[key].data.resourceName,
            icon:tree[key].data.icon,
            key:tree[key].data.resourceKey,
            path:tree[key].data.path?('/'+tree[key].data.path.join('/')):'/',
            children:tree[key].children
        }
    })

    Object.keys(tree).forEach(key=>{
        if(tree[key].children){
            tree[key].children.forEach((k,i)=>{
                if(tree[k].resourceType===3){//如果 是aciton(按钮类型) 就把他放到power里面

                     if(!tree[key].power){
                        tree[key].power=[]
                     }

                     tree[key].power.push(tree[k].key)

                     delete tree[key].children
                }else{
                    tree[key].children.splice(i,1,tree[k])
                }

            })
        }
    })
    return tree.distribution.children;
}

const treeDataHandle = (parentKey, childrenKey, childrenData, tree) => {   // superTree数据处理
    childrenKey.forEach((key) => {
        childrenData.forEach((obj) => {
            if (obj.id === key) {
                tree[`${key}`] = {};
                tree[`${key}`].key = obj.id;
                tree[`${key}`].title = obj.resourceName;
                tree[`${key}`].data = Object.keys(obj).reduce((newObj,x)=>{
                    if(x!=='children'){
                        newObj[x]=obj[x]
                    }
                    return newObj
                },{});
                tree[`${key}`].parent = parentKey;
                    let children = [];
                    if (obj.children) {
                        obj.children.forEach((child) => {
                            children.push(child.id);
                        });
                    }
                    tree[`${key}`].children = children;

                treeDataHandle(obj.id, tree[`${key}`].children, obj.children, tree);
            }
        })
    })
};

const getChildrenItems = (keyArray, treeData) => {   //根据key值获取对应的数据生成tableItems
    let childrenItems = [];
    keyArray.forEach((key) => {
        childrenItems.push(treeData[key].data);
    });
    return childrenItems;
};

/**
 * 功能：依据fields来验证value中指定属性(key)是否为空
 *  fields：[必须]，对象数组，每个对象用于描述value中的相应的属性是否为必填项(不能为空)
 *   对象中必须有key属性，以及可选的required属性，required为true表明指示的key为必填项
 *  value：[必须]，对象(key-value对)
 * 返回值：通过校验返回true，未通过返回false
 */
const validValue = (fields, value) => {
    return fields.every(({key, required}) => {
        return !required || !isEmpty2(value[key]);
    });
};

const validArray = (fields, array) => {
    return !array.some(item => !validValue(fields, item));
};

// /**
//  * 功能：批量获取字典
//  * names：字典名数组
//  */
// const fetchDictionary = async (names) => {
//   let json = {returnCode: 0, result: {}};

//   if (!global.dictionary) {
//     global.dictionary = {};
//   }

//   if (names.length === 0) {
//     return json;
//   }

//   const fetchNames = names.filter(name => !global.dictionary.hasOwnProperty(name));
//   if (fetchNames.length !== 0) {
//     json = await fetchJson(DICTIONARY_URL, postOption({names}));
//     if (json.returnCode === 0) {
//       Object.assign(global.dictionary, getObject(json.result, fetchNames));
//     } else {
//       return json;
//     }
//   }

//   Object.assign(json.result, getObject(global.dictionary, names));

//   return json;
// };

/****
 * zyy 的字典数组转为字典对象
 */
const setArrayToDictionary = (objArray = [],array=[])=>{
    const dictionary = array.reduce((dictionary,obj)=>{
        return Object.assign({},dictionary,obj)
    },{})
    setDictionary(objArray,dictionary);
}

/**
 * objArray：对象数组，一般是SuperTable(cols), SuperTable2(cols)、SuperForm(controls)和Search(filters)的参数
 * value：对象，key-value对，key为字典名，value为字典(对象数组)
 */
const setDictionary = (objArray = [], value = {}, keyName = 'options') => {
    Array.isArray(objArray) &&
    objArray.every(obj => {
        if (obj.dictionary) {
            if (value[obj.dictionary]) {
                obj[keyName] = value[obj.dictionary];
            }
        } else if (obj.from === 'dictionary') {
            if (value[obj.position]) {
                obj[keyName] = value[obj.position];
            }
        }
        return true;
    });
};

const validFieldValue = (fields, value) => {
    return fields.every((item) => {
        if (!item.rules || (item.rules instanceof Array && item.rules.length === 0)) {
            return true;
        }
        else {
            let _value = value[item.key];
            if (_value) {
                return item.rules.every(item => {
                    // 如果是正则表达式
                    if (item.reg) {
                        return item.reg.test(_value);
                    }
                });
            } else {
                return true;
            }

        }
    });
};


export {
    convert,
    setArrayToDictionary,
    treeToMenu,
    validValue,
    validArray,
    validFieldValue,
    treeDataHandle,
    childrenKeyHandle,
    getChildrenItems,
    showError,
    showSuccess,
    findOnlyCheckedIndex,
    normalValue,
    isEmpty,
    isEmpty2,
    postOption,
    formDataOption,
    genTabKey,
    isTabExist,
    toFormValue,
    getObject,
    getObjectExclude,
    getJsonResult,
    // fetchDictionary,
    setDictionary
};
