// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'user',
    title: 'User',
    type: 'group',
    children: [
        // {
        //     id: 'sample-page',
        //     title: 'Sample Page',
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.ChromeOutlined
        // },
        // {
        //     id: 'documentation',
        //     title: 'Documentation',
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/mantis-react/',
        //     icon: icons.QuestionOutlined,
        //     external: true,
        //     target: true
        // }
        {
            id: 'teacher',
            title: 'Teacher',
            type: 'item',
            url: '/teacher',
            icon: icons.ChromeOutlined
        },
        {
            id: 'student',
            title: 'Student',
            type: 'item',
            url: '/student',
            icon: icons.ChromeOutlined
        }
    ]
};

export default support;
