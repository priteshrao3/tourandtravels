import React, { useState } from 'react';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    alternatePhone: '',
    isAlternate: false,
    date: '2024-11-15',
    time: '16:17',
    pickUpAddress: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending to the server
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="booking-detail visitor-guide-sectoin">
        <div className="visitor-guide-head color2">Your Booking Details</div>
        <div className="visitor-guide">
          <form action="https://sardartravels.in/enquiry" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_token" value="KvAfKrLzAcJtf6Gf3kNti7WqIA8cdrwTkUAKbfSy" />
            <input name="tour_from" type="hidden" value="Shimla" />
            <input name="tour_to" type="hidden" value="Jammu" />
            <input name="cab" type="hidden" value="Maruti Dzire" />
            <input name="status" type="hidden" value="Open" />
            <input name="type" id="type" type="hidden" value="1" />
            <input name="booking_type" type="hidden" value="1" />
            <input name="price" type="hidden" value="7500" />

            <div className="booking-info">
              <ul>
                <li className="route">
                  <label>Going From:</label>
                  <div>Shimla</div>
                </li>
                <li className="route">
                  <label>Going To:</label>
                  <div>Jammu</div>
                </li>
                <li className="taxi-detail">
                  <label>Selected Car:</label>
                  <div>Maruti Dzire</div>
                </li>
                <li className="price">
                  <label>Price:</label>
                  <div>₹<b className="wayprice">7500/-</b><span>Inc. of Taxes*</span></div>
                </li>
              </ul>
            </div>

            <div className="booking-contact booking-form-bottom">
              <h3>Contact & Pickup Details</h3>
              <div className="pick-detail-form forms">
                <ul>
                  <li>
                    <div className="form-floating">
                      <input
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Your Name"
                        required
                        className="form-control"
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-floating">
                      <div className="d-flex">
                        <div className="first">
                          <select
                            name="code"
                            className="form-control phonecode"
                          >
                            <option value="93">+93</option>
                            <option value="355">+355</option>
                            <option value="260">+260</option>
                            <option value="263">+263</option>
                          </select>
                        </div>
                        <div className="second">
                          <input
                            name="phone"
                            id="mobile_code1"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            required
                            className="form-control mobilenumber"
                            placeholder="Whatsapp Mobile Number..."
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="form-floating alternate_mobile1">
                      <p htmlFor="is_alternale">
                        <input
                          type="checkbox"
                          name="isAlternate"
                          id="is_alternale"
                          checked={formData.isAlternate}
                          onChange={handleChange}
                          className="is_alternate"
                        />
                        Send trip details to alternate mobile number?
                      </p>
                    </div>
                  </li>
                  {formData.isAlternate && (
                    <li>
                      <div className="form-floating alternate_mobile">
                        <div className="d-flex">
                          <div className="first">
                            <select
                              name="code1"
                              className="form-control phonecode"
                            >
                              <option value="93">+93</option>
                              <option value="355">+355</option>
                              <option value="260">+260</option>
                              <option value="263">+263</option>
                            </select>
                          </div>
                          <div className="second">
                            <input
                              name="alternatePhone"
                              id="mobile_code1"
                              value={formData.alternatePhone}
                              onChange={handleChange}
                              type="tel"
                              className="form-control mobilenumber"
                              placeholder="You Mobile number..."
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                  <li className="date-time">
                    <div className="form-floating">
                      <input
                        type="date"
                        id="date"
                        name="date_time"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="2024-11-15"
                      />
                      <label htmlFor="date">Select Date<span className="red-text">*</span></label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </li>
                  <li>
                    <div className="form-floating">
                      <input
                        name="pickUpAddress"
                        id="pickUp_address"
                        value={formData.pickUpAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Pick up Address"
                        className="form-control"
                      />
                      <label htmlFor="pickUp_address">Pick up Address</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-floating">
                      <input
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Your Email (Optional)"
                        className="form-control"
                      />
                      <label htmlFor="email">Email (Optional)</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-floating">
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Special Instructions (Optional Message)"
                        cols="10"
                        rows="2"
                        className="form-control"
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </li>
                  <li>
                    <input
                      name="contact_btn"
                      type="submit"
                      value="Send Enquiry"
                      className="btn"
                    />
                  </li>
                  <input type="hidden" name="countrycode" id="ccode" />
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
