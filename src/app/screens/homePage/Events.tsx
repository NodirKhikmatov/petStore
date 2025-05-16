import "swiper/css"; // Ensure Swiper styles are imported
import "swiper/css/navigation";
import "swiper/css/pagination";

import {Box, Stack} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";

import {plans} from "../../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className="events-frame">
      <Stack className="events-main">
        <Box className="events-text">
          <span className="category-title">Pet Store Events</span>
        </Box>

        <Swiper
          className="events-info swiper-wrapper"
          slidesPerView={"auto"}
          centeredSlides
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value, index) => (
            <SwiperSlide key={index} className="events-info-frame">
              <div className="events-img">
                <img src={value.img} alt={value.title} className="events-img" />
              </div>
              <Box className="events-desc">
                <Box className="events-bott">
                  <Box className="bott-left">
                    <div className="event-title-speaker">
                      <strong>{value.title}</strong>
                      <div className="event-organizator">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 3V21M12 3L7 8H3V16H7L12 21V3Z"
                            stroke="#333"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <circle cx="18" cy="12" r="3" fill="#FFC107" />
                        </svg>

                        <p className="spec-text-author">{value.author}</p>
                      </div>
                    </div>

                    <p className="text-desc">{value.desc}</p>

                    <div className="bott-info">
                      <div className="bott-info-main">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="#333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                          <circle cx="12" cy="14" r="1.5" fill="#4CAF50" />
                        </svg>

                        {value.date}
                      </div>
                      <div className="bott-info-main">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="#333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 21s6-5.686 6-10a6 6 0 1 0-12 0c0 4.314 6 10 6 10z" />
                          <circle cx="12" cy="11" r="2" fill="#F44336" />
                        </svg>

                        {value.location}
                      </div>
                    </div>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box className="prev-next-frame">
          <div className="dot-frame-pagination swiper-pagination"></div>
        </Box>
      </Stack>
    </div>
  );
}
