import React from "react";
import cn from "classnames";
import styles from "./Filters.module.sass";
import Checkbox from "../../../components/Checkbox/checkbox";

const Filters = ({
  className,
  filters,
  selectedFilters,
  setSelectedFilters,
}: any) => {
  const handleChange = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
    } else {
      setSelectedFilters((selectedFilters: any) => [
        ...selectedFilters,
        filter,
      ]);
    }
  };

  return (
    <div className={cn(styles.filters, className)}>
      <div className={styles.info}>Filters</div>
      <div className={styles.group}>
        {filters.map((x: any, index: any) => (
          <Checkbox
            className={styles.checkbox}
            content={x}
            value={selectedFilters.includes(x)}
            onChange={() => handleChange(x)}
            key={index}
          />
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button-stroke button-small", styles.button)}>
          Select all
        </button>
        <button className={cn("button-stroke button-small", styles.button)}>
          Unslect all
        </button>
      </div>
    </div>
  );
};

export default Filters;
