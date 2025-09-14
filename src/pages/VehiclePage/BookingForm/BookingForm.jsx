import Calendar from "../../../components/features/Calendar/Calendar";
import css from "./BookingFrom.module.css";

function BookingForm({ carId, booking, setBooking, handleBooking, inputRef }) {
  return (
    <div className={css.bookingFormContainer}>
      <form onSubmit={handleBooking} className={css.bookingForm}>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>

        <input
          type="text"
          name="name"
          placeholder="Name*"
          required
          className={css.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className={css.input}
        />

        <input
          type="text"
          name="bookingDate"
          placeholder="Booking date"
          readOnly
          value={booking.date ? booking.date.toLocaleDateString("en-US") : ""}
          onClick={() =>
            setBooking((prev) => ({
              ...prev,
              showCalendar: !prev.showCalendar,
            }))
          }
          className={css.input}
        />

        <div ref={inputRef} style={{ position: "relative" }}>
          {booking.showCalendar && (
            <Calendar
              selectedDate={booking.date}
              onDateSelect={(date) => setBooking((prev) => ({ ...prev, date }))}
              onClose={() =>
                setBooking((prev) => ({ ...prev, showCalendar: false }))
              }
            />
          )}
        </div>

        <textarea
          name="comment"
          placeholder="Comment"
          className={css.textarea}></textarea>

        <button
          type="submit"
          className={css.sendButton}
          disabled={booking.loading}>
          {booking.loading ? "Booking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
