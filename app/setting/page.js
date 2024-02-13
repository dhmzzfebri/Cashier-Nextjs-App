import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";

export default function Setting() {
  return (
    <>
    <Sidebar />
    <Wrapper childrenElement={
      <>
        <h2>Setting Page</h2>
      </>
    } />
    </>
  )
}