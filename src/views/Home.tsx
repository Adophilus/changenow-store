import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import Layout from '../components/layout/Layout'
import 'swiper/css/bundle'
import '../assets/Banner.scss'
import '../assets/Product.scss'
import { useGetProducts, IProducts } from '../hooks/Products'
import ProductTab from '../components/ProductTab'
import { IProduct } from '../types/Collections'

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
      <article>
        <h3>Most Popular</h3>
        <div>
          {products.mostPopular.length == 0 ? (
            <div aria-busy="true"></div>
          ) : (
            <div className="products-carousel-wrapper">
              <a
                role="button"
                href="#"
                className="products-carousel-nav-btn nav-left"
              >
                <i className="bi bi-chevron-left"></i>
              </a>
              <Swiper
                className="products-carousel"
                onSwiper={setMostPopularSwiperRef}
                modules={[Pagination]}
              >
                {
                  <>
                    {products.mostPopular.map(
                      (product: IProduct, index: number) => (
                        <SwiperSlide style={{ flexShrink: '1' }} key={index}>
                          <ProductTab product={product} />
                        </SwiperSlide>
                      )
                    )}
                    <div aria-busy="true"></div>
                  </>
                }
              </Swiper>

              <a role="button" className="products-carousel-nav-btn nav-right">
                <i className="bi bi-chevron-right"></i>
              </a>
            </div>
          )}
        </div>
      </article>
      <article>
        <h3>Best Priced</h3>
      </article>
    </Layout>
  )
}

export default Home
