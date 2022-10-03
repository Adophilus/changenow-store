import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import Layout from '../components/layout/Layout'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import '../assets/Banner.scss'
import '../assets/Product.scss'
import { useGetProducts, IProducts } from '../hooks/Products'
import ProductTab from '../components/ProductTab'
import { IProduct } from '../types/Collections'

const Home: React.FC = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation])
  const products: IProducts = useGetProducts()

  return (
    <Layout>
      <article className="banner-announcements">
        <Swiper
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
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
        <h3>Most Popular</h3>
        <div>
          <Swiper
            className="products-carousel"
          slidesPerView={3}
          spaceBetween={50}
          breakpoints={{
              'phones': {
                width: 640,
                slidesPerView: 2,
              },
              'notebooks': {
                width: 1000,
                slidesPerView: 3
              }
            }}
          >
            {products.mostPopular.map((product:IProduct, index:number) => <SwiperSlide key={index}><ProductTab product={product} /></SwiperSlide>)}
          </Swiper>
        </div>
      </article>
      <article>
        <h3>Best Priced</h3>
      </article>
    </Layout>
  )
}

export default Home
