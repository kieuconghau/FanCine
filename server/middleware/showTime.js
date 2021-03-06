import mongoose from 'mongoose';
import ShowTime from '../models/showTime.js';
import Theater from '../models/theater.js';
import TheaterMovie from '../models/theaterMovie.js';
import { DateShow, TypeShow } from '../models/index.js';

import { randomIntMinMax } from '../helpers/tools.js';

async function getShowTime(req, res, next) {
  try {
    res.showTime = await ShowTime.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowtimeBySession(req, res, next) {
  try {
    res.session.showtime = await ShowTime.findById(
      mongoose.Types.ObjectId(res.session._idShowtime),
    ).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowtimesBySessions(req, res, next) {
  try {
    for await (const session of res.sessions) {
      session.showtime = await ShowTime.findById(
        mongoose.Types.ObjectId(session._idShowtime),
      ).lean();
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function updateSeats(req, res, next) {
  try {
    let showtime = await ShowTime.findById(mongoose.Types.ObjectId(req.body._idShowtime));
    const newState = showtime.state;
    const seats = req.body.seatInfo.split(', ');
    seats.forEach((seat) => {
      const row = seat.charCodeAt(0) - 'A'.charCodeAt(0);
      const col = parseInt(seat.slice(1), 10);
      newState[row][col] = true;
    });
    showtime = await ShowTime.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._idShowtime) },
      { $set: { state: newState } },
    );
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowTimeByOtherKey(req, res, next) {
  try {
    const showTime = await ShowTime.findOne({
      '_idTheaterMovie': req.params._idTheaterMovie,
      '_idDateShow': req.params._idDateShow,
      '_idTypeShow': req.params._idTypeShow,
      'time': req.params.time,
    }).lean();
    res.showTime = showTime;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getDatesByTheaterMovie(req, res, next) {
  try {
    await ShowTime.find({
      '_idTheaterMovie': mongoose.Types.ObjectId(req.params.id),
    }).distinct('date', (error, dates) => {
      res.dates = dates;
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTypesByTheaterMovie(req, res, next) {
  try {
    await ShowTime.find({
      '_idTheaterMovie': mongoose.Types.ObjectId(req.params.id),
    }).distinct('type', (error, types) => {
      res.types = types;
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowTimesAndPropsByTheaterMovie(req, res, next) {
  try {
    const results = {};
    for await (const date of res.dates) {
      const dateObj = {};
      for await (const type of res.types) {
        const timeObj = {};
        const showTime = await ShowTime.find({
          'date': date,
          'type': type,
        }).lean();
        for (const x of showTime) {
          timeObj[x.time] = x._id;
        }
        dateObj[type] = timeObj;
      }
      results[date] = dateObj;
    }
    res.showTimes = results;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
  res.status(200);
  return next();
}

async function getAllShowTimes(req, res, next) {
  try {
    res.allShowTimes = await ShowTime.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function postSampleShowTimes(req, res, next) {
  try {
    const theaterMovies = await TheaterMovie.find();
    for await (const theaterMovie of theaterMovies) {
      const _idTheaterMovie = theaterMovie._id;
      const theater = await Theater.findById(theaterMovie._idTheater);
      for await (const _idDateShow of theaterMovie._idDateShows) {
        const dateShow = await DateShow.findById(_idDateShow);
        for await (const _idTypeShow of dateShow._idTypeShows) {
          const typeShow = await TypeShow.findById(_idTypeShow);
          for await (const time of typeShow.timeShows) {
            const w = randomIntMinMax(10, 14);
            const h = randomIntMinMax(6, 10);
            const state = [];
            for (let i = 0; i < h; ++i) {
              const row = [];
              for (let j = 0; j < w; ++j) {
                row.push(randomIntMinMax(0, 2) === 1);
              }
              state.push(row);
            }

            const showTime = new ShowTime();
            showTime._idTheaterMovie = _idTheaterMovie;
            showTime._idDateShow = _idDateShow;
            showTime._idTypeShow = _idTypeShow;
            showTime.time = time;
            showTime.room = theater.rooms[randomIntMinMax(0, theater.rooms.length)];
            showTime.state = state;

            // await showTime.save();
          }
        }
      }
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getShowTime,
  getShowtimeBySession,
  getShowtimesBySessions,
  updateSeats,
  getShowTimeByOtherKey,
  getDatesByTheaterMovie,
  getTypesByTheaterMovie,
  getShowTimesAndPropsByTheaterMovie,
  getAllShowTimes,
  postSampleShowTimes,
};
