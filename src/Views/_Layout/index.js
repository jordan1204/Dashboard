import { Outlet } from 'react-router-dom';


const index = () => {
    

  return (
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default index;