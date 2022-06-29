import Friends from '~/components/Friends';
import Header from '~/components/Header';
import styles from './Sidebar.module.scss';
import className from 'classnames/bind';

let cx = className.bind(styles);

function Sidebar() {
  return ( 
    <div className={cx('wrap')}>
      <Header />
      <Friends />
    </div>
  );
}

export default Sidebar;