import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCarById } from "../../redux/slices/carsSlice";
import css from "./VehiclePage.module.css";
import api from "../../api/api";
import Loader from "../../components/ui/Loader/Loader";
import BookingForm from "./BookingForm/BookingForm";
import CarDetails from "./CarDetails/CarDetails";
import toast from "react-hot-toast";

function VehiclePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [booking, setBooking] = useState({
    loading: false,
    error: null,
    date: null,
    showCalendar: false,
  });

  const { car, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    if (id) dispatch(fetchCarById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setBooking((prev) => ({ ...prev, showCalendar: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBooking((prev) => ({ ...prev, loading: true, error: null }));

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!booking.date) {
      toast.error("Please select a booking date.");
      setBooking((prev) => ({ ...prev, loading: false }));
      return;
    }

    data.bookingDate = booking.date
      ? booking.date.toISOString().split("T")[0]
      : "";

    try {
      // const response = await api.post("/rentals", { ...data, carId: id });

      // if (response.status === 201) {
      toast.success("Car booked successfully! 🎉");
      navigate("/catalog");
      // } else {
      //   toast.error("Booking failed. Please try again.");
      // }
    } catch (error) {
      toast.error("An error occurred while booking the car.");
      setBooking((prev) => ({ ...prev, error: "Booking error" }));
    } finally {
      setBooking((prev) => ({ ...prev, loading: false }));
    }
  };

  if (loading) return <Loader size={60} color="#ff4500" />;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className={css.vehiclePage}>
      <div className={css.container}>
        <div className={css.leftColumn}>
          <div className={css.imageContainer}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={css.image}
            />
          </div>

          <BookingForm
            carId={id}
            booking={booking}
            setBooking={setBooking}
            handleBooking={handleBooking}
            inputRef={inputRef}
          />
        </div>

        <div className={css.rightColumn}>
          <CarDetails car={car} />
        </div>
      </div>
    </div>
  );
}

export default VehiclePage;
