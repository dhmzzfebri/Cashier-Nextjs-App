import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";
import {Table} from 'react-bootstrap';

export default function UserManagement() {
  return (
    <>
      <Sidebar />
      <Wrapper childrenElement={<>
        <h2>User Management Page</h2>
        <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        
      </tbody>
    </Table>
        </>} />

    </>
  )
}