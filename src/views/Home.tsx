import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import Layout from '../components/layout/Layout'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import '../assets/Banner.scss'

const Home: React.FC = () => {
  SwiperCore.use([Autoplay,Pagination, Navigation])
  return (
    <Layout>
      <article className="banner-announcements">
        <Swiper
          autoplay={{delay: 3000, pauseOnMouseEnter: true}}
          navigation
          loop={true}
          pagination={{clickable: true}}
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination,Autoplay]}
        >
        <SwiperSlide>
        <img src="https://dummyimage.com/1024x512/000/fff&text=A" />
        </SwiperSlide>
        <SwiperSlide>
        <img src="https://dummyimage.com/1024x512/000/fff&text=B" />
        </SwiperSlide>
        <SwiperSlide>
        <img src="https://dummyimage.com/1024x512/000/fff&text=C" />
        </SwiperSlide>
        </Swiper>
      </article>
      <article>
        <header>
          <h3>Most Popular</h3>
                  </header>
          
      </article>
      <article>
        <header>
          <h3>Best Priced</h3>
        </header>
          
      </article>
    </Layout>
  )
}

export default Home
