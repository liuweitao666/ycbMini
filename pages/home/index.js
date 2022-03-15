// 定义请求参数
export const clueQueryInfo = {
	name: '',
	createDate: 0,
	status: '0',
	range: 2,
	contactTypes:''
};
// 定义请求参数
export const customerQueryInfo = {
	name: '',
	createDateType: 0,
	status: '',
	scopeType: 2,
	contactTypes:''
};
export const dropData = ['联系方式', '创建时间', '范围', '状态'];
// 1：手机，2：电话，3：旺旺，4：qq，5：微信，6：邮箱
export const contactTypesOptions = [
	{
		label:'全部',
		value:''
	},
	{
		label: '手机',
		value: 1
	},
	{
		label: '电话',
		value: 2
	},
	{
		label: '旺旺',
		value: 4
	},
	{
		label: 'qq',
		value: 3
	},
	{
		label: '微信',
		value: 5
	},
	{
		label: '邮箱',
		value: 6
	}
];
// (0：全部，1：今日，2：本周，3：上周，4：当月，5:上月)
export const createTimeOptions = [
	{
		label: '全部',
		value: 0
	},
	{
		label: '今日',
		value: 1
	},
	{
		label: '本周',
		value: 2
	},
	{
		label: '上周',
		value: 4
	},
	{
		label: '当月',
		value: 3
	},
	{
		label: '上月',
		value: 5
	}
];
// 范围参数 (1：全部，2：我负责的，3：部门下属)
export const rangeOptions = [
	{
		label: '我负责的',
		value: 2
	},
	{
		label: '部门下属',
		value: 3
	}
];
// 状态参数 (0：全部、1.待分配、2.未跟进、3.跟进中、4.已入库、5.已关闭)
export const statusOptions = [
	{
		label: '全部',
		value: 0
	},
	{
		label: '待分配',
		value: 1
	},
	{
		label: '未跟进',
		value: 2
	},
	{
		label: '跟进中',
		value: 3
	},
	{
		label: '已入库',
		value: 4
	},
	{
		label: '已关闭',
		value: 5
	},
];
// 1：全部，2：本人可见，3：所在机构及子级可见，4：我协作可见
export const scopeTypeOptions = [
	{
		label: '我负责的',
		value: 2
	},
	{
		label: '我下属的',
		value: 3
	},
	{
		label: '我协作的',
		value: 4
	},
	
]
// 客户状态
export const statusCustomerOptions = [
	{
		label: '全部',
		value: ''
	},
	{
		label: '潜在客户',
		value: 1
	},
	{
		label: '成交客户',
		value: 2
	}
]