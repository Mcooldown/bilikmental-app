import Button from '../components/atoms/Button';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import QuoteCard from '../components/molecules/QuoteCard';
import ArticleCard from '../components/molecules/ArticleCard';
import router from 'next/router';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import Loader from '../components/atoms/Loader';
import Gap from '../components/atoms/Gap';

const Home = () => {

  // const urlAPI = "http://localhost:4000";
  const urlAPI = "https://bilikmental-api.vercel.app";
    const [quotes, setQuotes] = useState(null);
    const [articles, setArticles] = useState(null);

    const fetchQuotes = async (signal) => {
          try {
               const url = urlAPI + '/v1/quotes';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         params: {
                              category: "All",
                              currentPage: 1,
                              perPage: 4,
                         }
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setQuotes(json.data);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const fetchArticles = async (signal) => {
          try {
               const url = urlAPI + '/v1/articles';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         params: {
                              category: "All",
                              currentPage: 1,
                              perPage: 3,
                         }
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setArticles(json.data);
               }
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          const abortCont = new AbortController();
          
          fetchQuotes(abortCont.signal);
          fetchArticles(abortCont.signal);

          return () => abortCont.abort();
     }, []);



  return (
    <Layout pageTitle="Home">
      <div className={styles.landingWrapper}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className={styles.textLanding + " text-size-1 font-bold text-dark-1"}>Your mental health, our priority</h1>
              <p className="text-gray-1 my-4">Bilik Mental is a platform for mental needs, such as meditation, healing quotes, mental related articles, as well as registration for consultations with mental professional consultants</p>
              <Button title="Register Now" type={2} onClick={() => router.push('/register')} isFull={false} />

            </div>
            <div className="flex-1 hidden lg:block text-right">
              <Image src="/assets/images/landingIllust.png" width={500} height={493.1} />
            </div>
          </div>

        </div>
      </div>

      <div className={styles.quoteSection}>
        <div className="container mx-auto px-4 lg:px-12">
          <h1 className="text-size-2 font-bold text-dark-1">Keep up your spirit with encouraging quotes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-12">
            {
              quotes ? quotes.map(quote => {
                return (
                  <div className="col-span-1" key={quote._id}>
                    <QuoteCard category={quote.category} id={quote._id} quote={quote.text} author={quote.user.name.first + " " + quote.user.name.last}
                    isConfirmed={quote.isConfirmed} />
                  </div>
                )
              })
              : 
              <div className="col-span-2 text-center">
                <Gap height={30} />
                <Loader />
                <Gap height={30} />
              </div>
            }
          </div>

          <div className="flex justify-end mt-6">
            <Link href="/quotes"><p className="text-gray-1 cursor-pointer">Read more quotes...</p></Link>
          </div>
        </div>
      </div>

      <div className={styles.consultSection}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-2 gap-7 mt-12 items-center">
            <div className="col-span-1">
              <Image src="/assets/images/consultIllust.png" width={480} height={522.47} />
            </div>
            <div className="col-span-1">
              <h1 className="text-size-2 font-bold text-dark-1">Let us know your problems</h1>
              <p className="text-gray-1 my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra tincidunt aliquet eget sit non. Nisl aliquam elementum scelerisque neque hendrerit mauris non non quis. Laoreet sit integer ultrices quis. Arcu neque, aliquet eleifend bibendum viverra.</p>
              <Button type={2} title="Consult Now" onClick={() => router.push('/consultation/my')} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.articleSection}>
        <div className="container mx-auto px-4 lg:px-12">
          <h1 className="text-size-2 font-bold text-dark-1">Read these articles to keep your happiness</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-12 items-start">
            {
              articles && articles.map(article => {
                return (
                  <div className="col-span-1" key={article._id}>
                    <ArticleCard category={article.category} id={article._id} title={article.title} author={article.user.name.first + " " + article.user.name.last} 
                    date={new Date(article.updatedAt).toLocaleString('en-US',{day: "numeric", month:"long", year: "numeric"})} isConfirmed={article.isConfirmed}
                    image={article.image} />
                  </div>
                )
              })
            }
          </div>
          <div className="flex justify-end mt-6">
            <Link href="/articles"><p className="text-white cursor-pointer">Read more articles...</p></Link>

          </div>
        </div>
      </div>

      <div className={styles.meditationSection}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-12 items-center">
            <div className="col-span-1 lg:order-2 flex justify-end">
              <Image src="/assets/images/meditationIllust.png" width={564} height={493} />
            </div>
            <div className="col-span-1 lg:order-1">
              <h1 className="text-size-2 font-bold text-white">“Meditation is like a gym in which you develop the powerful mental muscles of calm and insight.”</h1>
              <p className="text-white my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
              <Button type={1} title="Join Meditation" onClick={() => router.push('/meditation/my')} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;
