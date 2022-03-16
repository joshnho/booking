import { useState } from 'react';
import { toast } from 'react-toastify';
import PlacesAutocomplete from 'react-google-autocomplete';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

import { createHotel } from '../store/actions/hotel';

const { Option } = Select;

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
};

const NewHotel = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log(location);
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setPreview(URL.createObjectURL(image));
    setValues({ ...values, image: image });
  };

  const handleChange = (e) => {
    console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          type="text"
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <PlacesAutocomplete
          className="form-control m-2"
          placeholder="City, State"
          name="location"
          defaultValue={location}
          apiKey={config.apiKey}
          onChange={(e) => setLocation(e.target.value)}
          onPlaceSelected={(place) => setLocation(place.formatted_address)}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        {/* <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of beds"
          className="form-control m-2"
          value={bed}
        /> */}

        <Select
          onChange={(bed) => setValues({ ...values, bed })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current?.valueOf() < moment().subtract(1, 'days')
        }
      />
      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current?.valueOf() < moment().subtract(1, 'days')
        }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );

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
            {hotelForm()}
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
