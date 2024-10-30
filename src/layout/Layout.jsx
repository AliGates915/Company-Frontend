/* eslint-disable react/react-in-jsx-scope */
import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"

const Layout = ( {children}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {children}
      </div>
    </div>
  )
}

export default Layout