"use client";
import React from 'react';
import SearchPage from './searchpage';
import AllRoutesPage from './allroutes';

function VanSearchPage() {

  return (
    <div className="text-black">
      <SearchPage />

      <AllRoutesPage />

    </div>
  );
}

export default VanSearchPage;