import Map from "../Components/Map";
import Sidebar from "../Components/Sidebar";
import User from "../Components/User";
import styles from "./AppLayout.module.css";

// app start tracking click krne se app open hoga and cities or countries pe click se wo components open hoge appNav
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
