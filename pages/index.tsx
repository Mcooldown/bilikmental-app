import type { NextPage } from 'next';
import Button from '../components/atoms/Button';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import QuoteCard from '../components/molecules/QuoteCard';
import ArticleCard from '../components/molecules/ArticleCard';
import router from 'next/router';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <div className={styles.landingWrapper}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className={styles.textLanding + " text-size-1 font-bold text-dark-1"}>Your mental health, our priority</h1>
              <p className="text-gray-1 my-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ullam repudiandae libero hic earum pariatur sit tenetur placeat, officia itaque,</p>
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
            <div className="col-span-1">
              <QuoteCard id="1" quote="Don’t stop when you’re tired. Stop when you’re done." author="Wesley Snipes" />
            </div>
            <div className="col-span-1">
              <QuoteCard id="2" quote="Your time is limited, so don’t waste it living someone els..." author="Steve Jobs" />
            </div>
            <div className="col-span-1">
              <QuoteCard id="3" quote="People begin to become successful the minute they are bla bla bla bla" author="Harvey Mackay" />
            </div>
            <div className="col-span-1">
              <QuoteCard id="4" quote="Don’t count the days, make the days count." author="Muhammad Ali" />
            </div>
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
              <Button type={2} title="Consult Now" onClick={() => router.push('/consultation')} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.articleSection}>
        <div className="container mx-auto px-4 lg:px-12">
          <h1 className="text-size-2 font-bold text-dark-1">Read these articles to keep your happiness</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-12 items-start">
            <div className="col-span-1">
              <ArticleCard id="1" title="3 Steps to encourage
            yourself while in down situation" author="Vincent Hadinata" date="09-09-2021" />
            </div>
            <div className="col-span-1">
              <ArticleCard id="2" title="Feel insecure to the others? Do these things to overcome it" author="Vincent" date="09-09-2021" />
            </div>
            <div className="col-span-1">
              <ArticleCard id="3" title="10 tips to make your life better" author="Vincent" date="09-09-2021" />
            </div>
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
              <Button type={1} title="Join Meditation" onClick={() => router.push('/meditation')} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;
