import api from '../../views/login/service'
import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(route) {
	let router = "";
	const map = asyncRouterMap[0].children;
	for (let i = 0; i < map.length; i++) {
		if(map[i].path == route.path){
				router = map[i];
				//router.meta = route.name;
	  		break;
  	}
	}
	return router;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param list
 */
function filterAsyncRouter(list) {
	const accessedRouters =  [];
	let recursion = function(menuList){
		menuList.filter(route => {
			if(route.children && route.children.length){
  			recursion(route.children);
  		}else{
  			let router = hasPermission(route);
  			if(router){
  				accessedRouters.push(router);
  				route.active = true;
  			}
  		}
		})
	};
	recursion(list);
	asyncRouterMap[0].children = 	accessedRouters;
	return asyncRouterMap;
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    menuRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
    	let menuRouters = [];
    	state.menuRouters = routers;
      /*state.addRouters = routers
      let targetRouter = constantRouterMap.concat(routers)
      state.routers = targetRouter

      let menuRouters = [];
      for (let i = 0; i < targetRouter.length; i++) {
        const element = targetRouter[i];
        if (!element.hidden) {
          if (element.children.length === 1 && !element.meta) {
            let c_path = element.children[0].path;
            let firstRoot = '';
            if (c_path.length > 0) {
              firstRoot = c_path.slice(0, 1) === '/' ? '' : '/';
            }
            element.children[0].path = element.path + firstRoot + c_path;
            menuRouters.push(element.children[0])
          } else {
            menuRouters.push(element);
          }
        }
      }
      state.menuRouters = menuRouters;*/
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
      	const { roles } = data
        let accessedRouters = filterAsyncRouter(roles.menuList);
        commit('SET_ROLES', accessedRouters);
        commit('SET_ROUTERS', roles.menuList)
        resolve()
      })
    }
  }
}

export default permission
