/* eslint-disable react/react-in-jsx-scope */
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = ({columns, hotelId}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable columns={columns} room={hotelId}/>
      </div>
    </div>
  )
}

export default List