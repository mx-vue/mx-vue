import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Layout from '../views/layout/index.vue'

export const constantRouterMap = [{
		path: '',
		component: Layout,
		redirect: '/home',
		children: [{
			path: '/home',
			name: 'home',
			component: _import('home/index')
		}]
	},
	{
		path: '/login',
		component: _import('login/index'),
		hidden: true
	},
	{
		path: '/401',
		component: _import('errorPage/401'),
		hidden: true
	},
	{
		path: '/404',
		component: _import('errorPage/404'),
		hidden: true
	}
];

export default new Router({
  mode: 'history',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

//异步挂载的路由 动态需要根据权限加载的路由表
/*export const asyncRouterMap = [{ path: 'demo', component: _import('demo/demo'), name: '菜单1', meta: { title: 'tinymce' }},
      { path: '/home', component: _import('home/index'), name: '菜单2', meta: { title: 'markdown' }},
      { path: '/home1', component: _import('home1/index'), name: '菜单3', meta: { title: 'jsonEditor' }},
      { path: '/home2', component: _import('home2/index'), name: '菜单4', meta: { title: 'dndList' }},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}];*/
export const asyncRouterMap = [{
		path:'',
		component: Layout,
		children:[
				{path: '/demo', component: _import('demo/demo'), name: '菜单1', meta: { title: 'tinymce' }},
				{ path: '/home', component: _import('home/index'), name: '菜单2', meta: { title: 'markdown' }},
			    { path: '/home1', component: _import('home1/index'), name: '菜单3', meta: { title: 'jsonEditor' }},
			    { path: '/home2', component: _import('home2/index'), name: '菜单4', meta: { title: 'dndList' }}		
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
];