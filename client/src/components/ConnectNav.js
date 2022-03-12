import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import moment from 'moment';

import { getAccountBalance, currencyFormatter } from '../store/actions/stripe';

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

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
          <Ribbon text="Available" color="grey">
            <Card className="bg-light pt-1">
              {balance?.pending?.map((balance, idx) => (
                <span key={idx} className="lead">
                  {currencyFormatter(balance)}
                </span>
              ))}
            </Card>
          </Ribbon>
          <div>Payout settings</div>
        </>
      )}
    </div>
  );
};

export default ConnectNav;
