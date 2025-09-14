# Rental Car App

This repository contains the frontend code for the RentalCar web application, a
platform for renting cars [[2]]. It allows users to browse available vehicles,
filter them based on specific criteria, view detailed information about each
car, and submit rental requests [[1]].

## Features

- **Home Page:** Landing page with a banner and call-to-action.
- **Catalog Page:** Browse all available vehicles with filtering options (brand,
  price, mileage) and the ability to add cars to favorites.
- **Car Details Page:** Detailed view of a selected car with photo and rental
  form.
- **Filtering:** Backend-powered filtering by brand, price, and mileage
  (from/to).
- **Favorites:** Ability to add/remove cars to a favorites list (persisted in
  localStorage).
- **Load More:** Pagination for loading additional car listings on the catalog
  page.
- **Booking Form:** Submit a rental request for a specific car.
- **Responsive Design:** Designed for desktop view (potential for future
  responsiveness).

## Technologies Used

- **Frontend:** React, Vite
- **State Management:** Redux
- **Routing:** React Router
- **HTTP Client:** Axios
- **Styling:** CSS Modules
- **Deployment:** Vercel

## API

This application uses the Car Rental API for data management. Documentation is
available [here](https://car-rental-api.goit.global/api-docs/).

## Installation and Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/nazariynetrebko/rental-car-app.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd rental-car-app
    ```
3.  Install dependencies:
    ```bash
    npm install # or yarn install / pnpm install
    ```
4.  Start the development server:
    ```bash
    npm run dev # or yarn dev / pnpm dev
    ```
    The application will be available at `http://localhost:5173` (or the port
    specified by Vite).

## Deployment

The project is deployed on Vercel:
[https://rental-car-app-cyan.vercel.app/](https://rental-car-app-cyan.vercel.app/)

## Author

[Nazarii Netrebko](https://github.com/nazariynetrebko) (and potentially other
contributors)

## License

MIT License (or specify the license used)
