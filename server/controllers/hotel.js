import Hotel from '../models/hotel';
import fs from 'fs';

export const createHotel = async (req, res) => {
  try {
    let { files, fields } = req;

    let hotel = new Hotel(fields);
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = fs.readFileSync(files.image.type);
    }
    hotel.save((err, result) => {
      if (err) {
        console.log('Hotel save error', err);
        res.status(400).send('Error saving hotel');
      }
      res.json(result);
    });
    console.log('create hotel');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};
