import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper"

export default function UserManagement() {
  return (
    <>
      <Sidebar />
      <Wrapper childrenElement={<>
        <h2>User Management Page</h2>

        </>} />

    </>
  )
}