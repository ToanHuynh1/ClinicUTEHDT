export const adminMenu = [
    { // người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            // {
            //     name: 'menu.admin.crud',link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux',link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor',link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                    
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin',link: '/system/user-admin'
            // }, 

            { // quản lý kế hoạch cho bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                   
            }
        ]
    },

    { // phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic',link: '/system/manage-clinic'
            },  
        ]
    },
    { // chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty',link: '/system/manage-specialty'
            },  
        ]
    },
    { // cẩm nang
        name: 'menu.admin.guidebook', 
        menus: [
            {
                name: 'menu.admin.manage-clinic',link: '/system/manage-guidebook'
            },  
        ]
    },
];


export const doctorMenu = [
    {  
    name: 'menu.admin.manage-user', 
    menus: [

    { // quản lý kế hoạch cho bác sĩ
        name: 'menu.doctor.manage-schedule',link: '/doctor/manage-schedule'
    },
    { // quản lý bệnh nhân
        name: 'menu.doctor.manage-patient',link: '/doctor/manage-patient'
    },
    ]      
    }
];

