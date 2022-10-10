import { Splide, SplideSlide } from '@splidejs/react-splide'
import Layout from '../components/layout/Layout'
import ProductCarousel from '../components/product/Carousel'
import 'swiper/css/bundle'
import '../assets/Banner.scss'
import '../assets/Product.scss'
import { useGetProducts, IProducts } from '../hooks/Products'
import { useGetBanners, IBanners } from '../hooks/Banners'

const Home: React.FC = () => {
  const products: IProducts = useGetProducts()
  const banners: IBanners = useGetBanners()

  return (
    <Layout>
      <article className="banner-announcements">
        {/*<Swiper
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
        </Swiper>*/}
        <Splide>
          {banners.banners.map((banner, index) => (
            <SplideSlide key={index}>
              <img src={banner.image} />
            </SplideSlide>
          ))}
        </Splide>
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
          ChangeNOW Store is an Ecommerce platform where users can purchase
          clothing using{' '}
          <a
            href="https://en.wikipedia.org/wiki/Ripple_(payment_protocol)"
            rel="noreferrer noopener"
          >
            XRP (Ripple)
          </a>
          . It has an ultra simple and intuitive UI -- you should feel right at
          home here.
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
