import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import style from './slider.module.css';
import { SlideImg } from './slider/slide-img';

export function Slider(): JSX.Element {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      pagination={{ clickable: true }}
      className={style.slider}
      autoplay
    >
      <SwiperSlide>
        <SlideImg
          srcMobile='https://static.blue.cl/images/bluenvio/campaign/banner-slide-1-mobile.png'
          src='https://static.blue.cl/images/bluenvio/campaign/banner-slide-1.png'
        ></SlideImg>
      </SwiperSlide>
    </Swiper>
  );
}
