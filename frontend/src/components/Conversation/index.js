import styles from './Conversation.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { setSaveConv } from '~/store/slices';

let cx = className.bind(styles);
const socket = io.connect('http://localhost:3001');

function Conversation() {
	const userId = window.sessionStorage.getItem('userId');

	const dialog = useRef();
	const loading = useRef();
	const [roomId, setRoomId] = useState('');
	const [cvs, setCvs] = useState([]);
	const [sendMessage, setSendMessage] = useState('');
	const [changed, setChanged] = useState({ change: false, uid: '' });

	let index = useSelector((state) => state.chatting.indexChatting);
	// console.log(index);

	const friends = JSON.parse(window.sessionStorage.getItem('friend'));
	let numFriends = useSelector((state) => state.chatting.numFriends);
	const [realFriends, setRealFriends] = useState([]);
	useEffect(() => {
		setRealFriends((preState) => {
			friends.forEach((friend) => {
				preState.push(friend);
			});
			return preState;
		});
	}, [numFriends]);

	let newFriend = useSelector((state) => state.chatting.friend);
	useEffect(() => {
		if (Object.keys(newFriend).length != 0)
			setRealFriends((preState) => [...preState, newFriend]);
	}, [newFriend]);
	// console.log(realFriends, friends);

	let friend = {};
	if (realFriends.length != 0) friend = realFriends[index];
	else if (friends.length != 0) friend = friends[index];
	else friend = {};
	// console.log(friend);

	let frid;
	if (Object.keys(friend).length != 0) frid = friend.uid;
	else frid = '';

	//Get old conversation
	useEffect(() => {
		// console.log(frid);
		if (frid != '') {
			loading.current.style.display = 'block';
			axios({
				url: 'http://localhost:3001/cvs/',
				method: 'POST',
				data: {
					uid1: userId,
					uid2: frid,
				},
			}).then((res) => {
				// console.log(res.data);
				//Save new conversation
				if (changed.change == true) {
					saveConv();
					setChanged({ change: false, uid: '' });
				}
				setRoomId((preState) => res.data.id);
				setCvs((preState) => res.data.cvs);
				// console.log(1, res.data.id);
				socket.emit('join_room', { room: res.data.id });
			});
			loading.current.style.display = 'none';
		}
	}, [index]);

	const saveConv = () => {
		axios({
			url: 'http://localhost:3001/cvs/update',
			method: 'POST',
			data: {
				id: roomId,
				uids: [
					userId.toString(),
					changed.uid.toString() || friend.uid.toString(),
				],
				conv: cvs,
			},
		});
	};

	const dispatch = useDispatch();
	let saveCvs = useSelector((state) => state.chatting.saveConv);
	const navigate = useNavigate();
	useEffect(() => {
		saveConv();
		if (saveCvs == 1) {
			dispatch(setSaveConv(0));
			navigate('/', { replace: true });
		}
	}, [saveCvs]);

	const sendMessageFunc = () => {
		if (sendMessage != '') {
			socket.emit('send_message', {
				uid: userId,
				mess: sendMessage,
				room: roomId,
			});
			setCvs((preState) => [...preState, { uid: userId, mess: sendMessage }]);
			setSendMessage('');
			setChanged({ change: true, uid: frid });
			dialog.current.scrollTop = dialog.current.scrollHeight;
		}
	};

	// console.log(socket);
	useEffect(() => {
		socket.on('receive_message', (data) => {
			// console.log('receive');
			setChanged({ change: true, uid: frid });
			setCvs((preState) => [...preState, { uid: data.uid, mess: data.mess }]);
		});

		return () => {
			socket.off('receive_message');
		};
	}, [socket]);

	const handlePress = (e) => {
		if (e.key == 'Enter') {
			e.preventDefault();
			sendMessageFunc();
		}
	};

	return (
		<div className={cx('wrap')}>
			<div className={cx('name')}>
				<div className={cx('image')}>
					{friend.img ? (
						<img src={friend.img} alt="" />
					) : (
						<img
							src="https://th.bing.com/th/id/R.dc2a0b7fbf8719ce21dbc279e2e4483d?rik=IzmV07o8iJSn%2bg&riu=http%3a%2f%2fthuthuattienich.com%2fwp-content%2fuploads%2f2017%2f02%2fanh-dai-dien-facebook-doc-4.jpg&ehk=%2bNvFyq6ue%2fAVi0cn0UElur6IOjVt57INtMC%2b02%2fRD2M%3d&risl=&pid=ImgRaw&r=0"
							alt=""
						/>
					)}
					<p>{friend.name}</p>
				</div>
				<FontAwesomeIcon icon={faEllipsisH} />
			</div>

			<div className={cx('dialog')} ref={dialog}>
				<div ref={loading} className={cx('loading')}>
					<ReactLoading
						type="spinningBubbles"
						color="pink"
						width="5"
						height="5"
					/>
				</div>
				{cvs.map((data, index) => {
					return (
						<div
							key={index}
							className={cx(userId == data.uid ? 'you' : 'yrfr')}
						>
							<div className={cx('text')}>{data.mess}</div>
						</div>
					);
				})}
			</div>

			<div className={cx('type')}>
				<input
					type="text"
					placeholder="Type a message here..."
					value={sendMessage}
					onChange={(e) => setSendMessage(e.target.value)}
					onKeyDown={(e) => handlePress(e)}
				/>
				<div className={cx('icon_wrap')}>
					<FontAwesomeIcon
						className={cx('send_icon')}
						icon={faPaperPlane}
						onClick={sendMessageFunc}
					/>
				</div>
			</div>
		</div>
	);
}

export default Conversation;
