import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '60px' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;