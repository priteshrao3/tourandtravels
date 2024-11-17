'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined, RightOutlined, CarOutlined } from '@ant-design/icons';
import Link from 'next/link';

function NavigationBar() {
  const [open, setOpen] = useState(false);

  // Function to open the drawer
  const showDrawer = () => {
    setOpen(true);
  };

  // Function to close the drawer
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="bg-white">
      <div className="flex items-center">
        {/* Hamburger Icon for Drawer Toggle (always visible) */}
        <Button className="bg-yellow-400 h-14 rounded-none" type="text" onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: '24px', color: 'black' }} />
        </Button>

        {/* Logo wrapped in Link for navigation to the home page */}
        <div className="ml-2">
          <Link href="/" passHref>
            <Image
              src="/sardar-travels-logo-2022.jpg"
              alt="Sardar Travels Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>

        {/* Main Navigation Links for larger screens */}
        <div className="hidden md:flex space-x-6 ml-auto md:pr-12">
          <a href="/popularcitys" className="text-black hover:text-blue-900 mt-2 font-bold">Popular Cities</a>
          <a href="#" className="text-black hover:text-blue-900 mt-2 font-bold">Local Cab</a>
          <a href="#" className="text-black hover:text-blue-900 mt-2 font-bold">Tour Packages</a>
          <a href="#" className="text-black hover:text-blue-900 mt-2 font-bold">Tempo Traveller</a>
          <a href="#" className="text-black hover:text-blue-900 mt-2 font-bold">Force Urbania</a>
          <a
            href="tel:+917696666640"
            className="text-black bg-yellow-400 py-2 hover:bg-blue-900 font-bold hover:text-white px-2 rounded transition duration-300"
          >
            +91 9170475552
          </a>
          <a href="https://wa.me/917696666640" className="text-white py-2 font-bold px-2 rounded bg-blue-900 hover:bg-yellow-900">WhatsApp</a>
        </div>
      </div>

      {/* Drawer component for mobile navigation */}
      <Drawer
        onClose={onClose}
        open={open}
        closable={false} // Disable the default close button
        width={280} // Decrease the width of the drawer
        title={
          <div className="flex justify-between items-center">
            {/* Logo on the left */}
            <div className="flex items-center">
              <Image
                src="/sardar-travels-logo-2022.jpg"
                alt="Sardar Travels Logo"
                width={200}
                height={50}
              />
            </div>
            {/* Close button on the right */}
            <Button
              className="text-black"
              type="text"
              icon={<CloseOutlined style={{ fontSize: '24px' }} />}
              onClick={onClose}
            />
          </div>
        }
        placement="left" // Make the drawer open from the left
      >
        {/* Drawer Menu Items with Arrow Icon */}
        <div className="space-y-4">
          <a href="/" className="flex items-center text-black hover:text-blue-900 font-bold">
            Home <RightOutlined className="ml-auto" />
          </a>
          <a href="/popularcitys" className="flex items-center text-black hover:text-blue-900 font-bold">
            Popular Cities <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Local Cab <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Tour Packages <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Tempo Traveller <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Force Urbania <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Our cabs <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            Review <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            blog <RightOutlined className="ml-auto" />
          </a>
          <a href="#" className="flex items-center text-black hover:text-blue-900 font-bold">
            FAQ <RightOutlined className="ml-auto" />
          </a>
          <a
            href="tel:+917696666640"
            className="flex items-center text-black hover:text-blue-900 font-bold"
          >
            +91 9170475552 <RightOutlined className="ml-auto" />
          </a>
          <a
            href="https://wa.me/917696666640"
            className="flex items-center p-2 text-white font-bold px-2 rounded bg-yellow-400 hover:bg-yellow-900"
          >
            <CarOutlined className="mr-2" /> {/* Taxi icon on the left */}
            Book Taxi
            <RightOutlined className="ml-auto" /> {/* Arrow icon on the right */}
          </a>
        </div>
      </Drawer>
    </nav>
  );
}

export default NavigationBar;
