import DefaultLayout from '~/components/Layouts/DefaultLayout';
import Conversation from '~/components/Conversation';
import AboutMe from '~/components/AboutMe';
import { Fragment } from 'react';
import className from 'classnames/bind';
import styles from './Home.module.scss';

const cx = className.bind(styles);

function Home() {
	return (
		<div className={cx('bkgr')}>
			<DefaultLayout>
				<Conversation />
			</DefaultLayout>
			<AboutMe />
		</div>
	);
}

export default Home;
