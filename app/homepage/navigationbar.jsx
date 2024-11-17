'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link'; // Import Link from next/link

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
        title="Navigation"
        placement="left" // Ensure placement is set to 'left'
        closable
        onClose={onClose}
        open={open}
        width={250}  // You can adjust the width here
        styles={{ body: { padding: '10px' } }}  // Replace bodyStyle with styles.body
      >
        <div className="space-y-4">
          <a href="/popularcitys" className="text-black hover:text-blue-900">Popular Cities</a>
          <a href="#" className="text-black hover:text-blue-900">Local Cab</a>
          <a href="#" className="text-black hover:text-blue-900">Tour Packages</a>
          <a href="#" className="text-black hover:text-blue-900">Tempo Traveller</a>
          <a href="#" className="text-black hover:text-blue-900">Force Urbania</a>
          <a href="tel:+917696666640" className="text-black hover:text-blue-900">+91 9170475552</a>
          <a href="https://wa.me/917696666640" className="text-green-800 hover:text-blue-900">WhatsApp</a>
        </div>
      </Drawer>
    </nav>
  );
}

export default NavigationBar;
