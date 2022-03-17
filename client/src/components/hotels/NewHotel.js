import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createHotel } from '../../store/actions/hotel';
import NewHotelForm from './NewHotelForm';

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  );
  const { title, content, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let hotelData = new FormData();
      hotelData.append('title', title);
      hotelData.append('content', content);
      hotelData.append('location', location);
      hotelData.append('price', price);
      hotelData.append('from', from);
      hotelData.append('to', to);
      hotelData.append('bed', bed);
      image && hotelData.append('image', image);

      await createHotel(token, hotelData);
      toast.success('New hotel successfully posted!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setPreview(URL.createObjectURL(image));
    setValues({ ...values, image: image });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <NewHotelForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              title={title}
              content={content}
              location={location}
              setLocation={setLocation}
              values={values}
              setValues={setValues}
              price={price}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(location)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
