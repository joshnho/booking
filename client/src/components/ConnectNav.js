import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import { SettingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from '../store/actions/stripe';

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  useEffect(() => {
    getAccountBalance(token).then((res) => {
      setBalance(res.data);
    });
  }, [token]);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);

      // window.location.href = res.data.url;
      window.open(`${res.data.url}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast('Unable to access settings. Try again');
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0].toUpperCase()}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth?.user?.stripe_seller && auth?.user?.stripe_seller.charges_enabled && (
        <>
          <Ribbon text="Available" color="silver">
            <Card className="bg-light pt-1">
              {balance?.pending?.map((balance, idx) => (
                <span key={idx} className="lead">
                  {currencyFormatter(balance)}
                </span>
              ))}
            </Card>
          </Ribbon>
          <Ribbon text="Payouts" color="silver">
            <Card
              onClick={handlePayoutSettings}
              className="bg-light"
              style={{ cursor: 'pointer' }}
            >
              <SettingOutlined className="h5 pt-2" />
            </Card>
          </Ribbon>
        </>
      )}
    </div>
  );
};

export default ConnectNav;
