import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';

const routes = [
    {Path: '/admin', exact:true, name: 'Admin'},
    {Path: '/admin/dashboard', exact:true, name: 'Dashboard', component: Dashboard},
    {Path: '/admin/profile', exact:true, name: 'DashboProfileard', component: Profile},
];
export default routes;