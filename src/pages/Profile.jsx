import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" showSearchIcon={ false } />
      <h1>Profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
