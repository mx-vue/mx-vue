import {
	param2Obj
} from '@/utils'

const menuList = 
 [{menuId:'1',path:'',name:'菜单1',menuIcon:'icon',children:[
	 {menuId:'1.1',path:'/demo',name:'菜单1.1',menuIcon:'icon',children:[]},
	 {menuId:'1.2',path:'/home',name:'菜单1.2',menuIcon:'icon',children:[]}
 ]},
 {menuId:'2',path:'',name:'菜单2',menuIcon:'icon',children:[
 	{menuId:'2.1',path:'/home2',name:'菜单2.1',menuIcon:'icon',children:[]},
 	{menuId:'2.2',path:'/home1',name:'菜单2.11',menuIcon:'icon',children:[]}
 ]},
 {menuId:'3',path:'demo/demo',name:'菜单3',menuIcon:'icon',children:[]},
 {menuId:'4',path:'',name:'菜单4',menuIcon:'icon',children:[
 	{menuId:'4.1',path:'',name:'菜单4.1',menuIcon:'icon',children:[
 		{menuId:'4.1.1',path:'home/index2',name:'菜单4.1.1',menuIcon:'icon',children:[]}
 	]},
 	{menuId:'4.2',path:'/demo',name:'菜单4.2',menuIcon:'icon',children:[]}
 ]}
];

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员1',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
	menuList: menuList
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
};


export default {
	getUserInfo: config => {
		const token = JSON.parse(config.body).token
		if (userMap[token]) {
			const body = {
				code: 200,
				data: userMap[token]
			};
			return body
		} else {
			return false
		}
	},
	login: config => {
		const {
			username,
			password
		} = JSON.parse(config.body);
		if (username === 'admin' && password === '123456') {
			return {
				code: 200,
				data: {
					token: 'admin',
					introduction: '我是超级管理员',
					avatar: '/static/logo.png',
					name: 'Super Admin'
				}
			};
		} else {
			return {
				code: 20001,
				msg: "用户名或密码错误"
			}
		}
	},
	logout: () => {
		return {
			code: 0
		}
	}
}
