import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  fetchCars,
  setFilters,
  setPage,
  clearCars,
  clearFilters,
} from "../../redux/slices/carsSlice";
import css from "./CatalogPage.module.css";
import CarCard from "../../components/features/CarCard/CarCard";
import Loader from "../../components/ui/Loader/Loader";
import Select from "react-select";
import DropdownIndicator from "../../components/ui/DropdownIndicator/DropdownIndicator";
import { customSelectStyles } from "../../assets/styles/reactSelectStyles";

function CatalogPage() {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    loadingMore,
    filters,
    currentPage,
    totalPages,
    allBrands,
    allPrices,
  } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(clearCars());
    dispatch(clearFilters());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCars({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const brandOptions = useMemo(
    () => (allBrands || []).map((b) => ({ value: b, label: b })),
    [allBrands]
  );
  const priceOptions = useMemo(
    () => (allPrices || []).map((p) => ({ value: p, label: `$${p}` })),
    [allPrices]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
      dispatch(setPage(1));
    },
    [dispatch]
  );

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) dispatch(setPage(currentPage + 1));
  }, [dispatch, currentPage, totalPages]);

  return (
    <div className={css.container}>
      <div className={css.filters}>
        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Car brand</label>
          <Select
            options={brandOptions}
            value={brandOptions.find((o) => o.value === filters.brand) || null}
            onChange={(opt) =>
              handleFilterChange({ ...filters, brand: opt?.value || "" })
            }
            placeholder="Choose a brand"
            isClearable
            styles={customSelectStyles}
            className={css.selectBrand}
            components={{
              DropdownIndicator,
              ClearIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            classNamePrefix="react-select"
          />
        </div>

        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Price / 1 hour</label>
          <Select
            options={priceOptions}
            value={priceOptions.find((o) => o.value === filters.price) || null}
            onChange={(opt) =>
              handleFilterChange({ ...filters, price: opt?.value || undefined })
            }
            placeholder="Choose a price"
            isClearable
            styles={customSelectStyles}
            className={css.selectPrice}
            components={{
              DropdownIndicator,
              ClearIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            classNamePrefix="react-select"
          />
        </div>

        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Car mileage / km</label>
          <div className={css.mileageContainer}>
            <div className={css.mileageInputWrapper}>
              <span className={css.mileageLabel}>From</span>
              <input
                type="number"
                value={filters.mileageFrom || ""}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    mileageFrom: e.target.value,
                  })
                }
                className={css.inputMileage1}
              />
            </div>
            <div className={css.mileageInputWrapper}>
              <span className={css.mileageLabel}>To</span>
              <input
                type="number"
                value={filters.mileageTo || ""}
                onChange={(e) =>
                  handleFilterChange({ ...filters, mileageTo: e.target.value })
                }
                className={css.inputMileage2}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => dispatch(fetchCars({ ...filters, page: 1 }))}
          className={css.searchButton}>
          Search
        </button>
      </div>

      <div className={css.grid}>
        {loading ? (
          <Loader />
        ) : (
          (items || []).map((car) => <CarCard key={car.id} car={car} />)
        )}
      </div>

      {currentPage < totalPages && (
        <div className={css.loadMoreWrapper}>
          {loadingMore ? (
            <Loader size={25} />
          ) : (
            <button onClick={handleLoadMore} className={css.loadMoreButton}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
