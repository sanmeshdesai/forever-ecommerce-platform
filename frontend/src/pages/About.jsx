import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis omnis temporibus officiis ad dolorum eius pariatur voluptatibus magnam, debitis dolores odio necessitatibus natus earum nam?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, officia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio harum sint tempore dignissimos in distinctio excepturi non. Eos ducimus assumenda sint corrupti neque modi a.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, officia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio harum sint tempore dignissimos in distinctio excepturi non</p>
          </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p>We meticulously select and vet each product to ensure it meets our stringent Quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority .</p>
        </div>
      </div>

    <NewsletterBox />

    </div>
  )
}

export default About
