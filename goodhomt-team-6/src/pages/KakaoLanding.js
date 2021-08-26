import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userAction } from '../redux/modules/user';
// import Spinner from './Spinner';
import CircularProgress from '@material-ui/core/CircularProgress';

const KakaoLanding = (props) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((store) => store.user.isLoaded);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  React.useEffect(async () => {
    await dispatch(userAction.kakaoLoginAPI(code));
    dispatch(userAction.isLoaded(true));
  }, []);

  // React.useEffect(() => {
  //   const is_token = window.location.href.includes('token');
  //   console.log(is_token);
  //   if (is_token) {
  //     let token = window.location.href.split('/')[3].split('=')[1];
  //     dispatch(userCreator.logIn(code));
  //     loginCheckAPI;
  //     is_login = true;
  //   }
  // }, []);

  return (
    <>
      {/* 스피너 넣기 */}
      {isLoaded ? <CircularProgress /> : null}
    </>
  );
};

export default KakaoLanding;
