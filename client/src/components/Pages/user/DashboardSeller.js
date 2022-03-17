import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HomeOutlined } from '@ant-design/icons';

import DashboardNav from '../../DashboardNav';
import ConnectNav from '../../ConnectNav';
import { createConnectAccount } from '../../../store/actions/stripe';

const DashboardSeller = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await createConnectAccount(auth.token);
      console.log(res.data);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error('Stripe connect failed, Try again.');
      setLoading(false);
    }
  };

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Listings</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add New
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel rooms</h4>
              <p className="lead">
                MERN partners with stripe to transfer earnings to your bank
              </p>
              <button
                disabled={loading}
                onClick={handleClick}
                className="btn btn-primary mb-3"
              >
                {loading ? 'Processing...' : 'Setup Payouts'}
              </button>
              <p className="text-muted">
                <small>
                  You'll be redirected to Stripe to complete the onboarding
                  process
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth?.user?.stripe_seller?.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
