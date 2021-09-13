import type { NextPage } from 'next';
import Button from '../components/atoms/Button';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import QuoteCard from '../components/molecules/QuoteCard';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <div className={styles.landingWrapper}>
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className={styles.textLanding}>Your mental health, our priority</h1>
              <p className="text-gray-1 my-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ullam repudiandae libero hic earum pariatur sit tenetur placeat, officia itaque,</p>
              <Button title="Register Now" type={2} />

            </div>
            <div className="flex-1 hidden lg:block text-right">
              <Image src="/assets/images/landingIllust.png" width={500} height={450} />
            </div>
          </div>

        </div>
      </div>

      <div className="pb-20">
        <div className="container mx-auto px-4 lg:px-12">
          <h1 className={styles.titleSection}>Keep up your spirit with encouraging quotes</h1>

          <div className="grid grid-cols-2 gap-7 mt-12">
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
            <p className="text-gray-1">Read more quotes...</p>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <div className="container mx-auto px-4 lg:px-12">
          LET US KNOW YOUR PROBLEM
        </div>
      </div>

    </Layout>
  )
}

export default Home;
