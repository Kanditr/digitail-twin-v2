import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Discover.module.sass";
import { Range, getTrackBackground } from "react-range";
import Slider from "react-slick";
import Icon from "../../../components/Icon";
import Card from "../../../components/Card/card";
import Dropdown from "../../../components/Dropdown/dropdown";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

// data
import { bids } from "../../../mocks/bids";

const navLinks = ["All items", "Art", "Game", "Photography", "Music", "Video"];
const dateOptions = ["Recently added", "Long added"];
const priceOptions = ["Highest price", "The lowest price"];
const likesOptions = ["Most liked", "Least liked"];
const creatorOptions = ["Verified only", "All", "Most liked"];
const sortingOptions = [] as any[];

navLinks.map((x) => sortingOptions.push(x));

const SlickArrow = ({ currentSlide, slideCount, children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const Discover = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [price, setPrice] = useState(priceOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [sorting, setSorting] = useState(sortingOptions[0]);

  const [values, setValues] = useState([5]);

  const [visible, setVisible] = useState(false);

  const STEP = 0.1;
  const MIN = 0.0;
  const MAX = 10;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 100000,
        settings: "unslick",
      },
    ],
  } as any;

  // set items and filtered items
  const [items, setItems] = useState([]) as any[];
  const [filtered, setFiltered] = useState([]) as any[];

  useEffect(() => {
    getItems();
  }, []);

  // get items from firestore
  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(items);
    setFiltered(items);
  };

  // filter on click nav
  function filter(nav: any) {
    var filtered = items.filter((e: any) => e.category === nav);
    nav === "All items" ? setFiltered(items) : setFiltered(filtered);
  }

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <h3 className={cn("h3", styles.title)}>Discover</h3>
        <div className={styles.top}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
              fx={function () {}}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.map((nav, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: nav === sorting,
                })}
                onClick={() => {
                  setActiveIndex(index);
                  setSorting(nav);
                  filter(nav);
                }}
                key={index}
              >
                {nav}
              </button>
            ))}
          </div>
          <div className={cn("tablet-show", styles.dropdown)}>
            <Dropdown
              className={styles.dropdown}
              value={sorting}
              setValue={setSorting}
              options={sortingOptions}
              fx={filter}
            />
          </div>
          <button
            className={cn(styles.filter, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <div className={styles.text}>Filter</div>
            <div className={styles.toggle}>
              <Icon name="filter" size="18" />
              <Icon name="close" size="10" />
            </div>
          </button>
        </div>
        <div className={cn(styles.filters, { [styles.active]: visible })}>
          <div className={styles.sorting}>
            <div className={styles.cell}>
              <div className={styles.label}>Price</div>
              <Dropdown
                className={styles.dropdown}
                value={price}
                setValue={setPrice}
                options={priceOptions}
                fx={function () {}}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>likes</div>
              <Dropdown
                className={styles.dropdown}
                value={likes}
                setValue={setLikes}
                options={likesOptions}
                fx={function () {}}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>creator</div>
              <Dropdown
                className={styles.dropdown}
                value={creator}
                setValue={setCreator}
                options={creatorOptions}
                fx={function () {}}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>Price range</div>
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "27px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0.01 ETH</div>
                <div className={styles.number}>10 ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          <Slider
            className={cn("discover-slider", styles.slider)}
            {...settings}
          >
            {filtered.map((x: any, index: any) => (
              <Card className={styles.card} item={x} key={index} />
            ))}
          </Slider>
        </div>
        <div className={styles.btns}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <span>Load more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
