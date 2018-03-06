/**
 * route list
 */

export const labelRoute = {
    key: 'label',
    name: 'label',
    path: '/label'
}

export const todoRoute = {
    key: 'todo',
    name: 'todo',
    path: '/todo',
    child: {
        base: {
            key: 'base',
            name: '基础信息',
            path: '/personal/base'
        }
    }
}

export default { labelRoute, todoRoute };
