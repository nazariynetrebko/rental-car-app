import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCars, getCarById, getBrands } from "../../api/carsApi";

const initialState = {
  items: [],
  car: null,
  loading: false,
  loadingMore: false,
  error: null,
  filters: {
    brand: "",
    price: undefined,
    mileageFrom: "",
    mileageTo: "",
  },
  currentPage: 1,
  totalPages: 1,
  allBrands: [],
  // allPrices: [],
  allPrices: Array.from({ length: 6 }, (_, i) => 30 + i * 10),
};

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const parseNumberParam = (value) => {
        if (value === undefined || value === null || value === "") {
          return undefined;
        }
        const num = Number(value);
        return isNaN(num) ? undefined : num;
      };

      const params = {
        page: filters.page || 1,
        limit: filters.limit || 12,
        brand: filters.brand || undefined,
        rentalPrice: parseNumberParam(filters.price),
        minMileage: parseNumberParam(filters.mileageFrom),
        maxMileage: parseNumberParam(filters.mileageTo),
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      console.log("API Request Params:", params);

      const { data } = await getCars(params);
      return { data, meta: { page: params.page } };
    } catch (error) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getCarById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
      state.currentPage = 1;
      state.items = [];
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    clearFilters(state) {
      state.filters = {
        brand: "",
        price: undefined,
        mileageFrom: "",
        mileageTo: "",
      };
      state.currentPage = 1;
      state.items = [];
    },
    clearCars(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.error = null;
        const page = action.meta?.arg?.page ?? 1;
        if (page > 1) state.loadingMore = true;
        else state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const page = action.payload?.meta?.page ?? 1;
        const payload = action.payload?.data || {};
        const cars = payload.cars || [];
        const totalPages = payload.totalPages ?? 1;

        if (page > 1) {
          const unique = cars.filter(
            (c) => !state.items.some((ex) => ex.id === c.id)
          );
          state.items = [...state.items, ...unique];
          state.loadingMore = false;
        } else {
          state.items = cars;
          state.loading = false;
        }

        state.totalPages = totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.allBrands = (action.payload || []).filter(Boolean).sort();
      });
  },
});

export const { setFilters, setPage, clearFilters, clearCars } =
  carsSlice.actions;
export default carsSlice.reducer;
