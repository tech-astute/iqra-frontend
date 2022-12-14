// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const master = {
    id: 'master',
    title: 'Master',
    type: 'group',
    children: [
        // {
        //     id: 'login1',
        //     title: 'Login',
        //     type: 'item',
        //     url: '/login',
        //     icon: icons.LoginOutlined,
        //     target: true
        // },
        // {
        //     id: 'register1',
        //     title: 'Register',
        //     type: 'item',
        //     url: '/register',
        //     icon: icons.ProfileOutlined,
        //     target: true
        // }
        {
            id: 'master1',
            title: 'Master',
            type: 'item',
            url: '/master',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default master;
