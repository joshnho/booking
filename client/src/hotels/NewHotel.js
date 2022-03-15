import { useState } from 'react';
import { toast } from 'react-toastify';
import PlacesAutocomplete from 'react-google-autocomplete';

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
  language: 'en',
  countries: ['us'],
};

const NewHotel = () => {
  const [values, setValues] = useState({
    title: '',
    content: '',
    location: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  );
  const { title, content, location, image, price, from, to, bed } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleSelect = async (value) => {};

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
          value={location}
          apiKey={config.apiKey}
          onChange={handleChange}
          onPlaceSelected={(place) => setValues({ ...values, location: place })}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />
        <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of beds"
          className="form-control m-2"
          value={bed}
        />
      </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
