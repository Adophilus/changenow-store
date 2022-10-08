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
      <article className="products-carousel-container">
        <h3 className="products-carousel-heading">Best Priced</h3>
        <div>
          <ProductCarousel
            onReachEnd={() => products.loadMore('bestPriced')}
            products={products.mostPopular}
          />
        </div>
      </article>
      <article>
        <h3>ChangeNOW Store</h3>
        <p>
          The purpose of this project is to serve as a test (set by myself) to
          prepare me for the the role of React Developer at ChangeNOW. It makes
          use of all the technologies stated on the job requirements.
        </p>
        <p>
          I learnt a lot during the course of this project. The most important
          takeaway was automating the deployment to my personal server using
          GitHub actions.
        </p>
        <p>
          <a role="button" href="/about">
            Read More
          </a>
        </p>
      </article>
    </Layout>
  )
}

export default Home
