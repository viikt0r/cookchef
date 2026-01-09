import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Admin.module.scss";
import AdminNav from "./components/AdminNav/AdminNav";

function Admin() {
  return (
    <div className={`d-flex flex-fill p-20 ${styles.container}`}>
      <AdminNav />
      <div className="d-flex flex-column flex-fill">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
export default Admin;
