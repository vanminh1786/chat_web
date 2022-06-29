import Sidebar from "~/components/Sidebar";
import styles from './DefaultLayout.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function DefaultLayout({ children}) {
  return ( 
    <div className={cx('wrap')}>
      <div className={cx('sidebar')}>
        <Sidebar />
      </div>
      <div className={cx('content')}>
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;