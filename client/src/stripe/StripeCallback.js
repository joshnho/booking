import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { getAccountStatus } from '../store/actions/stripe';

const StripeCallback = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.token) accountStatus();
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="h1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;