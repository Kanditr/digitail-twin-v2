import React, { useState, useEffect, createRef } from "react";
import cn from "classnames";
import Link from "next/link";
import Slider from "react-slick";
import styles from "../Hero/Hero.module.sass";
import Icon from "../../../components/Icon";
import Player from "../../../components/Player/index";
// import Modal from "../../../components/Modal/index";
import Connect from "../../../components/Connect/connect";
// import Bid from "../../../components/Bid";
import Modal from "../../../components/Modal/modal";

const items = [
  {
    title: "Digital Twin Network®",
    creator: "Enrico Cole",
    currency: "1.00 ETH",
    price: "$3,618.36",
    avatar: "/images/content/avatar-creator.jpg",
    image: "/images/content/card-pic-1.jpg",
    image2x: "/images/content/card-pic-1@2x.jpg",
  },
  {
    title: "Marco carrillo®",
    creator: "Enrico Cole",
    currency: "2.00 ETH",
    price: "$2,477.92",
    avatar: "/images/content/avatar-creator.jpg",
    image: "/images/content/card-pic-2.jpg",
    image2x: "/images/content/card-pic-2@2x.jpg",
  },
  {
    title: "the creator network®",
    creator: "Enrico Cole",
    currency: "1.00 ETH",
    price: "$3,618.36",
    avatar: "/images/content/avatar-creator.jpg",
    image: "/images/content/card-pic-3.jpg",
    image2x: "/images/content/card-pic-3@2x.jpg",
  },
  {
    title: "Marco carrillo®",
    creator: "Enrico Cole",
    currency: "2.00 ETH",
    price: "$2,477.92",
    avatar: "/images/content/avatar-creator.jpg",
    image: "/images/content/card-pic-4.jpg",
    image2x: "/images/content/card-pic-4@2x.jpg",
  },
];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }: any) => (
  <button {...props}>{children}</button>
);

// let firstClientX: any, clientX;

// const preventTouch = (e: any) => {
//   const minValue = 1; // threshold

//   clientX = e.touches[0].clientX - firstClientX;

//   // Vertical scrolling does not work when you start swiping horizontally.
//   if (Math.abs(clientX) > minValue) {
//     e.preventDefault();
//     e.returnValue = false;

//     return false;
//   }
// };

// const touchStart = (e: any) => {
//   firstClientX = e.touches[0].clientX;
// };

const Hero = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    useTransform: false,
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
  };

  const [visibleModalBid, setVisibleModalBid] = useState(false);

  const [firstClientX, setFirstClientX] = useState() as any;
  const [firstClientY, setFirstClientY] = useState() as any;
  const [clientX, setClientX] = useState() as any;

  useEffect(() => {
    const touchStart = (e: any) => {
      setFirstClientX(e.touches[0].clientX);
      setFirstClientY(e.touches[0].clientY);
    };

    const preventTouch = (e: any) => {
      const minValue = 70; // threshold

      setClientX((e.touches[0].clientX - firstClientX) as any);

      // Vertical scrolling does not work when you start swiping horizontally.
      if (Math.abs(clientX as any) > minValue) {
        // e.preventDefault();
        e.returnValue = false;
        return false;
      }
    };

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", preventTouch, {
      passive: false,
    } as any);
    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", preventTouch, {
        passive: false,
      } as any);
    };
  }, [clientX, firstClientX, firstClientY]);

  // let containerRef = createRef() as any;

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.addEventListener("touchstart", touchStart);
  //     containerRef.current.addEventListener("touchmove", preventTouch, {
  //       passive: false,
  //     });
  //   }

  //   return () => {
  //     if (containerRef.current) {
  //       containerRef.current.removeEventListener("touchstart", touchStart);
  //       containerRef.current.removeEventListener("touchmove", preventTouch, {
  //         passive: false,
  //       });
  //     }
  //   };
  // });

  return (
    <div>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.head}>
            <div className={styles.stage}>
              {"Create, explore, & collect digital art NFTs."}
            </div>
            <h2 className={cn("h3", styles.title)}>
              The new creative economy.
            </h2>
            <Link href="/search01">
              <button className={cn("button-stroke", styles.button)}>
                Start your search
              </button>
            </Link>
          </div>
          <div className={styles.wrapper}>
            <Slider className="creative-slider" {...settings}>
              {items.map((x, index) => (
                <div className={styles.slide} key={index}>
                  <div className={styles.row}>
                    <Player className={styles.player} item={x} />
                    <div className={styles.details}>
                      <div className={cn("h1", styles.subtitle)}>{x.title}</div>
                      <div className={styles.line}>
                        <div className={styles.item}>
                          <div className={styles.avatar}>
                            <img src={x.avatar} alt="Avatar" />
                          </div>
                          <div className={styles.description}>
                            <div className={styles.category}>Creator</div>
                            <div className={styles.text}>{x.creator}</div>
                          </div>
                        </div>
                        <div className={styles.item}>
                          <div className={styles.icon}>
                            <Icon name="stop" size="24" />
                          </div>
                          <div className={styles.description}>
                            <div className={styles.category}>Instant price</div>
                            <div className={styles.text}>3.5 ETH</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.wrap}>
                        <div className={styles.info}>Current Bid</div>
                        <div className={styles.currency}>{x.currency}</div>
                        <div className={styles.price}>{x.price}</div>
                        <div className={styles.info}>Auction ending in</div>
                        <div className={styles.timer}>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>Hrs</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>24</div>
                            <div className={styles.time}>mins</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>secs</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.btns}>
                        <button
                          className={cn("button", styles.button)}
                          onClick={() => setVisibleModalBid(true)}
                        >
                          Place a bid
                        </button>
                        <Link href="/item">
                          <button
                            className={cn("button-stroke", styles.button)}
                          >
                            View item
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect />
      </Modal>
    </div>
  );
};

const Hi = () => {
  return <div>hiii</div>;
};

export default Hero;
