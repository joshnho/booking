import PlacesAutocomplete from 'react-google-autocomplete';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
};

const NewHotelForm = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  location,
  setLocation,
  values,
  values: { title, content, price },
  setValues,
}) => {
  return (
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
};

export default NewHotelForm;
