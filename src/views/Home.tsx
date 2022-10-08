import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import Layout from '../components/layout/Layout'
import ProductCarousel from '../components/product/Carousel'
import 'swiper/css/bundle'
import '../assets/Banner.scss'
import '../assets/Product.scss'
import { useGetProducts, IProducts } from '../hooks/Products'

const Home: React.FC = () => {
  const products: IProducts = useGetProducts()

  return (
    <Layout>
      <article className="banner-announcements">
        <Swiper
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={1}
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
      <article className="products-carousel-container">
        <h3 className="products-carousel-heading">Most Popular</h3>
        <div>
          <ProductCarousel
            onReachEnd={() => products.loadMore('mostPopular')}
            products={products.mostPopular}
          />
        </div>
      </article>
      <article>
        <h3>Best Priced</h3>
      </article>
    </Layout>
  )
}

export default Home
