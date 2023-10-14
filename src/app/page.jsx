"use client";
import Image from "next/image";
import heroImg from "../img/home.png";
import "../Styles/page.css";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import Featured from "../Component/Featured";
import story from "../img/story.png";
import Products from "../Component/Products";
import test from "../img/testimonial.png";
import test1 from "../img/testimonial1.jpg";
import NewArrivals from "../Component/newArrivals";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [products, setproducts] = useState([]);
  const [arrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const query = `*[_type == "Featured" && category == "featured"]{
          _id,
          title,
          price,
          "image01": image01.asset->{
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          category
        }`;
      const fetchedFeatured = await client.fetch(query);
      console.log(typeof fetchedFeatured);
      console.log(fetchedFeatured);
      setFeatured(fetchedFeatured);
    };
    fetchFeatured();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "Products" && category == "Products"]{
          _id,
          title,
          price,
          "image01": image01.asset->{
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          category
        }`;
      const fetchedProducts = await client.fetch(query);
      console.log(typeof fetchedProducts);
      console.log(fetchedProducts);
      setproducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchArrivals = async () => {
      const query = `*[_type == "NewArrivals" && category == "Newarrivals"]{
          _id,
          title,
          price,
          "image01": image01.asset->{
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          category
        }`;
      const fetchedArrivals = await client.fetch(query);
      console.log(typeof fetchedArrivals);
      console.log(fetchedArrivals);
      setNewArrivals(fetchedArrivals);
    };
    fetchArrivals();
  }, []);
  AOS.init({
    duration: 2000, // Animation duration
    offset: 200, // Offset (in pixels) from the top of the page
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <main>
      {/* ################################# Hero Section #########################################3 */}

      <section className="home" id="home">
        <div className="home__container container grid">
          <div className="home__img-bg" >
            <Image src={heroImg} alt="" className="home__img" />
          </div>

          <div className="home__social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="home__social-link"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="home__social-link"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="home__social-link"
            >
              Instagram
            </a>
          </div>

          <div className="home__data" data-aos="fade-right">
            <h1 className="home__title">
              NEW WATCH <br /> COLLECTIONS B720
            </h1>
            <p className="home__description">
              Latest arrival of the new imported watches of the B720 series,
              with a modern and resistant design.
            </p>
            <span className="home__price">$1245</span>

            <div className="home__btns">
              <a href="#" className="button button--gray button--small">
                Discover
              </a>

              <button className="button home__button">ADD TO CART</button>
            </div>
          </div>
        </div>
      </section>

      {/* ################################# Featured Section #########################################3 */}
      <section className="featured_section" id="featured_section">
        <div className="feat_wrapper">
          <div className="fs_header">
            <hr className="hr_top" />
            <h1>featured</h1>
          </div>

          {/* Featured cards from sanity */}
          <div className="fs_feat_wrapper" data-aos="zoom-in-right">
            {featured.map((item) => (
              <ul className="fs_feat_wrapper" key={item._id} >
                <Featured item={item} />
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ############################# Our Story ###################################### */}
      <section className="storysection" id="storysection">
        <div className="story-wrapper">
          <div className="storyImage_wrapper" data-aos="fade-right">
            <Image src={story} alt="" width={470} height={500} />
          </div>
          <article className="story_article" data-aos="fade-left">
            <div className="ourstoryheader">
              <hr className="story_hr" />
              <h1>Our Story</h1>
            </div>
            <h2>Insirational Watch of this year</h2>
            <h3>
              The latest and modern watches of this year, is available in
              various presentations in this store, discover them now.
            </h3>
            <button>Discover</button>
          </article>
        </div>
      </section>

      {/* ############################## Products ############################### */}
      <section className="productsection" id="productsection">
        <div className="pro_wrapper">
          <div className="pro_header">
            <hr className="hr_pro" />
            <h1>Products</h1>
          </div>
          <div className="pr_crd" >
            <ul className="product_cardwrapper">
              {products.map((item) => (
                <ul className="product_cardwrapper" key={item._id} data-aos="zoom-out-left">
                  <Products item={item} />
                </ul>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ########################## Testimonial Section ###################################### */}
      <section className="testimonial_section" id="testimonial_section">
        <div className="test_wrapper">
          <div className="testimonials">
            <div className="testimonial_wrapper" data-aos="fade-up-right">
              <div className="test_quote">&quot;</div>
              <h1>
                They are the best watches that one acquires, also they are
                always with the latest news and trends, with a very comfortable
                price and especially with the attention you receive, they are
                always attentive to your questions.
              </h1>
              <h2>March 27. 2021</h2>
              <div className="executive_wrapper">
                <Image
                  src={test1}
                  alt=""
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <div className="test_name_position">
                  <h3>Lee Doe</h3>
                  <h4>Director of a company</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second_image" data-aos="fade-up-left">
          <Image src={test} alt="" width={400} height={380} />
        </div>
      </section>

      {/* ########################### New Arrivals #################################### */}
      <section className="newArrivals_section" id="newArrivals_section">
        <div className="newArr_wrapper">
          <div className="new_header">
            <hr className="hr_new" />
            <h1>New Arrivals</h1>
          </div>

          <div className="newArrival_card">
            <Swiper
              // slidesPerView={1}
              spaceBetween={24}
              loop={true}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              mousewheel={true}
              cssMode={true}
              pagination={{ clickable: true }}
              // navigation={true}
              modules={[Pagination, Navigation]}
            >
              <div className="swiper-wrapper">
                <ul className="nA_cardwrapper">
                  {arrivals.map((item) => (
                    <ul key={item._id} data-aos="zoom-in-right">
                      <NewArrivals item={item} />
                    </ul>
                  ))}
                </ul>
              </div>
            </Swiper>
          </div>
        </div>
      </section>

      {/* ########################## Subscription ############################## */}
      <section className="subscribe_section" id="subscribe_section" data-aos="zoom-in">
        <div className="sub_wrapper">
          <div className="sub_article">
            <h1>Subscribe Our Newsletter</h1>
            <h2>
              Don&apos;t miss out on your discounts. Subscribe to our email
              newsletter to get the best offers, discounts, coupons, gifts and
              much more.
            </h2>
          </div>
          <div className="input_btn">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}
